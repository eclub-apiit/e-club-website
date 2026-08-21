import { cn } from "../../lib/cn";
import Reveal from "./Reveal";
import TextReveal from "./TextReveal";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  light = false,
  className,
}) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      {eyebrow && (
        <Reveal direction="up">
          <div className={cn("flex items-center gap-3", align === "center" && "justify-center")}>
            <span className={cn("h-px w-9", light ? "bg-gold" : "bg-gold-dark")} aria-hidden="true" />
            <span
              className={cn(
                "text-xs font-semibold uppercase tracking-[0.28em]",
                light ? "text-gold-light" : "text-teal-dark"
              )}
            >
              {eyebrow}
            </span>
          </div>
        </Reveal>
      )}
      {title && (
        <TextReveal
          as="h2"
          text={title}
          delay={0.08}
          className={cn(
            "mt-5 text-4xl font-semibold tracking-tight sm:text-5xl",
            light ? "text-white" : "text-ink"
          )}
        />
      )}
      {description && (
        <Reveal direction="up" delay={0.16}>
          <p className={cn("mt-5 text-lg leading-relaxed", light ? "text-white/75" : "text-ink-soft")}>
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
