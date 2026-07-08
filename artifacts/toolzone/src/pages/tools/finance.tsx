import { useState, useMemo } from "react";
import { ToolPageLayout } from "@/components/Layout/ToolPageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// ─── Helpers ─────────────────────────────────────────────────────────────────

const fmt = (n: number) =>
  n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

// ─── Compound Interest ───────────────────────────────────────────────────────

function CompoundInterest() {
  const [principal, setPrincipal] = useState("10000");
  const [rate, setRate] = useState("7");
  const [years, setYears] = useState("10");
  const [n, setN] = useState("12");

  const result = useMemo(() => {
    const P = parseFloat(principal) || 0;
    const r = parseFloat(rate) / 100 || 0;
    const t = Math.min(parseInt(years) || 0, 30);
    const nv = parseInt(n) || 12;
    if (P <= 0 || t <= 0) return null;

    const finalAmount = P * Math.pow(1 + r / nv, nv * t);
    const totalInterest = finalAmount - P;
    const effectiveRate = (Math.pow(1 + r / nv, nv) - 1) * 100;

    const table: { year: number; balance: number; interest: number }[] = [];
    for (let y = 1; y <= t; y++) {
      const bal = P * Math.pow(1 + r / nv, nv * y);
      table.push({ year: y, balance: bal, interest: bal - P });
    }

    return { finalAmount, totalInterest, effectiveRate, table };
  }, [principal, rate, years, n]);

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Principal ($)</Label>
          <Input value={principal} onChange={e => setPrincipal(e.target.value)} className="bg-black/40 h-12" type="number" min="0" />
        </div>
        <div className="space-y-2">
          <Label>Annual Rate (%)</Label>
          <Input value={rate} onChange={e => setRate(e.target.value)} className="bg-black/40 h-12" type="number" min="0" step="0.1" />
        </div>
        <div className="space-y-2">
          <Label>Years</Label>
          <Input value={years} onChange={e => setYears(e.target.value)} className="bg-black/40 h-12" type="number" min="1" max="30" />
        </div>
        <div className="space-y-2">
          <Label>Compounding Frequency</Label>
          <select
            value={n}
            onChange={e => setN(e.target.value)}
            className="w-full h-12 rounded-md bg-black/40 border border-white/10 text-white px-3 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="1">Annually</option>
            <option value="2">Semi-annually</option>
            <option value="4">Quarterly</option>
            <option value="12">Monthly</option>
            <option value="365">Daily</option>
          </select>
        </div>
      </div>

      {result && (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Final Amount", value: `$${fmt(result.finalAmount)}` },
              { label: "Total Interest", value: `$${fmt(result.totalInterest)}` },
              { label: "Effective Rate", value: `${result.effectiveRate.toFixed(4)}%` },
            ].map(item => (
              <div key={item.label} className="bg-black/30 border border-white/5 rounded-xl p-4 text-center">
                <div className="text-xl font-bold text-primary font-mono">{item.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{item.label}</div>
              </div>
            ))}
          </div>

          <div className="bg-black/30 border border-white/5 rounded-xl overflow-hidden">
            <div className="overflow-x-auto max-h-64 overflow-y-auto">
              <table className="w-full text-sm">
                <thead className="sticky top-0 bg-black/60">
                  <tr className="border-b border-white/10">
                    <th className="text-left px-4 py-3 text-muted-foreground font-medium">Year</th>
                    <th className="text-right px-4 py-3 text-muted-foreground font-medium">Balance</th>
                    <th className="text-right px-4 py-3 text-muted-foreground font-medium">Interest Earned</th>
                  </tr>
                </thead>
                <tbody>
                  {result.table.map(row => (
                    <tr key={row.year} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="px-4 py-2 text-white font-mono">{row.year}</td>
                      <td className="px-4 py-2 text-right font-mono text-primary">${fmt(row.balance)}</td>
                      <td className="px-4 py-2 text-right font-mono text-green-400">${fmt(row.interest)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Simple Interest ─────────────────────────────────────────────────────────

function SimpleInterest() {
  const [principal, setPrincipal] = useState("10000");
  const [rate, setRate] = useState("5");
  const [time, setTime] = useState("3");

  const result = useMemo(() => {
    const P = parseFloat(principal) || 0;
    const R = parseFloat(rate) || 0;
    const T = parseFloat(time) || 0;
    if (P <= 0 || T <= 0) return null;
    const interest = (P * R * T) / 100;
    const finalAmount = P + interest;
    return { interest, finalAmount };
  }, [principal, rate, time]);

  return (
    <div className="space-y-6 max-w-lg mx-auto">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Principal ($)</Label>
          <Input value={principal} onChange={e => setPrincipal(e.target.value)} className="bg-black/40 h-12" type="number" min="0" />
        </div>
        <div className="space-y-2">
          <Label>Annual Rate (%)</Label>
          <Input value={rate} onChange={e => setRate(e.target.value)} className="bg-black/40 h-12" type="number" min="0" step="0.1" />
        </div>
        <div className="space-y-2">
          <Label>Time (years)</Label>
          <Input value={time} onChange={e => setTime(e.target.value)} className="bg-black/40 h-12" type="number" min="0" step="0.5" />
        </div>
      </div>

      {result && (
        <div className="space-y-3">
          <div className="bg-black/30 border border-white/5 rounded-xl p-4 text-center">
            <div className="text-xs text-muted-foreground mb-1">Formula: I = P × R × T / 100</div>
            <div className="font-mono text-sm text-muted-foreground">
              I = {principal} × {rate} × {time} / 100
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-black/30 border border-white/5 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-primary font-mono">${fmt(result.interest)}</div>
              <div className="text-xs text-muted-foreground mt-1">Interest Earned</div>
            </div>
            <div className="bg-black/30 border border-white/5 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-white font-mono">${fmt(result.finalAmount)}</div>
              <div className="text-xs text-muted-foreground mt-1">Final Amount</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Salary Calculator ───────────────────────────────────────────────────────

function SalaryCalculator() {
  const [salary, setSalary] = useState("60000");
  const [taxRate, setTaxRate] = useState("25");

  const result = useMemo(() => {
    const annual = parseFloat(salary) || 0;
    const tax = Math.min(Math.max(parseFloat(taxRate) || 0, 0), 50);
    if (annual <= 0) return null;

    const taxMultiplier = 1 - tax / 100;
    const rows = [
      { period: "Annual",  gross: annual,         net: annual * taxMultiplier },
      { period: "Monthly", gross: annual / 12,    net: (annual / 12) * taxMultiplier },
      { period: "Weekly",  gross: annual / 52,    net: (annual / 52) * taxMultiplier },
      { period: "Daily",   gross: annual / 260,   net: (annual / 260) * taxMultiplier },
      { period: "Hourly",  gross: annual / 2080,  net: (annual / 2080) * taxMultiplier },
    ];
    return { rows, tax };
  }, [salary, taxRate]);

  return (
    <div className="space-y-6 max-w-xl mx-auto">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Gross Annual Salary ($)</Label>
          <Input value={salary} onChange={e => setSalary(e.target.value)} className="bg-black/40 h-12" type="number" min="0" />
        </div>
        <div className="space-y-2">
          <Label>Tax Rate (0–50%)</Label>
          <Input value={taxRate} onChange={e => setTaxRate(e.target.value)} className="bg-black/40 h-12" type="number" min="0" max="50" step="1" />
        </div>
      </div>

      {result && (
        <div className="bg-black/30 border border-white/5 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 bg-black/40">
                <th className="text-left px-4 py-3 text-muted-foreground font-medium">Period</th>
                <th className="text-right px-4 py-3 text-muted-foreground font-medium">Gross</th>
                {result.tax > 0 && (
                  <th className="text-right px-4 py-3 text-muted-foreground font-medium">Net (after {result.tax}% tax)</th>
                )}
              </tr>
            </thead>
            <tbody>
              {result.rows.map(row => (
                <tr key={row.period} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3 text-white font-medium">{row.period}</td>
                  <td className="px-4 py-3 text-right font-mono text-primary">${fmt(row.gross)}</td>
                  {result.tax > 0 && (
                    <td className="px-4 py-3 text-right font-mono text-green-400">${fmt(row.net)}</td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ─── VAT Calculator ──────────────────────────────────────────────────────────

function VatCalculator() {
  const [amount, setAmount] = useState("100");
  const [vatRate, setVatRate] = useState("20");
  const [customVat, setCustomVat] = useState("");
  const [mode, setMode] = useState<"add" | "remove">("add");

  const presets = ["5", "15", "20", "25"];

  const effectiveRate = parseFloat(customVat || vatRate) || 0;

  const result = useMemo(() => {
    const a = parseFloat(amount) || 0;
    const r = effectiveRate / 100;
    if (a <= 0) return null;

    let net: number, vatAmount: number, gross: number;
    if (mode === "add") {
      net = a;
      vatAmount = a * r;
      gross = a + vatAmount;
    } else {
      gross = a;
      net = a / (1 + r);
      vatAmount = gross - net;
    }
    return { net, vatAmount, gross };
  }, [amount, effectiveRate, mode]);

  return (
    <div className="space-y-6 max-w-lg mx-auto">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Amount ($)</Label>
          <Input value={amount} onChange={e => setAmount(e.target.value)} className="bg-black/40 h-12" type="number" min="0" step="0.01" />
        </div>

        <div className="space-y-2">
          <Label>VAT Rate</Label>
          <div className="flex flex-wrap gap-2">
            {presets.map(p => (
              <Button
                key={p}
                variant={vatRate === p && !customVat ? "secondary" : "ghost"}
                onClick={() => { setVatRate(p); setCustomVat(""); }}
                className="h-10"
              >
                {p}%
              </Button>
            ))}
            <Input
              placeholder="Custom %"
              value={customVat}
              onChange={e => setCustomVat(e.target.value)}
              className="bg-black/40 h-10 w-28"
              type="number"
              min="0"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Mode</Label>
          <div className="flex gap-2">
            <Button
              onClick={() => setMode("add")}
              className={mode === "add" ? "primary-gradient" : ""}
              variant={mode === "add" ? "default" : "secondary"}
            >
              Add VAT
            </Button>
            <Button
              onClick={() => setMode("remove")}
              className={mode === "remove" ? "primary-gradient" : ""}
              variant={mode === "remove" ? "default" : "secondary"}
            >
              Remove VAT
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            {mode === "add"
              ? "Enter exclusive (net) amount → get inclusive (gross)"
              : "Enter inclusive (gross) amount → get exclusive (net)"}
          </p>
        </div>
      </div>

      {result && (
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Net (excl. VAT)", value: `$${fmt(result.net)}`, color: "text-white" },
            { label: `VAT (${effectiveRate}%)`, value: `$${fmt(result.vatAmount)}`, color: "text-yellow-400" },
            { label: "Gross (incl. VAT)", value: `$${fmt(result.gross)}`, color: "text-primary" },
          ].map(item => (
            <div key={item.label} className="bg-black/30 border border-white/5 rounded-xl p-4 text-center">
              <div className={`text-xl font-bold font-mono ${item.color}`}>{item.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{item.label}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Retirement Calculator ───────────────────────────────────────────────────

function RetirementCalculator() {
  const [currentAge, setCurrentAge] = useState("30");
  const [retirementAge, setRetirementAge] = useState("65");
  const [currentSavings, setCurrentSavings] = useState("50000");
  const [monthlyContribution, setMonthlyContribution] = useState("500");
  const [annualReturn, setAnnualReturn] = useState("7");

  const result = useMemo(() => {
    const cAge = parseInt(currentAge) || 0;
    const rAge = parseInt(retirementAge) || 0;
    const savings = parseFloat(currentSavings) || 0;
    const monthly = parseFloat(monthlyContribution) || 0;
    const r = parseFloat(annualReturn) / 100 || 0;

    if (rAge <= cAge) return null;

    const years = rAge - cAge;
    const monthlyRate = r / 12;
    const months = years * 12;

    // Future value of lump sum
    const fvSavings = savings * Math.pow(1 + monthlyRate, months);
    // Future value of monthly contributions (annuity)
    const fvContributions =
      monthlyRate > 0
        ? monthly * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate)
        : monthly * months;

    const totalSavings = fvSavings + fvContributions;
    const totalContributed = savings + monthly * months;
    const totalGrowth = totalSavings - totalContributed;

    // Milestone every 5 years
    const milestones: { age: number; balance: number }[] = [];
    for (let y = 5; y <= years; y += 5) {
      const m = y * 12;
      const fvS = savings * Math.pow(1 + monthlyRate, m);
      const fvC =
        monthlyRate > 0
          ? monthly * ((Math.pow(1 + monthlyRate, m) - 1) / monthlyRate)
          : monthly * m;
      milestones.push({ age: cAge + y, balance: fvS + fvC });
    }
    // Always include final
    if (milestones.length === 0 || milestones[milestones.length - 1].age !== rAge) {
      milestones.push({ age: rAge, balance: totalSavings });
    }

    return { totalSavings, totalContributed, totalGrowth, milestones };
  }, [currentAge, retirementAge, currentSavings, monthlyContribution, annualReturn]);

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Current Age</Label>
          <Input value={currentAge} onChange={e => setCurrentAge(e.target.value)} className="bg-black/40 h-12" type="number" min="18" max="80" />
        </div>
        <div className="space-y-2">
          <Label>Retirement Age</Label>
          <Input value={retirementAge} onChange={e => setRetirementAge(e.target.value)} className="bg-black/40 h-12" type="number" min="18" max="100" />
        </div>
        <div className="space-y-2">
          <Label>Current Savings ($)</Label>
          <Input value={currentSavings} onChange={e => setCurrentSavings(e.target.value)} className="bg-black/40 h-12" type="number" min="0" />
        </div>
        <div className="space-y-2">
          <Label>Monthly Contribution ($)</Label>
          <Input value={monthlyContribution} onChange={e => setMonthlyContribution(e.target.value)} className="bg-black/40 h-12" type="number" min="0" />
        </div>
        <div className="space-y-2 col-span-2">
          <Label>Expected Annual Return (%)</Label>
          <Input value={annualReturn} onChange={e => setAnnualReturn(e.target.value)} className="bg-black/40 h-12" type="number" min="0" max="30" step="0.5" />
        </div>
      </div>

      {result ? (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Total at Retirement", value: `$${fmt(result.totalSavings)}`, color: "text-primary" },
              { label: "Total Contributed", value: `$${fmt(result.totalContributed)}`, color: "text-white" },
              { label: "Total Growth", value: `$${fmt(result.totalGrowth)}`, color: "text-green-400" },
            ].map(item => (
              <div key={item.label} className="bg-black/30 border border-white/5 rounded-xl p-4 text-center">
                <div className={`text-lg font-bold font-mono ${item.color}`}>{item.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{item.label}</div>
              </div>
            ))}
          </div>

          <div className="bg-black/30 border border-white/5 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10 bg-black/40">
                    <th className="text-left px-4 py-3 text-muted-foreground font-medium">Age</th>
                    <th className="text-right px-4 py-3 text-muted-foreground font-medium">Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {result.milestones.map(row => (
                    <tr key={row.age} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="px-4 py-2 text-white font-mono">{row.age}</td>
                      <td className="px-4 py-2 text-right font-mono text-primary">${fmt(row.balance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-8 text-muted-foreground">
          Retirement age must be greater than current age.
        </div>
      )}
    </div>
  );
}

// ─── Export ──────────────────────────────────────────────────────────────────

export default function FinanceTools({ active }: { active: string }) {
  return (
    <ToolPageLayout toolId={active}>
      {active === "compound-interest" && <CompoundInterest />}
      {active === "simple-interest" && <SimpleInterest />}
      {active === "salary-calculator" && <SalaryCalculator />}
      {active === "vat-calculator" && <VatCalculator />}
      {active === "retirement-calculator" && <RetirementCalculator />}
    </ToolPageLayout>
  );
}
