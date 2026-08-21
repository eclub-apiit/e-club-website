import { cn } from "../../lib/cn";

const tones = {
  gold: "bg-gold/15 text-gold-dark border-gold/30",
  teal: "bg-teal/10 text-teal-dark border-teal/25",
  green: "bg-dark-green/8 text-dark-green border-dark-green/20",
  cream: "bg-cream text-ink-soft border-black/5",
  white: "bg-white/15 text-white border-white/30 backdrop-blur-sm",
};

export default function Badge({ children, tone = "gold", className, icon: Icon }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide",
        tones[tone],
        className
      )}
    >
      {Icon && <Icon className="h-3.5 w-3.5" />}
      {children}
    </span>
  );
}
