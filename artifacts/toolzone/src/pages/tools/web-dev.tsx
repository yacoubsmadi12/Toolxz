import { useState } from "react";
import { ToolPageLayout } from "@/components/Layout/ToolPageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Copy, RefreshCw } from "lucide-react";

function JsonFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const format = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
      setError("");
      toast.success("JSON Formatted!");
    } catch (e: any) {
      setError(e.message);
      toast.error("Invalid JSON");
    }
  };

  const minify = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setError("");
      toast.success("JSON Minified!");
    } catch (e: any) {
      setError(e.message);
      toast.error("Invalid JSON");
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label>Input JSON</Label>
          <Textarea 
            value={input} 
            onChange={e => setInput(e.target.value)} 
            className="min-h-[400px] mt-2 font-mono text-sm bg-black/40"
            placeholder='{"hello": "world"}'
          />
          {error && <div className="text-destructive text-sm mt-2 font-mono">{error}</div>}
        </div>
        
        <div>
          <div className="flex justify-between items-end">
            <Label>Output</Label>
            <div className="flex gap-2">
              <Button size="sm" variant="secondary" onClick={format}>Format</Button>
              <Button size="sm" variant="secondary" onClick={minify}>Minify</Button>
              <Button size="sm" variant="ghost" onClick={() => {
                navigator.clipboard.writeText(output);
                toast.success("Copied!");
              }}><Copy className="w-4 h-4"/></Button>
            </div>
          </div>
          <Textarea 
            value={output} 
            readOnly 
            className="min-h-[400px] mt-2 font-mono text-sm bg-black/60 text-primary"
          />
        </div>
      </div>
    </div>
  );
}

export default function WebDevTools({ active }: { active: string }) {
  return (
    <ToolPageLayout toolId={active}>
      {active === "json-formatter" && <JsonFormatter />}
      {/* Fallback */}
      {active !== "json-formatter" && (
        <div className="text-center py-20 text-muted-foreground">
          Tool implementation coming soon...
        </div>
      )}
    </ToolPageLayout>
  );
}
