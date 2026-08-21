import { motion, useScroll, useSpring } from "framer-motion";
import { cn } from "../../lib/cn";

/** Fixed top progress bar reflecting overall page scroll position. */
export function ScrollProgressBar({ className }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, restDelta: 0.001 });
  return (
    <motion.div
      style={{ scaleX }}
      className={cn("fixed inset-x-0 top-0 z-100 h-[3px] origin-left bg-gradient-to-r from-teal via-gold to-dark-green", className)}
    />
  );
}

/** Step/stage progress indicator, e.g. for multi-step forms or process timelines. */
export function StepProgress({ steps, current, className }) {
  return (
    <div className={cn("flex items-center", className)}>
      {steps.map((step, i) => (
        <div key={step} className="flex flex-1 items-center last:flex-none">
          <div className="flex flex-col items-center gap-2">
            <div
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold transition-colors duration-300",
                i <= current ? "bg-dark-green text-white" : "bg-cream text-ink-soft"
              )}
            >
              {i + 1}
            </div>
            <span className="text-xs font-medium text-ink-soft">{step}</span>
          </div>
          {i < steps.length - 1 && (
            <div className="mx-2 h-0.5 flex-1 bg-black/8">
              <motion.div
                className="h-full bg-gold"
                initial={{ width: 0 }}
                animate={{ width: i < current ? "100%" : "0%" }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
