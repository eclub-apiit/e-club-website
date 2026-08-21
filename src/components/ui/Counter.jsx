import { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";

/** Animated count-up number, triggers once when scrolled into view. */
export default function Counter({ value, suffix = "", prefix = "", className, duration = 1.8 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.6 });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { duration: duration * 1000, bounce: 0 });
  const nodeRef = useRef(null);

  useEffect(() => {
    if (isInView) motionValue.set(value);
  }, [isInView, value, motionValue]);

  useEffect(
    () =>
      spring.on("change", (latest) => {
        if (nodeRef.current) nodeRef.current.textContent = `${prefix}${Math.floor(latest).toLocaleString()}${suffix}`;
      }),
    [spring, prefix, suffix]
  );

  return (
    <motion.span ref={ref} className={className}>
      <span ref={nodeRef}>{prefix}0{suffix}</span>
    </motion.span>
  );
}
