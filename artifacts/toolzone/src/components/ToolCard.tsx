import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { Tool, CATEGORY_COLORS } from "@/data/tools";

export function ToolCard({ tool, index = 0 }: { tool: Tool; index?: number }) {
  const colors = CATEGORY_COLORS[tool.category];

  return (
    <Link href={tool.route}>
      <div
        className="group glass-card p-6 rounded-2xl h-full flex flex-col cursor-pointer reveal-card"
        style={{ animationDelay: `${index * 80}ms` }}
      >
        {/* Icon + badge row */}
        <div className="flex justify-between items-start mb-4">
          {/* Icon circle with category glow */}
          <div
            className="text-3xl w-14 h-14 flex items-center justify-center rounded-xl"
            style={{
              background: `${colors.color}12`,
              border: `1px solid ${colors.color}30`,
              boxShadow: `0 0 16px ${colors.color}25`,
            }}
          >
            {tool.icon}
          </div>

          {/* Neon category badge */}
          <div
            className="cat-badge"
            style={{
              color: colors.color,
              borderColor: `${colors.color}50`,
              background: `${colors.color}12`,
              boxShadow: `0 0 8px ${colors.color}30`,
            }}
          >
            {tool.category}
          </div>
        </div>

        {/* Name */}
        <h3
          className="text-lg font-bold text-white mb-2 transition-colors duration-200"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          onMouseEnter={() => {}}
        >
          <span className="group-hover:text-primary transition-colors duration-200">
            {tool.name}
          </span>
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground flex-1 leading-relaxed">
          {tool.description}
        </p>

        {/* Open tool CTA */}
        <div
          className="mt-5 flex items-center text-sm font-semibold gap-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
          style={{ color: "#00F5FF", fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Open Tool <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </Link>
  );
}
