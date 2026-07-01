import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="relative mt-20" style={{ zIndex: 10 }}>
      {/* Glowing divider */}
      <div className="glow-divider" />

      <div
        className="py-12"
        style={{ background: "rgba(3,0,20,0.7)", backdropFilter: "blur(12px)" }}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 md:col-span-2">
              <Link href="/" className="flex items-center gap-2 mb-4 w-fit">
                <div
                  className="w-6 h-6 rounded primary-gradient flex items-center justify-center font-bold text-black text-xs"
                  style={{ boxShadow: "0 0 10px rgba(0,245,255,0.4)" }}
                >
                  ⚡
                </div>
                <span
                  className="font-extrabold text-lg text-white"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    textShadow: "0 0 8px rgba(0,245,255,0.5)",
                  }}
                >
                  ToolZone
                </span>
              </Link>
              <p className="text-muted-foreground text-sm max-w-sm leading-relaxed">
                The go-to browser-based utility hub for developers, students,
                and professionals. 100+ free tools. Fast, secure, and offline-capable.
              </p>
            </div>

            <div>
              <h3
                className="font-semibold text-white mb-4 text-sm uppercase tracking-wider"
                style={{ fontFamily: "'JetBrains Mono', monospace", color: "rgba(0,245,255,0.8)" }}
              >
                Categories
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {[
                  ["Web & Dev Tools", "/category/web-dev-tools"],
                  ["Text Tools",      "/category/text-tools"],
                  ["Image Tools",     "/category/image-tools"],
                  ["Security & Password", "/category/security-password"],
                ].map(([label, href]) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="hover:text-white transition-colors"
                      style={{ display: "inline-block" }}
                      onMouseEnter={(e) =>
                        ((e.target as HTMLElement).style.color = "#00F5FF")
                      }
                      onMouseLeave={(e) =>
                        ((e.target as HTMLElement).style.color = "")
                      }
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3
                className="font-semibold text-white mb-4 text-sm uppercase tracking-wider"
                style={{ fontFamily: "'JetBrains Mono', monospace", color: "rgba(0,245,255,0.8)" }}
              >
                Legal
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {[
                  ["Privacy Policy",   "/privacy"],
                  ["Terms of Service", "/terms"],
                  ["Contact Us",       "/contact"],
                ].map(([label, href]) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="transition-colors hover:text-white"
                      style={{ display: "inline-block" }}
                      onMouseEnter={(e) =>
                        ((e.target as HTMLElement).style.color = "#00F5FF")
                      }
                      onMouseLeave={(e) =>
                        ((e.target as HTMLElement).style.color = "")
                      }
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div
            className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground"
            style={{ borderTop: "1px solid rgba(0,245,255,0.06)" }}
          >
            <p>© {new Date().getFullYear()} ToolZone. All rights reserved.</p>
            <Link
              href="/about"
              className="transition-colors hover:text-white"
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#00F5FF")}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "")}
            >
              About the Developer
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
