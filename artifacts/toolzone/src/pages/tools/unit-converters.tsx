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

const areaUnits: UnitMap = {
  "Square Meters (m²)": 1,
  "Square Kilometers (km²)": 0.000001,
  "Square Centimeters (cm²)": 10000,
  "Square Feet (ft²)": 10.7639,
  "Square Yards (yd²)": 1.19599,
  "Square Miles (mi²)": 3.861e-7,
  "Acres": 0.000247105,
  "Hectares (ha)": 0.0001,
};

const volumeUnits: UnitMap = {
  "Liters (L)": 1,
  "Milliliters (mL)": 1000,
  "Cubic Meters (m³)": 0.001,
  "Cubic Centimeters (cm³)": 1000,
  "Gallons (US)": 0.264172,
  "Quarts (US)": 1.05669,
  "Pints (US)": 2.11338,
  "Cups (US)": 4.22675,
  "Fluid Ounces (US)": 33.814,
  "Cubic Inches (in³)": 61.0237,
  "Cubic Feet (ft³)": 0.0353147,
};

const speedUnits: UnitMap = {
  "Meters/second (m/s)": 1,
  "Kilometers/hour (km/h)": 3.6,
  "Miles/hour (mph)": 2.23694,
  "Knots (kn)": 1.94384,
  "Feet/second (ft/s)": 3.28084,
};

const timeUnits: UnitMap = {
  "Seconds (s)": 1,
  "Milliseconds (ms)": 1000,
  "Minutes (min)": 0.016667,
  "Hours (h)": 0.000278,
  "Days (d)": 1.157e-5,
  "Weeks": 1.653e-6,
  "Months (30d)": 3.858e-7,
  "Years (365d)": 3.171e-8,
};

const dataUnits: UnitMap = {
  "Bytes (B)": 1,
  "Kilobytes (KB)": 0.001,
  "Megabytes (MB)": 1e-6,
  "Gigabytes (GB)": 1e-9,
  "Terabytes (TB)": 1e-12,
  "Petabytes (PB)": 1e-15,
  "Bits": 8,
  "Kibibytes (KiB)": 0.0009765625,
  "Mebibytes (MiB)": 9.537e-7,
  "Gibibytes (GiB)": 9.313e-10,
};

const pressureUnits: UnitMap = {
  "Pascals (Pa)": 1,
  "Kilopascals (kPa)": 0.001,
  "Bar": 1e-5,
  "PSI": 0.000145038,
  "Atmospheres (atm)": 9.869e-6,
  "mmHg (Torr)": 0.00750062,
};

const energyUnits: UnitMap = {
  "Joules (J)": 1,
  "Kilojoules (kJ)": 0.001,
  "Calories (cal)": 0.239006,
  "Kilocalories (kcal)": 0.000239006,
  "Watt-hours (Wh)": 0.000278,
  "Kilowatt-hours (kWh)": 2.778e-7,
  "BTU": 0.000947817,
  "Electronvolts (eV)": 6.242e+18,
};

