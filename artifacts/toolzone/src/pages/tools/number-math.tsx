import { useState } from "react";
import { ToolPageLayout } from "@/components/Layout/ToolPageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function AgeCalculator() {
  const [dob, setDob] = useState("");
  const [result, setResult] = useState<{y: number, m: number, d: number} | null>(null);

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
          onChange={e => setDob(e.target.value)} 
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

// Bmi calculator
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
        <Input type="number" value={cm} onChange={e => setCm(Number(e.target.value))} className="mt-2 bg-black/40 h-12" />
      </div>
      <div>
        <Label>Weight (kg)</Label>
        <Input type="number" value={kg} onChange={e => setKg(Number(e.target.value))} className="mt-2 bg-black/40 h-12" />
      </div>
      <Button onClick={calculate} className="w-full primary-gradient h-12">Calculate BMI</Button>

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

export default function NumberMathTools({ active }: { active: string }) {
  return (
    <ToolPageLayout toolId={active}>
      {active === "age-calculator" && <AgeCalculator />}
      {active === "bmi-calculator" && <BmiCalculator />}
      {/* Fallback */}
      {!["age-calculator", "bmi-calculator"].includes(active) && (
        <div className="text-center py-20 text-muted-foreground">
          Tool implementation coming soon...
        </div>
      )}
    </ToolPageLayout>
  );
}
