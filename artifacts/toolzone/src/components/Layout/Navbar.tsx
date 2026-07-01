import { Link, useLocation } from "wouter";
import { Search, X } from "lucide-react";
import { useState, useEffect } from "react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [, setLocation] = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setLocation(`/?q=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false);
    }
  };

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? "nav-frosted" : "bg-transparent"
      }`}
      style={{ marginTop: "2px" /* clear aurora bar */ }}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div
            className="w-8 h-8 rounded-lg primary-gradient flex items-center justify-center font-bold text-black text-sm shadow-lg group-hover:scale-105 transition-transform"
            style={{ boxShadow: "0 0 12px rgba(0,245,255,0.5)" }}
          >
            ⚡
          </div>
          <span
            className="font-extrabold text-xl tracking-tight text-white logo-glow group-hover:text-primary transition-colors"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            ToolZone
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="nav-link text-sm">
            All Tools
          </Link>

          {/* Search */}
          <form onSubmit={handleSearch} className="relative group">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors"
              style={{ color: "rgba(0,245,255,0.5)" }}
            />
            <input
              type="text"
              placeholder="Search tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="cosmic-search w-64 h-10 pl-10 pr-10 text-sm placeholder:text-muted-foreground"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </form>
        </div>

        {/* Mobile: search toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="w-10 h-10 flex items-center justify-center rounded-lg transition-colors"
            style={{ color: "rgba(0,245,255,0.8)" }}
          >
            <Search className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Mobile search panel */}
      {searchOpen && (
        <div
          className="md:hidden absolute top-16 left-0 w-full p-4 animate-in slide-in-from-top-2"
          style={{ background: "rgba(3,0,20,0.95)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(0,245,255,0.1)" }}
        >
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "rgba(0,245,255,0.5)" }} />
            <input
              type="text"
              autoFocus
              placeholder="Search tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="cosmic-search w-full h-12 pl-10 pr-4 text-sm placeholder:text-muted-foreground"
              style={{ borderRadius: "0.75rem" }}
            />
          </form>
        </div>
      )}
    </nav>
  );
}
