import { useMemo } from "react";
import { Navbar } from "@/components/Layout/Navbar";
import { Footer } from "@/components/Layout/Footer";
import { ToolCard } from "@/components/ToolCard";
import { Starfield } from "@/components/Starfield";
import { AdBanner } from "@/components/AdBanner";
import { tools, CATEGORY_COLORS, Category } from "@/data/tools";
import { Link } from "wouter";
import { ChevronRight } from "lucide-react";

interface CategoryMeta {
  emoji: string;
  headline: string;
  description: string;
  features: string[];
}

const CATEGORY_META: Record<Category, CategoryMeta> = {
  "Web & Dev Tools": {
    emoji: "🌐",
    headline: "Web & Developer Tools",
    description:
      "A complete toolkit for front-end and back-end developers. Format JSON, encode URLs, generate CSS gradients, pick colors, test regex patterns, and build meta tags — all directly in your browser without any installation.",
    features: [
      "JSON formatter & minifier",
      "URL & HTML encoder / decoder",
      "CSS gradient & box-shadow generator",
      "Color picker & palette builder",
      "Regex tester with live highlighting",
      "Meta & Open-Graph tag generator",
    ],
  },
  "Text Tools": {
    emoji: "📝",
    headline: "Text Utility Tools",
    description:
      "Everything you need to write, clean, and transform text. Count words and characters, convert between cases, generate placeholder copy, reverse or sort lines, apply ciphers, and build URL-friendly slugs — all processed instantly on the client.",
    features: [
      "Word & character counter with reading-time estimate",
      "Case converter (camelCase, snake_case, UPPER, lower, Title)",
      "Lorem ipsum placeholder generator",
      "ROT13 & Caesar cipher encoder",
      "Find & replace with regex support",
      "Duplicate line remover & text sorter",
    ],
  },
  "Image Tools": {
    emoji: "🖼️",
    headline: "Image Processing Tools",
    description:
      "Compress, resize, convert, and manipulate images entirely in your browser. No file is ever uploaded to a server — everything runs locally using the Canvas API, so your images stay private.",
    features: [
      "Lossless & lossy image compression",
      "Resize to exact pixel dimensions",
      "Convert images to / from Base64",
      "Extract dominant colors from any image",
      "One-click grayscale conversion",
      "Flip & rotate with live preview",
    ],
  },
  "Security & Password": {
    emoji: "🔐",
    headline: "Security & Password Tools",
    description:
      "Generate cryptographically strong passwords, check password strength, hash strings with MD5 / SHA-256 / SHA-512, create UUIDs, and generate random strings — all computed locally with zero server contact.",
    features: [
      "Customisable password generator (length, symbols, digits)",
      "Password strength analyser with entropy score",
      "MD5, SHA-1, SHA-256 & SHA-512 hash generator",
      "RFC 4122 UUID v4 bulk generator",
      "Random alphanumeric / hex string generator",
    ],
  },
  "QR & Barcode": {
    emoji: "📱",
    headline: "QR Code & Barcode Tools",
    description: "Generate and decode QR codes and standard barcodes in seconds, all client-side.",
    features: ["QR code generator from text or URL", "QR code reader from uploaded images", "Code128 & EAN-13 barcode generator"],
  },
  "Number & Math": {
    emoji: "🔢",
    headline: "Number & Math Tools",
    description: "Calculators and converters for everyday maths — from basic arithmetic to BMI, EMI, and base conversion.",
    features: ["Age, percentage & BMI calculators", "EMI & tip calculators", "Number base converter (binary, hex, octal)", "Prime checker, GCD / LCM", "Scientific calculator"],
  },
  "Unit Converters": {
    emoji: "📏",
    headline: "Unit Converter Tools",
    description: "Convert between length, weight, temperature, area, volume, speed, time, data storage, pressure, and energy units.",
    features: ["Length, weight, temperature", "Area, volume, speed", "Time & data storage", "Pressure & energy"],
  },
  "Date & Time": {
    emoji: "📅",
    headline: "Date & Time Tools",
    description: "Calculate date differences, work with Unix timestamps, run a countdown timer or stopwatch, and view world clocks.",
    features: ["Date difference calculator", "Unix timestamp converter", "Countdown timer & stopwatch", "Day-of-week finder", "World clock"],
  },
  "Encode/Decode": {
    emoji: "🔄",
    headline: "Encode & Decode Tools",
    description: "Base64 encoding, binary-to-text conversion, and ASCII art — all instant and client-side.",
    features: ["Base64 encoder & decoder", "Binary ↔ text converter", "ASCII art generator"],
  },
  "Finance Tools": {
    emoji: "💰",
    headline: "Finance & Money Tools",
    description: "Calculate compound/simple interest, salary breakdowns, VAT, and retirement savings projections.",
    features: ["Compound & simple interest", "Salary / take-home calculator", "VAT calculator", "Retirement savings projector"],
  },
  "Fun & Random": {
    emoji: "🎲",
    headline: "Fun & Random Tools",
    description: "Flip a coin, roll dice, pick a random name, generate random colors, and more — pure client-side fun.",
    features: ["Random number & coin flipper", "Dice roller (multiple dice)", "Random name picker", "Yes/No oracle", "Random color generator"],
  },
  "Productivity": {
    emoji: "✅",
    headline: "Productivity Tools",
    description: "A to-do list, Pomodoro timer, notes pad, word frequency counter, and text-to-speech — your browser productivity suite.",
    features: ["To-do list (persisted in localStorage)", "Pomodoro focus timer", "Scratchpad notes", "Word frequency analyser", "Text-to-speech reader"],
  },
};

