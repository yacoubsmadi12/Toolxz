import { useState, useEffect } from "react";
import { ToolPageLayout } from "@/components/Layout/ToolPageLayout";
import { Input } from "@/components/ui/input";

type UnitMap = { [key: string]: number };

const lengthUnits: UnitMap = {
  "Meters (m)": 1,
  "Kilometers (km)": 0.001,
  "Centimeters (cm)": 100,
  "Millimeters (mm)": 1000,
  "Miles (mi)": 0.000621371,
  "Yards (yd)": 1.09361,
  "Feet (ft)": 3.28084,
  "Inches (in)": 39.3701,
};

const weightUnits: UnitMap = {
  "Kilograms (kg)": 1,
  "Grams (g)": 1000,
  "Milligrams (mg)": 1000000,
  "Metric Tons (t)": 0.001,
  "Pounds (lb)": 2.20462,
  "Ounces (oz)": 35.274,
};

// Generic converter component
function GenericConverter({ units, title }: { units: UnitMap, title: string }) {
  const [val1, setVal1] = useState<string>("1");
  const [unit1, setUnit1] = useState(Object.keys(units)[0]);
  
  const [val2, setVal2] = useState<string>(String(units[Object.keys(units)[1]]));
  const [unit2, setUnit2] = useState(Object.keys(units)[1]);

  const handle1 = (v: string) => {
    setVal1(v);
    const base = Number(v) / units[unit1];
    setVal2(String(base * units[unit2]));
  };

  const handle2 = (v: string) => {
    setVal2(v);
    const base = Number(v) / units[unit2];
    setVal1(String(base * units[unit1]));
  };

  useEffect(() => {
    handle1(val1);
  }, [unit1, unit2]);

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row items-center gap-4">
        
        <div className="flex-1 w-full bg-black/20 p-6 rounded-2xl border border-white/5 space-y-4">
          <Input 
            type="number" 
            value={val1} 
            onChange={e => handle1(e.target.value)} 
            className="text-3xl h-16 font-mono text-center bg-transparent border-b-2 border-x-0 border-t-0 border-white/20 focus:ring-0 focus:border-primary rounded-none"
          />
          <select 
            value={unit1} 
            onChange={e => setUnit1(e.target.value)}
            className="w-full bg-black/40 text-white h-12 rounded-lg px-4 border border-white/10 outline-none"
          >
            {Object.keys(units).map(u => <option key={u} value={u}>{u}</option>)}
          </select>
        </div>

        <div className="text-4xl text-primary font-light">=</div >

        <div className="flex-1 w-full bg-black/20 p-6 rounded-2xl border border-white/5 space-y-4">
          <Input 
            type="number" 
            value={val2} 
            onChange={e => handle2(e.target.value)} 
            className="text-3xl h-16 font-mono text-center bg-transparent border-b-2 border-x-0 border-t-0 border-white/20 focus:ring-0 focus:border-primary rounded-none"
          />
          <select 
            value={unit2} 
            onChange={e => setUnit2(e.target.value)}
            className="w-full bg-black/40 text-white h-12 rounded-lg px-4 border border-white/10 outline-none"
          >
            {Object.keys(units).map(u => <option key={u} value={u}>{u}</option>)}
          </select>
        </div>

      </div>
    </div>
  );
}

export default function UnitConverters({ active }: { active: string }) {
  return (
    <ToolPageLayout toolId={active}>
      {active === "length-converter" && <GenericConverter units={lengthUnits} title="Length" />}
      {active === "weight-converter" && <GenericConverter units={weightUnits} title="Weight" />}
      {/* Fallback */}
      {!["length-converter", "weight-converter"].includes(active) && (
        <div className="text-center py-20 text-muted-foreground">
          Tool implementation coming soon...
        </div>
      )}
    </ToolPageLayout>
  );
}
