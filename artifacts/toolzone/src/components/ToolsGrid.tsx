import { useState, useMemo, useEffect } from "react";
import { tools, Category } from "@/data/tools";
import { ToolCard } from "@/components/ToolCard";
import { Search } from "lucide-react";

export function ToolsGrid({ searchQuery = "", initialCategory = null }: { searchQuery?: string, initialCategory?: string | null }) {
  const [activeCategory, setActiveCategory] = useState<string | null>(initialCategory);
  const categories = Array.from(new Set(tools.map(t => t.category)));

  // Sync prop changes
  useEffect(() => {
    if (initialCategory !== undefined) {
      setActiveCategory(initialCategory);
    }
  }, [initialCategory]);

  const filteredTools = useMemo(() => {
    return tools.filter(tool => {
      const matchesSearch = 
        searchQuery === "" || 
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
        
      const matchesCategory = 
        !activeCategory || tool.category === activeCategory;
        
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  return (
    <div className="w-full">
      {/* Categories Filter */}
      {!searchQuery && (
        <div className="flex overflow-x-auto pb-4 mb-8 gap-2 no-scrollbar scroll-smooth">
          <button
            onClick={() => setActiveCategory(null)}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeCategory === null
                ? "bg-primary text-white shadow-lg shadow-primary/25"
                : "bg-card text-muted-foreground hover:bg-card/80 hover:text-white"
            }`}
          >
            All Tools
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat
                  ? "bg-primary text-white shadow-lg shadow-primary/25"
                  : "bg-card border border-white/5 text-muted-foreground hover:bg-card/80 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Grid */}
      {filteredTools.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTools.map((tool, idx) => (
            <ToolCard key={tool.id} tool={tool} index={idx} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center glass-card rounded-2xl flex flex-col items-center">
          <div className="w-16 h-16 bg-card rounded-full flex items-center justify-center mb-4">
            <Search className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">No tools found</h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            We couldn't find any tools matching "{searchQuery}". Try using different keywords or browsing categories.
          </p>
          <button 
            onClick={() => {
              setActiveCategory(null);
            }}
            className="mt-6 text-primary hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
