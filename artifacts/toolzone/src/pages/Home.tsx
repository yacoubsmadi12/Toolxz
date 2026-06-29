import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Navbar } from "@/components/Layout/Navbar";
import { Footer } from "@/components/Layout/Footer";
import { ToolsGrid } from "@/components/ToolsGrid";
import { AdBanner } from "@/components/AdBanner";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [location] = useLocation();
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  // Parse query params (simple version)
  const queryMatch = location.match(/\?q=([^&]*)/);
  const catMatch = location.match(/\?cat=([^&]*)/);
  
  // Better parsing using URLSearchParams on window.location
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState<string | null>(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    setSearchQuery(searchParams.get("q") || "");
    setCategory(searchParams.get("cat"));
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col relative">
      {/* Background glow effects */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/20 blur-[120px] rounded-full pointer-events-none opacity-50"></div>
      
      <Navbar />

      <main className="flex-1 container mx-auto px-4 pt-12 pb-20 relative z-10">
        
        {/* Hero Section */}
        {!searchQuery && !category && (
          <div className="text-center max-w-3xl mx-auto mb-16 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight">
              100+ Free Online <br/>
              <span className="text-gradient">Utility Tools</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Your go-to browser-based workshop. Fast, secure, and no installation required. 
              Everything works offline after your first visit.
            </p>
          </div>
        )}

        {searchQuery && (
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold">Search results for "{searchQuery}"</h2>
          </div>
        )}

        <AdBanner type="leaderboard" />

        <ToolsGrid searchQuery={searchQuery} initialCategory={category} />

      </main>

      <Footer />

      {/* Back to top button */}
      <Button 
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 w-12 h-12 rounded-full p-0 shadow-xl shadow-primary/20 transition-all duration-300 z-50 ${
          showScrollTop ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
        }`}
      >
        <ArrowUp className="w-5 h-5" />
      </Button>
    </div>
  );
}
