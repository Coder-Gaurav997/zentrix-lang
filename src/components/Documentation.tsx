import { HighlightedCode } from "./SyntaxHighlight";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const TILE_COLORS = [
  "border-l-4 border-l-emerald-400",
  "border-l-4 border-l-teal-400",
  "border-l-4 border-l-green-400",
  "border-l-4 border-l-cyan-400",
  "border-l-4 border-l-emerald-300",
  "border-l-4 border-l-lime-400",
  "border-l-4 border-l-teal-300",
  "border-l-4 border-l-emerald-500",
  "border-l-4 border-l-cyan-300",
];

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

const DocTile = ({ doc, index }: { doc: typeof docs[0]; index: number }) => {
  const { ref, isVisible } = useScrollAnimation(0.1);
  return (
    <div
      ref={ref}
      className={`rounded-xl border border-border bg-card p-6 hover:border-primary/40 transition-all duration-500 group ${TILE_COLORS[index % TILE_COLORS.length]} ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${index * 60}ms` }}
    >
      <h3 className="text-lg font-display font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
        {doc.title}
      </h3>
      <p className="text-sm text-muted-foreground mb-4">{doc.desc}</p>
      <HighlightedCode code={doc.code} />
    </div>
  );
};

const Documentation = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();

  return (
    <section id="docs" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div
          ref={headerRef}
          className={`transition-all duration-700 ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-2 gradient-text">
            Documentation
          </h2>
          <p className="text-center text-muted-foreground mb-12">
            Everything you need to start writing Zentrix code
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {docs.map((doc, i) => (
            <DocTile key={doc.title} doc={doc} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Documentation;
