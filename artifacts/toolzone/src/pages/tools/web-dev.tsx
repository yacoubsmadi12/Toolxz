import { useState, useEffect, useCallback, useRef } from "react";
import { ToolPageLayout } from "@/components/Layout/ToolPageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Copy, RefreshCw, Download } from "lucide-react";

// ─── helpers ────────────────────────────────────────────────────────────────
function copyText(text: string) {
  navigator.clipboard.writeText(text);
  toast.success("Copied!");
}

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) }
    : null;
}

function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

function hslToHex(h: number, s: number, l: number): string {
  s /= 100; l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

// ─── JsonFormatter ──────────────────────────────────────────────────────────
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
              <Button size="sm" variant="ghost" onClick={() => copyText(output)}>
                <Copy className="w-4 h-4" />
              </Button>
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

// ─── UrlEncoder ─────────────────────────────────────────────────────────────
function UrlEncoder() {
  const [raw, setRaw] = useState("");
  const [encoded, setEncoded] = useState("");

  const encode = () => {
    try {
      setEncoded(encodeURIComponent(raw));
    } catch {
      toast.error("Encoding failed");
    }
  };

  const decode = () => {
    try {
      setRaw(decodeURIComponent(encoded));
    } catch {
      toast.error("Decoding failed — invalid encoded URL");
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label>Raw URL</Label>
            <Button size="sm" variant="ghost" onClick={() => copyText(raw)}><Copy className="w-4 h-4" /></Button>
          </div>
          <Textarea
            value={raw}
            onChange={e => setRaw(e.target.value)}
            className="min-h-[200px] font-mono text-sm bg-black/40"
            placeholder="https://example.com/path?q=hello world"
          />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label>Encoded URL</Label>
            <Button size="sm" variant="ghost" onClick={() => copyText(encoded)}><Copy className="w-4 h-4" /></Button>
          </div>
          <Textarea
            value={encoded}
            onChange={e => setEncoded(e.target.value)}
            className="min-h-[200px] font-mono text-sm bg-black/40"
            placeholder="https%3A%2F%2Fexample.com%2Fpath%3Fq%3Dhello%20world"
          />
        </div>
      </div>
      <div className="flex gap-3">
        <Button className="primary-gradient" onClick={encode}>Encode →</Button>
        <Button variant="secondary" onClick={decode}>← Decode</Button>
      </div>
    </div>
  );
}

// ─── HtmlEncoder ────────────────────────────────────────────────────────────
function HtmlEncoder() {
  const [raw, setRaw] = useState("");
  const [encoded, setEncoded] = useState("");

  const encode = () => {
    setEncoded(
      raw
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#x27;")
    );
  };

  const decode = () => {
    setRaw(
      encoded
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#x27;/g, "'")
    );
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label>Raw HTML</Label>
            <Button size="sm" variant="ghost" onClick={() => copyText(raw)}><Copy className="w-4 h-4" /></Button>
          </div>
          <Textarea
            value={raw}
            onChange={e => setRaw(e.target.value)}
            className="min-h-[200px] font-mono text-sm bg-black/40"
            placeholder={'<div class="hello">World & "friends"</div>'}
          />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label>Encoded HTML</Label>
            <Button size="sm" variant="ghost" onClick={() => copyText(encoded)}><Copy className="w-4 h-4" /></Button>
          </div>
          <Textarea
            value={encoded}
            onChange={e => setEncoded(e.target.value)}
            className="min-h-[200px] font-mono text-sm bg-black/40"
            placeholder="&lt;div class=&quot;hello&quot;&gt;World &amp; &quot;friends&quot;&lt;/div&gt;"
          />
        </div>
      </div>
      <div className="flex gap-3">
        <Button className="primary-gradient" onClick={encode}>Encode →</Button>
        <Button variant="secondary" onClick={decode}>← Decode</Button>
      </div>
    </div>
  );
}

// ─── JsonToCsv ──────────────────────────────────────────────────────────────
function JsonToCsv() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const convert = () => {
    try {
      const parsed = JSON.parse(input);
      if (!Array.isArray(parsed)) throw new Error("Input must be a JSON array");
      if (parsed.length === 0) { setOutput(""); return; }
      const keys = Object.keys(parsed[0]);
      const header = keys.map(k => `"${k}"`).join(",");
      const rows = parsed.map((row: any) =>
        keys.map(k => {
          const val = row[k] === null || row[k] === undefined ? "" : String(row[k]);
          return `"${val.replace(/"/g, '""')}"`;
        }).join(",")
      );
      setOutput([header, ...rows].join("\n"));
      setError("");
      toast.success("Converted to CSV!");
    } catch (e: any) {
      setError(e.message);
      toast.error("Conversion failed");
    }
  };

  const download = () => {
    const blob = new Blob([output], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "output.csv"; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>JSON Array Input</Label>
          <Textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            className="min-h-[300px] font-mono text-sm bg-black/40"
            placeholder='[{"name":"Alice","age":30},{"name":"Bob","age":25}]'
          />
          {error && <div className="text-destructive text-sm font-mono">{error}</div>}
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label>CSV Output</Label>
            <div className="flex gap-2">
              <Button size="sm" variant="ghost" onClick={() => copyText(output)}><Copy className="w-4 h-4" /></Button>
              <Button size="sm" variant="ghost" onClick={download} disabled={!output}><Download className="w-4 h-4" /></Button>
            </div>
          </div>
          <Textarea
            value={output}
            readOnly
            className="min-h-[300px] font-mono text-sm bg-black/60 text-primary"
          />
        </div>
      </div>
      <Button className="primary-gradient" onClick={convert}>Convert to CSV</Button>
    </div>
  );
}

// ─── CsvToJson ──────────────────────────────────────────────────────────────
function CsvToJson() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const convert = () => {
    try {
      const lines = input.trim().split("\n").filter(l => l.trim());
      if (lines.length < 2) throw new Error("Need at least a header row and one data row");

      const parseRow = (line: string): string[] => {
        const result: string[] = [];
        let current = "";
        let inQuotes = false;
        for (let i = 0; i < line.length; i++) {
          const ch = line[i];
          if (ch === '"') {
            if (inQuotes && line[i + 1] === '"') { current += '"'; i++; }
            else inQuotes = !inQuotes;
          } else if (ch === "," && !inQuotes) {
            result.push(current); current = "";
          } else {
            current += ch;
          }
        }
        result.push(current);
        return result;
      };

      const headers = parseRow(lines[0]);
      const rows = lines.slice(1).map(line => {
        const values = parseRow(line);
        const obj: Record<string, string> = {};
        headers.forEach((h, i) => { obj[h.trim()] = (values[i] ?? "").trim(); });
        return obj;
      });
      setOutput(JSON.stringify(rows, null, 2));
      setError("");
      toast.success("Converted to JSON!");
    } catch (e: any) {
      setError(e.message);
      toast.error("Conversion failed");
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>CSV Input (first row = headers)</Label>
          <Textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            className="min-h-[300px] font-mono text-sm bg-black/40"
            placeholder={"name,age\nAlice,30\nBob,25"}
          />
          {error && <div className="text-destructive text-sm font-mono">{error}</div>}
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label>JSON Output</Label>
            <Button size="sm" variant="ghost" onClick={() => copyText(output)}><Copy className="w-4 h-4" /></Button>
          </div>
          <Textarea
            value={output}
            readOnly
            className="min-h-[300px] font-mono text-sm bg-black/60 text-primary"
          />
        </div>
      </div>
      <Button className="primary-gradient" onClick={convert}>Convert to JSON</Button>
    </div>
  );
}

// ─── ColorPicker ────────────────────────────────────────────────────────────
function ColorPicker() {
  const [hex, setHex] = useState("#6366f1");

  const rgb = hexToRgb(hex);
  const hsl = rgb ? rgbToHsl(rgb.r, rgb.g, rgb.b) : { h: 0, s: 0, l: 0 };

  const rgbStr = rgb ? `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` : "";
  const hslStr = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;

  const swatches = rgb
    ? [
        hslToHex((hsl.h + 30) % 360, hsl.s, hsl.l),
        hslToHex((hsl.h + 60) % 360, hsl.s, hsl.l),
        hslToHex((hsl.h + 180) % 360, hsl.s, hsl.l),
        hslToHex((hsl.h + 210) % 360, hsl.s, hsl.l),
        hslToHex((hsl.h + 240) % 360, hsl.s, hsl.l),
      ]
    : [];

  const handleHexInput = (val: string) => {
    setHex(val);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-6 items-start">
        <div className="flex flex-col items-center gap-3">
          <input
            type="color"
            value={hex}
            onChange={e => setHex(e.target.value)}
            className="w-32 h-32 rounded-xl cursor-pointer border-0 bg-transparent"
          />
          <Input
            value={hex}
            onChange={e => handleHexInput(e.target.value)}
            className="w-32 font-mono text-center text-sm bg-black/40"
            maxLength={7}
          />
        </div>

        <div className="flex-1 space-y-3">
          {[
            { label: "HEX", value: hex },
            { label: "RGB", value: rgbStr },
            { label: "HSL", value: hslStr },
          ].map(({ label, value }) => (
            <div key={label} className="bg-black/30 border border-white/5 rounded-xl p-4 flex justify-between items-center">
              <div>
                <div className="text-xs text-muted-foreground mb-1">{label}</div>
                <div className="font-mono text-sm text-primary">{value}</div>
              </div>
              <Button size="sm" variant="ghost" onClick={() => copyText(value)}><Copy className="w-4 h-4" /></Button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label className="text-sm text-muted-foreground mb-3 block">Complementary &amp; Analogous Colors</Label>
        <div className="flex gap-3">
          {swatches.map((s, i) => (
            <button
              key={i}
              className="w-12 h-12 rounded-lg border border-white/10 cursor-pointer hover:scale-110 transition-transform"
              style={{ backgroundColor: s }}
              onClick={() => { setHex(s); copyText(s); }}
              title={s}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── GradientGenerator ──────────────────────────────────────────────────────
function GradientGenerator() {
  const [color1, setColor1] = useState("#6366f1");
  const [color2, setColor2] = useState("#ec4899");
  const [angle, setAngle] = useState(135);
  const [isRadial, setIsRadial] = useState(false);

  const css = isRadial
    ? `radial-gradient(circle, ${color1}, ${color2})`
    : `linear-gradient(${angle}deg, ${color1}, ${color2})`;

  const fullCss = `background: ${css};`;

  return (
    <div className="space-y-6">
      <div
        className="w-full h-48 rounded-xl border border-white/10"
        style={{ background: css }}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Color 1</Label>
          <div className="flex gap-3 items-center">
            <input type="color" value={color1} onChange={e => setColor1(e.target.value)} className="w-10 h-10 rounded cursor-pointer border-0 bg-transparent" />
            <Input value={color1} onChange={e => setColor1(e.target.value)} className="font-mono text-sm bg-black/40 w-32" />
          </div>
        </div>
        <div className="space-y-2">
          <Label>Color 2</Label>
          <div className="flex gap-3 items-center">
            <input type="color" value={color2} onChange={e => setColor2(e.target.value)} className="w-10 h-10 rounded cursor-pointer border-0 bg-transparent" />
            <Input value={color2} onChange={e => setColor2(e.target.value)} className="font-mono text-sm bg-black/40 w-32" />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Switch checked={isRadial} onCheckedChange={setIsRadial} />
        <Label>{isRadial ? "Radial" : "Linear"}</Label>
      </div>

      {!isRadial && (
        <div className="space-y-2">
          <Label>Angle: {angle}°</Label>
          <Slider
            min={0} max={360} step={1}
            value={[angle]}
            onValueChange={([v]) => setAngle(v)}
            className="w-full"
          />
        </div>
      )}

      <div className="bg-black/30 border border-white/5 rounded-xl p-4 flex justify-between items-center">
        <code className="font-mono text-sm text-primary break-all">{fullCss}</code>
        <Button size="sm" variant="ghost" onClick={() => copyText(fullCss)}><Copy className="w-4 h-4" /></Button>
      </div>
    </div>
  );
}

// ─── BoxShadowGenerator ─────────────────────────────────────────────────────
function BoxShadowGenerator() {
  const [offsetX, setOffsetX] = useState(4);
  const [offsetY, setOffsetY] = useState(4);
  const [blur, setBlur] = useState(10);
  const [spread, setSpread] = useState(0);
  const [color, setColor] = useState("#000000");
  const [opacity, setOpacity] = useState(40);
  const [inset, setInset] = useState(false);

  const hexToRgba = (h: string, a: number) => {
    const r = hexToRgb(h);
    if (!r) return `rgba(0,0,0,${a / 100})`;
    return `rgba(${r.r},${r.g},${r.b},${a / 100})`;
  };

  const shadow = `${inset ? "inset " : ""}${offsetX}px ${offsetY}px ${blur}px ${spread}px ${hexToRgba(color, opacity)}`;
  const css = `box-shadow: ${shadow};`;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-center h-48 bg-black/20 rounded-xl border border-white/10">
        <div
          className="w-32 h-32 bg-white rounded-xl"
          style={{ boxShadow: shadow }}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          { label: `Offset X: ${offsetX}px`, min: -50, max: 50, val: offsetX, set: setOffsetX },
          { label: `Offset Y: ${offsetY}px`, min: -50, max: 50, val: offsetY, set: setOffsetY },
          { label: `Blur: ${blur}px`, min: 0, max: 100, val: blur, set: setBlur },
          { label: `Spread: ${spread}px`, min: -20, max: 50, val: spread, set: setSpread },
          { label: `Opacity: ${opacity}%`, min: 0, max: 100, val: opacity, set: setOpacity },
        ].map(({ label, min, max, val, set }) => (
          <div key={label} className="space-y-2">
            <Label>{label}</Label>
            <Slider min={min} max={max} step={1} value={[val]} onValueChange={([v]) => set(v)} />
          </div>
        ))}

        <div className="space-y-2">
          <Label>Shadow Color</Label>
          <div className="flex gap-3 items-center">
            <input type="color" value={color} onChange={e => setColor(e.target.value)} className="w-10 h-10 rounded cursor-pointer border-0 bg-transparent" />
            <Input value={color} onChange={e => setColor(e.target.value)} className="font-mono text-sm bg-black/40 w-32" />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Switch checked={inset} onCheckedChange={setInset} />
        <Label>Inset</Label>
      </div>

      <div className="bg-black/30 border border-white/5 rounded-xl p-4 flex justify-between items-center">
        <code className="font-mono text-sm text-primary break-all">{css}</code>
        <Button size="sm" variant="ghost" onClick={() => copyText(css)}><Copy className="w-4 h-4" /></Button>
      </div>
    </div>
  );
}

// ─── BorderRadiusGenerator ──────────────────────────────────────────────────
function BorderRadiusGenerator() {
  const [tl, setTl] = useState(8);
  const [tr, setTr] = useState(8);
  const [br, setBr] = useState(8);
  const [bl, setBl] = useState(8);
  const [linked, setLinked] = useState(true);

  const setAll = (v: number) => { setTl(v); setTr(v); setBr(v); setBl(v); };

  const handleCorner = (setter: (v: number) => void) => (v: number) => {
    if (linked) setAll(v); else setter(v);
  };

  const css = `border-radius: ${tl}px ${tr}px ${br}px ${bl}px;`;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-center h-48 bg-black/20 rounded-xl border border-white/10">
        <div
          className="w-40 h-40 bg-gradient-to-br from-indigo-500 to-purple-600"
          style={{ borderRadius: `${tl}px ${tr}px ${br}px ${bl}px` }}
        />
      </div>

      <div className="flex items-center gap-3 mb-2">
        <Switch checked={linked} onCheckedChange={setLinked} />
        <Label>Link all corners</Label>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          { label: `Top Left: ${tl}px`, val: tl, set: setTl },
          { label: `Top Right: ${tr}px`, val: tr, set: setTr },
          { label: `Bottom Right: ${br}px`, val: br, set: setBr },
          { label: `Bottom Left: ${bl}px`, val: bl, set: setBl },
        ].map(({ label, val, set }) => (
          <div key={label} className="space-y-2">
            <Label>{label}</Label>
            <Slider min={0} max={100} step={1} value={[val]} onValueChange={([v]) => handleCorner(set)(v)} />
          </div>
        ))}
      </div>

      <div className="bg-black/30 border border-white/5 rounded-xl p-4 flex justify-between items-center">
        <code className="font-mono text-sm text-primary">{css}</code>
        <Button size="sm" variant="ghost" onClick={() => copyText(css)}><Copy className="w-4 h-4" /></Button>
      </div>
    </div>
  );
}

// ─── MetaTagGenerator ───────────────────────────────────────────────────────
function MetaTagGenerator() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [keywords, setKeywords] = useState("");
  const [author, setAuthor] = useState("");
  const [ogTitle, setOgTitle] = useState("");
  const [ogDescription, setOgDescription] = useState("");
  const [ogImage, setOgImage] = useState("");
  const [twitterCard, setTwitterCard] = useState("summary_large_image");

  const tags = [
    title && `<meta name="title" content="${title}">`,
    description && `<meta name="description" content="${description}">`,
    keywords && `<meta name="keywords" content="${keywords}">`,
    author && `<meta name="author" content="${author}">`,
    ogTitle && `<meta property="og:title" content="${ogTitle}">`,
    ogDescription && `<meta property="og:description" content="${ogDescription}">`,
    ogImage && `<meta property="og:image" content="${ogImage}">`,
    `<meta name="twitter:card" content="${twitterCard}">`,
    ogTitle && `<meta name="twitter:title" content="${ogTitle}">`,
    ogDescription && `<meta name="twitter:description" content="${ogDescription}">`,
  ].filter(Boolean).join("\n");

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          { label: "Title", val: title, set: setTitle, ph: "My Awesome Page" },
          { label: "Author", val: author, set: setAuthor, ph: "John Doe" },
          { label: "OG Title", val: ogTitle, set: setOgTitle, ph: "My Awesome Page" },
          { label: "OG Image URL", val: ogImage, set: setOgImage, ph: "https://example.com/image.jpg" },
        ].map(({ label, val, set, ph }) => (
          <div key={label} className="space-y-2">
            <Label>{label}</Label>
            <Input value={val} onChange={e => set(e.target.value)} placeholder={ph} className="bg-black/40" />
          </div>
        ))}

        <div className="space-y-2">
          <Label>Description</Label>
          <Textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Page description..." className="bg-black/40 h-20 resize-none" />
        </div>
        <div className="space-y-2">
          <Label>OG Description</Label>
          <Textarea value={ogDescription} onChange={e => setOgDescription(e.target.value)} placeholder="OG description..." className="bg-black/40 h-20 resize-none" />
        </div>

        <div className="space-y-2">
          <Label>Keywords</Label>
          <Input value={keywords} onChange={e => setKeywords(e.target.value)} placeholder="react, typescript, web" className="bg-black/40" />
        </div>

        <div className="space-y-2">
          <Label>Twitter Card Type</Label>
          <select
            value={twitterCard}
            onChange={e => setTwitterCard(e.target.value)}
            className="w-full bg-black/40 border border-white/10 rounded-md px-3 py-2 text-sm text-white"
          >
            <option value="summary">summary</option>
            <option value="summary_large_image">summary_large_image</option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label>Generated Meta Tags</Label>
          <Button size="sm" variant="ghost" onClick={() => copyText(tags)}><Copy className="w-4 h-4" /></Button>
        </div>
        <pre className="bg-black/30 border border-white/5 rounded-xl p-4 font-mono text-sm text-primary overflow-x-auto whitespace-pre-wrap">{tags || "// Fill in the fields above"}</pre>
      </div>
    </div>
  );
}

