import { Navbar } from "@/components/Layout/Navbar";
import { Footer } from "@/components/Layout/Footer";
import { Starfield } from "@/components/Starfield";
import { Link } from "wouter";
import { ChevronRight, FileText, AlertTriangle, CheckCircle, Ban, Globe, RefreshCw, Mail } from "lucide-react";

const LAST_UPDATED = "July 1, 2026";

function Section({ title, icon: Icon, children }: { title: string; icon: React.ElementType; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: "rgba(191,0,255,0.1)", border: "1px solid rgba(191,0,255,0.25)" }}
        >
          <Icon className="w-4 h-4" style={{ color: "#BF00FF" }} />
        </div>
        <h2 className="text-xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          {title}
        </h2>
      </div>
      <div className="text-muted-foreground leading-relaxed space-y-3 pl-12">
        {children}
      </div>
    </section>
  );
}

export default function Terms() {
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
          <span style={{ color: "#BF00FF" }}>Terms of Service</span>
        </div>

        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-14 animate-in fade-in slide-in-from-bottom-6 duration-700">
            <div
              className="w-20 h-20 mx-auto flex items-center justify-center rounded-2xl mb-6"
              style={{ background: "rgba(191,0,255,0.08)", border: "1px solid rgba(191,0,255,0.25)", boxShadow: "0 0 30px rgba(191,0,255,0.15)" }}
            >
              <FileText className="w-10 h-10" style={{ color: "#BF00FF" }} />
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Terms of <span style={{ background: "linear-gradient(135deg,#BF00FF,#00F5FF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Service</span>
            </h1>
            <p className="text-muted-foreground">
              Last updated: <span className="text-white font-medium">{LAST_UPDATED}</span>
            </p>
          </div>

          {/* Intro banner */}
          <div
            className="rounded-xl p-5 mb-12 flex items-start gap-4"
            style={{ background: "rgba(191,0,255,0.06)", border: "1px solid rgba(191,0,255,0.2)" }}
          >
            <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: "#BF00FF" }} />
            <p className="text-sm text-white leading-relaxed">
              <strong>By using ToolZone you agree to these terms.</strong> ToolZone is a free, browser-based utility platform. We want to keep things simple and fair — please read this before using our tools.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-8 md:p-10" style={{ border: "1px solid rgba(191,0,255,0.1)" }}>

            <Section title="1. Acceptance of Terms" icon={CheckCircle}>
              <p>
                By accessing or using ToolZone ("the Service", "we", "us", "our") you agree to be bound by these Terms of Service. If you do not agree to any part of these terms, you must not use the Service.
              </p>
              <p>
                We reserve the right to update these terms at any time. Changes are effective immediately upon posting. Your continued use of ToolZone after any change constitutes acceptance of the revised terms.
              </p>
            </Section>

            <Section title="2. Description of Service" icon={Globe}>
              <p>
                ToolZone provides a collection of free, browser-based utility tools including — but not limited to — text processors, image tools, developer utilities, security tools, calculators, and converters.
              </p>
              <p>
                All tools run <strong className="text-white">entirely in your browser</strong>. No data you enter is transmitted to our servers. The Service is provided free of charge and is supported by Google AdSense advertising.
              </p>
            </Section>

            <Section title="3. Permitted Use" icon={CheckCircle}>
              <p>You may use ToolZone for any lawful personal or commercial purpose, including:</p>
              <ul className="list-disc list-inside space-y-1 mt-2">
                <li>Processing and transforming your own data or files</li>
                <li>Generating passwords, hashes, UUIDs, or other random values</li>
                <li>Converting units, calculating results, or formatting content</li>
                <li>Using the output of any tool in your own projects</li>
              </ul>
            </Section>

            <Section title="4. Prohibited Use" icon={Ban}>
              <p>You must not use ToolZone to:</p>
              <ul className="list-disc list-inside space-y-1 mt-2">
                <li>Violate any applicable local, national, or international law or regulation</li>
                <li>Attempt to circumvent or disable any security features of the website</li>
                <li>Scrape, crawl, or automate requests in a way that degrades service for others</li>
                <li>Reproduce, resell, or redistribute the platform itself without prior written permission</li>
                <li>Use the tools to facilitate illegal activities, such as cracking passwords belonging to others</li>
              </ul>
            </Section>

            <Section title="5. Disclaimer of Warranties" icon={AlertTriangle}>
              <p>
                ToolZone is provided <strong className="text-white">"as is" and "as available"</strong>, without warranty of any kind — express or implied. We make no representations that:
              </p>
              <ul className="list-disc list-inside space-y-1 mt-2">
                <li>The Service will be uninterrupted or error-free</li>
                <li>The results produced by any tool are accurate, complete, or suitable for a specific purpose</li>
                <li>Any defects in the Service will be corrected</li>
              </ul>
              <p className="mt-3">
                You use the Service and rely on its output entirely at your own risk. Always verify critical results (e.g. financial calculations, cryptographic hashes) independently.
              </p>
            </Section>

            <Section title="6. Limitation of Liability" icon={AlertTriangle}>
              <p>
                To the fullest extent permitted by law, ToolZone and its operators shall not be liable for any indirect, incidental, special, consequential, or punitive damages — including loss of profits, data, or goodwill — arising out of or in connection with your use of the Service, even if we have been advised of the possibility of such damages.
              </p>
              <p>
                Our total liability to you for any claim arising from these terms or your use of the Service shall not exceed the amount you paid to access ToolZone in the twelve months preceding the claim (which, given the free nature of the Service, is zero).
              </p>
            </Section>

            <Section title="7. Intellectual Property" icon={FileText}>
              <p>
                The ToolZone name, logo, design, and original source code are the intellectual property of ToolZone and its contributors. The underlying open-source libraries used by ToolZone remain subject to their respective licences.
              </p>
              <p>
                You retain full ownership of any content you process through the tools. We claim no rights over your data.
              </p>
            </Section>

            <Section title="8. Third-Party Advertising" icon={Globe}>
              <p>
                ToolZone displays advertisements served by <strong className="text-white">Google AdSense</strong>. These advertisements are governed by Google's own Terms of Service and Privacy Policy. ToolZone is not responsible for the content of third-party advertisements.
              </p>
            </Section>

            <Section title="9. Governing Law" icon={FileText}>
              <p>
                These Terms shall be governed by and construed in accordance with applicable law. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the competent courts in the relevant territory.
              </p>
            </Section>

            <Section title="10. Contact" icon={Mail}>
              <p>
                For questions about these Terms of Service, please{" "}
                <Link href="/contact" style={{ color: "#BF00FF", textDecoration: "underline" }}>
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
