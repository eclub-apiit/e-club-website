import { forwardRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "../../lib/cn";

const clamp = (value, max) => Math.max(-max, Math.min(max, value));

const variantClasses = {
  primary:
    "bg-gold text-dark-green shadow-[0_10px_30px_-8px_rgba(255,200,87,0.55)] hover:bg-dark-green hover:text-white",
  secondary:
    "bg-transparent text-white border border-white/40 backdrop-blur-sm hover:bg-white hover:text-dark-green",
  outline:
    "bg-transparent text-dark-green border border-dark-green/25 hover:border-dark-green hover:bg-dark-green hover:text-white",
  teal: "bg-teal text-white shadow-[0_10px_30px_-8px_rgba(21,123,116,0.55)] hover:bg-dark-green",
  ghost: "bg-transparent text-teal-dark hover:text-dark-green",
  sandbox:
    "bg-gradient-to-r from-[#7C3AED] to-[#a64d79] text-white shadow-[0_10px_30px_-8px_rgba(124,58,237,0.55)] hover:from-[#6d28d9] hover:to-[#8f3d66]",
};

const sizeClasses = {
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

/** Premium CTA button: ripple on click, icon slide on hover, smooth color transitions. */
const Button = forwardRef(function Button(
  {
    as: Comp = "button",
    variant = "primary",
    size = "md",
    icon = true,
    magnetic = true,
    className,
    children,
    onClick,
    ...props
  },
  ref
) {
  const [ripples, setRipples] = useState([]);
  const magnetX = useMotionValue(0);
  const magnetY = useMotionValue(0);
  const springX = useSpring(magnetX, { stiffness: 150, damping: 15, mass: 0.3 });
  const springY = useSpring(magnetY, { stiffness: 150, damping: 15, mass: 0.3 });

  const handleClick = (e) => {
    if (variant !== "ghost") {
      const rect = e.currentTarget.getBoundingClientRect();
      const id = Date.now();
      setRipples((r) => [...r, { id, x: e.clientX - rect.left, y: e.clientY - rect.top }]);
      setTimeout(() => setRipples((r) => r.filter((rp) => rp.id !== id)), 650);
    }
    onClick?.(e);
  };

  const handlePointerMove = (e) => {
    if (!magnetic) return;
    const rect = e.currentTarget.getBoundingClientRect();
    magnetX.set(clamp((e.clientX - (rect.left + rect.width / 2)) * 0.3, 14));
    magnetY.set(clamp((e.clientY - (rect.top + rect.height / 2)) * 0.3, 10));
  };

  const handlePointerLeave = () => {
    magnetX.set(0);
    magnetY.set(0);
  };

  const MotionComp = motion.create ? motion.create(Comp) : motion(Comp);

  return (
    <MotionComp
      ref={ref}
      onClick={handleClick}
      onMouseMove={handlePointerMove}
      onMouseLeave={handlePointerLeave}
      style={{ x: springX, y: springY }}
      whileTap={{ scale: 0.97 }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={cn(
        "group relative isolate inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-semibold transition-colors duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      <span className="relative z-10 inline-flex items-center gap-2 whitespace-nowrap">{children}</span>
      {icon && (
        <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1" />
      )}
      {ripples.map((r) => (
        <span
          key={r.id}
          className="pointer-events-none absolute rounded-full bg-current opacity-20"
          style={{
            left: r.x,
            top: r.y,
            width: 10,
            height: 10,
            transform: "translate(-50%, -50%)",
            animation: "ripple-expand 650ms ease-out forwards",
          }}
        />
      ))}
    </MotionComp>
  );
});

export default Button;
