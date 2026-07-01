import { Navbar } from "@/components/Layout/Navbar";
import { Footer } from "@/components/Layout/Footer";
import { Starfield } from "@/components/Starfield";
import { Link } from "wouter";
import {
  ChevronRight,
  Network,
  Server,
  Brain,
  Phone,
  Mail,
  Zap,
  Shield,
  Globe,
} from "lucide-react";

const SKILLS = [
  {
    icon: Network,
    color: "#00F5FF",
    title: "Network Engineering",
    body: "Deep expertise in designing and managing complex network infrastructures, routing protocols, and enterprise connectivity.",
  },
  {
    icon: Server,
    color: "#BF00FF",
    title: "Systems Administration",
    body: "Extensive hands-on experience administering enterprise-grade Linux and Windows server environments at scale.",
  },
  {
    icon: Brain,
    color: "#FFD700",
    title: "AI & Development",
    body: "Passionate about leveraging AI to build practical, impactful tools that solve real problems for everyday users.",
  },
];

const TOOLZONE_FEATURES = [
  { icon: Zap, color: "#00F5FF", label: "100% Browser-Based" },
  { icon: Shield, color: "#00FF88", label: "Zero Data Uploads" },
  { icon: Globe, color: "#BF00FF", label: "Works Offline" },
];