// ─── RobotsTxtGenerator ─────────────────────────────────────────────────────
function RobotsTxtGenerator() {
  const [allowAll, setAllowAll] = useState(true);
  const [blockAll, setBlockAll] = useState(false);
  const [bots, setBots] = useState<Record<string, boolean>>({
    Googlebot: false,
    Bingbot: false,
    GPTBot: false,
    CCBot: false,
  });
  const [customRules, setCustomRules] = useState("");

  const toggleBot = (bot: string) => setBots(prev => ({ ...prev, [bot]: !prev[bot] }));

  const output = (() => {
    const lines: string[] = [];
    if (blockAll) {
      lines.push("User-agent: *", "Disallow: /", "");
    } else if (allowAll) {
      lines.push("User-agent: *", "Allow: /", "");
    }
    Object.entries(bots).filter(([, v]) => v).forEach(([bot]) => {
      lines.push(`User-agent: ${bot}`, "Disallow: /", "");
    });
    if (customRules.trim()) lines.push(customRules.trim());
    return lines.join("\n");
  })();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Switch checked={allowAll} onCheckedChange={v => { setAllowAll(v); if (v) setBlockAll(false); }} />
            <Label>Allow all robots</Label>
          </div>
          <div className="flex items-center gap-3">
            <Switch checked={blockAll} onCheckedChange={v => { setBlockAll(v); if (v) setAllowAll(false); }} />
            <Label>Block all robots</Label>
          </div>

          <div className="space-y-2">
            <Label className="text-muted-foreground text-xs">Block specific bots</Label>
            {Object.keys(bots).map(bot => (
              <div key={bot} className="flex items-center gap-3">
                <Switch checked={bots[bot]} onCheckedChange={() => toggleBot(bot)} />
                <Label>{bot}</Label>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <Label>Custom Rules</Label>
            <Textarea
              value={customRules}
              onChange={e => setCustomRules(e.target.value)}
              placeholder={"User-agent: SomeBot\nDisallow: /private/"}
              className="bg-black/40 font-mono text-sm h-28"
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label>robots.txt Output</Label>
            <Button size="sm" variant="ghost" onClick={() => copyText(output)}><Copy className="w-4 h-4" /></Button>
          </div>
          <pre className="bg-black/30 border border-white/5 rounded-xl p-4 font-mono text-sm text-primary min-h-[200px] whitespace-pre-wrap">{output}</pre>
        </div>
      </div>
    </div>
  );
}

// ─── ButtonGenerator ────────────────────────────────────────────────────────
function ButtonGenerator() {
  const [label, setLabel] = useState("Click Me");
  const [bgColor, setBgColor] = useState("#6366f1");
  const [textColor, setTextColor] = useState("#ffffff");
  const [paddingX, setPaddingX] = useState(24);
  const [paddingY, setPaddingY] = useState(12);
  const [borderRadius, setBorderRadius] = useState(8);
  const [fontSize, setFontSize] = useState(16);
  const [borderColor, setBorderColor] = useState("#6366f1");
  const [borderWidth, setBorderWidth] = useState(0);

  const styleObj: React.CSSProperties = {
    backgroundColor: bgColor,
    color: textColor,
    padding: `${paddingY}px ${paddingX}px`,
    borderRadius: `${borderRadius}px`,
    fontSize: `${fontSize}px`,
    border: `${borderWidth}px solid ${borderColor}`,
    cursor: "pointer",
    fontFamily: "inherit",
    display: "inline-block",
  };

  const cssText = `.my-button {
  background-color: ${bgColor};
  color: ${textColor};
  padding: ${paddingY}px ${paddingX}px;
  border-radius: ${borderRadius}px;
  font-size: ${fontSize}px;
  border: ${borderWidth}px solid ${borderColor};
  cursor: pointer;
}`;

  const htmlText = `<button class="my-button">${label}</button>`;

  return (
    <div className="space-y-6">
      <div className="bg-black/20 border border-white/10 rounded-xl p-8 flex items-center justify-center min-h-[120px]">
        <button style={styleObj}>{label}</button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Label</Label>
          <Input value={label} onChange={e => setLabel(e.target.value)} className="bg-black/40" />
        </div>

        <div className="space-y-2">
          <Label>Font Size: {fontSize}px</Label>
          <Slider min={10} max={36} value={[fontSize]} onValueChange={([v]) => setFontSize(v)} />
        </div>

        <div className="space-y-2">
          <Label>Background Color</Label>
          <div className="flex gap-3 items-center">
            <input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)} className="w-10 h-10 rounded cursor-pointer border-0 bg-transparent" />
            <Input value={bgColor} onChange={e => setBgColor(e.target.value)} className="font-mono text-sm bg-black/40 w-32" />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Text Color</Label>
          <div className="flex gap-3 items-center">
            <input type="color" value={textColor} onChange={e => setTextColor(e.target.value)} className="w-10 h-10 rounded cursor-pointer border-0 bg-transparent" />
            <Input value={textColor} onChange={e => setTextColor(e.target.value)} className="font-mono text-sm bg-black/40 w-32" />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Padding X: {paddingX}px</Label>
          <Slider min={0} max={80} value={[paddingX]} onValueChange={([v]) => setPaddingX(v)} />
        </div>

        <div className="space-y-2">
          <Label>Padding Y: {paddingY}px</Label>
          <Slider min={0} max={40} value={[paddingY]} onValueChange={([v]) => setPaddingY(v)} />
        </div>

        <div className="space-y-2">
          <Label>Border Radius: {borderRadius}px</Label>
          <Slider min={0} max={50} value={[borderRadius]} onValueChange={([v]) => setBorderRadius(v)} />
        </div>

        <div className="space-y-2">
          <Label>Border Width: {borderWidth}px</Label>
          <Slider min={0} max={10} value={[borderWidth]} onValueChange={([v]) => setBorderWidth(v)} />
        </div>

        <div className="space-y-2">
          <Label>Border Color</Label>
          <div className="flex gap-3 items-center">
            <input type="color" value={borderColor} onChange={e => setBorderColor(e.target.value)} className="w-10 h-10 rounded cursor-pointer border-0 bg-transparent" />
            <Input value={borderColor} onChange={e => setBorderColor(e.target.value)} className="font-mono text-sm bg-black/40 w-32" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label>HTML</Label>
            <Button size="sm" variant="ghost" onClick={() => copyText(htmlText)}><Copy className="w-4 h-4" /></Button>
          </div>
          <pre className="bg-black/30 border border-white/5 rounded-xl p-4 font-mono text-sm text-primary overflow-x-auto whitespace-pre-wrap">{htmlText}</pre>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label>CSS</Label>
            <Button size="sm" variant="ghost" onClick={() => copyText(cssText)}><Copy className="w-4 h-4" /></Button>
          </div>
          <pre className="bg-black/30 border border-white/5 rounded-xl p-4 font-mono text-sm text-primary overflow-x-auto whitespace-pre-wrap">{cssText}</pre>
        </div>
      </div>
    </div>
  );
}

