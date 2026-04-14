import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import AboutZentrix from "@/components/AboutZentrix";
import HeroSection from "@/components/HeroSection";
import Playground from "@/components/Playground";
import Documentation from "@/components/Documentation";

const Index = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <main className="min-h-screen">
      {/* Theme toggle — top left */}
      <button
        onClick={toggleTheme}
        className="fixed top-5 left-5 z-50 w-10 h-10 flex items-center justify-center rounded-full border border-border bg-card/80 backdrop-blur-sm text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all shadow-md"
        aria-label="Toggle theme"
      >
        {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
      </button>

      {/* About — top right */}
      <div className="fixed top-5 right-5 z-50">
        <AboutZentrix />
      </div>

      <HeroSection />
      <Playground />
      <Documentation />

      <footer className="py-10 text-center text-sm text-muted-foreground border-t border-border">
        ZENTRIX v1.0 — Built with ❤️ by{" "}
        <a
          href="https://github.com/Coder-Gaurav997"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          Gaurav Pandey
        </a>
      </footer>
    </main>
  );
};

export default Index;
