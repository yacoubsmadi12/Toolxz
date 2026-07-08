import { useState, useMemo, useCallback } from "react";
import { ToolPageLayout } from "@/components/Layout/ToolPageLayout";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import { Copy, Trash2 } from "lucide-react";

// ─── Word Counter ──────────────────────────────────────────────────────────────
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
          { label: "Reading Time", value: stats.readingTime + "m" },
        ].map(s => (
          <div key={s.label} className="bg-black/30 border border-white/5 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-primary">{s.value}</div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider">{s.label}</div>
          </div>
        ))}
      </div>
      <div className="relative">
        <Textarea value={text} onChange={e => setText(e.target.value)} placeholder="Start typing or paste your text here..." className="min-h-[300px] bg-black/40 text-lg p-6" />
        <Button variant="ghost" size="icon" onClick={() => setText("")} className="absolute right-2 top-2 text-muted-foreground hover:text-destructive"><Trash2 className="w-5 h-5" /></Button>
      </div>
    </div>
  );
}

// ─── Character Counter ─────────────────────────────────────────────────────────
function CharacterCounter() {
  const [text, setText] = useState("");
  const stats = useMemo(() => {
    const chars = text.length;
    const charsNoSpace = text.replace(/\s/g, '').length;
    const trimmed = text.trim();
    const words = trimmed ? trimmed.split(/\s+/).length : 0;
    const lines = text === "" ? 0 : text.split(/\n/).length;
    return { chars, charsNoSpace, words, lines };
  }, [text]);
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Characters", value: stats.chars },
          { label: "No Spaces", value: stats.charsNoSpace },
          { label: "Words", value: stats.words },
          { label: "Lines", value: stats.lines },
        ].map(s => (
          <div key={s.label} className="bg-black/30 border border-white/5 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold font-mono text-primary">{s.value}</div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">{s.label}</div>
          </div>
        ))}
      </div>
      <div className="relative">
        <Textarea value={text} onChange={e => setText(e.target.value)} placeholder="Type or paste your text here..." className="min-h-[300px] bg-black/40 text-lg p-6" />
        <Button variant="ghost" size="icon" onClick={() => setText("")} className="absolute right-2 top-2 text-muted-foreground hover:text-destructive"><Trash2 className="w-5 h-5" /></Button>
      </div>
    </div>
  );
}

// ─── Text Case Converter ───────────────────────────────────────────────────────
function TextCaseConverter() {
  const [text, setText] = useState("");
  const applyCase = (type: string) => {
    if (!text) return;
    let res = text;
    switch(type) {
      case 'UPPER': res = text.toUpperCase(); break;
      case 'lower': res = text.toLowerCase(); break;
      case 'Title': res = text.toLowerCase().split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '); break;
      case 'Sentence': res = text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, c => c.toUpperCase()); break;
      case 'camelCase': res = text.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, c) => c.toUpperCase()); break;
      case 'snake_case': res = text.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)?.map(x => x.toLowerCase()).join('_') || text; break;
      case 'kebab-case': res = text.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)?.map(x => x.toLowerCase()).join('-') || text; break;
    }
    setText(res);
  };
  const cases = [
    { label: 'UPPERCASE', id: 'UPPER' }, { label: 'lowercase', id: 'lower' },
    { label: 'Title Case', id: 'Title' }, { label: 'Sentence case', id: 'Sentence' },
    { label: 'camelCase', id: 'camelCase' }, { label: 'snake_case', id: 'snake_case' },
    { label: 'kebab-case', id: 'kebab-case' },
  ];
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {cases.map(c => <Button key={c.id} variant="secondary" onClick={() => applyCase(c.id)}>{c.label}</Button>)}
        <Button variant="ghost" onClick={() => setText("")}><Trash2 className="w-4 h-4 mr-2"/> Clear</Button>
      </div>
      <div className="relative">
        <Textarea value={text} onChange={e => setText(e.target.value)} placeholder="Enter text to convert..." className="min-h-[300px] bg-black/40 text-lg p-6" />
        <Button variant="secondary" size="icon" onClick={() => { navigator.clipboard.writeText(text); toast.success("Copied!"); }} className="absolute right-4 bottom-4"><Copy className="w-4 h-4" /></Button>
      </div>
    </div>
  );
}

// ─── Lorem Ipsum ──────────────────────────────────────────────────────────────
const LOREM_PARAGRAPHS = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
  "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.",
  "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.",
  "Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.",
  "Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae itaque earum rerum hic tenetur a sapiente delectus.",
  "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur et harum quidem rerum facilis.",
  "Ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat. Nulla facilisi. Aenean nec eros. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.",
  "Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus.",
];