// ─── RegexTester ─────────────────────────────────────────────────────────────
function RegexTester() {
  const [pattern, setPattern] = useState("");
  const [flagG, setFlagG] = useState(true);
  const [flagI, setFlagI] = useState(false);
  const [flagM, setFlagM] = useState(false);
  const [flagS, setFlagS] = useState(false);
  const [testStr, setTestStr] = useState("");
  const [error, setError] = useState("");

  const flags = `${flagG ? "g" : ""}${flagI ? "i" : ""}${flagM ? "m" : ""}${flagS ? "s" : ""}`;

  interface MatchInfo {
    fullMatch: string;
    index: number;
    groups: string[];
  }

  const { matches, highlighted }: { matches: MatchInfo[]; highlighted: React.ReactNode } = (() => {
    if (!pattern || !testStr) return { matches: [], highlighted: <span>{testStr}</span> };
    try {
      const re = new RegExp(pattern, flags);
      setError("");
      const allMatches: MatchInfo[] = [];
      const reG = new RegExp(pattern, flags.includes("g") ? flags : flags + "g");
      let m: RegExpExecArray | null;
      while ((m = reG.exec(testStr)) !== null) {
        allMatches.push({ fullMatch: m[0], index: m.index, groups: m.slice(1) });
        if (!flags.includes("g")) break;
        if (m[0].length === 0) reG.lastIndex++;
      }

      // Build highlighted spans
      const parts: React.ReactNode[] = [];
      let lastIdx = 0;
      allMatches.forEach((match, i) => {
        if (match.index > lastIdx) parts.push(<span key={`t${i}`}>{testStr.slice(lastIdx, match.index)}</span>);
        parts.push(
          <span key={`m${i}`} className="bg-primary/30 rounded px-0.5 border border-primary/50">{match.fullMatch}</span>
        );
        lastIdx = match.index + match.fullMatch.length;
      });
      if (lastIdx < testStr.length) parts.push(<span key="tail">{testStr.slice(lastIdx)}</span>);

      return { matches: allMatches, highlighted: <>{parts}</> };
    } catch (e: any) {
      setError(e.message);
      return { matches: [], highlighted: <span>{testStr}</span> };
    }
  })();

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <div className="flex gap-3 items-end">
          <div className="flex-1 space-y-2">
            <Label>Regex Pattern</Label>
            <Input
              value={pattern}
              onChange={e => setPattern(e.target.value)}
              placeholder="e.g. \b\w+\b"
              className="font-mono bg-black/40"
            />
          </div>
          <div className="space-y-2">
            <Label>Flags</Label>
            <div className="flex gap-2">
              {[
                { label: "g", val: flagG, set: setFlagG },
                { label: "i", val: flagI, set: setFlagI },
                { label: "m", val: flagM, set: setFlagM },
                { label: "s", val: flagS, set: setFlagS },
              ].map(({ label, val, set }) => (
                <button
                  key={label}
                  onClick={() => set(!val)}
                  className={`w-8 h-9 rounded font-mono text-sm border transition-colors ${val ? "bg-primary/20 border-primary/50 text-primary" : "bg-black/40 border-white/10 text-muted-foreground"}`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
        {error && <div className="text-destructive text-sm font-mono">{error}</div>}
      </div>

      <div className="space-y-2">
        <Label>Test String</Label>
        <Textarea
          value={testStr}
          onChange={e => setTestStr(e.target.value)}
          className="min-h-[150px] font-mono text-sm bg-black/40"
          placeholder="Paste your test string here..."
        />
      </div>

      {testStr && (
        <div className="space-y-2">
          <Label>Highlighted Matches ({matches.length} found)</Label>
          <div className="bg-black/30 border border-white/5 rounded-xl p-4 font-mono text-sm whitespace-pre-wrap break-all">
            {highlighted}
          </div>
        </div>
      )}

      {matches.length > 0 && (
        <div className="space-y-2">
          <Label>Match Details</Label>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {matches.map((m, i) => (
              <div key={i} className="bg-black/30 border border-white/5 rounded-lg p-3 font-mono text-sm">
                <div className="flex gap-4">
                  <span className="text-muted-foreground">#{i + 1}</span>
                  <span className="text-primary">"{m.fullMatch}"</span>
                  <span className="text-muted-foreground">index: {m.index}</span>
                </div>
                {m.groups.length > 0 && (
                  <div className="mt-1 text-xs text-muted-foreground">
                    Groups: {m.groups.map((g, gi) => `$${gi + 1}: "${g ?? "undefined"}"`).join(", ")}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Export ──────────────────────────────────────────────────────────────────
export default function WebDevTools({ active }: { active: string }) {
  return (
    <ToolPageLayout toolId={active}>
      {active === "json-formatter" && <JsonFormatter />}
      {active === "url-encoder" && <UrlEncoder />}
      {active === "html-encoder" && <HtmlEncoder />}
      {active === "json-to-csv" && <JsonToCsv />}
      {active === "csv-to-json" && <CsvToJson />}
      {active === "color-picker" && <ColorPicker />}
      {active === "gradient-generator" && <GradientGenerator />}
      {active === "box-shadow-generator" && <BoxShadowGenerator />}
      {active === "border-radius-generator" && <BorderRadiusGenerator />}
      {active === "meta-tag-generator" && <MetaTagGenerator />}
      {active === "robots-txt-generator" && <RobotsTxtGenerator />}
      {active === "button-generator" && <ButtonGenerator />}
      {active === "regex-tester" && <RegexTester />}
    </ToolPageLayout>
  );
}
