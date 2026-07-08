import { useState, useCallback, useRef } from "react";
import { ToolPageLayout } from "@/components/Layout/ToolPageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import { Copy, RefreshCw } from "lucide-react";

// ─── Random Number ───────────────────────────────────────────────────────────
function RandomNumber() {
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [count, setCount] = useState(1);
  const [results, setResults] = useState<number[]>([]);
  const [history, setHistory] = useState<number[][]>([]);

  const generate = useCallback(() => {
    const lo = Math.min(min, max);
    const hi = Math.max(min, max);
    const nums = Array.from({ length: count }, () =>
      Math.floor(Math.random() * (hi - lo + 1)) + lo
    );
    setHistory((h) => [nums, ...h].slice(0, 3));
    setResults(nums);
  }, [min, max, count]);

  return (
    <div className="space-y-6 max-w-lg mx-auto">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Min</Label>
          <Input
            type="number"
            value={min}
            onChange={(e) => setMin(Number(e.target.value))}
            className="mt-2 bg-black/40"
          />
        </div>
        <div>
          <Label>Max</Label>
          <Input
            type="number"
            value={max}
            onChange={(e) => setMax(Number(e.target.value))}
            className="mt-2 bg-black/40"
          />
        </div>
      </div>
      <div>
        <Label>Count: {count}</Label>
        <Slider
          min={1}
          max={100}
          step={1}
          value={[count]}
          onValueChange={([v]) => setCount(v)}
          className="mt-3"
        />
      </div>
      <Button onClick={generate} className="w-full h-12 text-base font-bold primary-gradient">
        Generate
      </Button>

      {results.length > 0 && (
        <div className="bg-black/30 border border-white/5 rounded-xl p-6">
          <div className="flex flex-wrap gap-2 justify-center">
            {results.map((n, i) => (
              <span
                key={i}
                className="font-mono text-lg font-bold px-4 py-2 rounded-lg bg-white/10 text-primary border border-white/10"
              >
                {n}
              </span>
            ))}
          </div>
        </div>
      )}

      {history.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Last 3 generations</p>
          {history.map((gen, i) => (
            <div
              key={i}
              className="bg-black/20 border border-white/5 rounded-lg px-4 py-2 flex flex-wrap gap-2"
            >
              {gen.map((n, j) => (
                <span key={j} className="font-mono text-sm text-muted-foreground">
                  {n}
                </span>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Coin Flipper ─────────────────────────────────────────────────────────────
function CoinFlipper() {
  const [result, setResult] = useState<"HEADS" | "TAILS" | null>(null);
  const [flipping, setFlipping] = useState(false);
  const [heads, setHeads] = useState(0);
  const [tails, setTails] = useState(0);
  const [total, setTotal] = useState(0);

  const flip = useCallback(() => {
    setFlipping(true);
    setTimeout(() => {
      const outcome = Math.random() < 0.5 ? "HEADS" : "TAILS";
      setResult(outcome);
      setTotal((t) => t + 1);
      if (outcome === "HEADS") setHeads((h) => h + 1);
      else setTails((t) => t + 1);
      setFlipping(false);
    }, 500);
  }, []);

  const ratio = total > 0 ? ((heads / total) * 100).toFixed(1) : "—";

  return (
    <div className="space-y-8 max-w-sm mx-auto text-center">
      <div
        className={`mx-auto w-48 h-48 rounded-full flex items-center justify-center border-4 text-3xl font-extrabold transition-all duration-300 ${
          flipping
            ? "animate-spin border-white/20 bg-white/5 text-white/20"
            : result === "HEADS"
            ? "border-yellow-400 bg-yellow-400/10 text-yellow-400"
            : result === "TAILS"
            ? "border-purple-400 bg-purple-400/10 text-purple-400"
            : "border-white/10 bg-black/30 text-muted-foreground"
        }`}
      >
        {flipping ? "..." : result ?? "?"}
      </div>

      <Button
        onClick={flip}
        disabled={flipping}
        className="w-full h-12 text-base font-bold primary-gradient"
      >
        {flipping ? "Flipping…" : "Flip Coin"}
      </Button>

      {total > 0 && (
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Flips", value: total },
            { label: "Heads", value: heads },
            { label: "Tails", value: tails },
          ].map(({ label, value }) => (
            <div key={label} className="bg-black/30 border border-white/5 rounded-xl p-4">
              <div className="text-2xl font-bold font-mono text-primary">{value}</div>
              <div className="text-xs text-muted-foreground mt-1">{label}</div>
            </div>
          ))}
        </div>
      )}
      {total > 0 && (
        <p className="text-sm text-muted-foreground">
          Heads ratio: <span className="font-mono text-white">{ratio}%</span>
        </p>
      )}
    </div>
  );
}

// ─── Dice Roller ──────────────────────────────────────────────────────────────
function DiceRoller() {
  const dieTypes = [4, 6, 8, 10, 12, 20, 100];
  const [numDice, setNumDice] = useState(1);
  const [dieType, setDieType] = useState(6);
  const [rolls, setRolls] = useState<number[]>([]);

  const roll = useCallback(() => {
    const r = Array.from({ length: numDice }, () =>
      Math.floor(Math.random() * dieType) + 1
    );
    setRolls(r);
  }, [numDice, dieType]);

  const sum = rolls.reduce((a, b) => a + b, 0);

  return (
    <div className="space-y-6 max-w-lg mx-auto">
      <div>
        <Label>Number of Dice</Label>
        <div className="flex gap-2 mt-2 flex-wrap">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <Button
              key={n}
              variant={numDice === n ? "default" : "secondary"}
              className={`w-12 h-12 font-bold ${numDice === n ? "primary-gradient" : ""}`}
              onClick={() => setNumDice(n)}
            >
              {n}
            </Button>
          ))}
        </div>
      </div>
      <div>
        <Label>Die Type</Label>
        <div className="flex gap-2 mt-2 flex-wrap">
          {dieTypes.map((d) => (
            <Button
              key={d}
              variant={dieType === d ? "default" : "secondary"}
              className={`h-10 px-3 font-bold ${dieType === d ? "primary-gradient" : ""}`}
              onClick={() => setDieType(d)}
            >
              d{d}
            </Button>
          ))}
        </div>
      </div>
      <Button onClick={roll} className="w-full h-12 text-base font-bold primary-gradient">
        Roll {numDice}d{dieType}
      </Button>

      {rolls.length > 0 && (
        <div className="space-y-4">
          <div className="flex flex-wrap gap-3 justify-center">
            {rolls.map((v, i) => (
              <div
                key={i}
                className="bg-black/30 border border-white/10 rounded-xl w-20 h-20 flex flex-col items-center justify-center"
              >
                <span className="text-2xl font-extrabold font-mono text-primary">{v}</span>
                <span className="text-xs text-muted-foreground mt-1">d{dieType}</span>
              </div>
            ))}
          </div>
          {rolls.length > 1 && (
            <div className="bg-black/30 border border-white/5 rounded-xl p-4 text-center">
              <span className="text-muted-foreground text-sm">Total</span>
              <div className="text-4xl font-extrabold font-mono text-primary mt-1">{sum}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Random Name Picker ───────────────────────────────────────────────────────
function RandomNamePicker() {
  const [namesText, setNamesText] = useState("");
  const [pickCount, setPickCount] = useState(1);
  const [winners, setWinners] = useState<string[]>([]);
  const [pool, setPool] = useState<string[]>([]);

  const pick = useCallback(() => {
    const list = namesText
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);
    if (list.length === 0) return;
    const n = Math.min(pickCount, list.length);
    const shuffled = [...list].sort(() => Math.random() - 0.5);
    setWinners(shuffled.slice(0, n));
    setPool(list);
  }, [namesText, pickCount]);

  const removeWinners = useCallback(() => {
    const remaining = pool.filter((name) => !winners.includes(name));
    setNamesText(remaining.join("\n"));
    setPool(remaining);
    setWinners([]);
  }, [pool, winners]);

  return (
    <div className="space-y-6 max-w-lg mx-auto">
      <div>
        <Label>Names (one per line)</Label>
        <Textarea
          value={namesText}
          onChange={(e) => setNamesText(e.target.value)}
          placeholder="Alice&#10;Bob&#10;Charlie&#10;Diana"
          className="mt-2 bg-black/40 min-h-[160px]"
        />
      </div>
      <div className="flex gap-4 items-end">
        <div className="flex-1">
          <Label>How many to pick?</Label>
          <Input
            type="number"
            min={1}
            value={pickCount}
            onChange={(e) => setPickCount(Math.max(1, Number(e.target.value)))}
            className="mt-2 bg-black/40"
          />
        </div>
        <Button onClick={pick} className="h-10 px-6 font-bold primary-gradient">
          Pick!
        </Button>
      </div>

      {winners.length > 0 && (
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            {winners.length === 1 ? "Winner" : "Winners"}
          </p>
          {winners.map((w, i) => (
            <div
              key={i}
              className="bg-black/30 border border-white/10 rounded-xl p-5 text-center text-2xl font-bold text-primary"
            >
              🏆 {w}
            </div>
          ))}
          <Button variant="secondary" onClick={removeWinners} className="w-full">
            Remove winners from list
          </Button>
        </div>
      )}
    </div>
  );
}

// ─── Yes / No ─────────────────────────────────────────────────────────────────
function YesNo() {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState<string | null>(null);
  const [history, setHistory] = useState<{ q: string; a: string }[]>([]);

  const answers = [
    { text: "YES", emoji: "✅", color: "text-green-400" },
    { text: "NO", emoji: "❌", color: "text-red-400" },
    { text: "MAYBE", emoji: "🤔", color: "text-yellow-400" },
  ];

  const ask = useCallback(() => {
    if (!question.trim()) return;
    setLoading(true);
    setAnswer(null);
    setTimeout(() => {
      const pick = answers[Math.floor(Math.random() * answers.length)];
      setAnswer(pick.text);
      setHistory((h) =>
        [{ q: question, a: pick.text }, ...h].slice(0, 5)
      );
      setLoading(false);
    }, 600);
  }, [question]);

  const current = answers.find((a) => a.text === answer);

  return (
    <div className="space-y-6 max-w-lg mx-auto">
      <div>
        <Label>Your Question</Label>
        <Input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && ask()}
          placeholder="Will it rain tomorrow?"
          className="mt-2 bg-black/40 h-12"
        />
      </div>
      <Button
        onClick={ask}
        disabled={loading}
        className="w-full h-12 text-base font-bold primary-gradient"
      >
        {loading ? "Thinking…" : "Ask"}
      </Button>

      {(loading || current) && (
        <div className="bg-black/30 border border-white/5 rounded-xl p-10 text-center">
          {loading ? (
            <div className="text-5xl animate-pulse">🔮</div>
          ) : (
            <div className={`text-6xl font-extrabold ${current?.color}`}>
              {current?.emoji} {current?.text}
            </div>
          )}
        </div>
      )}

      {history.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Recent answers</p>
          {history.map((item, i) => {
            const a = answers.find((x) => x.text === item.a);
            return (
              <div
                key={i}
                className="bg-black/20 border border-white/5 rounded-lg px-4 py-2 flex justify-between items-center"
              >
                <span className="text-sm text-muted-foreground truncate flex-1 mr-2">
                  {item.q}
                </span>
                <span className={`font-bold text-sm ${a?.color}`}>
                  {a?.emoji} {item.a}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── Color Name Finder ────────────────────────────────────────────────────────
const NAMED_COLORS = [
  { name: "Red", hex: "#FF0000" },
  { name: "OrangeRed", hex: "#FF4500" },
  { name: "Orange", hex: "#FFA500" },
  { name: "Gold", hex: "#FFD700" },
  { name: "Yellow", hex: "#FFFF00" },
  { name: "YellowGreen", hex: "#9ACD32" },
  { name: "Green", hex: "#008000" },
  { name: "LimeGreen", hex: "#32CD32" },
  { name: "Cyan", hex: "#00FFFF" },
  { name: "DodgerBlue", hex: "#1E90FF" },
  { name: "Blue", hex: "#0000FF" },
  { name: "SlateBlue", hex: "#6A5ACD" },
  { name: "Purple", hex: "#800080" },
  { name: "Magenta", hex: "#FF00FF" },
  { name: "DeepPink", hex: "#FF1493" },
  { name: "HotPink", hex: "#FF69B4" },
  { name: "Crimson", hex: "#DC143C" },
  { name: "Tomato", hex: "#FF6347" },
  { name: "Coral", hex: "#FF7F50" },
  { name: "SandyBrown", hex: "#F4A460" },
  { name: "Khaki", hex: "#F0E68C" },
  { name: "Ivory", hex: "#FFFFF0" },
  { name: "White", hex: "#FFFFFF" },
  { name: "Silver", hex: "#C0C0C0" },
  { name: "Gray", hex: "#808080" },
  { name: "DimGray", hex: "#696969" },
  { name: "Black", hex: "#000000" },
  { name: "Navy", hex: "#000080" },
  { name: "Teal", hex: "#008080" },
  { name: "Olive", hex: "#808000" },
  { name: "Maroon", hex: "#800000" },
  { name: "Brown", hex: "#A52A2A" },
  { name: "Chocolate", hex: "#D2691E" },
  { name: "Peru", hex: "#CD853F" },
  { name: "Tan", hex: "#D2B48C" },
  { name: "Beige", hex: "#F5F5DC" },
  { name: "Lavender", hex: "#E6E6FA" },
  { name: "Plum", hex: "#DDA0DD" },
  { name: "Orchid", hex: "#DA70D6" },
  { name: "Violet", hex: "#EE82EE" },
];

function hexToRgb(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return [r, g, b];
}

function colorDistance(a: [number, number, number], b: [number, number, number]) {
  return Math.sqrt(
    (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2
  );
}

function ColorNameFinder() {
  const [picked, setPicked] = useState("#3B82F6");

  const rgb = hexToRgb(picked);
  const nearest = NAMED_COLORS.reduce(
    (best: { name: string; hex: string; dist: number }, c) => {
      const d = colorDistance(rgb, hexToRgb(c.hex));
      return d < best.dist ? { ...c, dist: d } : best;
    },
    { ...NAMED_COLORS[0], dist: Infinity }
  );

  return (
    <div className="space-y-6 max-w-sm mx-auto">
      <div>
        <Label>Pick a Color</Label>
        <input
          type="color"
          value={picked}
          onChange={(e) => setPicked(e.target.value)}
          className="mt-2 w-full h-20 rounded-xl cursor-pointer border border-white/10 bg-transparent"
        />
      </div>

      <div className="bg-black/30 border border-white/5 rounded-xl p-6 space-y-4">
        <div
          className="w-full h-24 rounded-xl border border-white/10"
          style={{ backgroundColor: picked }}
        />
        <div className="text-center space-y-1">
          <div className="text-2xl font-bold text-white">{nearest.name}</div>
          <div className="text-sm text-muted-foreground">Closest named color</div>
        </div>
        <div className="grid grid-cols-3 gap-3 text-center text-sm">
          <div className="bg-black/20 rounded-lg p-2">
            <div className="font-mono font-bold text-primary">{picked.toUpperCase()}</div>
            <div className="text-muted-foreground text-xs mt-1">Your Hex</div>
          </div>
          <div className="bg-black/20 rounded-lg p-2">
            <div className="font-mono font-bold text-primary">{nearest.hex}</div>
            <div className="text-muted-foreground text-xs mt-1">Nearest Hex</div>
          </div>
          <div className="bg-black/20 rounded-lg p-2">
            <div className="font-mono font-bold text-primary">
              {rgb[0]},{rgb[1]},{rgb[2]}
            </div>
            <div className="text-muted-foreground text-xs mt-1">RGB</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Random Color ─────────────────────────────────────────────────────────────
function randomHex() {
  return (
    "#" +
    Math.floor(Math.random() * 0xffffff)
      .toString(16)
      .padStart(6, "0")
      .toUpperCase()
  );
}

function hexToRgbObj(hex: string) {
  const [r, g, b] = hexToRgb(hex);
  return { r, g, b };
}

function hexToHsl(hex: string): { h: number; s: number; l: number } {
  let [r, g, b] = hexToRgb(hex);
  const rn = r / 255, gn = g / 255, bn = b / 255;
  const max = Math.max(rn, gn, bn), min = Math.min(rn, gn, bn);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case rn: h = ((gn - bn) / d + (gn < bn ? 6 : 0)) / 6; break;
      case gn: h = ((bn - rn) / d + 2) / 6; break;
      case bn: h = ((rn - gn) / d + 4) / 6; break;
    }
  }
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

function hslToHex(h: number, s: number, l: number): string {
  const sn = s / 100, ln = l / 100;
  const a = sn * Math.min(ln, 1 - ln);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = ln - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`.toUpperCase();
}

function RandomColor() {
  const [color, setColor] = useState(() => randomHex());

  const regenerate = () => setColor(randomHex());

  const { r, g, b } = hexToRgbObj(color);
  const hsl = hexToHsl(color);

  const palette = Array.from({ length: 5 }, (_, i) => {
    const offset = (i - 2) * 30;
    const h = ((hsl.h + offset) % 360 + 360) % 360;
    return hslToHex(h, hsl.s, hsl.l);
  });

  const copyText = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied!");
  };

  return (
    <div className="space-y-6 max-w-sm mx-auto">
      <div
        className="w-full h-40 rounded-2xl border border-white/10 transition-colors duration-300"
        style={{ backgroundColor: color }}
      />

      <div className="space-y-2">
        {[
          { label: "HEX", value: color },
          { label: "RGB", value: `rgb(${r}, ${g}, ${b})` },
          { label: "HSL", value: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` },
        ].map(({ label, value }) => (
          <div
            key={label}
            className="flex items-center justify-between bg-black/30 border border-white/5 rounded-lg px-4 py-3"
          >
            <span className="text-xs text-muted-foreground w-10">{label}</span>
            <span className="font-mono text-sm text-white flex-1">{value}</span>
            <Button
              variant="secondary"
              size="sm"
              className="h-7 w-7 p-0"
              onClick={() => copyText(value)}
            >
              <Copy className="w-3 h-3" />
            </Button>
          </div>
        ))}
      </div>

      <div>
        <p className="text-sm text-muted-foreground mb-2">Analogous Palette</p>
        <div className="flex gap-2">
          {palette.map((c, i) => (
            <button
              key={i}
              className="flex-1 h-10 rounded-lg border border-white/10 transition-transform hover:scale-105"
              style={{ backgroundColor: c }}
              title={c}
              onClick={() => copyText(c)}
            />
          ))}
        </div>
      </div>

      <Button onClick={regenerate} className="w-full h-12 font-bold primary-gradient">
        <RefreshCw className="w-4 h-4 mr-2" /> Regenerate
      </Button>
    </div>
  );
}

// ─── Export ───────────────────────────────────────────────────────────────────
export default function FunRandomTools({ active }: { active: string }) {
  return (
    <ToolPageLayout toolId={active}>
      {active === "random-number" && <RandomNumber />}
      {active === "coin-flipper" && <CoinFlipper />}
      {active === "dice-roller" && <DiceRoller />}
      {active === "random-name-picker" && <RandomNamePicker />}
      {active === "yes-no" && <YesNo />}
      {active === "color-name-finder" && <ColorNameFinder />}
      {active === "random-color" && <RandomColor />}
    </ToolPageLayout>
  );
}
