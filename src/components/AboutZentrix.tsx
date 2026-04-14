import { useState } from "react";
import { Info, X, Terminal, Code2, Cpu, Sparkles, Zap, BookOpen, Github } from "lucide-react";

const features = [
  { icon: Code2, label: "Variables & Data Types", desc: "Numbers, strings, booleans, null" },
  { icon: Terminal, label: "Console Output", desc: "echo() for printing values" },
  { icon: Cpu, label: "Conditionals", desc: "if / else branching logic" },
  { icon: Zap, label: "Loops", desc: "while loops & for...in...to ranges" },
  { icon: Sparkles, label: "Arithmetic", desc: "+, -, *, /, % operators" },
  { icon: BookOpen, label: "User Input", desc: "input() for reading user data" },
];

const AboutZentrix = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card/80 backdrop-blur-sm text-sm font-display font-medium text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all shadow-md"
      >
        <Info className="w-4 h-4" />
        About
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setOpen(false)}
        >
          <div className="absolute inset-0 bg-background/60 backdrop-blur-md" />

          <div
            onClick={(e) => e.stopPropagation()}
            className="relative z-10 w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-2xl border border-border bg-card p-7 shadow-2xl animate-scale-in"
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="text-center mb-5">
              <h2 className="text-2xl font-display font-bold gradient-text mb-2">ZENTRIX</h2>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-xs font-mono text-primary">
                v1.0 · Stable Release
              </div>
            </div>

            {/* Description */}
            <p className="text-sm leading-relaxed text-muted-foreground text-center mb-5">
              Zentrix is a custom-built programming language written entirely in{" "}
              <span className="text-accent font-semibold">Python</span>. It features a
              hand-crafted lexer, parser, and tree-walking interpreter — designed to be
              simple, expressive, and beginner-friendly.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-2.5 mb-5">
              {[
                { label: "Language", value: "Python" },
                { label: "Version", value: "1.0" },
                { label: "File Ext", value: ".zx" },
              ].map((s) => (
                <div key={s.label} className="text-center p-2.5 rounded-xl bg-secondary/50 border border-border">
                  <div className="text-[11px] text-muted-foreground mb-0.5">{s.label}</div>
                  <div className="text-sm font-mono font-semibold text-foreground">{s.value}</div>
                </div>
              ))}
            </div>

            {/* Features */}
            <h3 className="text-sm font-display font-semibold text-foreground mb-2.5">Features</h3>
            <div className="grid grid-cols-2 gap-2 mb-5">
              {features.map((f) => (
                <div
                  key={f.label}
                  className="flex items-start gap-2 p-2.5 rounded-lg bg-secondary/30 border border-border/50"
                >
                  <f.icon className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <div>
                    <div className="text-xs font-semibold text-foreground leading-tight">{f.label}</div>
                    <div className="text-[11px] text-muted-foreground leading-tight mt-0.5">{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Creator + CTA */}
            <div className="text-center pt-4 border-t border-border">
              <p className="text-xs text-muted-foreground mb-1">Created by</p>
              <a
                href="https://github.com/Coder-Gaurav997/Zentrix-Programming-Langauge"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-display font-semibold text-primary hover:underline underline-offset-4"
              >
                Gaurav Pandey
              </a>
              <p className="text-[11px] text-muted-foreground mt-1 mb-3">
                Built with ❤️ as a learning project
              </p>
              <a
                href="https://github.com/Coder-Gaurav997/Zentrix-Programming-Langauge"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                <Github className="w-4 h-4" />
                See Zentrix's Repo
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AboutZentrix;
