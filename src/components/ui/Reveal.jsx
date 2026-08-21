import { motion } from "framer-motion";

const variants = {
  up: { hidden: { opacity: 0, y: 32 }, show: { opacity: 1, y: 0 } },
  down: { hidden: { opacity: 0, y: -32 }, show: { opacity: 1, y: 0 } },
  left: { hidden: { opacity: 0, x: 32 }, show: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: -32 }, show: { opacity: 1, x: 0 } },
  scale: { hidden: { opacity: 0, scale: 0.92 }, show: { opacity: 1, scale: 1 } },
  none: { hidden: { opacity: 0 }, show: { opacity: 1 } },
};

/** Scroll-triggered reveal wrapper. Wrap any section/element to fade+move it in on view. */
export default function Reveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.7,
  className,
  as = "div",
  once = true,
  amount = 0.25,
}) {
  const Tag = motion[as] ?? motion.div;
  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      variants={variants[direction]}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Tag>
  );
}

/** Applies staggered reveal to direct children via a shared parent variant. */
export function RevealGroup({ children, className, stagger = 0.12, delay = 0, as = "div", once = true, amount = 0.2 }) {
  const Tag = motion[as] ?? motion.div;
  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
    >
      {children}
    </Tag>
  );
}

export function RevealItem({ children, className, direction = "up", as = "div" }) {
  const Tag = motion[as] ?? motion.div;
  return (
    <Tag className={className} variants={variants[direction]} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
      {children}
    </Tag>
  );
}