export default function About() {
  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-x-hidden">
      <div className="aurora-bar" />
      <Starfield />

      {/* Background nebula */}
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(0,245,255,0.06) 0%, transparent 70%)",
          filter: "blur(60px)",
          zIndex: 0,
        }}
      />

      <Navbar />

      <main className="flex-1 relative" style={{ zIndex: 10 }}>
        {/* ── Hero ──────────────────────────────────────────────────── */}
        <section className="py-20 text-center border-b border-white/5">
          <div className="container mx-auto px-4 max-w-2xl">
            {/* Breadcrumb */}
            <div className="flex items-center justify-center text-sm text-muted-foreground mb-10">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <ChevronRight className="w-4 h-4 mx-2" />
              <span style={{ color: "#00F5FF" }}>About</span>
            </div>

            {/* Avatar */}
            <div className="relative inline-block mb-8">
              <div
                className="w-32 h-32 rounded-full flex items-center justify-center mx-auto text-4xl font-extrabold"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(0,245,255,0.15), rgba(191,0,255,0.15))",
                  border: "2px solid",
                  borderColor: "#00F5FF",
                  boxShadow:
                    "0 0 30px rgba(0,245,255,0.4), 0 0 60px rgba(0,245,255,0.15)",
                  fontFamily: "'Space Grotesk', sans-serif",
                  color: "#00F5FF",
                }}
              >
                YS
              </div>
              {/* Pulse ring */}
              <div
                className="absolute inset-0 rounded-full animate-ping"
                style={{
                  border: "1px solid rgba(0,245,255,0.3)",
                  animationDuration: "3s",
                }}
              />
            </div>

            <h1
              className="text-4xl md:text-5xl font-extrabold text-white mb-4"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Eng.{" "}
              <span
                style={{
                  color: "#00F5FF",
                  textShadow: "0 0 20px rgba(0,245,255,0.6)",
                }}
              >
                Yacoub Smadi
              </span>
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto">
              A network engineer passionate about systems development with
              extensive experience in systems administration and AI.
            </p>
          </div>
        </section>

        {/* ── Expertise cards ───────────────────────────────────────── */}
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {SKILLS.map(({ icon: Icon, color, title, body }) => (
                <div
                  key={title}
                  className="glass-card rounded-2xl p-8 text-center group"
                  style={{ border: `1px solid ${color}20` }}
                >
                  <div
                    className="w-14 h-14 rounded-xl mx-auto mb-5 flex items-center justify-center"
                    style={{
                      background: `${color}12`,
                      border: `1px solid ${color}35`,
                      boxShadow: `0 0 20px ${color}20`,
                    }}
                  >
                    <Icon
                      className="w-7 h-7"
                      style={{ color }}
                    />
                  </div>
                  <h3
                    className="text-base font-bold mb-3"
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      color,
                      textShadow: `0 0 10px ${color}60`,
                    }}
                  >
                    {title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── About ToolZone ────────────────────────────────────────── */}
        <section className="pb-16">
          <div className="container mx-auto px-4 max-w-2xl space-y-6">
            <div
              className="glass-card rounded-2xl p-8"
              style={{ border: "1px solid rgba(0,245,255,0.12)" }}
            >
              <h2
                className="text-xl font-bold text-white mb-5 flex items-center gap-3"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                <span
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-sm flex-shrink-0"
                  style={{
                    background: "rgba(0,245,255,0.1)",
                    border: "1px solid rgba(0,245,255,0.3)",
                    color: "#00F5FF",
                  }}
                >
                  ⚡
                </span>
                About ToolZone
              </h2>

              <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                <p>
                  ToolZone was built with a simple goal: give everyone — developers,
                  students, designers, and professionals — access to a complete set
                  of high-quality utility tools without any barriers. No
                  subscriptions, no sign-ups, no file uploads to remote servers.
                </p>
                <p>
                  Every one of the 100+ tools runs entirely inside your browser
                  using modern Web APIs (Canvas, FileReader, WebCrypto, and more).
                  Your data never leaves your device — what you type or upload stays
                  completely private.
                </p>
              </div>

              {/* Feature badges */}
              <div className="flex flex-wrap gap-3 mt-6">
                {TOOLZONE_FEATURES.map(({ icon: Icon, color, label }) => (
                  <span
                    key={label}
                    className="flex items-center gap-2 text-xs px-3 py-1.5 rounded-full"
                    style={{
                      color,
                      border: `1px solid ${color}40`,
                      background: `${color}0F`,
                      fontFamily: "'JetBrains Mono', monospace",
                    }}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {label}
                  </span>
                ))}
              </div>
            </div>

            {/* ── Contact ───────────────────────────────────────────── */}
            <div
              className="glass-card rounded-2xl p-8"
              style={{ border: "1px solid rgba(0,245,255,0.12)" }}
            >
              <h2
                className="text-xl font-bold text-white mb-6 flex items-center gap-3"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                <span
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-sm flex-shrink-0"
                  style={{
                    background: "rgba(0,245,255,0.1)",
                    border: "1px solid rgba(0,245,255,0.3)",
                    color: "#00F5FF",
                  }}
                >
                  📬
                </span>
                Contact
              </h2>

              <div className="space-y-4">
                {[
                  {
                    icon: Phone,
                    label: "Phone",
                    value: "+962 796 734 144",
                    href: "tel:+962796734144",
                  },
                  {
                    icon: Mail,
                    label: "Email",
                    value: "yakupsmadi@gmail.com",
                    href: "mailto:yakupsmadi@gmail.com",
                  },
                ].map(({ icon: Icon, label, value, href }) => (
                  <a
                    key={label}
                    href={href}
                    className="flex items-center gap-4 p-4 rounded-xl transition-all group"
                    style={{
                      background: "rgba(255,255,255,0.02)",
                      border: "1px solid rgba(0,245,255,0.1)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor =
                        "rgba(0,245,255,0.35)";
                      (e.currentTarget as HTMLElement).style.background =
                        "rgba(0,245,255,0.05)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.borderColor =
                        "rgba(0,245,255,0.1)";
                      (e.currentTarget as HTMLElement).style.background =
                        "rgba(255,255,255,0.02)";
                    }}
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{
                        background: "rgba(0,245,255,0.08)",
                        border: "1px solid rgba(0,245,255,0.25)",
                      }}
                    >
                      <Icon
                        className="w-5 h-5"
                        style={{ color: "#00F5FF" }}
                      />
                    </div>
                    <div>
                      <p
                        className="text-xs text-muted-foreground mb-0.5 uppercase tracking-wider"
                        style={{ fontFamily: "'JetBrains Mono', monospace" }}
                      >
                        {label}
                      </p>
                      <p
                        className="text-sm font-semibold text-white group-hover:text-primary transition-colors"
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                      >
                        {value}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
