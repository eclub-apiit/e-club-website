import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { cn } from "../../lib/cn";

export default function Accordion({ items, className, allowMultiple = false }) {
  const [open, setOpen] = useState(() => new Set());

  const toggle = (idx) => {
    setOpen((prev) => {
      const next = allowMultiple ? new Set(prev) : new Set();
      if (prev.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  return (
    <div className={cn("divide-y divide-black/8 rounded-3xl border border-black/8 bg-white", className)}>
      {items.map((item, idx) => {
        const isOpen = open.has(idx);
        return (
          <div key={idx}>
            <button
              type="button"
              onClick={() => toggle(idx)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-teal/5 sm:px-8"
            >
              <span className="text-base font-medium text-ink sm:text-lg">{item.question}</span>
              <motion.span
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className={cn(
                  "flex h-9 w-9 shrink-0 items-center justify-center rounded-full",
                  isOpen ? "bg-gold text-dark-green" : "bg-teal/10 text-teal-dark"
                )}
              >
                <Plus className="h-4 w-4" />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-6 text-ink-soft leading-relaxed sm:px-8">{item.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
