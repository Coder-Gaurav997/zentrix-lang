import { useState } from "react";
import { Play, Trash2 } from "lucide-react";
import { runZentrix } from "@/lib/zentrix";

const DEFAULT_CODE = `let x = 10;
let y = 20;
let sum = x + y;
echo("Sum: " + sum);

for (i in 1 to 6) {
  echo(i);
}`;

const Playground = () => {
  const [code, setCode] = useState(DEFAULT_CODE);
  const [output, setOutput] = useState<string[]>([]);
  const [error, setError] = useState("");

  const handleRun = () => {
    setError("");
    try {
      const result = runZentrix(code);
      setOutput(result);
    } catch (e: unknown) {
      setError((e as Error).message);
      setOutput([]);
    }
  };

  const handleClear = () => {
    setCode("");
    setOutput([]);
    setError("");
  };

  return (
    <section id="playground" className="py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-2 gradient-text">
          Playground
        </h2>
        <p className="text-center text-muted-foreground mb-10">
          Write and run Zentrix code right in your browser
        </p>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Editor */}
          <div className="rounded-xl border border-border bg-card overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-border">
              <span className="text-sm font-mono text-muted-foreground">test.zx</span>
              <div className="flex gap-2">
                <button
                  onClick={handleRun}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  <Play className="w-3.5 h-3.5" /> Run
                </button>
                <button
                  onClick={handleClear}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-border text-muted-foreground text-sm hover:bg-secondary transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Clear
                </button>
              </div>
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-72 p-4 bg-code-bg text-foreground font-mono text-sm resize-none focus:outline-none"
              spellCheck={false}
              placeholder="// Write your Zentrix code here..."
            />
          </div>

          {/* Output */}
          <div className="rounded-xl border border-border bg-card overflow-hidden">
            <div className="px-4 py-3 border-b border-border">
              <span className="text-sm font-mono text-muted-foreground">Output</span>
            </div>
            <div className="h-72 p-4 bg-code-bg font-mono text-sm overflow-auto">
              {error ? (
                <p className="text-destructive">{error}</p>
              ) : output.length > 0 ? (
                output.map((line, i) => (
                  <div key={i} className="text-primary">{line}</div>
                ))
              ) : (
                <p className="text-muted-foreground italic">Run your code to see output...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Playground;
