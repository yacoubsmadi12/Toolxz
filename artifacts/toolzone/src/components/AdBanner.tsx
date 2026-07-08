import { useEffect, useRef } from "react";

const AD_SLOTS = {
  leaderboard: "3143481736",
  rectangle:   "5181276117",
  mobile:      "4412366760",
} as const;

const PUB_ID = "ca-pub-1493226158255742";

interface AdBannerProps {
  type: keyof typeof AD_SLOTS;
}

export function AdBanner({ type }: AdBannerProps) {
  const pushed = useRef(false);

  useEffect(() => {
    if (pushed.current) return;
    pushed.current = true;
    try {
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    } catch (_) {}
  }, [type]);

  const wrapperClass = {
    leaderboard: "w-full max-w-[728px] mx-auto my-8 hidden md:block",
    rectangle:   "w-full max-w-[300px] mx-auto my-8",
    mobile:      "w-full max-w-[320px] mx-auto my-8 md:hidden",
  }[type];

  return (
    <div className={wrapperClass}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={PUB_ID}
        data-ad-slot={AD_SLOTS[type]}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
