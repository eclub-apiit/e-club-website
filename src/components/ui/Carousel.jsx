import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../../lib/cn";

/** Generic auto-advancing carousel with swipe/drag and dot navigation. `renderItem` gets (item, index). */
export default function Carousel({ items, renderItem, autoPlay = true, interval = 6000, className }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const go = useCallback(
    (next) => {
      setDirection(next > index || (index === items.length - 1 && next === 0) ? 1 : -1);
      setIndex((prev) => (next + items.length) % items.length);
    },
    [index, items.length]
  );

  useEffect(() => {
    if (!autoPlay) return;
    const id = setInterval(() => go(index + 1), interval);
    return () => clearInterval(id);
  }, [index, autoPlay, interval, go]);

  return (
    <div className={cn("relative", className)}>
      <div className="relative overflow-hidden">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={index}
            custom={direction}
            initial={{ opacity: 0, x: direction * 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -60 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              if (info.offset.x < -80) go(index + 1);
              else if (info.offset.x > 80) go(index - 1);
            }}
          >
            {renderItem(items[index], index)}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-8 flex items-center justify-center gap-6">
        <button
          type="button"
          aria-label="Previous"
          onClick={() => go(index - 1)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-dark-green/15 text-dark-green transition-colors hover:bg-dark-green hover:text-white"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="flex gap-2">
          {items.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => go(i)}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                i === index ? "w-8 bg-gold" : "w-2 bg-dark-green/20 hover:bg-dark-green/40"
              )}
            />
          ))}
        </div>
        <button
          type="button"
          aria-label="Next"
          onClick={() => go(index + 1)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-dark-green/15 text-dark-green transition-colors hover:bg-dark-green hover:text-white"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
