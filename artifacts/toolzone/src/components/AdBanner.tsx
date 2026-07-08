import { useEffect, useRef } from "react";

// ─── Slot IDs ────────────────────────────────────────────────────────────────
// Replace each XXXXXXXXXX with the real slot ID from Google AdSense after
// creating the 3 ad units (see comments below for which unit to create).
const AD_SLOTS = {
  leaderboard: "XXXXXXXXXX", // Unit 1 → Leaderboard 728×90  (name: "ToolZone Leaderboard")
  rectangle:   "XXXXXXXXXX", // Unit 2 → Medium Rectangle 300×250 (name: "ToolZone Rectangle")
  mobile:      "XXXXXXXXXX", // Unit 3 → Mobile Banner 320×50 (name: "ToolZone Mobile")
} as const;

const PUB_ID = "ca-pub-1493226158255742";

interface AdBannerProps {
  type: keyof typeof AD_SLOTS;
}

export function AdBanner({ type }: AdBannerProps) {
  const ref = useRef<HTMLModElement>(null);
  const pushed = useRef(false);

  useEffect(() => {
    if (pushed.current) return;
    // Only push once per mount; skip if slot ID is still a placeholder
    if (AD_SLOTS[type] === "XXXXXXXXXX") return;
    try {
      pushed.current = true;
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    } catch (_) {}
  }, [type]);

  const wrapperClass = {
    leaderboard: "w-full max-w-[728px] h-[90px] mx-auto my-8 hidden md:block",
    rectangle:   "w-[300px] h-[250px] mx-auto my-8",
    mobile:      "w-[320px] h-[50px] mx-auto my-8 md:hidden",
  }[type];

  const adSize: Record<string, { w: string; h: string }> = {
    leaderboard: { w: "728", h: "90" },
    rectangle:   { w: "300", h: "250" },
    mobile:      { w: "320", h: "50" },
  };

  // Show placeholder when slot ID not yet set
  if (AD_SLOTS[type] === "XXXXXXXXXX") {
    return (
      <div className={`${wrapperClass} bg-card/50 border-2 border-dashed border-white/10 rounded-lg flex flex-col items-center justify-center text-center`}>
        <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-1">Advertisement</span>
        <span className="text-xs text-muted-foreground/60">{adSize[type].w}×{adSize[type].h}</span>
      </div>
    );
  }

  return (
    <div className={wrapperClass}>
      <ins
        ref={ref}
        className="adsbygoogle"
        style={{ display: "block", width: `${adSize[type].w}px`, height: `${adSize[type].h}px` }}
        data-ad-client={PUB_ID}
        data-ad-slot={AD_SLOTS[type]}
        data-ad-format="fixed"
      />
    </div>
  );
}
