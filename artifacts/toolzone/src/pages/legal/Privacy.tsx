import { Navbar } from "@/components/Layout/Navbar";
import { Footer } from "@/components/Layout/Footer";
import { Starfield } from "@/components/Starfield";
import { Link } from "wouter";
import { ChevronRight, Shield, Eye, Cookie, Server, Lock, Mail } from "lucide-react";

const LAST_UPDATED = "July 1, 2026";

function Section({ title, icon: Icon, children }: { title: string; icon: React.ElementType; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: "rgba(0,245,255,0.1)", border: "1px solid rgba(0,245,255,0.25)" }}
        >
          <Icon className="w-4 h-4" style={{ color: "#00F5FF" }} />
        </div>
        <h2
          className="text-xl font-bold text-white"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          {title}
        </h2>
      </div>
      <div className="text-muted-foreground leading-relaxed space-y-3 pl-12">
        {children}
      </div>
    </section>
  );
}

export default function Privacy() {
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
          <span style={{ color: "#00F5FF" }}>Privacy Policy</span>
        </div>

        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-14 animate-in fade-in slide-in-from-bottom-6 duration-700">
            <div
              className="w-20 h-20 mx-auto flex items-center justify-center rounded-2xl mb-6"
              style={{ background: "rgba(0,245,255,0.08)", border: "1px solid rgba(0,245,255,0.25)", boxShadow: "0 0 30px rgba(0,245,255,0.15)" }}
            >
              <Shield className="w-10 h-10" style={{ color: "#00F5FF" }} />
            </div>
            <h1
              className="text-4xl md:text-5xl font-extrabold text-white mb-3"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Privacy <span className="text-gradient">Policy</span>
            </h1>
            <p className="text-muted-foreground">
              Last updated: <span className="text-white font-medium">{LAST_UPDATED}</span>
            </p>
          </div>

          {/* Highlight banner */}
          <div
            className="rounded-xl p-5 mb-12 flex items-start gap-4"
            style={{ background: "rgba(0,245,255,0.06)", border: "1px solid rgba(0,245,255,0.2)" }}
          >
            <Lock className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: "#00F5FF" }} />
            <p className="text-sm text-white leading-relaxed">
              <strong>Short version:</strong> ToolZone runs 100% in your browser. We do not collect, transmit, or store any personal data or file content. Nothing you type or upload ever leaves your device.
            </p>
          </div>

          {/* Content */}
          <div
            className="glass-card rounded-2xl p-8 md:p-10"
            style={{ border: "1px solid rgba(0,245,255,0.1)" }}
          >
            <Section title="1. Information We Collect" icon={Eye}>
              <p>
                <strong className="text-white">We collect no personal information.</strong> ToolZone is a fully client-side application. Every tool — password generators, image compressors, JSON formatters, hash generators, and all others — runs entirely inside your browser using JavaScript. No data is sent to our servers.
              </p>
              <p>
                We do not require you to create an account, log in, or provide any personal details to use any tool on this website.
              </p>
              <p>
                Some tools (such as the To-Do List and Notes Pad) save data to your browser's <strong className="text-white">localStorage</strong>. This data is stored only on your own device and is never transmitted to us or any third party.
              </p>
            </Section>

            <Section title="2. Cookies" icon={Cookie}>
              <p>
                ToolZone itself does not use cookies for analytics, tracking, or advertising.
              </p>
              <p>
                However, we display <strong className="text-white">Google AdSense</strong> advertisements. Google may set cookies on your browser to serve personalised ads based on your browsing activity. This is governed by{" "}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#00F5FF", textDecoration: "underline" }}
                >
                  Google's Privacy Policy
                </a>
                . You can opt out of personalised advertising at{" "}
                <a
                  href="https://adssettings.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#00F5FF", textDecoration: "underline" }}
                >
                  Google Ad Settings
                </a>
                .
              </p>
            </Section>

            <Section title="3. Third-Party Services" icon={Server}>
              <p>ToolZone uses the following third-party services, each subject to their own privacy policies:</p>
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li><strong className="text-white">Google AdSense</strong> — Advertising network (Google LLC)</li>
                <li><strong className="text-white">Google Fonts</strong> — Font delivery (Space Grotesk, Inter, JetBrains Mono)</li>
              </ul>
              <p className="mt-3">
                We do not integrate any analytics services (such as Google Analytics), session recording tools, or heatmap software.
              </p>
            </Section>

            <Section title="4. Your Files & Data" icon={Lock}>
              <p>
                When you use image tools, QR readers, or any file-based tool, your files are <strong className="text-white">processed entirely in your browser</strong> using the HTML5 Canvas API, FileReader API, and/or WebAssembly. Files are never uploaded to any server.
              </p>
              <p>
                When you close your browser tab, all processed data is immediately discarded (unless explicitly saved to localStorage by a productivity tool).
              </p>
            </Section>

            <Section title="5. Children's Privacy" icon={Shield}>
              <p>
                ToolZone is a general-purpose utilities website suitable for all ages. Because we do not collect any personal information, there are no special provisions required for users under the age of 13 (COPPA) or under the age of 16 (GDPR). We encourage parents to supervise their children's internet use.
              </p>
            </Section>

            <Section title="6. Changes to This Policy" icon={Eye}>
              <p>
                We may update this Privacy Policy from time to time. Any changes will be posted on this page with a revised "Last updated" date. We encourage you to review this page periodically. Continued use of ToolZone after changes constitutes your acceptance of the updated policy.
              </p>
            </Section>

            <Section title="7. Contact Us" icon={Mail}>
              <p>
                If you have any questions or concerns about this Privacy Policy, please{" "}
                <Link href="/contact" style={{ color: "#00F5FF", textDecoration: "underline" }}>
                  contact us
                </Link>
                .
              </p>
            </Section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
