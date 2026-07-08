import { useState, useEffect, useRef, useCallback } from "react";
import { ToolPageLayout } from "@/components/Layout/ToolPageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Copy, Play, Pause, RotateCcw, Flag } from "lucide-react";

// ─── DateDifference ──────────────────────────────────────────────────────────
function DateDifference() {
  const today = new Date().toISOString().split("T")[0];
  const [start, setStart] = useState(today);
  const [end, setEnd] = useState(today);

  const diff = (() => {
    const s = new Date(start);
    const e = new Date(end);
    if (isNaN(s.getTime()) || isNaN(e.getTime())) return null;
    const msPerDay = 86400000;
    const totalDays = Math.round((e.getTime() - s.getTime()) / msPerDay);
    const abs = Math.abs(totalDays);
    const sign = totalDays < 0 ? -1 : 1;

    let years = 0, months = 0, days = 0;
    let cursor = new Date(s);
    if (sign >= 0) {
      years = e.getFullYear() - s.getFullYear();
      months = e.getMonth() - s.getMonth();
      days = e.getDate() - s.getDate();
      if (days < 0) { months--; const prev = new Date(e.getFullYear(), e.getMonth(), 0); days += prev.getDate(); }
      if (months < 0) { years--; months += 12; }
    } else {
      years = s.getFullYear() - e.getFullYear();
      months = s.getMonth() - e.getMonth();
      days = s.getDate() - e.getDate();
      if (days < 0) { months--; const prev = new Date(s.getFullYear(), s.getMonth(), 0); days += prev.getDate(); }
      if (months < 0) { years--; months += 12; }
    }

    return {
      totalDays,
      abs,
      years, months, days,
      weeks: Math.floor(abs / 7),
      hours: abs * 24,
      minutes: abs * 1440,
    };
  })();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Start Date</Label>
          <Input type="date" value={start} onChange={e => setStart(e.target.value)} className="bg-black/40 border-white/10" />
        </div>
        <div className="space-y-2">
          <Label>End Date</Label>
          <Input type="date" value={end} onChange={e => setEnd(e.target.value)} className="bg-black/40 border-white/10" />
        </div>
      </div>

      {diff && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {[
            { label: "Total Days", value: diff.totalDays },
            { label: "Breakdown", value: `${diff.years}y ${diff.months}m ${diff.days}d` },
            { label: "Weeks", value: diff.weeks },
            { label: "Hours", value: diff.hours.toLocaleString() },
            { label: "Minutes", value: diff.minutes.toLocaleString() },
          ].map(({ label, value }) => (
            <div key={label} className="bg-black/30 border border-white/5 rounded-xl p-6 text-center">
              <div className="text-xs text-muted-foreground mb-1">{label}</div>
              <div className="font-mono text-lg text-primary">{value}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── AddSubtractDays ─────────────────────────────────────────────────────────
function AddSubtractDays() {
  const today = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState(today);
  const [days, setDays] = useState("7");
  const [isAdd, setIsAdd] = useState(true);

  const result = (() => {
    const d = new Date(date);
    if (isNaN(d.getTime())) return null;
    const n = parseInt(days) || 0;
    d.setDate(d.getDate() + (isAdd ? n : -n));
    return {
      dateStr: d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
      isoStr: d.toISOString().split("T")[0],
      dayName: d.toLocaleDateString("en-US", { weekday: "long" }),
    };
  })();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label>Base Date</Label>
          <Input type="date" value={date} onChange={e => setDate(e.target.value)} className="bg-black/40 border-white/10" />
        </div>
        <div className="space-y-2">
          <Label>Number of Days</Label>
          <Input type="number" min="0" value={days} onChange={e => setDays(e.target.value)} className="bg-black/40 border-white/10" />
        </div>
        <div className="space-y-2">
          <Label>Operation</Label>
          <div className="flex items-center gap-3 h-10">
            <span className={isAdd ? "text-muted-foreground" : "text-primary"}>Subtract</span>
            <Switch checked={isAdd} onCheckedChange={setIsAdd} />
            <span className={isAdd ? "text-primary" : "text-muted-foreground"}>Add</span>
          </div>
        </div>
      </div>

      {result && (
        <div className="bg-black/30 border border-white/5 rounded-xl p-6 text-center space-y-2">
          <div className="text-xs text-muted-foreground">Result</div>
          <div className="font-mono text-2xl text-primary">{result.isoStr}</div>
          <div className="text-muted-foreground">{result.dateStr}</div>
          <div className="text-sm text-primary font-semibold">{result.dayName}</div>
        </div>
      )}
    </div>
  );
}

// ─── UnixTimestamp ────────────────────────────────────────────────────────────
function UnixTimestamp() {
  const [now, setNow] = useState(() => Math.floor(Date.now() / 1000));
  const [unixInput, setUnixInput] = useState("");
  const [dtInput, setDtInput] = useState("");

  useEffect(() => {
    const id = setInterval(() => setNow(Math.floor(Date.now() / 1000)), 1000);
    return () => clearInterval(id);
  }, []);

  const copy = (text: string) => { navigator.clipboard.writeText(text); toast.success("Copied!"); };

  const unixToHuman = (() => {
    const n = parseInt(unixInput);
    if (isNaN(n)) return null;
    const d = new Date(n * 1000);
    return isNaN(d.getTime()) ? null : d.toLocaleString("en-US", { dateStyle: "full", timeStyle: "long" });
  })();

  const dtToUnix = (() => {
    if (!dtInput) return null;
    const d = new Date(dtInput);
    return isNaN(d.getTime()) ? null : Math.floor(d.getTime() / 1000).toString();
  })();

  return (
    <div className="space-y-6">
      <div className="bg-black/30 border border-white/5 rounded-xl p-6 text-center">
        <div className="text-xs text-muted-foreground mb-2">Current Unix Timestamp</div>
        <div className="font-mono text-4xl text-primary mb-3">{now}</div>
        <Button variant="secondary" size="sm" onClick={() => copy(String(now))}>
          <Copy className="w-4 h-4 mr-2" /> Copy
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-black/40 border border-white/10 rounded-xl p-4 space-y-3">
          <Label>Unix Timestamp → Human Readable</Label>
          <Input
            type="number"
            placeholder="e.g. 1700000000"
            value={unixInput}
            onChange={e => setUnixInput(e.target.value)}
            className="bg-black/40 border-white/10 font-mono"
          />
          {unixToHuman && (
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm text-primary">{unixToHuman}</span>
              <Button variant="secondary" size="sm" onClick={() => copy(unixToHuman)}>
                <Copy className="w-3 h-3" />
              </Button>
            </div>
          )}
          {unixInput && !unixToHuman && <div className="text-sm text-red-400">Invalid timestamp</div>}
        </div>

        <div className="bg-black/40 border border-white/10 rounded-xl p-4 space-y-3">
          <Label>Date & Time → Unix Timestamp</Label>
          <Input
            type="datetime-local"
            value={dtInput}
            onChange={e => setDtInput(e.target.value)}
            className="bg-black/40 border-white/10"
          />
          {dtToUnix && (
            <div className="flex items-center justify-between gap-2">
              <span className="font-mono text-primary">{dtToUnix}</span>
              <Button variant="secondary" size="sm" onClick={() => copy(dtToUnix)}>
                <Copy className="w-3 h-3" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── DayOfWeek ────────────────────────────────────────────────────────────────
function DayOfWeek() {
  const today = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState(today);

  const info = (() => {
    const d = new Date(date);
    if (isNaN(d.getTime())) return null;
    const dayName = d.toLocaleDateString("en-US", { weekday: "long" });
    const start = new Date(d.getFullYear(), 0, 0);
    const diff = d.getTime() - start.getTime();
    const dayOfYear = Math.floor(diff / 86400000);

    // ISO week number
    const tmp = new Date(d.valueOf());
    const day = (d.getDay() + 6) % 7;
    tmp.setDate(tmp.getDate() - day + 3);
    const firstThursday = tmp.valueOf();
    tmp.setMonth(0, 1);
    if (tmp.getDay() !== 4) { tmp.setMonth(0, 1 + ((4 - tmp.getDay()) + 7) % 7); }
    const weekNumber = 1 + Math.ceil((firstThursday - tmp.valueOf()) / 604800000);

    const dayOfWeek = d.getDay();
    const daysUntilMonday = dayOfWeek === 1 ? 7 : (8 - dayOfWeek) % 7 || 7;
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

    return { dayName, dayOfYear, weekNumber, daysUntilMonday, isWeekend };
  })();

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Select a Date</Label>
        <Input type="date" value={date} onChange={e => setDate(e.target.value)} className="bg-black/40 border-white/10 max-w-xs" />
      </div>

      {info && (
        <div className="space-y-4">
          <div className="bg-black/30 border border-white/5 rounded-xl p-6 text-center">
            <div className="text-xs text-muted-foreground mb-1">Day of Week</div>
            <div className="text-4xl font-bold text-primary">{info.dayName}</div>
            {info.isWeekend && <div className="mt-2 text-sm text-yellow-400 font-semibold">Weekend 🎉</div>}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[
              { label: "Day of Year", value: info.dayOfYear },
              { label: "ISO Week Number", value: info.weekNumber },
              { label: "Days Until Monday", value: info.daysUntilMonday },
              { label: "Is Weekend?", value: info.isWeekend ? "Yes" : "No" },
            ].map(({ label, value }) => (
              <div key={label} className="bg-black/30 border border-white/5 rounded-xl p-6 text-center">
                <div className="text-xs text-muted-foreground mb-1">{label}</div>
                <div className="font-mono text-lg text-primary">{value}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── CountdownTimer ───────────────────────────────────────────────────────────
function CountdownTimer() {
  const [target, setTarget] = useState("");
  const [eventName, setEventName] = useState("");
  const [remaining, setRemaining] = useState<null | { days: number; hours: number; minutes: number; seconds: number; passed: boolean }>(null);

  useEffect(() => {
    if (!target) { setRemaining(null); return; }
    const calc = () => {
      const diff = new Date(target).getTime() - Date.now();
      if (diff <= 0) { setRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0, passed: true }); return; }
      const totalSec = Math.floor(diff / 1000);
      setRemaining({
        days: Math.floor(totalSec / 86400),
        hours: Math.floor((totalSec % 86400) / 3600),
        minutes: Math.floor((totalSec % 3600) / 60),
        seconds: totalSec % 60,
        passed: false,
      });
    };
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, [target]);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Target Date & Time</Label>
          <Input type="datetime-local" value={target} onChange={e => setTarget(e.target.value)} className="bg-black/40 border-white/10" />
        </div>
        <div className="space-y-2">
          <Label>Event Name (optional)</Label>
          <Input placeholder="e.g. New Year 2026" value={eventName} onChange={e => setEventName(e.target.value)} className="bg-black/40 border-white/10" />
        </div>
      </div>

      {remaining && (
        <div className="space-y-4">
          {eventName && <div className="text-center text-lg font-semibold text-primary">{eventName}</div>}
          {remaining.passed ? (
            <div className="bg-black/30 border border-white/5 rounded-xl p-6 text-center text-red-400 font-semibold text-xl">
              Event has passed!
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: "Days", value: remaining.days },
                { label: "Hours", value: remaining.hours },
                { label: "Minutes", value: remaining.minutes },
                { label: "Seconds", value: remaining.seconds },
              ].map(({ label, value }) => (
                <div key={label} className="bg-black/30 border border-white/5 rounded-xl p-6 text-center">
                  <div className="font-mono text-4xl text-primary">{pad(value)}</div>
                  <div className="text-xs text-muted-foreground mt-2">{label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Stopwatch ────────────────────────────────────────────────────────────────
function Stopwatch() {
  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [laps, setLaps] = useState<{ lapNum: number; lapTime: number; total: number }[]>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startRef = useRef<number>(0);
  const accRef = useRef<number>(0);
  const lastLapRef = useRef<number>(0);

  const format = (ms: number) => {
    const h = Math.floor(ms / 3600000);
    const m = Math.floor((ms % 3600000) / 60000);
    const s = Math.floor((ms % 60000) / 1000);
    const ms2 = ms % 1000;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}.${String(ms2).padStart(3, "0")}`;
  };

  const start = useCallback(() => {
    startRef.current = Date.now();
    intervalRef.current = setInterval(() => {
      setElapsed(accRef.current + (Date.now() - startRef.current));
    }, 16);
    setRunning(true);
  }, []);

  const pause = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    accRef.current += Date.now() - startRef.current;
    setRunning(false);
  }, []);

  const reset = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    accRef.current = 0;
    lastLapRef.current = 0;
    setElapsed(0);
    setLaps([]);
    setRunning(false);
  }, []);

  const lap = useCallback(() => {
    const total = accRef.current + (running ? Date.now() - startRef.current : 0);
    const lapTime = total - lastLapRef.current;
    lastLapRef.current = total;
    setLaps(prev => [...prev, { lapNum: prev.length + 1, lapTime, total }]);
  }, [running]);

  useEffect(() => () => { if (intervalRef.current) clearInterval(intervalRef.current); }, []);

  return (
    <div className="space-y-6">
      <div className="bg-black/30 border border-white/5 rounded-xl p-8 text-center">
        <div className="font-mono text-5xl text-primary">{format(elapsed)}</div>
      </div>

      <div className="flex justify-center gap-3">
        <Button className="primary-gradient" onClick={running ? pause : start}>
          {running ? <><Pause className="w-4 h-4 mr-2" /> Pause</> : <><Play className="w-4 h-4 mr-2" /> Start</>}
        </Button>
        <Button variant="secondary" onClick={lap} disabled={elapsed === 0}>
          <Flag className="w-4 h-4 mr-2" /> Lap
        </Button>
        <Button variant="secondary" onClick={reset}>
          <RotateCcw className="w-4 h-4 mr-2" /> Reset
        </Button>
      </div>

      {laps.length > 0 && (
        <div className="bg-black/40 border border-white/10 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left px-4 py-2 text-muted-foreground font-normal">Lap</th>
                <th className="text-right px-4 py-2 text-muted-foreground font-normal">Lap Time</th>
                <th className="text-right px-4 py-2 text-muted-foreground font-normal">Total</th>
              </tr>
            </thead>
            <tbody>
              {[...laps].reverse().map(l => (
                <tr key={l.lapNum} className="border-b border-white/5 last:border-0">
                  <td className="px-4 py-2 text-muted-foreground">#{l.lapNum}</td>
                  <td className="px-4 py-2 font-mono text-right text-primary">{format(l.lapTime)}</td>
                  <td className="px-4 py-2 font-mono text-right text-muted-foreground">{format(l.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ─── WorldClock ───────────────────────────────────────────────────────────────
const CITIES = [
  { name: "New York", tz: "America/New_York" },
  { name: "Los Angeles", tz: "America/Los_Angeles" },
  { name: "London", tz: "Europe/London" },
  { name: "Paris", tz: "Europe/Paris" },
  { name: "Dubai", tz: "Asia/Dubai" },
  { name: "Riyadh", tz: "Asia/Riyadh" },
  { name: "Mumbai", tz: "Asia/Kolkata" },
  { name: "Singapore", tz: "Asia/Singapore" },
  { name: "Tokyo", tz: "Asia/Tokyo" },
  { name: "Sydney", tz: "Australia/Sydney" },
];

function getUtcOffset(tz: string, date: Date): string {
  try {
    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone: tz,
      timeZoneName: "shortOffset",
    });
    const parts = formatter.formatToParts(date);
    const tzPart = parts.find(p => p.type === "timeZoneName");
    return tzPart ? tzPart.value : "";
  } catch {
    return "";
  }
}

function WorldClock() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {CITIES.map(({ name, tz }) => {
        const time = new Intl.DateTimeFormat("en-US", {
          timeZone: tz,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }).format(now);

        const date = new Intl.DateTimeFormat("en-US", {
          timeZone: tz,
          weekday: "short",
          month: "short",
          day: "numeric",
        }).format(now);

        const offset = getUtcOffset(tz, now);

        return (
          <div key={tz} className="bg-black/30 border border-white/5 rounded-xl p-5 space-y-1">
            <div className="text-xs text-muted-foreground uppercase tracking-wide">{name}</div>
            <div className="font-mono text-2xl text-primary">{time}</div>
            <div className="text-sm text-muted-foreground">{date}</div>
            <div className="text-xs text-muted-foreground">{offset}</div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Export ───────────────────────────────────────────────────────────────────
export default function DateTimeTools({ active }: { active: string }) {
  return (
    <ToolPageLayout toolId={active}>
      {active === "date-difference" && <DateDifference />}
      {active === "add-subtract-days" && <AddSubtractDays />}
      {active === "unix-timestamp" && <UnixTimestamp />}
      {active === "day-of-week" && <DayOfWeek />}
      {active === "countdown-timer" && <CountdownTimer />}
      {active === "stopwatch" && <Stopwatch />}
      {active === "world-clock" && <WorldClock />}
    </ToolPageLayout>
  );
}
