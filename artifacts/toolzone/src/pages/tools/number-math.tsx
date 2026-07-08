import { useState, useCallback } from "react";
import { ToolPageLayout } from "@/components/Layout/ToolPageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { ArrowLeftRight, Copy } from "lucide-react";

// ─── Age Calculator ───────────────────────────────────────────────────────────
function AgeCalculator() {
  const [dob, setDob] = useState("");
  const [result, setResult] = useState<{ y: number; m: number; d: number } | null>(null);

  const calculate = () => {
    if (!dob) return;
    const birthDate = new Date(dob);
    const today = new Date();

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
      months--;
      days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    setResult({ y: years, m: months, d: days });
  };

  return (
    <div className="space-y-8 max-w-md mx-auto">
      <div>
        <Label>Date of Birth</Label>
        <Input
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          className="mt-2 h-14 bg-black/40 text-lg"
        />
      </div>
      <Button onClick={calculate} className="w-full h-14 text-lg font-bold primary-gradient">
        Calculate Age
      </Button>

      {result && (
        <div className="bg-black/30 p-8 rounded-2xl border border-white/5 text-center animate-in fade-in slide-in-from-bottom-4">
          <div className="text-muted-foreground mb-2">You are exactly</div>
          <div className="text-5xl font-extrabold text-primary mb-6">
            {result.y} <span className="text-2xl text-white font-medium">years</span>
          </div>
          <div className="flex justify-center gap-8 text-xl">
            <div>
              <span className="font-bold text-white">{result.m}</span>
              <span className="text-muted-foreground text-base ml-1">months</span>
            </div>
            <div>
              <span className="font-bold text-white">{result.d}</span>
              <span className="text-muted-foreground text-base ml-1">days</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── BMI Calculator ───────────────────────────────────────────────────────────
function BmiCalculator() {
  const [cm, setCm] = useState(175);
  const [kg, setKg] = useState(70);
  const [bmi, setBmi] = useState<number | null>(null);

  const calculate = () => {
    const m = cm / 100;
    const val = kg / (m * m);
    setBmi(Math.round(val * 10) / 10);
  };

  const getCategory = (b: number) => {
    if (b < 18.5) return { text: "Underweight", color: "text-blue-400" };
    if (b < 25) return { text: "Normal weight", color: "text-green-400" };
    if (b < 30) return { text: "Overweight", color: "text-yellow-400" };
    return { text: "Obese", color: "text-red-400" };
  };

  return (
    <div className="space-y-6 max-w-md mx-auto">
      <div>
        <Label>Height (cm)</Label>
        <Input
          type="number"
          value={cm}
          onChange={(e) => setCm(Number(e.target.value))}
          className="mt-2 bg-black/40 h-12"
        />
      </div>
      <div>
        <Label>Weight (kg)</Label>
        <Input
          type="number"
          value={kg}
          onChange={(e) => setKg(Number(e.target.value))}
          className="mt-2 bg-black/40 h-12"
        />
      </div>
      <Button onClick={calculate} className="w-full primary-gradient h-12">
        Calculate BMI
      </Button>

      {bmi !== null && (
        <div className="text-center bg-black/30 p-8 rounded-xl border border-white/5 animate-in zoom-in-95">
          <div className="text-6xl font-black text-white mb-2">{bmi}</div>
          <div className={`text-xl font-bold ${getCategory(bmi).color}`}>
            {getCategory(bmi).text}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Percentage Calculator ────────────────────────────────────────────────────
function PercentageCalculator() {
  const [xOfY, setXOfY] = useState({ x: "", y: "" });
  const [isWhat, setIsWhat] = useState({ x: "", y: "" });
  const [pChange, setPChange] = useState({ x: "", y: "" });
  const [results, setResults] = useState({ tab1: "", tab2: "", tab3: "" });

  const calcXofY = () => {
    const x = parseFloat(xOfY.x);
    const y = parseFloat(xOfY.y);
    if (isNaN(x) || isNaN(y)) return;
    setResults((r) => ({ ...r, tab1: ((x / 100) * y).toFixed(4).replace(/\.?0+$/, "") }));
  };

  const calcIsWhat = () => {
    const x = parseFloat(isWhat.x);
    const y = parseFloat(isWhat.y);
    if (isNaN(x) || isNaN(y) || y === 0) return;
    setResults((r) => ({ ...r, tab2: ((x / y) * 100).toFixed(4).replace(/\.?0+$/, "") + "%" }));
  };

  const calcPChange = () => {
    const x = parseFloat(pChange.x);
    const y = parseFloat(pChange.y);
    if (isNaN(x) || isNaN(y) || x === 0) return;
    const change = ((y - x) / Math.abs(x)) * 100;
    const sign = change >= 0 ? "+" : "";
    setResults((r) => ({
      ...r,
      tab3: `${sign}${change.toFixed(4).replace(/\.?0+$/, "")}%`,
    }));
  };

  return (
    <div className="max-w-md mx-auto">
      <Tabs defaultValue="xofy">
        <TabsList className="w-full mb-6">
          <TabsTrigger value="xofy" className="flex-1 text-xs">X% of Y</TabsTrigger>
          <TabsTrigger value="iswhat" className="flex-1 text-xs">X is what % of Y</TabsTrigger>
          <TabsTrigger value="pchange" className="flex-1 text-xs">% Change</TabsTrigger>
        </TabsList>

        <TabsContent value="xofy" className="space-y-4">
          <div className="flex gap-3 items-end">
            <div className="flex-1">
              <Label>X (%)</Label>
              <Input
                type="number"
                placeholder="e.g. 15"
                value={xOfY.x}
                onChange={(e) => setXOfY((v) => ({ ...v, x: e.target.value }))}
                className="mt-2 bg-black/40 h-12"
              />
            </div>
            <div className="flex-1">
              <Label>Y (value)</Label>
              <Input
                type="number"
                placeholder="e.g. 200"
                value={xOfY.y}
                onChange={(e) => setXOfY((v) => ({ ...v, y: e.target.value }))}
                className="mt-2 bg-black/40 h-12"
              />
            </div>
          </div>
          <Button onClick={calcXofY} className="w-full primary-gradient h-12">Calculate</Button>
          {results.tab1 && (
            <div className="bg-black/30 border border-white/5 rounded-xl p-6 text-center">
              <div className="text-muted-foreground text-sm mb-1">{xOfY.x}% of {xOfY.y} is</div>
              <div className="text-4xl font-black text-primary font-mono">{results.tab1}</div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="iswhat" className="space-y-4">
          <div className="flex gap-3 items-end">
            <div className="flex-1">
              <Label>X (value)</Label>
              <Input
                type="number"
                placeholder="e.g. 30"
                value={isWhat.x}
                onChange={(e) => setIsWhat((v) => ({ ...v, x: e.target.value }))}
                className="mt-2 bg-black/40 h-12"
              />
            </div>
            <div className="flex-1">
              <Label>Y (total)</Label>
              <Input
                type="number"
                placeholder="e.g. 200"
                value={isWhat.y}
                onChange={(e) => setIsWhat((v) => ({ ...v, y: e.target.value }))}
                className="mt-2 bg-black/40 h-12"
              />
            </div>
          </div>
          <Button onClick={calcIsWhat} className="w-full primary-gradient h-12">Calculate</Button>
          {results.tab2 && (
            <div className="bg-black/30 border border-white/5 rounded-xl p-6 text-center">
              <div className="text-muted-foreground text-sm mb-1">{isWhat.x} is what % of {isWhat.y}?</div>
              <div className="text-4xl font-black text-primary font-mono">{results.tab2}</div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="pchange" className="space-y-4">
          <div className="flex gap-3 items-end">
            <div className="flex-1">
              <Label>From (X)</Label>
              <Input
                type="number"
                placeholder="e.g. 100"
                value={pChange.x}
                onChange={(e) => setPChange((v) => ({ ...v, x: e.target.value }))}
                className="mt-2 bg-black/40 h-12"
              />
            </div>
            <div className="flex-1">
              <Label>To (Y)</Label>
              <Input
                type="number"
                placeholder="e.g. 150"
                value={pChange.y}
                onChange={(e) => setPChange((v) => ({ ...v, y: e.target.value }))}
                className="mt-2 bg-black/40 h-12"
              />
            </div>
          </div>
          <Button onClick={calcPChange} className="w-full primary-gradient h-12">Calculate</Button>
          {results.tab3 && (
            <div className="bg-black/30 border border-white/5 rounded-xl p-6 text-center">
              <div className="text-muted-foreground text-sm mb-1">% change from {pChange.x} to {pChange.y}</div>
              <div className={`text-4xl font-black font-mono ${results.tab3.startsWith("+") ? "text-green-400" : "text-red-400"}`}>
                {results.tab3}
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

// ─── EMI Calculator ───────────────────────────────────────────────────────────
function EmiCalculator() {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [tenure, setTenure] = useState("");
  const [tenureUnit, setTenureUnit] = useState<"months" | "years">("years");
  const [result, setResult] = useState<{ emi: number; totalInterest: number; totalPayment: number } | null>(null);

  const calculate = () => {
    const P = parseFloat(principal);
    const annualRate = parseFloat(rate);
    const t = parseFloat(tenure);
    if (isNaN(P) || isNaN(annualRate) || isNaN(t) || P <= 0 || annualRate <= 0 || t <= 0) return;

    const n = tenureUnit === "years" ? t * 12 : t;
    const r = annualRate / 12 / 100;

    const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayment = emi * n;
    const totalInterest = totalPayment - P;

    setResult({ emi, totalInterest, totalPayment });
  };

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="space-y-6 max-w-md mx-auto">
      <div>
        <Label>Loan Amount</Label>
        <Input
          type="number"
          placeholder="e.g. 500000"
          value={principal}
          onChange={(e) => setPrincipal(e.target.value)}
          className="mt-2 bg-black/40 h-12"
        />
      </div>
      <div>
        <Label>Annual Interest Rate (%)</Label>
        <Input
          type="number"
          placeholder="e.g. 8.5"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
          className="mt-2 bg-black/40 h-12"
        />
      </div>
      <div>
        <Label>Loan Tenure</Label>
        <div className="flex gap-2 mt-2">
          <Input
            type="number"
            placeholder="e.g. 5"
            value={tenure}
            onChange={(e) => setTenure(e.target.value)}
            className="bg-black/40 h-12 flex-1"
          />
          <select
            value={tenureUnit}
            onChange={(e) => setTenureUnit(e.target.value as "months" | "years")}
            className="bg-black/40 border border-white/10 rounded-md px-3 text-white h-12"
          >
            <option value="years">Years</option>
            <option value="months">Months</option>
          </select>
        </div>
      </div>
      <Button onClick={calculate} className="w-full primary-gradient h-12">Calculate EMI</Button>

      {result && (
        <div className="space-y-3 animate-in fade-in slide-in-from-bottom-4">
          <div className="bg-black/30 border border-white/5 rounded-xl p-6 text-center">
            <div className="text-muted-foreground text-sm mb-1">Monthly EMI</div>
            <div className="text-4xl font-black text-primary font-mono">{fmt(result.emi)}</div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-black/30 border border-white/5 rounded-xl p-4 text-center">
              <div className="text-muted-foreground text-xs mb-1">Total Interest</div>
              <div className="text-xl font-bold text-red-400 font-mono">{fmt(result.totalInterest)}</div>
            </div>
            <div className="bg-black/30 border border-white/5 rounded-xl p-4 text-center">
              <div className="text-muted-foreground text-xs mb-1">Total Payment</div>
              <div className="text-xl font-bold text-white font-mono">{fmt(result.totalPayment)}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Tip Calculator ───────────────────────────────────────────────────────────
function TipCalculator() {
  const [bill, setBill] = useState("");
  const [tipPct, setTipPct] = useState(15);
  const [customTip, setCustomTip] = useState("");
  const [isCustom, setIsCustom] = useState(false);
  const [split, setSplit] = useState(1);

  const presets = [10, 15, 18, 20, 25];

  const effectiveTip = isCustom ? parseFloat(customTip) || 0 : tipPct;
  const billNum = parseFloat(bill) || 0;
  const tipAmount = (billNum * effectiveTip) / 100;
  const total = billNum + tipAmount;
  const perPerson = split > 0 ? total / split : total;

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="space-y-6 max-w-md mx-auto">
      <div>
        <Label>Bill Amount</Label>
        <Input
          type="number"
          placeholder="e.g. 85.00"
          value={bill}
          onChange={(e) => setBill(e.target.value)}
          className="mt-2 bg-black/40 h-12"
        />
      </div>

      <div>
        <Label>Tip %</Label>
        <div className="flex gap-2 mt-2 flex-wrap">
          {presets.map((p) => (
            <Button
              key={p}
              variant="secondary"
              onClick={() => { setTipPct(p); setIsCustom(false); }}
              className={`flex-1 min-w-[50px] h-10 ${!isCustom && tipPct === p ? "primary-gradient" : ""}`}
            >
              {p}%
            </Button>
          ))}
          <Button
            variant="secondary"
            onClick={() => setIsCustom(true)}
            className={`flex-1 min-w-[60px] h-10 ${isCustom ? "primary-gradient" : ""}`}
          >
            Custom
          </Button>
        </div>
        {isCustom && (
          <Input
            type="number"
            placeholder="Enter tip %"
            value={customTip}
            onChange={(e) => setCustomTip(e.target.value)}
            className="mt-2 bg-black/40 h-12"
          />
        )}
      </div>

      <div>
        <Label>Split by (people)</Label>
        <Input
          type="number"
          min={1}
          value={split}
          onChange={(e) => setSplit(Math.max(1, parseInt(e.target.value) || 1))}
          className="mt-2 bg-black/40 h-12"
        />
      </div>

      {billNum > 0 && (
        <div className="space-y-3 animate-in fade-in slide-in-from-bottom-4">
          <div className="bg-black/30 border border-white/5 rounded-xl p-6 text-center">
            <div className="text-muted-foreground text-sm mb-1">Per Person</div>
            <div className="text-4xl font-black text-primary font-mono">{fmt(perPerson)}</div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-black/30 border border-white/5 rounded-xl p-4 text-center">
              <div className="text-muted-foreground text-xs mb-1">Tip Amount</div>
              <div className="text-xl font-bold text-green-400 font-mono">{fmt(tipAmount)}</div>
            </div>
            <div className="bg-black/30 border border-white/5 rounded-xl p-4 text-center">
              <div className="text-muted-foreground text-xs mb-1">Total Bill</div>
              <div className="text-xl font-bold text-white font-mono">{fmt(total)}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Discount Calculator ──────────────────────────────────────────────────────
function DiscountCalculator() {
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [result, setResult] = useState<{ final: number; saved: number; pct: number } | null>(null);

  const calculate = () => {
    const p = parseFloat(price);
    const d = parseFloat(discount);
    if (isNaN(p) || isNaN(d) || p <= 0) return;
    const saved = (p * d) / 100;
    setResult({ final: p - saved, saved, pct: d });
  };

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="space-y-6 max-w-md mx-auto">
      <div>
        <Label>Original Price</Label>
        <Input
          type="number"
          placeholder="e.g. 299.99"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="mt-2 bg-black/40 h-12"
        />
      </div>
      <div>
        <Label>Discount (%)</Label>
        <Input
          type="number"
          placeholder="e.g. 25"
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
          className="mt-2 bg-black/40 h-12"
        />
      </div>
      <Button onClick={calculate} className="w-full primary-gradient h-12">Calculate Discount</Button>

      {result && (
        <div className="space-y-3 animate-in fade-in slide-in-from-bottom-4">
          <div className="bg-black/30 border border-white/5 rounded-xl p-6 text-center">
            <div className="text-muted-foreground text-sm mb-1">Discounted Price</div>
            <div className="text-4xl font-black text-primary font-mono">{fmt(result.final)}</div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-black/30 border border-white/5 rounded-xl p-4 text-center">
              <div className="text-muted-foreground text-xs mb-1">Amount Saved</div>
              <div className="text-xl font-bold text-green-400 font-mono">{fmt(result.saved)}</div>
            </div>
            <div className="bg-black/30 border border-white/5 rounded-xl p-4 text-center">
              <div className="text-muted-foreground text-xs mb-1">Savings</div>
              <div className="text-xl font-bold text-yellow-400 font-mono">{result.pct}%</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Currency Converter ───────────────────────────────────────────────────────
const RATES: Record<string, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  JPY: 149.5,
  AED: 3.67,
  SAR: 3.75,
  KWD: 0.31,
  EGP: 30.9,
  INR: 83.1,
  CAD: 1.36,
  AUD: 1.53,
  CHF: 0.89,
  CNY: 7.24,
  MXN: 17.2,
  BRL: 4.97,
  PKR: 278,
};

const CURRENCY_NAMES: Record<string, string> = {
  USD: "US Dollar",
  EUR: "Euro",
  GBP: "British Pound",
  JPY: "Japanese Yen",
  AED: "UAE Dirham",
  SAR: "Saudi Riyal",
  KWD: "Kuwaiti Dinar",
  EGP: "Egyptian Pound",
  INR: "Indian Rupee",
  CAD: "Canadian Dollar",
  AUD: "Australian Dollar",
  CHF: "Swiss Franc",
  CNY: "Chinese Yuan",
  MXN: "Mexican Peso",
  BRL: "Brazilian Real",
  PKR: "Pakistani Rupee",
};

function CurrencyConverter() {
  const [amount, setAmount] = useState("1");
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("EUR");

  const converted = (() => {
    const a = parseFloat(amount);
    if (isNaN(a)) return null;
    const inUSD = a / RATES[from];
    return inUSD * RATES[to];
  })();

  const swap = () => {
    setFrom(to);
    setTo(from);
  };

  const currencies = Object.keys(RATES);

  return (
    <div className="space-y-6 max-w-md mx-auto">
      <div>
        <Label>Amount</Label>
        <Input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="mt-2 bg-black/40 h-12 font-mono text-lg"
        />
      </div>

      <div className="flex gap-3 items-end">
        <div className="flex-1">
          <Label>From</Label>
          <select
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="mt-2 w-full bg-black/40 border border-white/10 rounded-md px-3 py-2 text-white h-12"
          >
            {currencies.map((c) => (
              <option key={c} value={c}>{c} – {CURRENCY_NAMES[c]}</option>
            ))}
          </select>
        </div>
        <Button variant="secondary" onClick={swap} className="h-12 px-3 mb-0 flex-shrink-0">
          <ArrowLeftRight className="w-4 h-4" />
        </Button>
        <div className="flex-1">
          <Label>To</Label>
          <select
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="mt-2 w-full bg-black/40 border border-white/10 rounded-md px-3 py-2 text-white h-12"
          >
            {currencies.map((c) => (
              <option key={c} value={c}>{c} – {CURRENCY_NAMES[c]}</option>
            ))}
          </select>
        </div>
      </div>

      {converted !== null && (
        <div className="bg-black/30 border border-white/5 rounded-xl p-6 text-center animate-in fade-in">
          <div className="text-muted-foreground text-sm mb-1">
            {amount} {from} =
          </div>
          <div className="text-4xl font-black text-primary font-mono">
            {converted.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 4 })}
          </div>
          <div className="text-muted-foreground text-sm mt-1">{to} · {CURRENCY_NAMES[to]}</div>
          <p className="text-xs text-muted-foreground mt-3">Static rates — for reference only</p>
        </div>
      )}
    </div>
  );
}

// ─── Number Base Converter ────────────────────────────────────────────────────
function NumberBaseConverter() {
  const [input, setInput] = useState("");
  const [base, setBase] = useState(10);
  const [result, setResult] = useState<{ bin: string; oct: string; dec: string; hex: string } | null>(null);
  const [error, setError] = useState("");

  const convert = () => {
    setError("");
    setResult(null);
    if (!input.trim()) return;
    try {
      const dec = parseInt(input.trim(), base);
      if (isNaN(dec)) {
        setError(`"${input}" is not a valid base-${base} number.`);
        return;
      }
      setResult({
        bin: dec.toString(2),
        oct: dec.toString(8),
        dec: dec.toString(10),
        hex: dec.toString(16).toUpperCase(),
      });
    } catch {
      setError("Invalid input.");
    }
  };

  const bases = [
    { value: 2, label: "Binary (2)" },
    { value: 8, label: "Octal (8)" },
    { value: 10, label: "Decimal (10)" },
    { value: 16, label: "Hexadecimal (16)" },
  ];

  const copyVal = (v: string) => {
    navigator.clipboard.writeText(v);
    toast.success("Copied!");
  };

  return (
    <div className="space-y-6 max-w-md mx-auto">
      <div>
        <Label>Number</Label>
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter a number..."
          className="mt-2 bg-black/40 h-12 font-mono"
          onKeyDown={(e) => e.key === "Enter" && convert()}
        />
      </div>
      <div>
        <Label>Source Base</Label>
        <select
          value={base}
          onChange={(e) => setBase(Number(e.target.value))}
          className="mt-2 w-full bg-black/40 border border-white/10 rounded-md px-3 py-2 text-white h-12"
        >
          {bases.map((b) => (
            <option key={b.value} value={b.value}>{b.label}</option>
          ))}
        </select>
      </div>
      <Button onClick={convert} className="w-full primary-gradient h-12">Convert</Button>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      {result && (
        <div className="grid grid-cols-2 gap-3 animate-in fade-in slide-in-from-bottom-4">
          {[
            { label: "Binary (Base 2)", value: result.bin },
            { label: "Octal (Base 8)", value: result.oct },
            { label: "Decimal (Base 10)", value: result.dec },
            { label: "Hexadecimal (Base 16)", value: result.hex },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="bg-black/30 border border-white/5 rounded-xl p-4 cursor-pointer hover:border-white/20 transition-colors"
              onClick={() => copyVal(value)}
            >
              <div className="text-muted-foreground text-xs mb-1">{label}</div>
              <div className="text-lg font-bold font-mono text-white break-all">{value}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Roman Numerals ───────────────────────────────────────────────────────────
function RomanNumerals() {
  const [intInput, setIntInput] = useState("");
  const [romanInput, setRomanInput] = useState("");
  const [intResult, setIntResult] = useState("");
  const [romanResult, setRomanResult] = useState("");
  const [intError, setIntError] = useState("");
  const [romanError, setRomanError] = useState("");

  const toRoman = (num: number): string => {
    const vals = [1000,900,500,400,100,90,50,40,10,9,5,4,1];
    const syms = ["M","CM","D","CD","C","XC","L","XL","X","IX","V","IV","I"];
    let result = "";
    for (let i = 0; i < vals.length; i++) {
      while (num >= vals[i]) {
        result += syms[i];
        num -= vals[i];
      }
    }
    return result;
  };

  const fromRoman = (s: string): number => {
    const map: Record<string, number> = { I:1,V:5,X:10,L:50,C:100,D:500,M:1000 };
    let result = 0;
    const str = s.toUpperCase();
    for (let i = 0; i < str.length; i++) {
      const curr = map[str[i]];
      const next = map[str[i+1]];
      if (!curr) return -1;
      if (next && curr < next) result -= curr;
      else result += curr;
    }
    return result;
  };

  const convertToRoman = () => {
    setIntError("");
    setIntResult("");
    const n = parseInt(intInput);
    if (isNaN(n) || n < 1 || n > 3999) {
      setIntError("Please enter a number between 1 and 3999.");
      return;
    }
    setIntResult(toRoman(n));
  };

  const convertFromRoman = () => {
    setRomanError("");
    setRomanResult("");
    if (!romanInput.trim()) return;
    const n = fromRoman(romanInput.trim());
    if (n <= 0) {
      setRomanError("Invalid Roman numeral.");
      return;
    }
    setRomanResult(n.toString());
  };

  return (
    <div className="space-y-8 max-w-md mx-auto">
      {/* Integer → Roman */}
      <div className="space-y-4">
        <h3 className="text-white font-semibold">Integer → Roman Numeral</h3>
        <div>
          <Label>Integer (1 – 3999)</Label>
          <Input
            type="number"
            placeholder="e.g. 2024"
            value={intInput}
            onChange={(e) => setIntInput(e.target.value)}
            className="mt-2 bg-black/40 h-12 font-mono"
          />
        </div>
        <Button onClick={convertToRoman} className="w-full primary-gradient h-12">Convert to Roman</Button>
        {intError && <p className="text-red-400 text-sm">{intError}</p>}
        {intResult && (
          <div className="bg-black/30 border border-white/5 rounded-xl p-6 text-center">
            <div className="text-muted-foreground text-sm mb-1">{intInput} in Roman numerals</div>
            <div className="text-4xl font-black text-primary font-mono">{intResult}</div>
          </div>
        )}
      </div>

      <div className="border-t border-white/5" />

      {/* Roman → Integer */}
      <div className="space-y-4">
        <h3 className="text-white font-semibold">Roman Numeral → Integer</h3>
        <div>
          <Label>Roman Numeral</Label>
          <Input
            placeholder="e.g. MMXXIV"
            value={romanInput}
            onChange={(e) => setRomanInput(e.target.value)}
            className="mt-2 bg-black/40 h-12 font-mono uppercase"
          />
        </div>
        <Button onClick={convertFromRoman} className="w-full primary-gradient h-12">Convert to Integer</Button>
        {romanError && <p className="text-red-400 text-sm">{romanError}</p>}
        {romanResult && (
          <div className="bg-black/30 border border-white/5 rounded-xl p-6 text-center">
            <div className="text-muted-foreground text-sm mb-1">{romanInput.toUpperCase()} in integer</div>
            <div className="text-4xl font-black text-primary font-mono">{romanResult}</div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Prime Checker ────────────────────────────────────────────────────────────
function PrimeChecker() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<{
    num: number;
    isPrime: boolean;
    factors: number[];
    nextPrimes: number[];
  } | null>(null);

  const isPrime = (n: number): boolean => {
    if (n < 2) return false;
    if (n === 2) return true;
    if (n % 2 === 0) return false;
    for (let i = 3; i <= Math.sqrt(n); i += 2) {
      if (n % i === 0) return false;
    }
    return true;
  };

  const getFactors = (n: number): number[] => {
    const factors: number[] = [];
    for (let i = 1; i <= n; i++) {
      if (n % i === 0) factors.push(i);
    }
    return factors;
  };

  const getNextPrimes = (n: number, count: number): number[] => {
    const primes: number[] = [];
    let candidate = n + 1;
    while (primes.length < count) {
      if (isPrime(candidate)) primes.push(candidate);
      candidate++;
    }
    return primes;
  };

  const check = () => {
    const n = parseInt(input);
    if (isNaN(n) || n < 0) return;
    const prime = isPrime(n);
    setResult({
      num: n,
      isPrime: prime,
      factors: prime ? [] : getFactors(n),
      nextPrimes: getNextPrimes(n, 5),
    });
  };

  return (
    <div className="space-y-6 max-w-md mx-auto">
      <div>
        <Label>Number</Label>
        <Input
          type="number"
          placeholder="e.g. 97"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="mt-2 bg-black/40 h-12 font-mono"
          onKeyDown={(e) => e.key === "Enter" && check()}
        />
      </div>
      <Button onClick={check} className="w-full primary-gradient h-12">Check Prime</Button>

      {result && (
        <div className="space-y-3 animate-in fade-in slide-in-from-bottom-4">
          <div className={`bg-black/30 border border-white/5 rounded-xl p-6 text-center`}>
            <div className="text-muted-foreground text-sm mb-1">{result.num} is</div>
            <div className={`text-4xl font-black ${result.isPrime ? "text-green-400" : "text-red-400"}`}>
              {result.isPrime ? "Prime ✓" : "Not Prime ✗"}
            </div>
            {!result.isPrime && result.factors.length > 0 && (
              <div className="mt-3 text-muted-foreground text-sm">
                Factors: <span className="text-white font-mono">{result.factors.join(", ")}</span>
              </div>
            )}
          </div>
          <div className="bg-black/30 border border-white/5 rounded-xl p-4">
            <div className="text-muted-foreground text-xs mb-2">Next 5 prime numbers after {result.num}</div>
            <div className="flex gap-2 flex-wrap">
              {result.nextPrimes.map((p) => (
                <span key={p} className="bg-white/5 rounded-lg px-3 py-1 font-mono text-white text-sm">{p}</span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Factorial ────────────────────────────────────────────────────────────────
function Factorial() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<{ value: bigint; steps: string } | null>(null);
  const [error, setError] = useState("");

  const calculate = () => {
    setError("");
    setResult(null);
    const n = parseInt(input);
    if (isNaN(n) || n < 0 || n > 20) {
      setError("Please enter a number between 0 and 20.");
      return;
    }
    let val = BigInt(1);
    for (let i = 2; i <= n; i++) val *= BigInt(i);

    let steps = "";
    if (n === 0) {
      steps = "0! = 1 (by definition)";
    } else {
      const parts = Array.from({ length: n }, (_, i) => (n - i).toString());
      steps = `${n}! = ${parts.join(" × ")} = ${val.toString()}`;
    }
    setResult({ value: val, steps });
  };

  return (
    <div className="space-y-6 max-w-md mx-auto">
      <div>
        <Label>Number (0 – 20)</Label>
        <Input
          type="number"
          min={0}
          max={20}
          placeholder="e.g. 10"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="mt-2 bg-black/40 h-12 font-mono"
          onKeyDown={(e) => e.key === "Enter" && calculate()}
        />
      </div>
      <Button onClick={calculate} className="w-full primary-gradient h-12">Calculate Factorial</Button>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      {result && (
        <div className="space-y-3 animate-in fade-in slide-in-from-bottom-4">
          <div className="bg-black/30 border border-white/5 rounded-xl p-6 text-center">
            <div className="text-muted-foreground text-sm mb-1">{input}! =</div>
            <div className="text-3xl font-black text-primary font-mono break-all">{result.value.toString()}</div>
          </div>
          <div className="bg-black/30 border border-white/5 rounded-xl p-4">
            <div className="text-muted-foreground text-xs mb-2">Step-by-step</div>
            <div className="font-mono text-white text-sm break-all leading-relaxed">{result.steps}</div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── GCD & LCM ────────────────────────────────────────────────────────────────
function GcdLcm() {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [result, setResult] = useState<{ gcd: number; lcm: number; steps: string[] } | null>(null);

  const gcd = (x: number, y: number): number => {
    x = Math.abs(x);
    y = Math.abs(y);
    while (y !== 0) {
      [x, y] = [y, x % y];
    }
    return x;
  };

  const calculate = () => {
    const na = parseInt(a);
    const nb = parseInt(b);
    if (isNaN(na) || isNaN(nb) || na <= 0 || nb <= 0) return;

    const g = gcd(na, nb);
    const l = (na / g) * nb;

    const steps: string[] = [];
    let x = Math.abs(na), y = Math.abs(nb);
    steps.push(`GCD(${na}, ${nb}) using Euclidean algorithm:`);
    while (y !== 0) {
      steps.push(`  ${x} = ${Math.floor(x / y)} × ${y} + ${x % y}`);
      [x, y] = [y, x % y];
    }
    steps.push(`GCD = ${g}`);
    steps.push(`LCM = (${na} × ${nb}) / ${g} = ${l}`);

    setResult({ gcd: g, lcm: l, steps });
  };

  return (
    <div className="space-y-6 max-w-md mx-auto">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>First Number</Label>
          <Input
            type="number"
            placeholder="e.g. 48"
            value={a}
            onChange={(e) => setA(e.target.value)}
            className="mt-2 bg-black/40 h-12 font-mono"
          />
        </div>
        <div>
          <Label>Second Number</Label>
          <Input
            type="number"
            placeholder="e.g. 18"
            value={b}
            onChange={(e) => setB(e.target.value)}
            className="mt-2 bg-black/40 h-12 font-mono"
          />
        </div>
      </div>
      <Button onClick={calculate} className="w-full primary-gradient h-12">Calculate GCD & LCM</Button>

      {result && (
        <div className="space-y-3 animate-in fade-in slide-in-from-bottom-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-black/30 border border-white/5 rounded-xl p-6 text-center">
              <div className="text-muted-foreground text-sm mb-1">GCD</div>
              <div className="text-4xl font-black text-primary font-mono">{result.gcd}</div>
            </div>
            <div className="bg-black/30 border border-white/5 rounded-xl p-6 text-center">
              <div className="text-muted-foreground text-sm mb-1">LCM</div>
              <div className="text-4xl font-black text-green-400 font-mono">{result.lcm}</div>
            </div>
          </div>
          <div className="bg-black/30 border border-white/5 rounded-xl p-4">
            <div className="text-muted-foreground text-xs mb-2">Explanation</div>
            {result.steps.map((s, i) => (
              <div key={i} className="font-mono text-white text-sm leading-relaxed">{s}</div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Scientific Calculator ────────────────────────────────────────────────────
function ScientificCalculator() {
  const [display, setDisplay] = useState("0");
  const [expression, setExpression] = useState("");
  const [justEvaled, setJustEvaled] = useState(false);

  const safeEval = (expr: string): string => {
    try {
      // Replace math tokens
      const cleaned = expr
        .replace(/π/g, String(Math.PI))
        .replace(/e(?![+\-0-9])/g, String(Math.E))
        .replace(/sin\(/g, "Math.sin(")
        .replace(/cos\(/g, "Math.cos(")
        .replace(/tan\(/g, "Math.tan(")
        .replace(/log\(/g, "Math.log10(")
        .replace(/ln\(/g, "Math.log(")
        .replace(/sqrt\(/g, "Math.sqrt(")
        .replace(/\^/g, "**");

      // eslint-disable-next-line no-new-func
      const result = new Function(`"use strict"; return (${cleaned})`)();
      if (typeof result !== "number" || !isFinite(result)) return "Error";
      const str = result.toPrecision(10).replace(/\.?0+$/, "");
      return str;
    } catch {
      return "Error";
    }
  };

  const appendToDisplay = (val: string) => {
    if (justEvaled) {
      // After eval, start fresh unless it's an operator
      if ("+-*/^".includes(val) || val === "%") {
        setExpression(display + val);
        setDisplay(display + val);
      } else {
        setExpression(val);
        setDisplay(val);
      }
      setJustEvaled(false);
      return;
    }
    const newExpr = expression === "0" && ![".", "(", ")"].includes(val) ? val : expression + val;
    setExpression(newExpr);
    setDisplay(newExpr);
  };

  const handleButton = (btn: string) => {
    switch (btn) {
      case "C":
        setDisplay("0");
        setExpression("");
        setJustEvaled(false);
        break;
      case "DEL":
        if (justEvaled) { setDisplay("0"); setExpression(""); setJustEvaled(false); break; }
        if (expression.length <= 1) { setDisplay("0"); setExpression(""); }
        else {
          const newExpr = expression.slice(0, -1);
          setExpression(newExpr);
          setDisplay(newExpr);
        }
        break;
      case "=": {
        const res = safeEval(expression || display);
        setDisplay(res);
        setExpression(res === "Error" ? "" : res);
        setJustEvaled(true);
        break;
      }
      case "±": {
        const curr = expression || display;
        if (curr.startsWith("-")) {
          setExpression(curr.slice(1));
          setDisplay(curr.slice(1));
        } else {
          setExpression("-" + curr);
          setDisplay("-" + curr);
        }
        break;
      }
      case "x²":
        appendToDisplay("**2");
        break;
      case "sqrt(x)":
        appendToDisplay("sqrt(");
        break;
      case "1/x": {
        const r = safeEval(`1/(${expression || display})`);
        setDisplay(r);
        setExpression(r === "Error" ? "" : r);
        setJustEvaled(true);
        break;
      }
      case "sin":
      case "cos":
      case "tan":
      case "log":
      case "ln":
        appendToDisplay(btn + "(");
        break;
      case "π":
      case "e":
        appendToDisplay(btn);
        break;
      default:
        appendToDisplay(btn);
    }
  };

  type BtnDef = { label: string; action: string; style?: string };
  const buttons: BtnDef[][] = [
    [
      { label: "sin", action: "sin", style: "text-blue-300" },
      { label: "cos", action: "cos", style: "text-blue-300" },
      { label: "tan", action: "tan", style: "text-blue-300" },
      { label: "log", action: "log", style: "text-blue-300" },
      { label: "ln", action: "ln", style: "text-blue-300" },
    ],
    [
      { label: "√x", action: "sqrt(x)", style: "text-purple-300" },
      { label: "x²", action: "x²", style: "text-purple-300" },
      { label: "1/x", action: "1/x", style: "text-purple-300" },
      { label: "π", action: "π", style: "text-yellow-300" },
      { label: "e", action: "e", style: "text-yellow-300" },
    ],
    [
      { label: "(", action: "(", style: "text-white/70" },
      { label: ")", action: ")", style: "text-white/70" },
      { label: "^", action: "^", style: "text-white/70" },
      { label: "C", action: "C", style: "text-red-400 font-bold" },
      { label: "DEL", action: "DEL", style: "text-red-300" },
    ],
    [
      { label: "7", action: "7" },
      { label: "8", action: "8" },
      { label: "9", action: "9" },
      { label: "÷", action: "/" },
      { label: "%", action: "%" },
    ],
    [
      { label: "4", action: "4" },
      { label: "5", action: "5" },
      { label: "6", action: "6" },
      { label: "×", action: "*" },
      { label: "±", action: "±" },
    ],
    [
      { label: "1", action: "1" },
      { label: "2", action: "2" },
      { label: "3", action: "3" },
      { label: "−", action: "-" },
      { label: "=", action: "=", style: "primary-gradient text-white font-bold row-span-2" },
    ],
    [
      { label: "0", action: "0" },
      { label: ".", action: "." },
      { label: "00", action: "00" },
      { label: "+", action: "+" },
    ],
  ];

  return (
    <div className="max-w-sm mx-auto space-y-4">
      {/* Display */}
      <div className="bg-black/50 border border-white/10 rounded-xl p-4 text-right">
        <div className="text-muted-foreground text-xs font-mono h-5 overflow-hidden text-ellipsis whitespace-nowrap">
          {expression || " "}
        </div>
        <div className="text-3xl font-black text-white font-mono mt-1 overflow-hidden text-ellipsis whitespace-nowrap">
          {display || "0"}
        </div>
      </div>

      {/* Buttons */}
      <div className="space-y-2">
        {buttons.map((row, ri) => (
          <div key={ri} className="grid grid-cols-5 gap-2">
            {row.map((btn) => (
              <Button
                key={btn.action}
                variant="secondary"
                onClick={() => handleButton(btn.action)}
                className={`h-12 text-sm font-mono ${btn.action === "=" ? "primary-gradient text-white font-bold" : ""} ${btn.style || ""}`}
              >
                {btn.label}
              </Button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Export ───────────────────────────────────────────────────────────────────
export default function NumberMathTools({ active }: { active: string }) {
  return (
    <ToolPageLayout toolId={active}>
      {active === "age-calculator" && <AgeCalculator />}
      {active === "percentage-calculator" && <PercentageCalculator />}
      {active === "bmi-calculator" && <BmiCalculator />}
      {active === "emi-calculator" && <EmiCalculator />}
      {active === "tip-calculator" && <TipCalculator />}
      {active === "discount-calculator" && <DiscountCalculator />}
      {active === "currency-converter" && <CurrencyConverter />}
      {active === "number-base-converter" && <NumberBaseConverter />}
      {active === "roman-numerals" && <RomanNumerals />}
      {active === "prime-checker" && <PrimeChecker />}
      {active === "factorial" && <Factorial />}
      {active === "gcd-lcm" && <GcdLcm />}
      {active === "scientific-calculator" && <ScientificCalculator />}
    </ToolPageLayout>
  );
}
