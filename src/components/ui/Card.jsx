import { motion } from "framer-motion";
import { cn } from "../../lib/cn";

/**
 * Premium floating card: lifts + scales on hover with a soft shadow and
 * an optional gold border-glow ring. Use `glass` for a translucent variant
 * over dark/colored backgrounds.
 */
export default function Card({ children, className, glass = false, glow = true, as: Tag = "div", ...props }) {
  const MotionTag = motion[Tag] ?? motion.div;
  return (
    <MotionTag
      whileHover={{ y: -8, scale: 1.015 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className={cn(
        "group relative rounded-3xl border transition-shadow duration-500",
        glass
          ? "border-white/15 bg-white/10 backdrop-blur-xl"
          : "border-black/5 bg-white shadow-[0_2px_8px_rgba(11,61,46,0.06),0_12px_32px_-12px_rgba(11,61,46,0.12)]",
        glow && !glass && "hover:shadow-[0_8px_16px_rgba(11,61,46,0.08),0_28px_56px_-16px_rgba(21,123,116,0.28)]",
        className
      )}
      {...props}
    >
      {glow && (
        <span className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 ring-1 ring-gold/40 transition-opacity duration-500 group-hover:opacity-100" />
      )}
      {children}
    </MotionTag>
  );
}
