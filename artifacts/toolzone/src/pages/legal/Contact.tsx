import { useState } from "react";
import { Navbar } from "@/components/Layout/Navbar";
import { Footer } from "@/components/Layout/Footer";
import { Starfield } from "@/components/Starfield";
import { Link } from "wouter";
import { ChevronRight, Mail, MessageSquare, Send, CheckCircle, HelpCircle, Zap, Shield, Image } from "lucide-react";

const FAQS = [
  {
    q: "Are all tools really free?",
    a: "Yes. Every tool on ToolZone is completely free to use with no registration, no limits, and no hidden fees. The site is supported by Google AdSense ads.",
  },
  {
    q: "Does ToolZone upload my files to a server?",
    a: "Never. All processing happens locally in your browser using JavaScript APIs (Canvas, FileReader, WebCrypto, etc.). Your files and data never leave your device.",
  },
  {
    q: "Can I use ToolZone offline?",
    a: "After your first visit, most tools work offline because the JavaScript bundles are cached by your browser. A few tools that rely on external fonts or ads will need a connection for those specific resources.",
  },
  {
    q: "A tool gave me an incorrect result — what should I do?",
    a: "Please report it using the contact form below, describing the tool name, your input, the output you received, and the expected output. We'll investigate and fix it as quickly as possible.",
  },
  {
    q: "Can I suggest a new tool?",
    a: "Absolutely! We'd love to hear your ideas. Use the contact form and select 'Tool Request' as the subject.",
  },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "General Question", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setLoading(true);
    // Simulate sending (client-side only)
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1200);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(0,245,255,0.15)",
    borderRadius: "0.75rem",
    padding: "0.75rem 1rem",
    color: "#ffffff",
    fontSize: "0.875rem",
    outline: "none",
    transition: "border-color 0.25s, box-shadow 0.25s",
    fontFamily: "'Inter', sans-serif",
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.target.style.borderColor = "rgba(0,245,255,0.55)";
    e.target.style.boxShadow = "0 0 0 3px rgba(0,245,255,0.1)";
  };
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.target.style.borderColor = "rgba(0,245,255,0.15)";
    e.target.style.boxShadow = "none";
  };

  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-x-hidden">
      <div className="aurora-bar" />
      <Starfield />
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-12 relative" style={{ zIndex: 10 }}>
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-muted-foreground mb-10">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span style={{ color: "#00F5FF" }}>Contact Us</span>
        </div>

        {/* Header */}
        <div className="text-center mb-14 animate-in fade-in slide-in-from-bottom-6 duration-700">
          <div
            className="w-20 h-20 mx-auto flex items-center justify-center rounded-2xl mb-6"
            style={{ background: "rgba(0,245,255,0.08)", border: "1px solid rgba(0,245,255,0.25)", boxShadow: "0 0 30px rgba(0,245,255,0.15)" }}
          >
            <Mail className="w-10 h-10" style={{ color: "#00F5FF" }} />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Contact <span className="text-gradient">Us</span>
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Have a question, found a bug, or want to suggest a new tool? We'd love to hear from you.
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-10">

          {/* Left: info cards */}
          <div className="lg:col-span-2 space-y-5">
            {[
              { icon: MessageSquare, color: "#00F5FF", title: "General Questions", body: "Ask us anything about how ToolZone works, our tools, or the platform." },
              { icon: Zap, color: "#FFD700", title: "Tool Requests", body: "Missing a tool you need? Tell us and we'll consider adding it to the collection." },
              { icon: Shield, color: "#FF4757", title: "Bug Reports", body: "Spotted an error or incorrect result? Send us the details and we'll fix it fast." },
              { icon: Image, color: "#BF00FF", title: "Partnerships", body: "Interested in advertising or partnering with ToolZone? Reach out via the form." },
            ].map(({ icon: Icon, color, title, body }) => (
              <div
                key={title}
                className="glass-card rounded-xl p-5 flex gap-4 items-start"
                style={{ border: `1px solid ${color}20` }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: `${color}12`, border: `1px solid ${color}30` }}
                >
                  <Icon className="w-5 h-5" style={{ color }} />
                </div>
                <div>
                  <p className="font-semibold text-white text-sm mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{title}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{body}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right: form */}
          <div className="lg:col-span-3">
            <div className="glass-card rounded-2xl p-8" style={{ border: "1px solid rgba(0,245,255,0.12)" }}>
              {sent ? (
                <div className="py-12 text-center">
                  <div
                    className="w-16 h-16 mx-auto flex items-center justify-center rounded-full mb-5"
                    style={{ background: "rgba(0,255,136,0.1)", border: "1px solid rgba(0,255,136,0.3)", boxShadow: "0 0 24px rgba(0,255,136,0.2)" }}
                  >
                    <CheckCircle className="w-8 h-8" style={{ color: "#00FF88" }} />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Message Sent!</h3>
                  <p className="text-muted-foreground mb-6">Thank you for reaching out. We'll get back to you as soon as possible.</p>
                  <button
                    onClick={() => { setSent(false); setForm({ name: "", email: "", subject: "General Question", message: "" }); }}
                    className="cosmic-btn-cyan px-6 py-2.5 rounded-lg text-sm"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                        Your Name <span style={{ color: "#FF4757" }}>*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        style={inputStyle}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                        Email Address <span style={{ color: "#FF4757" }}>*</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        style={inputStyle}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                      Subject
                    </label>
                    <select
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      style={{ ...inputStyle, cursor: "pointer" }}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                    >
                      <option value="General Question">General Question</option>
                      <option value="Bug Report">Bug Report</option>
                      <option value="Tool Request">Tool Request</option>
                      <option value="Partnership">Partnership</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                      Message <span style={{ color: "#FF4757" }}>*</span>
                    </label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Tell us what's on your mind..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      style={{ ...inputStyle, resize: "vertical", minHeight: "120px" }}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="cosmic-btn-cyan w-full py-3 rounded-xl text-sm flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto mt-20">
          <div className="flex items-center gap-3 mb-8">
            <HelpCircle className="w-6 h-6" style={{ color: "#00F5FF" }} />
            <h2 className="text-2xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-4">
            {FAQS.map(({ q, a }) => (
              <div
                key={q}
                className="glass-card rounded-xl p-6"
                style={{ border: "1px solid rgba(0,245,255,0.1)" }}
              >
                <p className="font-semibold text-white mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{q}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