function LoremIpsum() {
  const [count, setCount] = useState(3);
  const [result, setResult] = useState("");
  const generate = () => {
    const paras = Array.from({ length: count }, (_, i) => LOREM_PARAGRAPHS[i % LOREM_PARAGRAPHS.length]);
    setResult(paras.join("\n\n"));
  };
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-base">Paragraphs: <span className="text-primary font-bold font-mono">{count}</span></Label>
        </div>
        <Slider min={1} max={10} step={1} value={[count]} onValueChange={([v]) => setCount(v)} className="w-full" />
      </div>
      <Button className="primary-gradient" onClick={generate}>Generate Lorem Ipsum</Button>
      {result && (
        <div className="relative">
          <Textarea value={result} readOnly className="min-h-[300px] bg-black/40 text-base p-6" />
          <Button variant="secondary" size="icon" onClick={() => { navigator.clipboard.writeText(result); toast.success("Copied!"); }} className="absolute right-4 bottom-4"><Copy className="w-4 h-4" /></Button>
        </div>
      )}
    </div>
  );
}

// ─── Text Reverser ────────────────────────────────────────────────────────────
function TextReverser() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const reverseChars = () => setOutput(input.split("").reverse().join(""));
  const reverseWords = () => setOutput(input.split(/\s+/).reverse().join(" "));
  return (
    <div className="space-y-6">
      <div>
        <Label className="text-sm text-muted-foreground mb-2 block">Input Text</Label>
        <Textarea value={input} onChange={e => setInput(e.target.value)} placeholder="Enter text to reverse..." className="min-h-[150px] bg-black/40 text-base p-4" />
      </div>
      <div className="flex gap-3 flex-wrap">
        <Button className="primary-gradient" onClick={reverseChars}>Reverse Characters</Button>
        <Button variant="secondary" onClick={reverseWords}>Reverse Words</Button>
        <Button variant="ghost" onClick={() => { setInput(""); setOutput(""); }}><Trash2 className="w-4 h-4 mr-2"/>Clear</Button>
      </div>
      {output && (
        <div>
          <Label className="text-sm text-muted-foreground mb-2 block">Result</Label>
          <div className="relative">
            <Textarea value={output} readOnly className="min-h-[150px] bg-black/40 text-base p-4" />
            <Button variant="secondary" size="icon" onClick={() => { navigator.clipboard.writeText(output); toast.success("Copied!"); }} className="absolute right-4 bottom-4"><Copy className="w-4 h-4" /></Button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Duplicate Line Remover ───────────────────────────────────────────────────
function DuplicateLineRemover() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [removed, setRemoved] = useState<number | null>(null);
  const removeDuplicates = () => {
    const lines = input.split("\n");
    const unique = [...new Set(lines)];
    setRemoved(lines.length - unique.length);
    setOutput(unique.join("\n"));
  };
  return (
    <div className="space-y-6">
      <div>
        <Label className="text-sm text-muted-foreground mb-2 block">Input (one item per line)</Label>
        <Textarea value={input} onChange={e => setInput(e.target.value)} placeholder="Paste lines here..." className="min-h-[200px] bg-black/40 text-base p-4" />
      </div>
      <div className="flex items-center gap-4 flex-wrap">
        <Button className="primary-gradient" onClick={removeDuplicates}>Remove Duplicates</Button>
        {removed !== null && (
          <span className="bg-black/30 border border-white/10 text-primary font-mono text-sm px-3 py-1 rounded-full">
            {removed} line{removed !== 1 ? "s" : ""} removed
          </span>
        )}
      </div>
      {output && (
        <div>
          <Label className="text-sm text-muted-foreground mb-2 block">Result</Label>
          <div className="relative">
            <Textarea value={output} readOnly className="min-h-[200px] bg-black/40 text-base p-4" />
            <Button variant="secondary" size="icon" onClick={() => { navigator.clipboard.writeText(output); toast.success("Copied!"); }} className="absolute right-4 bottom-4"><Copy className="w-4 h-4" /></Button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Text Sorter ──────────────────────────────────────────────────────────────
function TextSorter() {
  const [text, setText] = useState("");
  const sort = (type: string) => {
    const lines = text.split("\n");
    let sorted: string[];
    switch (type) {
      case "az": sorted = [...lines].sort((a, b) => a.localeCompare(b)); break;
      case "za": sorted = [...lines].sort((a, b) => b.localeCompare(a)); break;
      case "shortest": sorted = [...lines].sort((a, b) => a.length - b.length); break;
      case "longest": sorted = [...lines].sort((a, b) => b.length - a.length); break;
      default: sorted = lines;
    }
    setText(sorted.join("\n"));
  };
  return (
    <div className="space-y-6">
      <div className="flex gap-2 flex-wrap">
        <Button variant="secondary" onClick={() => sort("az")}>A → Z</Button>
        <Button variant="secondary" onClick={() => sort("za")}>Z → A</Button>
        <Button variant="secondary" onClick={() => sort("shortest")}>Shortest First</Button>
        <Button variant="secondary" onClick={() => sort("longest")}>Longest First</Button>
        <Button variant="ghost" onClick={() => setText("")}><Trash2 className="w-4 h-4 mr-2"/>Clear</Button>
      </div>
      <div className="relative">
        <Textarea value={text} onChange={e => setText(e.target.value)} placeholder="Enter lines to sort (one per line)..." className="min-h-[300px] bg-black/40 text-base p-4" />
        <Button variant="secondary" size="icon" onClick={() => { navigator.clipboard.writeText(text); toast.success("Copied!"); }} className="absolute right-4 bottom-4"><Copy className="w-4 h-4" /></Button>
      </div>
    </div>
  );
}

// ─── Whitespace Remover ───────────────────────────────────────────────────────
function WhitespaceRemover() {
  const [text, setText] = useState("");
  const apply = (type: string) => {
    let res = text;
    switch (type) {
      case "trim": res = text.split("\n").map(l => l.trim()).join("\n"); break;
      case "extra": res = text.replace(/[ \t]+/g, " "); break;
      case "all": res = text.replace(/\s/g, ""); break;
      case "blank": res = text.split("\n").filter(l => l.trim() !== "").join("\n"); break;
    }
    setText(res);
  };
  return (
    <div className="space-y-6">
      <div className="flex gap-2 flex-wrap">
        <Button variant="secondary" onClick={() => apply("trim")}>Trim Lines</Button>
        <Button variant="secondary" onClick={() => apply("extra")}>Remove Extra Spaces</Button>
        <Button variant="secondary" onClick={() => apply("all")}>Remove All Spaces</Button>
        <Button variant="secondary" onClick={() => apply("blank")}>Remove Blank Lines</Button>
        <Button variant="ghost" onClick={() => setText("")}><Trash2 className="w-4 h-4 mr-2"/>Clear</Button>
      </div>
      <div className="relative">
        <Textarea value={text} onChange={e => setText(e.target.value)} placeholder="Paste your text here..." className="min-h-[300px] bg-black/40 text-base p-4" />
        <Button variant="secondary" size="icon" onClick={() => { navigator.clipboard.writeText(text); toast.success("Copied!"); }} className="absolute right-4 bottom-4"><Copy className="w-4 h-4" /></Button>
      </div>
    </div>
  );
}

// ─── Find & Replace ───────────────────────────────────────────────────────────
function FindReplace() {
  const [find, setFind] = useState("");
  const [replace, setReplace] = useState("");
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [count, setCount] = useState<number | null>(null);
  const doReplace = () => {
    if (!find) return;
    let n = 0;
    const escaped = find.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(escaped, "g");
    const replaced = text.replace(regex, () => { n++; return replace; });
    setResult(replaced);
    setCount(n);
  };
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Find</Label>
          <Input value={find} onChange={e => setFind(e.target.value)} placeholder="Text to find..." className="bg-black/40" />
        </div>
        <div className="space-y-2">
          <Label>Replace with</Label>
          <Input value={replace} onChange={e => setReplace(e.target.value)} placeholder="Replacement text..." className="bg-black/40" />
        </div>
      </div>
      <div>
        <Label className="text-sm text-muted-foreground mb-2 block">Input Text</Label>
        <Textarea value={text} onChange={e => setText(e.target.value)} placeholder="Paste your text here..." className="min-h-[180px] bg-black/40 text-base p-4" />
      </div>
      <div className="flex items-center gap-4 flex-wrap">
        <Button className="primary-gradient" onClick={doReplace}>Replace All</Button>
        {count !== null && (
          <span className="bg-black/30 border border-white/10 text-primary font-mono text-sm px-3 py-1 rounded-full">
            {count} replacement{count !== 1 ? "s" : ""} made
          </span>
        )}
      </div>
      {result && (
        <div>
          <Label className="text-sm text-muted-foreground mb-2 block">Result</Label>
          <div className="relative">
            <Textarea value={result} readOnly className="min-h-[180px] bg-black/40 text-base p-4" />
            <Button variant="secondary" size="icon" onClick={() => { navigator.clipboard.writeText(result); toast.success("Copied!"); }} className="absolute right-4 bottom-4"><Copy className="w-4 h-4" /></Button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Morse Code ───────────────────────────────────────────────────────────────
const MORSE_MAP: Record<string, string> = {
  A:".-", B:"-...", C:"-.-.", D:"-..", E:".", F:"..-.", G:"--.", H:"....", I:"..",
  J:".---", K:"-.-", L:".-..", M:"--", N:"-.", O:"---", P:".--.", Q:"--.-", R:".-.",
  S:"...", T:"-", U:"..-", V:"...-", W:".--", X:"-..-", Y:"-.--", Z:"--..",
  "0":"-----","1":".----","2":"..---","3":"...--","4":"....-","5":".....",
  "6":"-....","7":"--...","8":"---..","9":"----.",
  ".":".-.-.-", ",":"--..--", "?":"..--..", "'":".----.", "!":"-.-.--",
  "/":"-..-.", "(":"-.--.", ")":"-.--.-", "&":".-...", ":":"---...", ";":"-.-.-.",
  "=":"-...-", "+":".-.-.", "-":"-....-", "_":"..--.-", "\"":".-..-.", "$":"...-..-",
  "@":".--.-.",
};
const REVERSE_MORSE: Record<string, string> = Object.fromEntries(
  Object.entries(MORSE_MAP).map(([k, v]) => [v, k])
);

function MorseCode() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const toMorse = () => {
    const res = input.toUpperCase().split("").map(ch => {
      if (ch === " ") return "/";
      return MORSE_MAP[ch] || ch;
    }).join(" ");
    setOutput(res);
  };
  const fromMorse = () => {
    const res = input.trim().split(" / ").map(word =>
      word.split(" ").map(code => REVERSE_MORSE[code] || code).join("")
    ).join(" ");
    setOutput(res);
  };
  return (
    <div className="space-y-6">
      <div>
        <Label className="text-sm text-muted-foreground mb-2 block">Input</Label>
        <Textarea value={input} onChange={e => setInput(e.target.value)} placeholder="Enter text or morse code..." className="min-h-[150px] bg-black/40 text-base p-4 font-mono" />
      </div>
      <div className="flex gap-3 flex-wrap">
        <Button className="primary-gradient" onClick={toMorse}>Text → Morse</Button>
        <Button variant="secondary" onClick={fromMorse}>Morse → Text</Button>
        <Button variant="ghost" onClick={() => { setInput(""); setOutput(""); }}><Trash2 className="w-4 h-4 mr-2"/>Clear</Button>
      </div>
      {output && (
        <div>
          <Label className="text-sm text-muted-foreground mb-2 block">Result</Label>
          <div className="relative">
            <Textarea value={output} readOnly className="min-h-[150px] bg-black/40 text-base p-4 font-mono" />
            <Button variant="secondary" size="icon" onClick={() => { navigator.clipboard.writeText(output); toast.success("Copied!"); }} className="absolute right-4 bottom-4"><Copy className="w-4 h-4" /></Button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── ROT13 ────────────────────────────────────────────────────────────────────
function rot13Transform(str: string): string {
  return str.replace(/[a-zA-Z]/g, c => {
    const base = c <= 'Z' ? 65 : 97;
    return String.fromCharCode(((c.charCodeAt(0) - base + 13) % 26) + base);
  });
}

function Rot13() {
  const [text, setText] = useState("");
  const apply = () => setText(rot13Transform(text));
  return (
    <div className="space-y-6">
      <div className="flex gap-3 flex-wrap">
        <Button className="primary-gradient" onClick={apply}>Apply ROT13</Button>
        <Button variant="ghost" onClick={() => setText("")}><Trash2 className="w-4 h-4 mr-2"/>Clear</Button>
      </div>
      <div className="relative">
        <Textarea value={text} onChange={e => setText(e.target.value)} placeholder="Enter text to encode/decode with ROT13..." className="min-h-[300px] bg-black/40 text-base p-4 font-mono" />
        <Button variant="secondary" size="icon" onClick={() => { navigator.clipboard.writeText(text); toast.success("Copied!"); }} className="absolute right-4 bottom-4"><Copy className="w-4 h-4" /></Button>
      </div>
      <p className="text-xs text-muted-foreground">ROT13 is its own inverse — applying it twice returns the original text.</p>
    </div>
  );
}

// ─── Caesar Cipher ────────────────────────────────────────────────────────────
function CaesarCipher() {
  const [input, setInput] = useState("");
  const [shift, setShift] = useState(3);
  const [output, setOutput] = useState("");
  const caesar = (text: string, n: number) =>
    text.replace(/[a-zA-Z]/g, c => {
      const base = c <= 'Z' ? 65 : 97;
      return String.fromCharCode(((c.charCodeAt(0) - base + n + 26) % 26) + base);
    });
  const encode = () => setOutput(caesar(input, shift));
  const decode = () => setOutput(caesar(input, -shift));
  return (
    <div className="space-y-6">
      <div className="space-y-2 max-w-xs">
        <Label>Shift Amount: <span className="text-primary font-mono font-bold">{shift}</span></Label>
        <div className="flex items-center gap-3">
          <Input
            type="number" min={1} max={25} value={shift}
            onChange={e => setShift(Math.min(25, Math.max(1, parseInt(e.target.value) || 1)))}
            className="bg-black/40 w-24 font-mono"
          />
        </div>
      </div>
      <div>
        <Label className="text-sm text-muted-foreground mb-2 block">Input Text</Label>
        <Textarea value={input} onChange={e => setInput(e.target.value)} placeholder="Enter text to encode or decode..." className="min-h-[150px] bg-black/40 text-base p-4" />
      </div>
      <div className="flex gap-3 flex-wrap">
        <Button className="primary-gradient" onClick={encode}>Encode</Button>
        <Button variant="secondary" onClick={decode}>Decode</Button>
        <Button variant="ghost" onClick={() => { setInput(""); setOutput(""); }}><Trash2 className="w-4 h-4 mr-2"/>Clear</Button>
      </div>
      {output && (
        <div>
          <Label className="text-sm text-muted-foreground mb-2 block">Result</Label>
          <div className="relative">
            <Textarea value={output} readOnly className="min-h-[150px] bg-black/40 text-base p-4 font-mono" />
            <Button variant="secondary" size="icon" onClick={() => { navigator.clipboard.writeText(output); toast.success("Copied!"); }} className="absolute right-4 bottom-4"><Copy className="w-4 h-4" /></Button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Slug Generator ───────────────────────────────────────────────────────────
function SlugGenerator() {
  const [input, setInput] = useState("");
  const slug = useMemo(() =>
    input
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/[\s-]+/g, "-"),
    [input]
  );
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Input Text</Label>
        <Input value={input} onChange={e => setInput(e.target.value)} placeholder="Enter your page title or text..." className="bg-black/40 text-base h-12" />
      </div>
      {input && (
        <div className="bg-black/30 border border-white/5 rounded-xl p-6">
          <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Generated Slug</div>
          <div className="flex items-center justify-between gap-4">
            <code className="text-primary font-mono text-lg break-all">{slug}</code>
            <Button variant="secondary" size="icon" onClick={() => { navigator.clipboard.writeText(slug); toast.success("Copied!"); }} className="shrink-0"><Copy className="w-4 h-4" /></Button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Fancy Text ───────────────────────────────────────────────────────────────
function toUnicodeVariant(str: string, variant: string): string {
  const bold = "𝗮𝗯𝗰𝗱𝗲𝗳𝗴𝗵𝗶𝗷𝗸𝗹𝗺𝗻𝗼𝗽𝗾𝗿𝘀𝘁𝘂𝘃𝘄𝘅𝘆𝘇𝗔𝗕𝗖𝗗𝗘𝗙𝗚𝗛𝗜𝗝𝗞𝗟𝗠𝗡𝗢𝗣𝗤𝗥𝗦𝗧𝗨𝗩𝗪𝗫𝗬𝗭";
  const italic = "𝘢𝘣𝘤𝘥𝘦𝘧𝘨𝘩𝘪𝘫𝘬𝘭𝘮𝘯𝘰𝘱𝘲𝘳𝘴𝘵𝘶𝘷𝘸𝘹𝘺𝘻𝘈𝘉𝘊𝘋𝘌𝘍𝘎𝘏𝘐𝘑𝘒𝘓𝘔𝘕𝘖𝘗𝘘𝘙𝘚𝘛𝘜𝘝𝘞𝘟𝘠𝘡";
  const boldItalic = "𝙖𝙗𝙘𝙙𝙚𝙛𝙜𝙝𝙞𝙟𝙠𝙡𝙢𝙣𝙤𝙥𝙦𝙧𝙨𝙩𝙪𝙫𝙬𝙭𝙮𝙯𝘼𝘽𝘾𝘿𝙀𝙁𝙂𝙃𝙄𝙅𝙆𝙇𝙈𝙉𝙊𝙋𝙌𝙍𝙎𝙏𝙐𝙑𝙒𝙓𝙔𝙕";
  const script = "𝒶𝒷𝒸𝒹𝑒𝒻𝑔𝒽𝒾𝒿𝓀𝓁𝓂𝓃𝑜𝓅𝓆𝓇𝓈𝓉𝓊𝓋𝓌𝓍𝓎𝓏𝒜𝐵𝒞𝒟𝐸𝐹𝒢𝐻𝐼𝒥𝒦𝐿𝑀𝒩𝒪𝒫𝒬𝑅𝒮𝒯𝒰𝒱𝒲𝒳𝒴𝒵";
  const doubleStruck = "𝕒𝕓𝕔𝕕𝕖𝕗𝕘𝕙𝕚𝕛𝕜𝕝𝕞𝕟𝕠𝕡𝕢𝕣𝕤𝕥𝕦𝕧𝕨𝕩𝕪𝕫𝔸𝔹ℂ𝔻𝔼𝔽𝔾ℍ𝕀𝕁𝕂𝕃𝕄ℕ𝕆ℙℚℝ𝕊𝕋𝕌𝕍𝕎𝕏𝕐ℤ";
  const mono = "𝚊𝚋𝚌𝚍𝚎𝚏𝚐𝚑𝚒𝚓𝚔𝚕𝚖𝚗𝚘𝚙𝚚𝚛𝚜𝚝𝚞𝚟𝚠𝚡𝚢𝚣𝙰𝙱𝙲𝙳𝙴𝙵𝙶𝙷𝙸𝙹𝙺𝙻𝙼𝙽𝙾𝙿𝚀𝚁𝚂𝚃𝚄𝚅𝚆𝚇𝚈𝚉";

  const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const maps: Record<string, string> = { bold, italic, boldItalic, script, doubleStruck, mono };
  const map = maps[variant];
  if (!map) return str;

  return str.split("").map(c => {
    const idx = alphabet.indexOf(c);
    if (idx === -1) return c;
    return [...map][idx] ?? c;
  }).join("");
}

function FancyText() {
  const [input, setInput] = useState("");
  const variants = [
    { label: "Bold", key: "bold" },
    { label: "Italic", key: "italic" },
    { label: "Bold Italic", key: "boldItalic" },
    { label: "Script", key: "script" },
    { label: "Double-Struck", key: "doubleStruck" },
    { label: "Monospace", key: "mono" },
  ];
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Input Text</Label>
        <Input value={input} onChange={e => setInput(e.target.value)} placeholder="Type something to see fancy variants..." className="bg-black/40 text-base h-12" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {variants.map(v => {
          const fancy = toUnicodeVariant(input, v.key);
          return (
            <div key={v.key} className="bg-black/30 border border-white/5 rounded-xl p-4">
              <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2">{v.label}</div>
              <div className="flex items-center justify-between gap-3">
                <span className="text-lg text-primary break-all flex-1 min-w-0">{fancy || <span className="text-muted-foreground italic text-sm">preview here</span>}</span>
                <Button variant="secondary" size="icon" onClick={() => { navigator.clipboard.writeText(fancy); toast.success("Copied!"); }} className="shrink-0"><Copy className="w-4 h-4" /></Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Export ────────────────────────────────────────────────────────────────────
export default function TextTools({ active }: { active: string }) {
  return (
    <ToolPageLayout toolId={active}>
      {active === "word-counter" && <WordCounter />}
      {active === "character-counter" && <CharacterCounter />}
      {active === "text-case-converter" && <TextCaseConverter />}
      {active === "lorem-ipsum" && <LoremIpsum />}
      {active === "text-reverser" && <TextReverser />}
      {active === "duplicate-line-remover" && <DuplicateLineRemover />}
      {active === "text-sorter" && <TextSorter />}
      {active === "whitespace-remover" && <WhitespaceRemover />}
      {active === "find-replace" && <FindReplace />}
      {active === "morse-code" && <MorseCode />}
      {active === "rot13" && <Rot13 />}
      {active === "caesar-cipher" && <CaesarCipher />}
      {active === "slug-generator" && <SlugGenerator />}
      {active === "fancy-text" && <FancyText />}
    </ToolPageLayout>
  );
}
