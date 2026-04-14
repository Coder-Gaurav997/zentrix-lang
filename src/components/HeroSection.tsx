import { Terminal } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[100px] animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-accent/5 blur-[80px] animate-pulse-glow" style={{ animationDelay: "1.5s" }} />

      <div className="relative z-10 text-center max-w-3xl">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 mb-8">
          <Terminal className="w-4 h-4 text-primary" />
          <span className="text-sm font-mono text-primary tracking-wide">v1.0 Release</span>
        </div>

        <h1 className="text-7xl md:text-9xl font-display font-bold mb-5 tracking-tighter leading-none">
          <span className="gradient-text">ZENTRIX</span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground mb-3 font-display font-medium tracking-tight">
          Custom Built Programming Language
        </p>

        <p className="text-muted-foreground text-sm mb-12">
          Created by{" "}
          <a
            href="https://github.com/Coder-Gaurav997"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline underline-offset-4 transition-colors font-medium"
          >
            Gaurav Pandey
          </a>
        </p>

        <div className="flex gap-3 justify-center flex-wrap">
          <a
            href="#playground"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("playground")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-7 py-3 rounded-full bg-primary text-primary-foreground font-display font-semibold text-sm hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
          >
            Try Playground
          </a>
          <a
            href="#docs"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("docs")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-7 py-3 rounded-full border border-border text-foreground font-display font-semibold text-sm hover:bg-secondary/60 transition-colors"
          >
            Documentation
          </a>
        </div>
      </div>

      {/* Floating code snippet */}
      <div className="relative z-10 mt-20 max-w-md w-full">
        <div className="rounded-2xl border border-border bg-card p-5 glow-box font-mono text-sm">
          <div className="flex gap-1.5 mb-3">
            <div className="w-2.5 h-2.5 rounded-full bg-destructive/50" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
            <div className="w-2.5 h-2.5 rounded-full bg-primary/50" />
          </div>
          <pre className="text-muted-foreground leading-relaxed">
            <span className="text-accent">let</span> name = <span className="text-primary">"Zentrix"</span>;{"\n"}
            <span className="text-accent">echo</span>(<span className="text-primary">"Hello from "</span> + name);
          </pre>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
