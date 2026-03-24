import { Terminal } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px] animate-pulse-glow" />

      <div className="relative z-10 text-center max-w-4xl">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-8">
          <Terminal className="w-4 h-4 text-primary" />
          <span className="text-sm font-mono text-primary">v1.0 Release</span>
        </div>

        <h1 className="text-6xl md:text-8xl font-display font-bold mb-6 tracking-tight">
          <span className="gradient-text">ZENTRIX</span>
        </h1>

        <p className="text-xl md:text-2xl text-muted-foreground mb-4 font-display">
          Custom Built Programming Language
        </p>

        <p className="text-muted-foreground mb-10">
          Created by{" "}
          <a
            href="https://github.com/Coder-Gaurav997"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline underline-offset-4 transition-colors"
          >
            Gaurav Pandey
          </a>
        </p>

        <div className="flex gap-4 justify-center">
          <a
            href="#playground"
            className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
          >
            Try Playground
          </a>
          <a
            href="#docs"
            className="px-6 py-3 rounded-lg border border-border text-foreground hover:bg-secondary transition-colors"
          >
            Documentation
          </a>
        </div>
      </div>

      {/* Floating code snippet */}
      <div className="relative z-10 mt-16 max-w-lg w-full">
        <div className="rounded-xl border border-border bg-card p-6 glow-box font-mono text-sm">
          <div className="flex gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-destructive/60" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
            <div className="w-3 h-3 rounded-full bg-primary/60" />
          </div>
          <pre className="text-muted-foreground">
            <span className="text-accent">let</span> name = <span className="text-primary">"Zentrix"</span>;{"\n"}
            <span className="text-accent">echo</span>(<span className="text-primary">"Hello from "</span> + name);
          </pre>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
