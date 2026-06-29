export function AdBanner({ type }: { type: 'leaderboard' | 'rectangle' | 'mobile' }) {
  const styles = {
    leaderboard: "w-full max-w-[728px] h-[90px] mx-auto hidden md:flex",
    rectangle: "w-[300px] h-[250px] mx-auto",
    mobile: "w-[320px] h-[50px] mx-auto md:hidden"
  };

  return (
    <div className={`my-8 ${styles[type]}`}>
      <div className="w-full h-full bg-card/50 border-2 border-dashed border-white/10 rounded-lg flex flex-col items-center justify-center p-4 text-center">
        <span className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-1">Advertisement</span>
        <span className="text-xs text-muted-foreground/60">AdSense slot — replace with your Publisher ID</span>
      </div>
    </div>
  );
}
