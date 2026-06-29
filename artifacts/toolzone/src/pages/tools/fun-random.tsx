import { ToolPageLayout } from "@/components/Layout/ToolPageLayout";

export default function FunRandomTools({ active }: { active: string }) {
  return (
    <ToolPageLayout toolId={active}>
      <div className="text-center py-20 text-muted-foreground">
        Tool implementation coming soon...
      </div>
    </ToolPageLayout>
  );
}