export default function CategoryPage({ category }: { category: Category }) {
  const colors = CATEGORY_COLORS[category];
  const meta = CATEGORY_META[category];
  const categoryTools = useMemo(
    () => tools.filter((t) => t.category === category),
    [category]
  );

  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-x-hidden">
      <div className="aurora-bar" />
      <Starfield />

      {/* Nebula accent behind header */}
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(ellipse, ${colors.glow.replace("0.25", "0.12")} 0%, transparent 70%)`,
          filter: "blur(60px)",
          zIndex: 0,
        }}
      />

      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-10 relative" style={{ zIndex: 10 }}>
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-muted-foreground mb-10">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span style={{ color: colors.color }}>{category}</span>
        </div>

        {/* Category header */}
        <div className="max-w-3xl mx-auto text-center mb-14 animate-in fade-in slide-in-from-bottom-6 duration-700">
          <div
            className="text-6xl mb-5 w-24 h-24 mx-auto flex items-center justify-center rounded-2xl"
            style={{
              background: `${colors.color}12`,
              border: `1px solid ${colors.color}35`,
              boxShadow: `0 0 30px ${colors.color}30`,
            }}
          >
            {meta.emoji}
          </div>

          <h1
            className="text-4xl md:text-5xl font-extrabold text-white mb-4"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            <span style={{ color: colors.color, textShadow: `0 0 20px ${colors.color}60` }}>
              {meta.headline}
            </span>
          </h1>

          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            {meta.description}
          </p>

          {/* Feature pills */}
          <div className="flex flex-wrap justify-center gap-2">
            {meta.features.map((f) => (
              <span
                key={f}
                className="text-xs px-3 py-1 rounded-full"
                style={{
                  color: colors.color,
                  border: `1px solid ${colors.color}40`,
                  background: `${colors.color}0F`,
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                {f}
              </span>
            ))}
          </div>
        </div>

        <AdBanner type="leaderboard" />

        {/* Tools count */}
        <div className="mb-6 flex items-center gap-3">
          <h2
            className="text-xl font-bold text-white"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {categoryTools.length} Tools Available
          </h2>
          <div
            className="h-px flex-1"
            style={{ background: `linear-gradient(90deg, ${colors.color}60, transparent)` }}
          />
        </div>

        {/* Tool cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categoryTools.map((tool, idx) => (
            <ToolCard key={tool.id} tool={tool} index={idx} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
