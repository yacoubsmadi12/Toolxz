import { useState, useMemo } from "react";
import { ToolPageLayout } from "@/components/Layout/ToolPageLayout";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Copy, Trash2 } from "lucide-react";

function WordCounter() {
  const [text, setText] = useState("");

  const stats = useMemo(() => {
    const trimmed = text.trim();
    const words = trimmed ? trimmed.split(/\s+/).length : 0;
    const chars = text.length;
    const charsNoSpace = text.replace(/\s/g, '').length;
    const sentences = trimmed ? (text.match(/[.!?]+/g) || []).length : 0;
    const paragraphs = trimmed ? text.split(/\n+/).filter(p => p.trim()).length : 0;
    const readingTime = Math.ceil(words / 200);

    return { words, chars, charsNoSpace, sentences, paragraphs, readingTime };
  }, [text]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { label: "Words", value: stats.words },
          { label: "Characters", value: stats.chars },
          { label: "No Spaces", value: stats.charsNoSpace },
          { label: "Sentences", value: stats.sentences },
          { label: "Paragraphs", value: stats.paragraphs },
          { label: "Reading Time", value: `${stats.readingTime}m` },
        ].map(s => (
          <div key={s.label} className="bg-black/30 border border-white/5 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-primary">{s.value}</div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="relative">
        <Textarea 
          value={text} 
          onChange={e => setText(e.target.value)} 
          placeholder="Start typing or paste your text here..."
          className="min-h-[300px] bg-black/40 text-lg p-6"
        />
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setText("")} 
          className="absolute right-2 top-2 text-muted-foreground hover:text-destructive"
          title="Clear"
        >
          <Trash2 className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}

function TextCaseConverter() {
  const [text, setText] = useState("");

  const applyCase = (type: string) => {
    if (!text) return;
    let res = text;
    switch(type) {
      case 'UPPER': res = text.toUpperCase(); break;
      case 'lower': res = text.toLowerCase(); break;
      case 'Title': 
        res = text.toLowerCase().split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
        break;
      case 'Sentence':
        res = text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, c => c.toUpperCase());
        break;
      case 'camelCase':
        res = text.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, c) => c.toUpperCase());
        break;
      case 'snake_case':
        res = text.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)?.map(x => x.toLowerCase()).join('_') || text;
        break;
      case 'kebab-case':
        res = text.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)?.map(x => x.toLowerCase()).join('-') || text;
        break;
    }
    setText(res);
  };

  const cases = [
    { label: 'UPPERCASE', id: 'UPPER' },
    { label: 'lowercase', id: 'lower' },
    { label: 'Title Case', id: 'Title' },
    { label: 'Sentence case', id: 'Sentence' },
    { label: 'camelCase', id: 'camelCase' },
    { label: 'snake_case', id: 'snake_case' },
    { label: 'kebab-case', id: 'kebab-case' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {cases.map(c => (
          <Button key={c.id} variant="secondary" onClick={() => applyCase(c.id)}>
            {c.label}
          </Button>
        ))}
        <Button variant="ghost" onClick={() => setText("")}><Trash2 className="w-4 h-4 mr-2"/> Clear</Button>
      </div>

      <div className="relative">
        <Textarea 
          value={text} 
          onChange={e => setText(e.target.value)} 
          placeholder="Enter text to convert..."
          className="min-h-[300px] bg-black/40 text-lg p-6"
        />
        <Button 
          variant="secondary" 
          size="icon" 
          onClick={() => { navigator.clipboard.writeText(text); toast.success("Copied!"); }} 
          className="absolute right-4 bottom-4"
        >
          <Copy className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}

// Will add others here...

export default function TextTools({ active }: { active: string }) {
  return (
    <ToolPageLayout toolId={active}>
      {active === "word-counter" && <WordCounter />}
      {active === "text-case-converter" && <TextCaseConverter />}
      {/* Fallback for unbuilt tools */}
      {!["word-counter", "text-case-converter"].includes(active) && (
        <div className="text-center py-20 text-muted-foreground">
          Tool implementation coming soon...
        </div>
      )}
    </ToolPageLayout>
  );
}
