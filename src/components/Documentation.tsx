const docs = [
  {
    title: "Variables",
    desc: "Declare variables using the let keyword.",
    code: `let name = "Zentrix";\nlet age = 1;\nlet active = true;`,
  },
  {
    title: "Output",
    desc: "Print values to the console with echo().",
    code: `echo("Hello World!");\necho(42 + 8);`,
  },
  {
    title: "Data Types",
    desc: "Supports numbers, strings, booleans (true/false), and null.",
    code: `let n = 3.14;\nlet s = "text";\nlet b = false;\nlet empty = null;`,
  },
  {
    title: "Arithmetic",
    desc: "Standard math operators: +, -, *, /, %",
    code: `let result = (10 + 5) * 2;\necho(result);`,
  },
  {
    title: "Conditionals",
    desc: "Use if/else for branching logic.",
    code: `let x = 10;\nif (x > 5) {\n  echo("big");\n} else {\n  echo("small");\n}`,
  },
  {
    title: "While Loop",
    desc: "Repeat code while a condition is true.",
    code: `let i = 0;\nwhile (i < 3) {\n  echo(i);\n  let i = i + 1;\n}`,
  },
  {
    title: "For Loop",
    desc: "Iterate over a range using for...in...to syntax.",
    code: `for (i in 0 to 5) {\n  echo(i);\n}`,
  },
  {
    title: "Comparison & Logic",
    desc: "==, !=, <, >, <=, >= and &&, || operators.",
    code: `let a = 5;\nif (a >= 1 && a <= 10) {\n  echo("in range");\n}`,
  },
  {
    title: "User Input",
    desc: "Read input from the user with input().",
    code: `let name = input("Your name: ");\necho("Hi " + name);`,
  },
];

const Documentation = () => {
  return (
    <section id="docs" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-2 gradient-text">
          Documentation
        </h2>
        <p className="text-center text-muted-foreground mb-12">
          Everything you need to start writing Zentrix code
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {docs.map((doc) => (
            <div
              key={doc.title}
              className="rounded-xl border border-border bg-card p-6 hover:border-primary/40 transition-colors group"
            >
              <h3 className="text-lg font-display font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                {doc.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">{doc.desc}</p>
              <pre className="rounded-lg bg-code-bg p-4 font-mono text-xs text-muted-foreground overflow-x-auto">
                {doc.code}
              </pre>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Documentation;
