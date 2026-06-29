import { ReactNode } from "react";
import { Link } from "wouter";
import { ChevronRight } from "lucide-react";
import { Tool, CATEGORY_COLORS, tools } from "@/data/tools";
import { AdBanner } from "@/components/AdBanner";
import { Navbar } from "@/components/Layout/Navbar";
import { Footer } from "@/components/Layout/Footer";
import { ToolCard } from "@/components/ToolCard";

interface ToolPageLayoutProps {
  toolId: string;
  children: ReactNode;
}

export function ToolPageLayout({ toolId, children }: ToolPageLayoutProps) {
  const tool = tools.find(t => t.id === toolId);
  
  if (!tool) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Tool Not Found</h1>
            <Link href="/">
              <span className="text-primary hover:underline cursor-pointer">Return Home</span>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const categoryColor = CATEGORY_COLORS[tool.category];
  
  // Find related tools in same category
  const relatedTools = tools
    .filter(t => t.category === tool.category && t.id !== tool.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <Link href={`/?cat=${encodeURIComponent(tool.category)}`} className="hover:text-white transition-colors">
            {tool.category}
          </Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-white">{tool.name}</span>
        </div>

        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-10">
          <div className="text-6xl mb-6">{tool.icon}</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">{tool.name}</h1>
          <p className="text-xl text-muted-foreground">{tool.description}</p>
        </div>

        <AdBanner type="leaderboard" />
        <AdBanner type="mobile" />

        {/* Tool UI Container */}
        <div className="max-w-4xl mx-auto glass-card rounded-2xl p-6 md:p-8 mb-16 shadow-2xl relative overflow-hidden">
          {/* Subtle glow effect behind tool */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-lg bg-primary/5 blur-[100px] rounded-full pointer-events-none" />
          
          <div className="relative z-10">
            {children}
          </div>
        </div>

        <AdBanner type="rectangle" />

        {/* Related Tools */}
        {relatedTools.length > 0 && (
          <div className="mt-20">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="text-primary">More from</span> {tool.category}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {relatedTools.map(t => (
                <ToolCard key={t.id} tool={t} index={0} />
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
