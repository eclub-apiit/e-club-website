import { motion } from "framer-motion";
import { cn } from "../../lib/cn";

const NODES = [
  { x: 40, y: 70 },
  { x: 150, y: 25 },
  { x: 285, y: 85 },
  { x: 400, y: 35 },
  { x: 505, y: 115 },
  { x: 250, y: 175 },
  { x: 100, y: 195 },
  { x: 375, y: 215 },
];

const EDGES = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [1, 5],
  [5, 6],
  [2, 5],
  [5, 7],
  [4, 7],
];

const TONES = {
  light: { stroke: "#FFC857", dot: "#FFFFFF", accent: "#FFC857" },
  dark: { stroke: "#0E6E77", dot: "#0B3D2E", accent: "#F0A93A" },
};

/**
 * The club's recurring visual identity mark: an abstract constellation of
 * connected nodes — ideas linking into outcomes — that draws itself in on
 * scroll. Used in place of generic blurred blobs wherever a section needs a
 * decorative anchor. `tone="light"` for dark/gradient backgrounds, `"dark"`
 * for light backgrounds.
 */
export default function SignatureMotif({ className, tone = "light" }) {
  const { stroke, dot, accent } = TONES[tone];

  return (
    <svg
      viewBox="0 0 560 240"
      className={cn("pointer-events-none", className)}
      aria-hidden="true"
      fill="none"
    >
      {EDGES.map(([a, b], i) => (
        <motion.line
          key={`${a}-${b}`}
          x1={NODES[a].x}
          y1={NODES[a].y}
          x2={NODES[b].x}
          y2={NODES[b].y}
          stroke={stroke}
          strokeOpacity={0.55}
          strokeWidth="1.5"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.1, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
        />
      ))}
      {NODES.map((n, i) => (
        <motion.circle
          key={`${n.x}-${n.y}`}
          cx={n.x}
          cy={n.y}
          r={i % 3 === 0 ? 5 : 3}
          fill={i % 3 === 0 ? accent : dot}
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, delay: 0.5 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
        />
      ))}
    </svg>
  );
}
