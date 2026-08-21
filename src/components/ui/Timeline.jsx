import { motion } from "framer-motion";
import { cn } from "../../lib/cn";

/**
 * Animated vertical timeline. `items` = [{ year, title, description, icon? }]
 * The connecting line draws in on scroll; each node fades/slides in from alternating sides on desktop.
 */
export default function Timeline({ items, className }) {
  return (
    <div className={cn("relative", className)}>
      <div className="absolute left-[19px] top-0 bottom-0 w-px bg-black/8 md:left-1/2 md:-translate-x-1/2">
        <motion.div
          className="w-full origin-top bg-gradient-to-b from-teal via-gold to-dark-green"
          initial={{ height: 0 }}
          whileInView={{ height: "100%" }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      <div className="flex flex-col gap-12">
        {items.map((item, i) => {
          const isLeft = i % 2 === 0;
          return (
            <div key={item.year + item.title} className="relative flex items-start md:justify-between">
              <div className={cn("hidden md:block md:w-[calc(50%-40px)]", !isLeft && "order-2")}>
                {isLeft && <TimelineCard item={item} align="right" />}
              </div>

              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="absolute left-0 z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-4 border-bg bg-gold text-dark-green shadow-md md:static md:left-auto"
              >
                <span className="text-xs font-bold">{String(i + 1).padStart(2, "0")}</span>
              </motion.div>

              <div className="ml-6 flex-1 md:hidden">
                <TimelineCard item={item} align="left" />
              </div>
              <div className={cn("hidden md:block md:w-[calc(50%-40px)]", isLeft && "order-2")}>
                {!isLeft && <TimelineCard item={item} align="left" />}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TimelineCard({ item, align }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: align === "left" ? -24 : 24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "rounded-2xl border border-black/5 bg-white p-6 shadow-[0_2px_8px_rgba(11,61,46,0.06),0_12px_32px_-12px_rgba(11,61,46,0.12)]",
        align === "right" ? "md:text-right" : "text-left"
      )}
    >
      <span className="text-sm font-bold uppercase tracking-wide text-teal-dark">{item.year}</span>
      <h3 className="mt-1 text-lg font-semibold text-ink">{item.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-soft">{item.description}</p>
    </motion.div>
  );
}
