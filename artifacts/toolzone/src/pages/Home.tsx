import { useEffect, useState, useCallback } from "react";
import { useLocation } from "wouter";
import { Navbar } from "@/components/Layout/Navbar";
import { Footer } from "@/components/Layout/Footer";
import { ToolsGrid } from "@/components/ToolsGrid";
import { AdBanner } from "@/components/AdBanner";
import { Starfield } from "@/components/Starfield";
import { ArrowUp, Zap, Shuffle } from "lucide-react";
import { tools } from "@/data/tools";

const TYPEWRITER_WORDS = [
  "Security & Password",
  "Image Processing",
  "Text Utilities",
  "Web & Dev Tools",
  "Number & Math",
  "QR & Barcode",
  "Date & Time",
  "Finance Tools",
];

function useTypewriter(words: string[], speed = 75, pause = 1800) {
  const [text, setText] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIdx];
    const delay = deleting ? speed / 2 : speed;

    const timer = setTimeout(() => {
      if (!deleting) {
        const next = word.slice(0, text.length + 1);
        setText(next);
        if (next === word) {
          setTimeout(() => setDeleting(true), pause);
        }
      } else {
        const next = word.slice(0, text.length - 1);
        setText(next);
        if (next === "") {
          setDeleting(false);
          setWordIdx((i) => (i + 1) % words.length);
        }
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [text, deleting, wordIdx, words, speed, pause]);

  return text;
}

const ORBIT_ICONS = ["🔐", "🎨", "📐", "⚡", "📊", "🔍"];

export default function Home() {
  const [location, setLocation] = useLocation();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState<string | null>(null);

  const typewriterText = useTypewriter(TYPEWRITER_WORDS);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    setSearchQuery(searchParams.get("q") || "");
    setCategory(searchParams.get("cat"));
  }, [location]);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 500);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const goRandom = useCallback(() => {
    const tool = tools[Math.floor(Math.random() * tools.length)];
    setLocation(tool.route);
  }, [setLocation]);

  const isHero = !searchQuery && !category;

  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-x-hidden">
      {/* Aurora bar */}
      <div className="aurora-bar" />

      {/* Starfield canvas */}
      <Starfield />

      {/* Nebula blobs */}
      <div
        className="nebula-blob-cyan"
        style={{ top: "10%", left: "-10%", zIndex: 0 }}
      />
      <div
        className="nebula-blob-purple"
        style={{ top: "40%", right: "-5%", zIndex: 0 }}
      />
      <div
        className="nebula-blob-cyan"
        style={{ bottom: "10%", left: "30%", zIndex: 0, opacity: 0.6 }}
      />

      <Navbar />

      <main className="flex-1 container mx-auto px-4 pt-14 pb-20 relative" style={{ zIndex: 10 }}>

        {/* Hero */}
        {isHero && (
          <div className="text-center max-w-3xl mx-auto mb-16 animate-in fade-in slide-in-from-bottom-8 duration-700 relative">
            {/* Orbiting icons */}
            <div
              className="absolute top-1/2 left-1/2 pointer-events-none hidden lg:block"
              style={{ width: 0, height: 0 }}
            >
              {ORBIT_ICONS.map((icon, i) => {
                const cw = i % 2 === 0;
                const radius = 220 + (i % 3) * 40;
                const duration = 12 + i * 3;
                const delay = -(duration / ORBIT_ICONS.length) * i;
                return (
                  <div
                    key={i}
                    className="orbit-icon"
                    style={{
                      "--orbit-r": `${radius}px`,
                      animationName: cw ? "orbit-cw" : "orbit-ccw",
                      animationDuration: `${duration}s`,
                      animationDelay: `${delay}s`,
                      animationTimingFunction: "linear",
                      animationIterationCount: "infinite",
                    } as React.CSSProperties}
                  >
                    {icon}
                  </div>
                );
              })}
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-4 tracking-tight leading-tight">
              100+ Free Online
              <br />
              <span className="text-gradient">Utility Tools</span>
            </h1>

            <p className="text-lg text-muted-foreground mb-3">
              Your go-to browser-based workshop. Fast, secure, offline-capable.
            </p>

            {/* Typewriter subtitle */}
            <p className="text-base font-mono mb-10" style={{ color: "rgba(0,245,255,0.7)" }}>
              Explore&nbsp;
              <span style={{ color: "#00F5FF", textShadow: "0 0 8px rgba(0,245,255,0.6)" }}>
                {typewriterText}
              </span>
              <span className="tw-cursor" />
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#tools"
                onClick={(e) => { e.preventDefault(); document.getElementById("tools")?.scrollIntoView({ behavior: "smooth" }); }}
                className="cosmic-btn-cyan flex items-center gap-2 px-8 py-3 rounded-xl text-sm font-semibold"
              >
                <Zap className="w-4 h-4" />
                Explore Tools
              </a>
              <button
                onClick={goRandom}
                className="cosmic-btn-purple flex items-center gap-2 px-8 py-3 rounded-xl text-sm font-semibold"
              >
                <Shuffle className="w-4 h-4" />
                Random Tool
              </button>
            </div>
          </div>
        )}

        {searchQuery && (
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold">
              Search results for{" "}
              <span className="text-gradient">"{searchQuery}"</span>
            </h2>
          </div>
        )}

        <AdBanner type="leaderboard" />

        <div id="tools">
          <ToolsGrid searchQuery={searchQuery} initialCategory={category} />
        </div>
      </main>

      <Footer />

      {/* Back to top */}
      <button
        onClick={scrollToTop}
        aria-label="Back to top"
        className={`back-to-top fixed bottom-8 right-8 w-12 h-12 rounded-full flex items-center justify-center z-50 transition-all duration-300 ${
          showScrollTop ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
        }`}
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </div>
  );
}
