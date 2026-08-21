import { useEffect, useState } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";

/** Site-wide ambient light that trails the cursor on fine-pointer devices — a signature touch, not a cursor replacement. */
export default function CursorGlow() {
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(-400);
  const y = useMotionValue(-400);
  const springX = useSpring(x, { stiffness: 120, damping: 22, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 120, damping: 22, mass: 0.5 });
  const transform = useMotionTemplate`translate(${springX}px, ${springY}px) translate(-50%, -50%)`;

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);
    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-30 h-[440px] w-[440px] rounded-full bg-gold/25 blur-3xl mix-blend-soft-light"
      style={{ transform }}
    />
  );
}
