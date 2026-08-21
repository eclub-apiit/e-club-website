import React from 'react';
import { ChevronRight } from 'lucide-react';

export default function Button({
  children,
  variant = 'primary',
  withArrow = false,
  className = '',
  ...props
}) {
  const base =
    "group inline-flex items-center justify-center gap-3 font-bold rounded-full select-none " +
    "transition-all duration-300 active:translate-y-0.5 focus:outline-none " +
    "focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-950";

  const variants = {
    primary:
      "bg-[#7C3AED] text-white " +
      "shadow-[inset_0_1px_0_rgba(255,255,255,0.30),0_10px_24px_-6px_rgba(124,58,237,0.6),0_0_30px_rgba(124,58,237,0.25)] " +
      "hover:-translate-y-0.5 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.38),0_16px_32px_-6px_rgba(124,58,237,0.8),0_0_44px_rgba(124,58,237,0.45)]",
    secondary:
      "bg-[#FF4D6D] text-white " +
      "shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_10px_24px_-6px_rgba(255,77,109,0.6),0_0_30px_rgba(255,77,109,0.3)] " +
      "hover:-translate-y-0.5 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.42),0_16px_32px_-6px_rgba(255,77,109,0.85),0_0_46px_rgba(255,77,109,0.5)]",
    outline:
      "bg-white/5 text-[#14f2db] ring-1 ring-inset ring-[#38BDF8]/40 backdrop-blur-sm " +
      "shadow-[0_8px_20px_-8px_rgba(0,0,0,0.5)] hover:-translate-y-0.5 hover:bg-[#38BDF8]/10",
    ghost: "text-white hover:bg-white/10",
  };

  const arrowBg =
    variant === 'outline' ? 'bg-[#38BDF8]/20 text-[#14f2db]' : 'bg-white/20 text-white';

  return (
    <button
      className={`${base} px-7 py-3.5 text-sm md:text-base ${variants[variant]} ${className}`}
      {...props}
    >
      <span>{children}</span>
      {withArrow && (
        <span
          className={`flex h-7 w-7 items-center justify-center rounded-full ${arrowBg} transition-transform duration-300 group-hover:translate-x-0.5`}
        >
          <ChevronRight size={16} />
        </span>
      )}
    </button>
  );
}
