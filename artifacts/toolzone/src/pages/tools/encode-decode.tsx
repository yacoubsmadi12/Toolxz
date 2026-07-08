import { useState, useMemo } from "react";
import { ToolPageLayout } from "@/components/Layout/ToolPageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Copy } from "lucide-react";

// ─── Base64 Encoder / Decoder ───────────────────────────────────────────────

function Base64EncoderDecoder() {
  const [text, setText] = useState("");
  const [b64, setB64] = useState("");

  const encode = () => {
    try {
      setB64(btoa(unescape(encodeURIComponent(text))));
    } catch {
      toast.error("Encoding failed. Check your input.");
    }
  };

  const decode = () => {
    try {
      setText(decodeURIComponent(escape(atob(b64))));
    } catch {
      toast.error("Invalid Base64 string.");
    }
  };

  const copy = (val: string) => {
    navigator.clipboard.writeText(val);
    toast.success("Copied!");
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Text side */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Plain Text</Label>
            <Button variant="secondary" size="icon" onClick={() => copy(text)} title="Copy">
              <Copy className="w-4 h-4" />
            </Button>
          </div>
          <Textarea
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Enter plain text here..."
            className="min-h-[200px] bg-black/40 font-mono"
          />
        </div>

        {/* Base64 side */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Base64</Label>
            <Button variant="secondary" size="icon" onClick={() => copy(b64)} title="Copy">
              <Copy className="w-4 h-4" />
            </Button>
          </div>
          <Textarea
            value={b64}
            onChange={e => setB64(e.target.value)}
            placeholder="Paste Base64 here..."
            className="min-h-[200px] bg-black/40 font-mono"
          />
        </div>
      </div>

      <div className="flex gap-4 justify-center">
        <Button onClick={encode} className="primary-gradient px-8 h-12 text-base font-semibold">
          Encode →
        </Button>
        <Button onClick={decode} variant="secondary" className="px-8 h-12 text-base font-semibold">
          ← Decode
        </Button>
      </div>
    </div>
  );
}

// ─── Binary ↔ Text ───────────────────────────────────────────────────────────

function BinaryToText() {
  const [text, setText] = useState("");
  const [binary, setBinary] = useState("");

  const textToBinary = () => {
    const result = text
      .split("")
      .map(c => c.charCodeAt(0).toString(2).padStart(8, "0"))
      .join(" ");
    setBinary(result);
  };

  const binaryToText = () => {
    try {
      const groups = binary.trim().split(/\s+/);
      const result = groups.map(g => {
        if (!/^[01]{8}$/.test(g)) throw new Error("invalid");
        return String.fromCharCode(parseInt(g, 2));
      }).join("");
      setText(result);
    } catch {
      toast.error("Invalid binary. Use 8-bit groups separated by spaces.");
    }
  };

  const copy = (val: string) => {
    navigator.clipboard.writeText(val);
    toast.success("Copied!");
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Plain Text</Label>
            <Button variant="secondary" size="icon" onClick={() => copy(text)} title="Copy">
              <Copy className="w-4 h-4" />
            </Button>
          </div>
          <Textarea
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Enter text..."
            className="min-h-[200px] bg-black/40"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Binary</Label>
            <Button variant="secondary" size="icon" onClick={() => copy(binary)} title="Copy">
              <Copy className="w-4 h-4" />
            </Button>
          </div>
          <Textarea
            value={binary}
            onChange={e => setBinary(e.target.value)}
            placeholder="8-bit groups separated by spaces..."
            className="min-h-[200px] bg-black/40 font-mono text-sm"
          />
        </div>
      </div>

      <div className="flex gap-4 justify-center">
        <Button onClick={textToBinary} className="primary-gradient px-8 h-12 text-base font-semibold">
          Text → Binary
        </Button>
        <Button onClick={binaryToText} variant="secondary" className="px-8 h-12 text-base font-semibold">
          Binary → Text
        </Button>
      </div>
    </div>
  );
}

// ─── ASCII Art ───────────────────────────────────────────────────────────────

const BLOCK_FONT: Record<string, string[]> = {
  A: ["  ██  ", " █  █ ", "██████", "█    █", "█    █"],
  B: ["█████ ", "█    █", "█████ ", "█    █", "█████ "],
  C: [" ████ ", "█    █", "█     ", "█    █", " ████ "],
  D: ["█████ ", "█    █", "█    █", "█    █", "█████ "],
  E: ["██████", "█     ", "█████ ", "█     ", "██████"],
  F: ["██████", "█     ", "█████ ", "█     ", "█     "],
  G: [" ████ ", "█     ", "█  ███", "█    █", " ████ "],
  H: ["█    █", "█    █", "██████", "█    █", "█    █"],
  I: ["██████", "  ██  ", "  ██  ", "  ██  ", "██████"],
  J: ["██████", "   █  ", "   █  ", "█  █  ", " ██   "],
  K: ["█   █ ", "█  █  ", "███   ", "█  █  ", "█   █ "],
  L: ["█     ", "█     ", "█     ", "█     ", "██████"],
  M: ["█    █", "██  ██", "█ ██ █", "█    █", "█    █"],
  N: ["█    █", "██   █", "█ █  █", "█  █ █", "█   ██"],
  O: [" ████ ", "█    █", "█    █", "█    █", " ████ "],
  P: ["█████ ", "█    █", "█████ ", "█     ", "█     "],
  Q: [" ████ ", "█    █", "█  █ █", "█   ██", " █████"],
  R: ["█████ ", "█    █", "█████ ", "█  █  ", "█   ██"],
  S: [" ████ ", "█     ", " ████ ", "     █", "█████ "],
  T: ["██████", "  ██  ", "  ██  ", "  ██  ", "  ██  "],
  U: ["█    █", "█    █", "█    █", "█    █", " ████ "],
  V: ["█    █", "█    █", "█    █", " █  █ ", "  ██  "],
  W: ["█    █", "█    █", "█ ██ █", "██  ██", "█    █"],
  X: ["█    █", " █  █ ", "  ██  ", " █  █ ", "█    █"],
  Y: ["█    █", " █  █ ", "  ██  ", "  ██  ", "  ██  "],
  Z: ["██████", "    █ ", "  ██  ", " █    ", "██████"],
  "0": [" ████ ", "█   ██", "█  █ █", "██   █", " ████ "],
  "1": ["  █   ", " ██   ", "  █   ", "  █   ", "██████"],
  "2": [" ████ ", "█    █", "   ██ ", " ██   ", "██████"],
  "3": [" ████ ", "     █", "  ███ ", "     █", " ████ "],
  "4": ["█   █ ", "█   █ ", "██████", "    █ ", "    █ "],
  "5": ["██████", "█     ", "█████ ", "     █", "█████ "],
  "6": [" ████ ", "█     ", "█████ ", "█    █", " ████ "],
  "7": ["██████", "    █ ", "   █  ", "  █   ", " █    "],
  "8": [" ████ ", "█    █", " ████ ", "█    █", " ████ "],
  "9": [" ████ ", "█    █", " █████", "     █", " ████ "],
  " ": ["      ", "      ", "      ", "      ", "      "],
};

const SHADOW_FONT: Record<string, string[]> = {
  A: [" /\\ ", "/--\\", "/  \\", "     ", "     "],
  B: ["|B) ", "|B) ", "|B) ", "     ", "     "],
  C: [" /C)", "/   ", "\\   ", " \\C)", "     "],
  D: ["|D) ", "|  )", "|  )", "|D) ", "     "],
  E: ["|===", "|=  ", "|===", "|   ", "|==="],
  F: ["|===", "|=  ", "|=  ", "|   ", "|   "],
  G: [" /G)", "/  G", "|  G", " \\G)", "     "],
  H: ["|  |", "|  |", "|==|", "|  |", "|  |"],
  I: ["===", " | ", " | ", " | ", "==="],
  J: ["  =J", "   J", "   J", "|  J", " \\J "],
  K: ["|/ ", "|< ", "|  ", "|< ", "|\\ "],
  L: ["|  ", "|  ", "|  ", "|  ", "|=="],
  M: ["|\\/|", "|  |", "|  |", "|  |", "     "],
  N: ["|\\ |", "| \\|", "|  |", "|  |", "     "],
  O: [" /O\\", "/   \\", "|   |", "\\   /", " \\O/"],
  P: ["|P) ", "|P) ", "|   ", "|   ", "    "],
  Q: [" /Q\\", "/   \\", "|  Q|", "\\  Q/", " \\Q/"],
  R: ["|R) ", "|R/ ", "|   ", "|   ", "    "],
  S: ["/S\\", "/  ", "\\S\\", "  \\", "\\S/"],
  T: ["=T=", " | ", " | ", " | ", " | "],
  U: ["|  |", "|  |", "|  |", "|  |", " \\/ "],
  V: ["|  |", "|  |", " \\/ ", " \\/ ", "  V "],
  W: ["|  |", "|  |", "|W |", " \\/ ", "  W "],
  X: ["\\ /", " X ", "/ \\", " X ", "\\ /"],
  Y: ["\\ /", " Y ", " | ", " | ", " | "],
  Z: ["===", "  /", " / ", "/  ", "==="],
  "0": [" 0 ", "/ \\", "| 0|", "\\ /", " 0 "],
  "1": [" 1 ", "/1 ", " 1 ", " 1 ", "=1="],
  "2": [" 2 ", "/ \\", "  2", " / ", "2=="],
  "3": ["=3=", "  3", " 3 ", "  3", "=3="],
  "4": ["4  ", "4  ", "444", "  4", "  4"],
  "5": ["555", "5  ", "555", "  5", "555"],
  "6": [" 6 ", "6  ", "666", "6 6", " 6 "],
  "7": ["777", "  7", " 7 ", "7  ", "   "],
  "8": [" 8 ", "8 8", " 8 ", "8 8", " 8 "],
  "9": [" 9 ", "9 9", " 99", "  9", " 9 "],
  " ": ["   ", "   ", "   ", "   ", "   "],
};

const SIMPLE_FONT: Record<string, string[]> = {
  A: ["  A  ", " A A ", "AAAAA", "A   A", "A   A"],
  B: ["BBBB ", "B   B", "BBBB ", "B   B", "BBBB "],
  C: [" CCC ", "C    ", "C    ", "C    ", " CCC "],
  D: ["DDDD ", "D   D", "D   D", "D   D", "DDDD "],
  E: ["EEEEE", "E    ", "EEE  ", "E    ", "EEEEE"],
  F: ["FFFFF", "F    ", "FFF  ", "F    ", "F    "],
  G: [" GGG ", "G    ", "G GGG", "G   G", " GGG "],
  H: ["H   H", "H   H", "HHHHH", "H   H", "H   H"],
  I: ["IIIII", "  I  ", "  I  ", "  I  ", "IIIII"],
  J: ["JJJJJ", "   J ", "   J ", "J  J ", " JJ  "],
  K: ["K   K", "K  K ", "KKK  ", "K  K ", "K   K"],
  L: ["L    ", "L    ", "L    ", "L    ", "LLLLL"],
  M: ["M   M", "MM MM", "M M M", "M   M", "M   M"],
  N: ["N   N", "NN  N", "N N N", "N  NN", "N   N"],
  O: [" OOO ", "O   O", "O   O", "O   O", " OOO "],
  P: ["PPPP ", "P   P", "PPPP ", "P    ", "P    "],
  Q: [" QQQ ", "Q   Q", "Q Q Q", "Q  QQ", " QQQQ"],
  R: ["RRRR ", "R   R", "RRRR ", "R  R ", "R   R"],
  S: [" SSS ", "S    ", " SSS ", "    S", " SSS "],
  T: ["TTTTT", "  T  ", "  T  ", "  T  ", "  T  "],
  U: ["U   U", "U   U", "U   U", "U   U", " UUU "],
  V: ["V   V", "V   V", "V   V", " V V ", "  V  "],
  W: ["W   W", "W   W", "W W W", "WW WW", "W   W"],
  X: ["X   X", " X X ", "  X  ", " X X ", "X   X"],
  Y: ["Y   Y", " Y Y ", "  Y  ", "  Y  ", "  Y  "],
  Z: ["ZZZZZ", "   Z ", "  Z  ", " Z   ", "ZZZZZ"],
  "0": [" 000 ", "0   0", "0   0", "0   0", " 000 "],
  "1": [" 1  ", "11  ", " 1  ", " 1  ", "1111"],
  "2": [" 222 ", "2   2", "  22 ", " 2   ", "22222"],
  "3": ["3333 ", "    3", " 333 ", "    3", "3333 "],
  "4": ["4  4 ", "4  4 ", "44444", "   4 ", "   4 "],
  "5": ["55555", "5    ", "5555 ", "    5", "5555 "],
  "6": [" 666 ", "6    ", "6666 ", "6   6", " 666 "],
  "7": ["77777", "   7 ", "  7  ", " 7   ", " 7   "],
  "8": [" 888 ", "8   8", " 888 ", "8   8", " 888 "],
  "9": [" 999 ", "9   9", " 9999", "    9", " 999 "],
  " ": ["     ", "     ", "     ", "     ", "     "],
};

const STARS_FONT: Record<string, string[]> = {
  A: [" *A* ", "*   *", "*****", "*   *", "*   *"],
  B: ["BBB* ", "B  *B", "BBB* ", "B  *B", "BBB* "],
  C: ["*CCC*", "*    ", "*    ", "*    ", "*CCC*"],
  D: ["DDD* ", "D  *D", "D  *D", "D  *D", "DDD* "],
  E: ["*****", "*    ", "***  ", "*    ", "*****"],
  F: ["*****", "*    ", "***  ", "*    ", "*    "],
  G: ["*GGG*", "*    ", "* GG*", "*  * ", "*GGG*"],
  H: ["*   *", "*   *", "*****", "*   *", "*   *"],
  I: ["*****", " * * ", " * * ", " * * ", "*****"],
  J: ["*****", "  *  ", "  *  ", "*  * ", " **  "],
  K: ["*  * ", "* *  ", "**   ", "* *  ", "*  * "],
  L: ["*    ", "*    ", "*    ", "*    ", "*****"],
  M: ["*   *", "** **", "* * *", "*   *", "*   *"],
  N: ["*   *", "**  *", "* * *", "*  **", "*   *"],
  O: ["*OOO*", "*   *", "*   *", "*   *", "*OOO*"],
  P: ["PPP* ", "P  *P", "PPP* ", "P    ", "P    "],
  Q: ["*QQQ*", "*   *", "* Q *", "*  **", "*QQQ*"],
  R: ["RRR* ", "R  *R", "RRR* ", "R  * ", "R   *"],
  S: ["*SSS*", "*    ", "*SSS*", "    *", "*SSS*"],
  T: ["*****", "  *  ", "  *  ", "  *  ", "  *  "],
  U: ["*   *", "*   *", "*   *", "*   *", " *** "],
  V: ["*   *", "*   *", "*   *", " * * ", "  *  "],
  W: ["*   *", "*   *", "* * *", "** **", "*   *"],
  X: ["*   *", " * * ", "  *  ", " * * ", "*   *"],
  Y: ["*   *", " * * ", "  *  ", "  *  ", "  *  "],
  Z: ["*****", "   * ", "  *  ", " *   ", "*****"],
  "0": [" *0* ", "*   *", "*  **", "** * ", " *0* "],
  "1": ["  *  ", " **  ", "  *  ", "  *  ", "*****"],
  "2": ["*222*", "*   *", "  ** ", " *   ", "*****"],
  "3": ["*333 ", "    *", " *** ", "    *", "*333 "],
  "4": ["*  * ", "*  * ", "*****", "   * ", "   * "],
  "5": ["*****", "*    ", "***** ", "    *", "***** "],
  "6": [" *6* ", "*    ", "**6* ", "*  * ", " *6* "],
  "7": ["*****", "   * ", "  *  ", " *   ", " *   "],
  "8": [" *8* ", "*   *", " *8* ", "*   *", " *8* "],
  "9": [" *9* ", "*   *", " *9**", "    *", " *9* "],
  " ": ["     ", "     ", "     ", "     ", "     "],
};

const THIN_FONT: Record<string, string[]> = {
  A: [" /\\ ", "/  \\", "/--\\", "|  |", "|  |"],
  B: ["|B) ", "|B) ", "|B) ", "|   ", "    "],
  C: [" /C ", "/   ", "|   ", "\\   ", " \\C "],
  D: ["|D\\ ", "|  \\", "|  |", "|  /", "|D/ "],
  E: ["|===", "|   ", "|== ", "|   ", "|==="],
  F: ["|===", "|   ", "|== ", "|   ", "|   "],
  G: [" /G ", "/   ", "| GG", "|  G", " \\G "],
  H: ["|  |", "|  |", "|==|", "|  |", "|  |"],
  I: ["-I-", " | ", " | ", " | ", "-I-"],
  J: ["  J", "  J", "  J", "| J", " J "],
  K: ["|/K", "|< ", "|  ", "|< ", "|\\ "],
  L: ["|  ", "|  ", "|  ", "|  ", "|--"],
  M: ["|V|", "| |", "| |", "| |", "   "],
  N: ["|\\ ", "| \\", "|  |", "|  |", "   "],
  O: [" /O\\", "/   \\", "|   |", "\\   /", " \\O/"],
  P: ["|P\\", "|P/", "|  ", "|  ", "   "],
  Q: [" /Q\\", "/   \\", "|  Q ", "\\   /", " \\Q/"],
  R: ["|R\\", "|R/", "|R\\", "|  ", "   "],
  S: ["/S\\", "/  ", "\\S\\", "  \\", "\\S/"],
  T: ["-T-", " | ", " | ", " | ", " | "],
  U: ["|  |", "|  |", "|  |", "|  |", " \\/ "],
  V: ["|  |", "|  |", " \\/ ", "  V ", "    "],
  W: ["|  |", "|  |", "|W |", " \\/ ", "  W "],
  X: ["\\ /", " X ", "/ \\", " X ", "\\ /"],
  Y: ["\\ /", " Y ", " | ", " | ", " | "],
  Z: ["---", "  /", " / ", "/  ", "---"],
  "0": ["(0)", "| |", "| |", "| |", "(0)"],
  "1": [" 1 ", "/1 ", " 1 ", " 1 ", "-1-"],
  "2": ["(2)", "  |", " / ", "/  ", "(2)"],
  "3": ["-3-", "  |", " 3 ", "  |", "-3-"],
  "4": ["4  ", "4  ", "444", "  4", "  4"],
  "5": ["-5-", "5  ", "-5-", "  5", "-5-"],
  "6": ["(6)", "6  ", "(6)", "6  6", "(6)"],
  "7": ["-7-", "  7", " / ", "7  ", "   "],
  "8": ["(8)", "| |", "(8)", "| |", "(8)"],
  "9": ["(9)", "| |", "(9)", "  |", "(9)"],
  " ": ["   ", "   ", "   ", "   ", "   "],
};

const FONTS: Record<string, Record<string, string[]>> = {
  Block: BLOCK_FONT,
  Simple: SIMPLE_FONT,
  Stars: STARS_FONT,
  Shadow: SHADOW_FONT,
  Thin: THIN_FONT,
};

function AsciiArt() {
  const [inputText, setInputText] = useState("HELLO");
  const [style, setStyle] = useState("Block");

  const asciiArt = useMemo(() => {
    const font = FONTS[style] || BLOCK_FONT;
    const chars = inputText.toUpperCase().slice(0, 20).split("");
    const rows = 5;
    const lines: string[] = [];
    for (let row = 0; row < rows; row++) {
      const line = chars
        .map(ch => (font[ch] ? font[ch][row] : (font[" "] ? font[" "][row] : "     ")))
        .join("  ");
      lines.push(line);
    }
    return lines.join("\n");
  }, [inputText, style]);

  const copy = () => {
    navigator.clipboard.writeText(asciiArt);
    toast.success("Copied!");
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 space-y-2">
          <Label>Text (max 20 chars)</Label>
          <Input
            value={inputText}
            onChange={e => setInputText(e.target.value.slice(0, 20))}
            placeholder="Enter text..."
            className="bg-black/40 h-12 text-lg"
            maxLength={20}
          />
        </div>
        <div className="space-y-2">
          <Label>Style</Label>
          <select
            value={style}
            onChange={e => setStyle(e.target.value)}
            className="w-full h-12 rounded-md bg-black/40 border border-white/10 text-white px-3 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {Object.keys(FONTS).map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="relative bg-black/30 border border-white/5 rounded-xl p-6">
        <Button
          variant="secondary"
          size="icon"
          onClick={copy}
          className="absolute right-4 top-4"
          title="Copy"
        >
          <Copy className="w-4 h-4" />
        </Button>
        <pre className="font-mono text-primary text-xs sm:text-sm overflow-x-auto leading-relaxed whitespace-pre">
          {asciiArt || "Start typing..."}
        </pre>
      </div>
    </div>
  );
}

// ─── Export ──────────────────────────────────────────────────────────────────

export default function EncodeDecodeTools({ active }: { active: string }) {
  return (
    <ToolPageLayout toolId={active}>
      {active === "base64-encoder" && <Base64EncoderDecoder />}
      {active === "binary-to-text" && <BinaryToText />}
      {active === "ascii-art" && <AsciiArt />}
    </ToolPageLayout>
  );
}
