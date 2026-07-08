import { useState, useEffect, useCallback, useRef } from "react";
import { ToolPageLayout } from "@/components/Layout/ToolPageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Copy, Trash2, Download, X, Check } from "lucide-react";

// ─── Todo List ────────────────────────────────────────────────────────────────
interface Todo {
  id: number;
  text: string;
  done: boolean;
}

function TodoList() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("toolzone-todos") || "[]");
    } catch {
      return [];
    }
  });
  const [input, setInput] = useState("");

  useEffect(() => {
    localStorage.setItem("toolzone-todos", JSON.stringify(todos));
  }, [todos]);

  const add = useCallback(() => {
    const text = input.trim();
    if (!text) return;
    setTodos((t) => [...t, { id: Date.now(), text, done: false }]);
    setInput("");
  }, [input]);

  const toggle = (id: number) =>
    setTodos((t) => t.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo)));

  const remove = (id: number) =>
    setTodos((t) => t.filter((todo) => todo.id !== id));

  const clearDone = () =>
    setTodos((t) => t.filter((todo) => !todo.done));

  const active = todos.filter((t) => !t.done);
  const done = todos.filter((t) => t.done);

  const TodoItem = ({ todo }: { todo: Todo }) => (
    <div className="flex items-center gap-3 bg-black/30 border border-white/5 rounded-lg px-4 py-3">
      <input
        type="checkbox"
        checked={todo.done}
        onChange={() => toggle(todo.id)}
        className="w-4 h-4 accent-purple-500 cursor-pointer"
      />
      <span className={`flex-1 text-sm ${todo.done ? "line-through text-muted-foreground" : "text-white"}`}>
        {todo.text}
      </span>
      <button onClick={() => remove(todo.id)} className="text-muted-foreground hover:text-red-400 transition-colors">
        <X className="w-4 h-4" />
      </button>
    </div>
  );

  return (
    <div className="space-y-4 max-w-lg mx-auto">
      <div className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && add()}
          placeholder="Add a new task…"
          className="bg-black/40 flex-1"
        />
        <Button onClick={add} className="primary-gradient px-5">
          Add
        </Button>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="w-full">
          <TabsTrigger value="all" className="flex-1">All ({todos.length})</TabsTrigger>
          <TabsTrigger value="active" className="flex-1">Active ({active.length})</TabsTrigger>
          <TabsTrigger value="done" className="flex-1">Done ({done.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-2 mt-3">
          {todos.length === 0 && <p className="text-center text-muted-foreground py-8">No tasks yet.</p>}
          {todos.map((t) => <TodoItem key={t.id} todo={t} />)}
        </TabsContent>
        <TabsContent value="active" className="space-y-2 mt-3">
          {active.length === 0 && <p className="text-center text-muted-foreground py-8">No active tasks.</p>}
          {active.map((t) => <TodoItem key={t.id} todo={t} />)}
        </TabsContent>
        <TabsContent value="done" className="space-y-2 mt-3">
          {done.length === 0 && <p className="text-center text-muted-foreground py-8">No completed tasks.</p>}
          {done.map((t) => <TodoItem key={t.id} todo={t} />)}
        </TabsContent>
      </Tabs>

      {done.length > 0 && (
        <Button variant="secondary" onClick={clearDone} className="w-full">
          <Trash2 className="w-4 h-4 mr-2" /> Clear completed ({done.length})
        </Button>
      )}
    </div>
  );
}

