import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { Tool, CATEGORY_COLORS } from "@/data/tools";

export function ToolCard({ tool, index = 0 }: { tool: Tool; index?: number }) {
  const colors = CATEGORY_COLORS[tool.category];
  
  return (
    <Link href={tool.route}>
      <div 
        className="group relative glass-card p-6 rounded-2xl h-full flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-primary/20 hover:border-primary/30 animate-in fade-in slide-in-from-bottom-4 fill-mode-both"
        style={{ animationDelay: `${index * 50}ms` }}
      >
        <div className="flex justify-between items-start mb-4">
          <div className="text-4xl bg-card rounded-xl w-14 h-14 flex items-center justify-center shadow-inner border border-white/5">
            {tool.icon}
          </div>
          <div className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full ${colors.bg} ${colors.text} border ${colors.border}`}>
            {tool.category}
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
          {tool.name}
        </h3>
        
        <p className="text-sm text-muted-foreground flex-1">
          {tool.description}
        </p>
        
        <div className="mt-6 flex items-center text-primary text-sm font-medium opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
          Open Tool <ArrowRight className="w-4 h-4 ml-1" />
        </div>
      </div>
    </Link>
  );
}
