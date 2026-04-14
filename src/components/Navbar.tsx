import { useState, useEffect } from "react";
import { Sun, Moon, Terminal } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import AboutZentrix from "./AboutZentrix";
const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-card/80 backdrop-blur-lg border-b border-border shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2 group"
        >
          <Terminal className="w-5 h-5 text-primary" />
          <span className="font-display font-bold text-foreground text-lg tracking-tight">
            ZENTRIX
          </span>
        </button>

        {/* Nav links */}
        <div className="hidden sm:flex items-center gap-1">
          {[
            { label: "Playground", id: "playground" },
            { label: "Docs", id: "docs" },
          ].map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="px-3 py-1.5 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
            >
              {link.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1">
          <AboutZentrix />

          {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="relative w-9 h-9 flex items-center justify-center rounded-lg border border-border bg-secondary/50 text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? (
            <Sun className="w-4 h-4" />
          ) : (
            <Moon className="w-4 h-4" />
          )}
        </button>
        </div>
    </nav>
  );
};

export default Navbar;