// ─── Pomodoro Timer ───────────────────────────────────────────────────────────
function PomodoroTimer() {
  const WORK = 25 * 60;
  const BREAK = 5 * 60;

  const [phase, setPhase] = useState<"work" | "break">("work");
  const [timeLeft, setTimeLeft] = useState(WORK);
  const [running, setRunning] = useState(false);
  const [sessions, setSessions] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const total = phase === "work" ? WORK : BREAK;
  const progress = (timeLeft / total) * 100;

  const beep = () => {
    try {
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = 880;
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.8);
    } catch {}
  };

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((t) => {
          if (t <= 1) {
            beep();
            setRunning(false);
            if (phase === "work") {
              setSessions((s) => s + 1);
              setPhase("break");
              return BREAK;
            } else {
              setPhase("work");
              return WORK;
            }
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [running, phase]);

  const reset = () => {
    setRunning(false);
    setTimeLeft(phase === "work" ? WORK : BREAK);
  };

  const skip = () => {
    setRunning(false);
    if (phase === "work") {
      setSessions((s) => s + 1);
      setPhase("break");
      setTimeLeft(BREAK);
    } else {
      setPhase("work");
      setTimeLeft(WORK);
    }
  };

  const mins = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const secs = String(timeLeft % 60).padStart(2, "0");

  const circumference = 2 * Math.PI * 90;
  const dashOffset = circumference * (1 - progress / 100);

  return (
    <div className="space-y-8 max-w-sm mx-auto text-center">
      <div className="relative inline-block">
        <svg width="200" height="200" className="rotate-[-90deg]">
          <circle cx="100" cy="100" r="90" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="10" />
          <circle
            cx="100"
            cy="100"
            r="90"
            fill="none"
            stroke={phase === "work" ? "#a855f7" : "#22c55e"}
            strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            strokeLinecap="round"
            className="transition-all duration-1000"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-4xl font-extrabold font-mono text-white">
            {mins}:{secs}
          </div>
          <div className={`text-sm font-semibold mt-1 ${phase === "work" ? "text-purple-400" : "text-green-400"}`}>
            {phase === "work" ? "Focus" : "Break"}
          </div>
        </div>
      </div>

      <div className="flex gap-3 justify-center">
        <Button
          onClick={() => setRunning((r) => !r)}
          className="primary-gradient px-8"
        >
          {running ? "Pause" : "Start"}
        </Button>
        <Button variant="secondary" onClick={reset}>Reset</Button>
        <Button variant="secondary" onClick={skip}>Skip</Button>
      </div>

      <div className="bg-black/30 border border-white/5 rounded-xl p-4">
        <div className="text-3xl font-bold font-mono text-primary">{sessions}</div>
        <div className="text-sm text-muted-foreground mt-1">Sessions completed</div>
      </div>
    </div>
  );
}

// ─── Notes Pad ────────────────────────────────────────────────────────────────
function NotesPad() {
  const [text, setText] = useState(() => localStorage.getItem("toolzone-notes") || "");
  const [saved, setSaved] = useState(true);
  const [showClear, setShowClear] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleChange = (val: string) => {
    setText(val);
    setSaved(false);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      localStorage.setItem("toolzone-notes", val);
      setSaved(true);
    }, 500);
  };

  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const chars = text.length;

  const download = () => {
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "notes.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-3 max-w-2xl mx-auto">
      <div className="flex items-center justify-between">
        <Label>Notes</Label>
        <span className={`text-xs flex items-center gap-1 ${saved ? "text-green-400" : "text-muted-foreground"}`}>
          {saved ? <><Check className="w-3 h-3" /> Saved</> : "Saving…"}
        </span>
      </div>
      <Textarea
        value={text}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Start typing your notes…"
        className="bg-black/40 min-h-[400px] resize-y"
      />
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>{words} words · {chars} chars</span>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" onClick={download}>
            <Download className="w-3 h-3 mr-1" /> .txt
          </Button>
          {!showClear ? (
            <Button variant="secondary" size="sm" onClick={() => setShowClear(true)}>
              <Trash2 className="w-3 h-3 mr-1" /> Clear
            </Button>
          ) : (
            <div className="flex gap-1">
              <Button
                size="sm"
                className="text-xs bg-red-600 hover:bg-red-700 text-white"
                onClick={() => { handleChange(""); setShowClear(false); }}
              >
                Confirm
              </Button>
              <Button variant="secondary" size="sm" onClick={() => setShowClear(false)}>
                Cancel
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Word Frequency ───────────────────────────────────────────────────────────
const STOP_WORDS = new Set([
  "the","a","an","and","or","but","in","on","at","to","for","of","with","by",
  "from","as","is","was","are","were","be","been","being","have","has","had",
  "do","does","did","will","would","could","should","may","might","shall",
  "that","this","these","those","i","you","he","she","it","we","they","me",
  "him","her","us","them","my","your","his","its","our","their",
]);

function WordFrequency() {
  const [text, setText] = useState("");
  const [freq, setFreq] = useState<{ word: string; count: number }[]>([]);

  const analyze = () => {
    const words = text
      .toLowerCase()
      .replace(/[^a-z\s]/g, " ")
      .split(/\s+/)
      .filter((w) => w.length > 1 && !STOP_WORDS.has(w));

    const map: Record<string, number> = {};
    for (const w of words) map[w] = (map[w] || 0) + 1;

    const sorted = Object.entries(map)
      .map(([word, count]) => ({ word, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 20);

    setFreq(sorted);
  };

  const maxCount = freq[0]?.count || 1;

  return (
    <div className="space-y-4 max-w-lg mx-auto">
      <div>
        <Label>Paste Text</Label>
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste any text here to analyze word frequency…"
          className="mt-2 bg-black/40 min-h-[150px]"
        />
      </div>
      <Button onClick={analyze} className="w-full primary-gradient h-11">
        Analyze
      </Button>

      {freq.length > 0 && (
        <div className="space-y-2">
          <div className="grid grid-cols-[1fr_auto] text-xs text-muted-foreground px-1 gap-2">
            <span>Word</span>
            <span>Count</span>
          </div>
          {freq.map(({ word, count }) => (
            <div key={word} className="flex items-center gap-3">
              <span className="font-mono text-sm text-white w-32 shrink-0">{word}</span>
              <div className="flex-1 bg-black/20 rounded-full h-2">
                <div
                  className="h-2 rounded-full bg-purple-500"
                  style={{ width: `${(count / maxCount) * 100}%` }}
                />
              </div>
              <span className="font-mono text-sm text-primary w-8 text-right">{count}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Text to Speech ───────────────────────────────────────────────────────────
function TextToSpeech() {
  const [text, setText] = useState("");
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [voiceIdx, setVoiceIdx] = useState(0);
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [speaking, setSpeaking] = useState(false);

  useEffect(() => {
    const load = () => {
      const v = window.speechSynthesis.getVoices();
      if (v.length) setVoices(v);
    };
    load();
    window.speechSynthesis.onvoiceschanged = load;
    return () => { window.speechSynthesis.onvoiceschanged = null; };
  }, []);

  const speak = () => {
    if (!text.trim()) return;
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    if (voices[voiceIdx]) utter.voice = voices[voiceIdx];
    utter.rate = rate;
    utter.pitch = pitch;
    utter.onstart = () => setSpeaking(true);
    utter.onend = () => setSpeaking(false);
    utter.onerror = () => setSpeaking(false);
    window.speechSynthesis.speak(utter);
  };

  const pause = () => {
    if (window.speechSynthesis.speaking) window.speechSynthesis.pause();
  };

  const stop = () => {
    window.speechSynthesis.cancel();
    setSpeaking(false);
  };

  return (
    <div className="space-y-5 max-w-lg mx-auto">
      <div>
        <Label>Text to speak</Label>
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text here…"
          className="mt-2 bg-black/40 min-h-[140px]"
        />
      </div>

      {voices.length > 0 && (
        <div>
          <Label>Voice</Label>
          <select
            value={voiceIdx}
            onChange={(e) => setVoiceIdx(Number(e.target.value))}
            className="mt-2 w-full bg-black/40 border border-white/10 rounded-md px-3 py-2 text-sm text-white"
          >
            {voices.map((v, i) => (
              <option key={i} value={i}>
                {v.name} ({v.lang})
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Rate: {rate.toFixed(1)}</Label>
          <Slider
            min={0.5}
            max={2}
            step={0.1}
            value={[rate]}
            onValueChange={([v]) => setRate(v)}
            className="mt-3"
          />
        </div>
        <div>
          <Label>Pitch: {pitch.toFixed(1)}</Label>
          <Slider
            min={0.5}
            max={2}
            step={0.1}
            value={[pitch]}
            onValueChange={([v]) => setPitch(v)}
            className="mt-3"
          />
        </div>
      </div>

      <div className="flex gap-3">
        <Button onClick={speak} className="flex-1 primary-gradient">
          {speaking ? "Speaking…" : "Speak"}
        </Button>
        <Button variant="secondary" onClick={pause}>Pause</Button>
        <Button variant="secondary" onClick={stop}>Stop</Button>
      </div>
    </div>
  );
}

// ─── Speech to Text ───────────────────────────────────────────────────────────
function SpeechToText() {
  const [transcript, setTranscript] = useState("");
  const [recording, setRecording] = useState(false);
  const [editable, setEditable] = useState(false);
  const [supported, setSupported] = useState(true);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const SpeechRec =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRec) {
      setSupported(false);
      return;
    }
    const rec = new SpeechRec();
    rec.continuous = true;
    rec.interimResults = true;
    rec.onresult = (e: any) => {
      let final = "";
      for (let i = 0; i < e.results.length; i++) {
        final += e.results[i][0].transcript;
      }
      setTranscript(final);
    };
    rec.onend = () => setRecording(false);
    recognitionRef.current = rec;
  }, []);

  const startStop = () => {
    if (!recognitionRef.current) return;
    if (recording) {
      recognitionRef.current.stop();
      setRecording(false);
    } else {
      recognitionRef.current.start();
      setRecording(true);
    }
  };

  const copy = () => {
    navigator.clipboard.writeText(transcript);
    toast.success("Copied!");
  };

  if (!supported) {
    return (
      <div className="bg-black/30 border border-white/5 rounded-xl p-10 text-center max-w-lg mx-auto">
        <div className="text-4xl mb-4">🎙️</div>
        <p className="text-white font-semibold">Not supported in this browser</p>
        <p className="text-muted-foreground text-sm mt-2">
          Try Chrome or Edge for Speech Recognition support.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5 max-w-lg mx-auto">
      <div className="flex items-center gap-4">
        <Button
          onClick={startStop}
          className={recording ? "bg-red-600 hover:bg-red-700 text-white" : "primary-gradient"}
        >
          {recording && (
            <span className="w-2 h-2 rounded-full bg-white animate-pulse mr-2" />
          )}
          {recording ? "Stop Recording" : "Start Recording"}
        </Button>
        {recording && (
          <span className="text-red-400 text-sm animate-pulse">● Recording…</span>
        )}
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <Label>Transcript</Label>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setEditable((e) => !e)}
            className="text-xs"
          >
            {editable ? "Lock" : "Edit"}
          </Button>
        </div>
        <Textarea
          value={transcript}
          onChange={(e) => editable && setTranscript(e.target.value)}
          readOnly={!editable}
          placeholder="Your speech will appear here…"
          className="bg-black/40 min-h-[200px]"
        />
      </div>

      <div className="flex gap-3">
        <Button variant="secondary" onClick={copy} className="flex-1">
          <Copy className="w-4 h-4 mr-2" /> Copy
        </Button>
        <Button
          variant="secondary"
          onClick={() => setTranscript("")}
          className="flex-1"
        >
          <Trash2 className="w-4 h-4 mr-2" /> Clear
        </Button>
      </div>
    </div>
  );
}

// ─── Export ───────────────────────────────────────────────────────────────────
export default function ProductivityTools({ active }: { active: string }) {
  return (
    <ToolPageLayout toolId={active}>
      {active === "todo-list" && <TodoList />}
      {active === "pomodoro-timer" && <PomodoroTimer />}
      {active === "notes-pad" && <NotesPad />}
      {active === "word-frequency" && <WordFrequency />}
      {active === "text-to-speech" && <TextToSpeech />}
      {active === "speech-to-text" && <SpeechToText />}
    </ToolPageLayout>
  );
}
