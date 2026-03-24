import HeroSection from "@/components/HeroSection";
import Playground from "@/components/Playground";
import Documentation from "@/components/Documentation";
import AboutZentrix from "@/components/AboutZentrix";

const Index = () => {
  return (
    <main className="min-h-screen">
      <AboutZentrix />
      <HeroSection />
      <Playground />
      <Documentation />
      <footer className="py-8 text-center text-sm text-muted-foreground border-t border-border">
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
