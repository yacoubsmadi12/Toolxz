import { useState, useCallback, useMemo, useEffect } from "react";
import { ToolPageLayout } from "@/components/Layout/ToolPageLayout";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Copy, RefreshCw } from "lucide-react";

// Tools
function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [password, setPassword] = useState("");

  const generate = useCallback(() => {
    let charset = "";
    if (uppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (lowercase) charset += "abcdefghijklmnopqrstuvwxyz";
    if (numbers) charset += "0123456789";
    if (symbols) charset += "!@#$%^&*()_+~`|}{[]:;?><,./-=";
    
    if (!charset) {
      toast.error("Select at least one character type");
      return;
    }

    let result = "";
    for (let i = 0; i < length; i++) {
      result += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setPassword(result);
  }, [length, uppercase, lowercase, numbers, symbols]);

  // Initial generation
  useState(() => { generate(); });

  const copy = () => {
    navigator.clipboard.writeText(password);
    toast.success("Password copied to clipboard!");
  };

  return (
    <div className="space-y-6">
      <div className="relative">
        <div className="w-full bg-black/40 border border-white/10 rounded-xl p-4 pr-24 text-2xl font-mono text-center break-all text-primary h-auto min-h-16 flex items-center justify-center">
          {password || "Select options to generate"}
        </div>
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-2">
          <Button variant="ghost" size="icon" onClick={copy} className="hover:bg-primary/20 hover:text-primary">
            <Copy className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" onClick={generate} className="hover:bg-primary/20 hover:text-primary">
            <RefreshCw className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div className="space-y-4 bg-card/50 p-6 rounded-xl border border-white/5">
        <div className="space-y-4">
          <div className="flex justify-between">
            <Label className="text-base">Password Length</Label>
            <span className="font-mono text-primary">{length}</span>
          </div>
          <Slider 
            value={[length]} 
            onValueChange={v => setLength(v[0])} 
            max={64} 
            min={8} 
            step={1} 
            className="w-full"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
          <div className="flex items-center justify-between p-3 bg-black/20 rounded-lg border border-white/5">
            <Label htmlFor="uppercase" className="cursor-pointer">Uppercase (A-Z)</Label>
            <Switch id="uppercase" checked={uppercase} onCheckedChange={setUppercase} />
          </div>
          <div className="flex items-center justify-between p-3 bg-black/20 rounded-lg border border-white/5">
            <Label htmlFor="lowercase" className="cursor-pointer">Lowercase (a-z)</Label>
            <Switch id="lowercase" checked={lowercase} onCheckedChange={setLowercase} />
          </div>
          <div className="flex items-center justify-between p-3 bg-black/20 rounded-lg border border-white/5">
            <Label htmlFor="numbers" className="cursor-pointer">Numbers (0-9)</Label>
            <Switch id="numbers" checked={numbers} onCheckedChange={setNumbers} />
          </div>
          <div className="flex items-center justify-between p-3 bg-black/20 rounded-lg border border-white/5">
            <Label htmlFor="symbols" className="cursor-pointer">Symbols (!@#)</Label>
            <Switch id="symbols" checked={symbols} onCheckedChange={setSymbols} />
          </div>
        </div>
      </div>

      <Button onClick={generate} className="w-full py-6 text-lg font-bold primary-gradient border-none">
        Generate Password
      </Button>
    </div>
  );
}

function PasswordStrength() {
  const [password, setPassword] = useState("");

  const strength = useMemo(() => {
    let score = 0;
    if (!password) return { score: 0, text: "None", color: "bg-muted" };
    
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score < 2) return { score: 20, text: "Very Weak", color: "bg-destructive" };
    if (score < 3) return { score: 40, text: "Weak", color: "bg-orange-500" };
    if (score < 4) return { score: 60, text: "Fair", color: "bg-yellow-500" };
    if (score < 5) return { score: 80, text: "Good", color: "bg-blue-500" };
    return { score: 100, text: "Strong", color: "bg-green-500" };
  }, [password]);

  const criteria = [
    { label: "At least 8 characters", valid: password.length >= 8 },
    { label: "Contains uppercase letter", valid: /[A-Z]/.test(password) },
    { label: "Contains lowercase letter", valid: /[a-z]/.test(password) },
    { label: "Contains number", valid: /[0-9]/.test(password) },
    { label: "Contains symbol", valid: /[^A-Za-z0-9]/.test(password) },
  ];

  return (
    <div className="space-y-6">
      <div>
        <Label>Type a password to check</Label>
        <Input 
          type="text" 
          value={password} 
          onChange={e => setPassword(e.target.value)} 
          placeholder="e.g. CorrectHorseBatteryStaple!"
          className="mt-2 h-14 text-lg bg-black/40 font-mono"
        />
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center text-sm font-medium">
          <span>Strength: <span className="text-white">{strength.text}</span></span>
        </div>
        <div className="h-3 w-full bg-black/40 rounded-full overflow-hidden">
          <div 
            className={`h-full transition-all duration-500 ${strength.color}`} 
            style={{ width: `${strength.score}%` }}
          />
        </div>
      </div>

      <div className="bg-card/50 p-6 rounded-xl border border-white/5 space-y-3">
        <h4 className="font-semibold mb-2">Criteria</h4>
        {criteria.map((c, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${c.valid ? 'bg-green-500/20 text-green-500' : 'bg-white/5 text-muted-foreground'}`}>
              {c.valid ? '✓' : '○'}
            </div>
            <span className={c.valid ? 'text-white' : 'text-muted-foreground'}>{c.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Very simple MD5 implementation for client-side
function md5(string: string) {
  // Real implementation would use crypto-js or web crypto API (which doesn't support md5)
  // For this exercise, we will just simulate it if crypto subtle isn't enough
  // A full MD5 algo is long, let's use a dummy hash or import a lightweight library?
  // We'll use Web Crypto for SHA, and a stub for MD5 unless we bring in a lib.
  // We'll just show a hex string based on simple hashing for MD5 if no library.
  return "MD5 implementation requires external library. Use SHA variants instead.";
}

async function hashText(text: string, algo: string) {
  if (algo === 'MD5') return "MD5 not natively supported in Web Crypto API.";
  
  const msgUint8 = new TextEncoder().encode(text);
  const hashBuffer = await crypto.subtle.digest(algo, msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

function HashGenerator() {
  const [input, setInput] = useState("");
  const [hash, setHash] = useState("");
  const [algo, setAlgo] = useState("SHA-256");

  useEffect(() => {
    if (!input) {
      setHash("");
      return;
    }
    hashText(input, algo).then(setHash).catch(e => setHash("Error generating hash"));
  }, [input, algo]);

  const copy = () => {
    if(!hash) return;
    navigator.clipboard.writeText(hash);
    toast.success("Hash copied!");
  };

  return (
    <div className="space-y-6">
      <div>
        <Label>Input Text</Label>
        <Textarea 
          value={input} 
          onChange={e => setInput(e.target.value)} 
          placeholder="Type or paste text here..."
          className="mt-2 min-h-[120px] bg-black/40 resize-y font-mono"
        />
      </div>

      <Tabs value={algo} onValueChange={setAlgo} className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-black/40">
          <TabsTrigger value="SHA-1">SHA-1</TabsTrigger>
          <TabsTrigger value="SHA-256">SHA-256</TabsTrigger>
          <TabsTrigger value="SHA-384">SHA-384</TabsTrigger>
          <TabsTrigger value="SHA-512">SHA-512</TabsTrigger>
        </TabsList>
      </Tabs>

      <div>
        <Label>Generated {algo} Hash</Label>
        <div className="relative mt-2">
          <Textarea 
            value={hash} 
            readOnly
            className="min-h-[100px] bg-black/60 font-mono text-primary pr-12 break-all"
          />
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={copy} 
            className="absolute right-2 top-2 hover:bg-primary/20 hover:text-primary"
            disabled={!hash}
          >
            <Copy className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

function UuidGenerator() {
  const [uuids, setUuids] = useState<string[]>([]);
  const [count, setCount] = useState(1);

  const generate = () => {
    const newUuids = [];
    for(let i=0; i<count; i++) {
      newUuids.push(crypto.randomUUID());
    }
    setUuids(newUuids);
  };

  useState(() => { generate() });

  const copyAll = () => {
    navigator.clipboard.writeText(uuids.join('\n'));
    toast.success(`${uuids.length} UUIDs copied!`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-end">
        <div className="w-full sm:w-1/3">
          <Label>Quantity (1-100)</Label>
          <Input 
            type="number" 
            min={1} max={100} 
            value={count} 
            onChange={e => setCount(Math.min(100, Math.max(1, parseInt(e.target.value) || 1)))} 
            className="mt-2 bg-black/40"
          />
        </div>
        <Button onClick={generate} className="w-full sm:w-2/3 primary-gradient">
          Generate UUIDs
        </Button>
      </div>

      <div className="relative">
        <div className="bg-black/60 rounded-xl border border-white/10 p-4 max-h-[400px] overflow-y-auto font-mono text-sm space-y-1">
          {uuids.map((u, i) => (
            <div key={i} className="text-primary hover:bg-white/5 px-2 py-1 rounded cursor-pointer transition-colors" onClick={() => {
              navigator.clipboard.writeText(u);
              toast.success("Copied!");
            }}>
              {u}
            </div>
          ))}
        </div>
        <Button 
          variant="secondary" 
          onClick={copyAll} 
          className="absolute right-4 top-4"
        >
          <Copy className="w-4 h-4 mr-2" /> Copy All
        </Button>
      </div>
    </div>
  );
}

function RandomString() {
  const [length, setLength] = useState(16);
  const [count, setCount] = useState(5);
  const [charset, setCharset] = useState("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789");
  const [results, setResults] = useState<string[]>([]);

  const generate = () => {
    if(!charset) {
      toast.error("Charset cannot be empty");
      return;
    }
    const res = [];
    for(let i=0; i<count; i++) {
      let str = "";
      for(let j=0; j<length; j++) {
        str += charset.charAt(Math.floor(Math.random() * charset.length));
      }
      res.push(str);
    }
    setResults(res);
  };

  useState(() => generate());

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label>String Length</Label>
          <Input type="number" min={1} max={1024} value={length} onChange={e => setLength(parseInt(e.target.value)||16)} className="mt-2 bg-black/40" />
        </div>
        <div>
          <Label>Quantity</Label>
          <Input type="number" min={1} max={100} value={count} onChange={e => setCount(parseInt(e.target.value)||5)} className="mt-2 bg-black/40" />
        </div>
      </div>
      
      <div>
        <Label>Characters Set</Label>
        <Input type="text" value={charset} onChange={e => setCharset(e.target.value)} className="mt-2 bg-black/40 font-mono" />
      </div>

      <Button onClick={generate} className="w-full primary-gradient">Generate Strings</Button>

      <div className="relative">
        <Textarea 
          value={results.join('\n')} 
          readOnly 
          className="min-h-[200px] bg-black/60 font-mono text-primary text-sm whitespace-pre"
        />
        <Button 
          variant="secondary" 
          size="sm"
          onClick={() => {
            navigator.clipboard.writeText(results.join('\n'));
            toast.success("Copied!");
          }} 
          className="absolute right-4 top-4"
        >
          <Copy className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}


export default function SecurityTools({ active }: { active: string }) {
  return (
    <ToolPageLayout toolId={active}>
      {active === "password-generator" && <PasswordGenerator />}
      {active === "password-strength" && <PasswordStrength />}
      {active === "hash-generator" && <HashGenerator />}
      {active === "uuid-generator" && <UuidGenerator />}
      {active === "random-string" && <RandomString />}
    </ToolPageLayout>
  );
}
