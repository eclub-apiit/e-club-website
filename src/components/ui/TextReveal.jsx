import { motion } from "framer-motion";
import { cn } from "../../lib/cn";

const word = {
  hidden: { y: "115%" },
  show: { y: "0%", transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } },
};

/**
 * Headline treatment: each word slides up out of a mask, staggered — signature
 * type motion instead of a plain fade. Pass `text` for a plain headline, or
 * `segments` (array of `{ text, className? }`) when part of the headline
 * needs its own styling (e.g. a gradient-highlighted word) while keeping the
 * same per-word stagger across the whole thing.
 */
export default function TextReveal({ text, segments, as: Tag = "h1", className, wordClassName, delay = 0 }) {
  const MotionTag = motion[Tag] ?? motion.h1;
  const chunks = segments ?? [{ text, className: wordClassName }];
  const chunkWords = chunks.map((chunk) => chunk.text.split(" "));
  const totalWords = chunkWords.reduce((sum, w) => sum + w.length, 0);
  let seen = 0;

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.6 }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: delay } } }}
    >
      {chunks.map((chunk, ci) =>
        chunkWords[ci].map((w, wi) => {
          seen += 1;
          return (
            <span key={`${ci}-${wi}`} className="inline-block overflow-hidden pb-1 align-bottom">
              <motion.span variants={word} className={cn("inline-block", chunk.className)}>
                {w}
                {seen < totalWords ? " " : ""}
              </motion.span>
            </span>
          );
        })
      )}
    </MotionTag>
  );
}
