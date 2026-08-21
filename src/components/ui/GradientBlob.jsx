import { cn } from "../../lib/cn";

const tones = {
  gold: "bg-gold/40",
  teal: "bg-teal/40",
  green: "bg-light-green/50",
  blue: "bg-soft-blue/40",
};

/** Decorative blurred, drifting blob for animated section backgrounds. Purely visual — aria-hidden. */
export default function GradientBlob({ tone = "gold", size = 420, className, style }) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute rounded-full blur-3xl animate-blob-drift", tones[tone], className)}
      style={{ width: size, height: size, ...style }}
    />
  );
}
