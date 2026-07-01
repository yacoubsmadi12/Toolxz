import { useState, useMemo, useEffect } from "react";
import { tools, CATEGORY_COLORS, Category } from "@/data/tools";
import { ToolCard } from "@/components/ToolCard";
import { Search } from "lucide-react";

export function ToolsGrid({
  searchQuery = "",
  initialCategory = null,
}: {
  searchQuery?: string;
  initialCategory?: string | null;
}) {
  const [activeCategory, setActiveCategory] = useState<string | null>(initialCategory);
  const categories = Array.from(new Set(tools.map((t) => t.category)));

  useEffect(() => {
    if (initialCategory !== undefined) setActiveCategory(initialCategory);
  }, [initialCategory]);

  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
      const matchesSearch =
        searchQuery === "" ||
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = !activeCategory || tool.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  return (
    <div className="w-full">
      {/* Category filter chips */}
      {!searchQuery && (
        <div className="flex overflow-x-auto pb-4 mb-8 gap-2 no-scrollbar scroll-smooth">
          {/* All Tools chip */}
          <button
            onClick={() => setActiveCategory(null)}
            className="cat-chip"
            style={
              activeCategory === null
                ? {
                    color: "#00F5FF",
                    borderColor: "rgba(0,245,255,0.6)",
                    background: "rgba(0,245,255,0.1)",
                    boxShadow: "0 0 14px rgba(0,245,255,0.3)",
                  }
                : {
                    color: "rgba(255,255,255,0.5)",
                    borderColor: "rgba(255,255,255,0.1)",
                    background: "rgba(255,255,255,0.03)",
                  }
            }
          >
            All Tools
          </button>

          {categories.map((cat) => {
            const colors = CATEGORY_COLORS[cat as Category];
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="cat-chip"
                style={
                  isActive
                    ? {
                        color: colors.color,
                        borderColor: `${colors.color}90`,
                        background: `${colors.color}18`,
                        boxShadow: `0 0 14px ${colors.color}40`,
                      }
                    : {
                        color: "rgba(255,255,255,0.5)",
                        borderColor: "rgba(255,255,255,0.1)",
                        background: "rgba(255,255,255,0.03)",
                      }
                }
                onMouseEnter={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLElement).style.color = colors.color;
                    (e.currentTarget as HTMLElement).style.borderColor = `${colors.color}60`;
                    (e.currentTarget as HTMLElement).style.background = `${colors.color}0A`;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.5)";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)";
                    (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)";
                  }
                }}
              >
                {cat}
              </button>
            );
          })}
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
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
            style={{ background: "rgba(0,245,255,0.08)", border: "1px solid rgba(0,245,255,0.2)" }}
          >
            <Search className="w-8 h-8" style={{ color: "rgba(0,245,255,0.6)" }} />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">No tools found</h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            We couldn't find any tools matching "{searchQuery}". Try different keywords or browse categories.
          </p>
          <button
            onClick={() => setActiveCategory(null)}
            className="mt-6 text-sm font-semibold transition-colors"
            style={{ color: "#00F5FF" }}
            onMouseEnter={(e) => ((e.target as HTMLElement).style.textDecoration = "underline")}
            onMouseLeave={(e) => ((e.target as HTMLElement).style.textDecoration = "none")}
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
