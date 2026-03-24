import React from "react";

const TOKEN_COLORS: Record<string, string> = {
  keyword: "text-accent",
  builtin: "text-primary",
  string: "text-primary",
  number: "text-orange-400",
  operator: "text-pink-400",
  comment: "text-muted-foreground/50 italic",
  boolean: "text-yellow-400",
  punctuation: "text-muted-foreground",
  default: "text-foreground",
};

interface Token {
  type: string;
  value: string;
}

function tokenize(code: string): Token[] {
  const tokens: Token[] = [];
  const regex =
    /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')|(\b(?:let|if|else|while|for|in|to|fn|return)\b)|(\b(?:echo|input|null)\b)|(\b(?:true|false)\b)|(\b\d+(?:\.\d+)?\b)|([+\-*/%=<>!&|]+)|([(){};\[\],:])|(\S+)/g;
  let match;
  let lastIndex = 0;

  while ((match = regex.exec(code)) !== null) {
    if (match.index > lastIndex) {
      tokens.push({ type: "default", value: code.slice(lastIndex, match.index) });
    }
    if (match[1]) tokens.push({ type: "string", value: match[1] });
    else if (match[2]) tokens.push({ type: "keyword", value: match[2] });
    else if (match[3]) tokens.push({ type: "builtin", value: match[3] });
    else if (match[4]) tokens.push({ type: "boolean", value: match[4] });
    else if (match[5]) tokens.push({ type: "number", value: match[5] });
    else if (match[6]) tokens.push({ type: "operator", value: match[6] });
    else if (match[7]) tokens.push({ type: "punctuation", value: match[7] });
    else if (match[8]) tokens.push({ type: "default", value: match[8] });
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < code.length) {
    tokens.push({ type: "default", value: code.slice(lastIndex) });
  }
  return tokens;
}

export const HighlightedCode = ({ code }: { code: string }) => {
  const lines = code.split("\n");
  return (
    <pre className="rounded-lg bg-code-bg p-4 font-mono text-xs overflow-x-auto">
      {lines.map((line, i) => (
        <React.Fragment key={i}>
          {tokenize(line).map((token, j) => (
            <span key={j} className={TOKEN_COLORS[token.type] || TOKEN_COLORS.default}>
              {token.value}
            </span>
          ))}
          {i < lines.length - 1 && "\n"}
        </React.Fragment>
      ))}
    </pre>
  );
};

export const highlightCodeOverlay = (code: string) => {
  const lines = code.split("\n");
  return lines.map((line, i) => (
    <React.Fragment key={i}>
      {tokenize(line).map((token, j) => (
        <span key={j} className={TOKEN_COLORS[token.type] || TOKEN_COLORS.default}>
          {token.value}
        </span>
      ))}
      {i < lines.length - 1 && "\n"}
    </React.Fragment>
  ));
};