// Generic converter component
function GenericConverter({ units, title }: { units: UnitMap; title: string }) {
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
            onChange={(e) => handle1(e.target.value)}
            className="text-3xl h-16 font-mono text-center bg-transparent border-b-2 border-x-0 border-t-0 border-white/20 focus:ring-0 focus:border-primary rounded-none"
          />
          <select
            value={unit1}
            onChange={(e) => setUnit1(e.target.value)}
            className="w-full bg-black/40 text-white h-12 rounded-lg px-4 border border-white/10 outline-none"
          >
            {Object.keys(units).map((u) => (
              <option key={u} value={u}>
                {u}
              </option>
            ))}
          </select>
        </div>

        <div className="text-4xl text-primary font-light">=</div>

        <div className="flex-1 w-full bg-black/20 p-6 rounded-2xl border border-white/5 space-y-4">
          <Input
            type="number"
            value={val2}
            onChange={(e) => handle2(e.target.value)}
            className="text-3xl h-16 font-mono text-center bg-transparent border-b-2 border-x-0 border-t-0 border-white/20 focus:ring-0 focus:border-primary rounded-none"
          />
          <select
            value={unit2}
            onChange={(e) => setUnit2(e.target.value)}
            className="w-full bg-black/40 text-white h-12 rounded-lg px-4 border border-white/10 outline-none"
          >
            {Object.keys(units).map((u) => (
              <option key={u} value={u}>
                {u}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

// Temperature converter (non-linear, 4 inputs)
function TemperatureConverter() {
  const [celsius, setCelsius] = useState<string>("0");
  const [fahrenheit, setFahrenheit] = useState<string>("32");
  const [kelvin, setKelvin] = useState<string>("273.15");
  const [rankine, setRankine] = useState<string>("491.67");

  const fromCelsius = (c: number) => {
    setFahrenheit(String(c * 9 / 5 + 32));
    setKelvin(String(c + 273.15));
    setRankine(String((c + 273.15) * 9 / 5));
  };

  const handleCelsius = (v: string) => {
    setCelsius(v);
    fromCelsius(Number(v));
  };

  const handleFahrenheit = (v: string) => {
    setFahrenheit(v);
    const c = (Number(v) - 32) * 5 / 9;
    setCelsius(String(c));
    setKelvin(String(c + 273.15));
    setRankine(String((c + 273.15) * 9 / 5));
  };

  const handleKelvin = (v: string) => {
    setKelvin(v);
    const c = Number(v) - 273.15;
    setCelsius(String(c));
    setFahrenheit(String(c * 9 / 5 + 32));
    setRankine(String(Number(v) * 9 / 5));
  };

  const handleRankine = (v: string) => {
    setRankine(v);
    const k = Number(v) * 5 / 9;
    const c = k - 273.15;
    setCelsius(String(c));
    setFahrenheit(String(c * 9 / 5 + 32));
    setKelvin(String(k));
  };

  const fields = [
    { label: "Celsius (°C)", value: celsius, handler: handleCelsius },
    { label: "Fahrenheit (°F)", value: fahrenheit, handler: handleFahrenheit },
    { label: "Kelvin (K)", value: kelvin, handler: handleKelvin },
    { label: "Rankine (°R)", value: rankine, handler: handleRankine },
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {fields.map(({ label, value, handler }) => (
          <div
            key={label}
            className="bg-black/20 p-6 rounded-2xl border border-white/5 space-y-3"
          >
            <div className="text-sm text-muted-foreground font-medium">{label}</div>
            <Input
              type="number"
              value={value}
              onChange={(e) => handler(e.target.value)}
              className="text-2xl h-14 font-mono text-center bg-transparent border-b-2 border-x-0 border-t-0 border-white/20 focus:ring-0 focus:border-primary rounded-none"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function UnitConverters({ active }: { active: string }) {
  return (
    <ToolPageLayout toolId={active}>
      {active === "length-converter" && <GenericConverter units={lengthUnits} title="Length" />}
      {active === "weight-converter" && <GenericConverter units={weightUnits} title="Weight" />}
      {active === "temperature-converter" && <TemperatureConverter />}
      {active === "area-converter" && <GenericConverter units={areaUnits} title="Area" />}
      {active === "volume-converter" && <GenericConverter units={volumeUnits} title="Volume" />}
      {active === "speed-converter" && <GenericConverter units={speedUnits} title="Speed" />}
      {active === "time-converter" && <GenericConverter units={timeUnits} title="Time" />}
      {active === "data-storage-converter" && <GenericConverter units={dataUnits} title="Data Storage" />}
      {active === "pressure-converter" && <GenericConverter units={pressureUnits} title="Pressure" />}
      {active === "energy-converter" && <GenericConverter units={energyUnits} title="Energy" />}
    </ToolPageLayout>
  );
}
