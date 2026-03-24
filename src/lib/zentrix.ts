// Zentrix v1.0 - Browser Interpreter

// ===== LEXER =====
type Token = [string, string | number | boolean];

const TOKEN_SPEC: [string, RegExp][] = [
  ['NUMBER', /\d+(\.\d+)?/],
  ['STRING', /"[^"]*"/],
  ['TRUE', /true/],
  ['FALSE', /false/],
  ['NULL', /null/],
  ['LET', /let/],
  ['ECHO', /echo/],
  ['INPUT', /input/],
  ['IF', /if/],
  ['ELSE', /else/],
  ['WHILE', /while/],
  ['FOR', /for/],
  ['IN', /in/],
  ['EQ', /==/],
  ['NE', /!=/],
  ['LE', /<=/],
  ['GE', />=/],
  ['LT', /</],
  ['GT', />/],
  ['AND', /&&/],
  ['OR', /\|\|/],
  ['NOT', /!/],
  ['ASSIGN', /=/],
  ['OP', /[+\-*/%]/],
  ['LPAREN', /\(/],
  ['RPAREN', /\)/],
  ['LBRACE', /\{/],
  ['RBRACE', /\}/],
  ['SEMI', /;/],
  ['ID', /[A-Za-z_][A-Za-z0-9_]*/],
  ['SKIP', /[ \t\n]+/],
  ['COMMENT', /\/\/[^\n]*/],
];

function tokenize(code: string): Token[] {
  const tokens: Token[] = [];
  const regex = TOKEN_SPEC.map(([name, pat]) => `(?<${name}>${pat.source})`).join('|');
  const re = new RegExp(regex, 'g');
  let match;
  while ((match = re.exec(code)) !== null) {
    const groups = match.groups!;
    for (const [kind, val] of Object.entries(groups)) {
      if (val === undefined) continue;
      if (kind === 'SKIP' || kind === 'COMMENT') break;
      let value: string | number | boolean = val;
      if (kind === 'NUMBER') {
        value = val.includes('.') ? parseFloat(val) : parseInt(val, 10);
      } else if (kind === 'STRING') {
        value = val.slice(1, -1);
      }
      tokens.push([kind, value]);
      break;
    }
  }
  return tokens;
}

// ===== AST =====
type ASTNode =
  | { type: 'Number'; value: number }
  | { type: 'String'; value: string }
  | { type: 'Boolean'; value: boolean }
  | { type: 'Null' }
  | { type: 'VarAssign'; name: string; value: ASTNode }
  | { type: 'VarAccess'; name: string }
  | { type: 'BinOp'; left: ASTNode; op: string; right: ASTNode }
  | { type: 'Echo'; expr: ASTNode }
  | { type: 'Input'; prompt: ASTNode }
  | { type: 'IfNode'; condition: ASTNode; trueBlock: ASTNode[]; falseBlock: ASTNode[] | null }
  | { type: 'WhileNode'; condition: ASTNode; body: ASTNode[] }
  | { type: 'ForNode'; varName: string; start: ASTNode; end: ASTNode; body: ASTNode[] };

// ===== PARSER =====
class Parser {
  tokens: Token[];
  pos = 0;

  constructor(tokens: Token[]) {
    this.tokens = tokens;
  }

  current(): Token {
    return this.pos < this.tokens.length ? this.tokens[this.pos] : ['EOF', ''];
  }

  eat(type: string) {
    if (this.current()[0] === type) {
      this.pos++;
    } else {
      throw new Error(`Expected ${type}, got ${this.current()[0]} (${this.current()[1]})`);
    }
  }

  parse(): ASTNode[] {
    const stmts: ASTNode[] = [];
    while (this.current()[0] !== 'EOF') {
      stmts.push(this.statement());
    }
    return stmts;
  }

  statement(): ASTNode {
    const t = this.current();
    if (t[0] === 'LET') return this.varAssign();
    if (t[0] === 'ECHO') return this.echoStmt();
    if (t[0] === 'IF') return this.ifStmt();
    if (t[0] === 'WHILE') return this.whileStmt();
    if (t[0] === 'FOR') return this.forStmt();
    return this.exprStatement();
  }

  block(): ASTNode[] {
    const stmts: ASTNode[] = [];
    this.eat('LBRACE');
    while (this.current()[0] !== 'RBRACE') stmts.push(this.statement());
    this.eat('RBRACE');
    return stmts;
  }

  varAssign(): ASTNode {
    this.eat('LET');
    const name = this.current()[1] as string;
    this.eat('ID');
    this.eat('ASSIGN');
    const value = this.expr();
    this.eat('SEMI');
    return { type: 'VarAssign', name, value };
  }

  echoStmt(): ASTNode {
    this.eat('ECHO');
    this.eat('LPAREN');
    const expr = this.expr();
    this.eat('RPAREN');
    this.eat('SEMI');
    return { type: 'Echo', expr };
  }

  ifStmt(): ASTNode {
    this.eat('IF');
    this.eat('LPAREN');
    const condition = this.expr();
    this.eat('RPAREN');
    const trueBlock = this.block();
    let falseBlock: ASTNode[] | null = null;
    if (this.current()[0] === 'ELSE') {
      this.eat('ELSE');
      falseBlock = this.block();
    }
    return { type: 'IfNode', condition, trueBlock, falseBlock };
  }

  whileStmt(): ASTNode {
    this.eat('WHILE');
    this.eat('LPAREN');
    const condition = this.expr();
    this.eat('RPAREN');
    const body = this.block();
    return { type: 'WhileNode', condition, body };
  }

