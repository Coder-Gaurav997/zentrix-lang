import { Terminal, ArrowUpRight, Sparkles, Cpu, Github } from "lucide-react";

const HeroSection = () => {
  const scrollTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative px-4 pt-28 pb-20 md:pt-32">
      {/* Ambient background */}
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
      <div className="absolute top-40 left-1/3 w-[420px] h-[420px] rounded-full bg-primary/10 blur-[120px] animate-pulse-glow pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[300px] h-[300px] rounded-full bg-accent/10 blur-[100px] animate-pulse-glow pointer-events-none" style={{ animationDelay: "1.5s" }} />

      <div className="relative max-w-6xl mx-auto">
        {/* Eyebrow */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-mono tracking-[0.2em] text-primary uppercase">v1.0 · live</span>
          </div>
        </div>

        {/* Massive headline */}
        <h1 className="text-center font-display font-bold tracking-tighter leading-[0.85] mb-6">
          <span className="block text-[clamp(3.5rem,12vw,11rem)] gradient-text">Zentrix</span>
          <span className="block text-[clamp(1rem,2.4vw,2rem)] font-medium text-muted-foreground tracking-tight mt-4 font-body">
            a programming language, hand-built in Python
          </span>
        </h1>

        {/* CTAs */}
        <div className="flex gap-3 justify-center flex-wrap mb-14">
          <a
            href="#playground"
            onClick={scrollTo("playground")}
            className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-primary text-primary-foreground font-display font-semibold text-sm hover:gap-3 transition-all shadow-lg shadow-primary/30"
          >
            Try the Playground
            <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform" />
          </a>
          <a
            href="#docs"
            onClick={scrollTo("docs")}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-border bg-card/40 backdrop-blur-sm text-foreground font-display font-semibold text-sm hover:border-primary/50 hover:bg-card transition-all"
          >
            Read the Docs
          </a>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-6 grid-rows-[auto] gap-4 md:gap-5">
          {/* Code preview — wide */}
          <div className="col-span-6 md:col-span-4 bento-tile p-6 glow-box">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
                <Terminal className="w-3.5 h-3.5" />
                hello.zx
              </div>
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-destructive/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-primary/70" />
              </div>
            </div>
            <pre className="font-mono text-[13px] md:text-sm leading-relaxed text-muted-foreground">
<span className="text-accent">let</span> name = <span className="text-primary">"Zentrix"</span>;{"\n"}
<span className="text-accent">echo</span>(<span className="text-primary">"Hello from "</span> + name);{"\n"}{"\n"}
<span className="text-accent">for</span> (i <span className="text-accent">in</span> 1 <span className="text-accent">to</span> 4) {"{"}
{"\n"}  <span className="text-accent">echo</span>(<span className="text-primary">"loop "</span> + i);{"\n"}
{"}"}
            </pre>
          </div>

          {/* Built-by tile */}
          <div className="col-span-3 md:col-span-2 bento-tile p-6 flex flex-col justify-between bg-gradient-to-br from-primary/10 via-card to-card">
            <Sparkles className="w-6 h-6 text-primary" />
            <div>
              <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-muted-foreground mb-1">Created by</div>
              <a
                href="https://github.com/Coder-Gaurav997"
                target="_blank"
                rel="noopener noreferrer"
                className="font-display font-bold text-xl text-foreground hover:text-primary transition-colors inline-flex items-center gap-1"
              >
                Gaurav Pandey <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Stat: Python */}
          <div className="col-span-3 md:col-span-2 bento-tile p-6">
            <Cpu className="w-5 h-5 text-accent mb-3" />
            <div className="font-display font-bold text-4xl text-foreground">100%</div>
            <div className="text-sm text-muted-foreground mt-1">Written in pure Python — lexer, parser, interpreter.</div>
          </div>

          {/* Features count */}
          <div className="col-span-3 md:col-span-2 bento-tile p-6 bg-gradient-to-br from-accent/10 to-transparent">
            <div className="font-display font-bold text-4xl text-foreground">9+</div>
            <div className="text-sm text-muted-foreground mt-1">Core language features: loops, conditionals, I/O, arithmetic & more.</div>
          </div>

          {/* Repo CTA */}
          <a
            href="https://github.com/Coder-Gaurav997/Zentrix-Programming-Langauge"
            target="_blank"
            rel="noopener noreferrer"
            className="col-span-6 md:col-span-2 bento-tile p-6 group bg-foreground text-background hover:bg-primary hover:text-primary-foreground transition-colors flex flex-col justify-between"
          >
            <Github className="w-6 h-6" />
            <div>
              <div className="font-display font-bold text-lg leading-tight">Open Source on GitHub</div>
              <div className="text-xs opacity-70 mt-1 inline-flex items-center gap-1">
                Star the repo <ArrowUpRight className="w-3 h-3 group-hover:rotate-45 transition-transform" />
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
