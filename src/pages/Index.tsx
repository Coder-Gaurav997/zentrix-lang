import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import AboutZentrix from "@/components/AboutZentrix";
import HeroSection from "@/components/HeroSection";
import Playground from "@/components/Playground";
import Documentation from "@/components/Documentation";

const Index = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <main className="min-h-screen relative">
      {/* Floating top bar */}
      <header className="fixed top-4 inset-x-4 z-50 flex items-center justify-between">
        <button
          onClick={toggleTheme}
          className="w-11 h-11 flex items-center justify-center rounded-full border border-border bg-card/70 backdrop-blur-md text-muted-foreground hover:text-primary hover:border-primary/50 transition-all shadow-lg"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card/70 backdrop-blur-md font-display font-bold text-sm tracking-wider">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          ZENTRIX<span className="text-muted-foreground font-normal">/lang</span>
        </div>

        <AboutZentrix />
      </header>

      <HeroSection />
      <Playground />
      <Documentation />

      <footer className="mt-12 border-t border-border">
        <div className="max-w-6xl mx-auto px-4 py-10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <div className="font-display font-bold tracking-wider">
            ZENTRIX <span className="text-muted-foreground font-normal">— v1.0</span>
          </div>
          <div className="text-muted-foreground">
            Crafted by{" "}
            <a
              href="https://github.com/Coder-Gaurav997"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline underline-offset-4 font-semibold"
            >
              Gaurav Pandey
            </a>
          </div>
          <a
            href="https://github.com/Coder-Gaurav997/Zentrix-Programming-Langauge"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            github.com/Coder-Gaurav997
          </a>
        </div>
      </footer>
    </main>
  );
};

export default Index;