  forStmt(): ASTNode {
    this.eat('FOR');
    this.eat('LPAREN');
    const varName = this.current()[1] as string;
    this.eat('ID');
    this.eat('IN');
    const start = this.expr();
    if (this.current()[1] !== 'to') throw new Error("Expected 'to'");
    this.eat('ID');
    const end = this.expr();
    this.eat('RPAREN');
    const body = this.block();
    return { type: 'ForNode', varName, start, end, body };
  }

  exprStatement(): ASTNode {
    const expr = this.expr();
    this.eat('SEMI');
    return expr;
  }

  expr(): ASTNode { return this.logic(); }

  logic(): ASTNode {
    let left = this.equality();
    while (this.current()[0] === 'AND' || this.current()[0] === 'OR') {
      const op = this.current()[1] as string;
      this.eat(this.current()[0]);
      left = { type: 'BinOp', left, op, right: this.equality() };
    }
    return left;
  }

  equality(): ASTNode {
    let left = this.comparison();
    while (this.current()[0] === 'EQ' || this.current()[0] === 'NE') {
      const op = this.current()[1] as string;
      this.eat(this.current()[0]);
      left = { type: 'BinOp', left, op, right: this.comparison() };
    }
    return left;
  }

  comparison(): ASTNode {
    let left = this.term();
    while (['LT','GT','LE','GE'].includes(this.current()[0])) {
      const op = this.current()[1] as string;
      this.eat(this.current()[0]);
      left = { type: 'BinOp', left, op, right: this.term() };
    }
    return left;
  }

  term(): ASTNode {
    let left = this.factor();
    while (this.current()[0] === 'OP') {
      const op = this.current()[1] as string;
      this.eat('OP');
      left = { type: 'BinOp', left, op, right: this.factor() };
    }
    return left;
  }

  factor(): ASTNode {
    const t = this.current();
    if (t[0] === 'NUMBER') { this.eat('NUMBER'); return { type: 'Number', value: t[1] as number }; }
    if (t[0] === 'STRING') { this.eat('STRING'); return { type: 'String', value: t[1] as string }; }
    if (t[0] === 'TRUE') { this.eat('TRUE'); return { type: 'Boolean', value: true }; }
    if (t[0] === 'FALSE') { this.eat('FALSE'); return { type: 'Boolean', value: false }; }
    if (t[0] === 'NULL') { this.eat('NULL'); return { type: 'Null' }; }
    if (t[0] === 'ID') { const n = t[1] as string; this.eat('ID'); return { type: 'VarAccess', name: n }; }
    if (t[0] === 'LPAREN') { this.eat('LPAREN'); const e = this.expr(); this.eat('RPAREN'); return e; }
    if (t[0] === 'INPUT') { this.eat('INPUT'); this.eat('LPAREN'); const p = this.expr(); this.eat('RPAREN'); return { type: 'Input', prompt: p }; }
    throw new Error(`Unexpected token: ${t[0]} (${t[1]})`);
  }
}

// ===== INTERPRETER =====
export function runZentrix(code: string): string[] {
  const output: string[] = [];
  const env: Record<string, unknown> = {};
  const MAX_ITERATIONS = 10000;
  let iterations = 0;

  const tokens = tokenize(code);
  const parser = new Parser(tokens);
  const tree = parser.parse();

  function visit(node: ASTNode): unknown {
    if (++iterations > MAX_ITERATIONS) throw new Error('Infinite loop detected (max iterations exceeded)');

    switch (node.type) {
      case 'Number': return node.value;
      case 'String': return node.value;
      case 'Boolean': return node.value;
      case 'Null': return null;
      case 'VarAssign': { env[node.name] = visit(node.value); return undefined; }
      case 'VarAccess': {
        if (node.name in env) return env[node.name];
        throw new Error(`Undefined variable: ${node.name}`);
      }
      case 'BinOp': {
        const l = visit(node.left) as number;
        const r = visit(node.right) as number;
        switch (node.op) {
          case '+': return l + r;
          case '-': return l - r;
          case '*': return l * r;
          case '/': return l / r;
          case '%': return l % r;
          case '==': return l === r;
          case '!=': return l !== r;
          case '<': return l < r;
          case '>': return l > r;
          case '<=': return l <= r;
          case '>=': return l >= r;
          case '&&': return l && r;
          case '||': return l || r;
          default: throw new Error(`Unknown op: ${node.op}`);
        }
      }
      case 'Echo': {
        const val = visit(node.expr);
        output.push(String(val));
        return undefined;
      }
      case 'Input': {
        const prompt = visit(node.prompt) as string;
        const val = window.prompt(prompt) || '';
        const num = Number(val);
        return isNaN(num) ? val : num;
      }
      case 'IfNode': {
        if (visit(node.condition)) {
          node.trueBlock.forEach(s => visit(s));
        } else if (node.falseBlock) {
          node.falseBlock.forEach(s => visit(s));
        }
        return undefined;
      }
      case 'WhileNode': {
        while (visit(node.condition)) {
          node.body.forEach(s => visit(s));
        }
        return undefined;
      }
      case 'ForNode': {
        const start = visit(node.start) as number;
        const end = visit(node.end) as number;
        for (let i = start; i < end; i++) {
          env[node.varName] = i;
          node.body.forEach(s => visit(s));
        }
        return undefined;
      }
    }
  }

  for (const stmt of tree) {
    visit(stmt);
  }

  return output;
}
