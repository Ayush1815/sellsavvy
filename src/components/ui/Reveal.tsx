import { motion, useReducedMotion } from "motion/react";
import { classNames } from "../../lib/classNames";

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, y: 18 }}
      whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px", amount: 0.16 }}
      transition={{ duration: 0.4, delay: delay / 1.75, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  text,
  align = "left",
  className,
  titleClassName,
}: {
  eyebrow: string;
  title: string;
  text: string;
  align?: "left" | "center";
  className?: string;
  titleClassName?: string;
}) {
  return (
    <Reveal
      className={classNames(
        "space-y-4",
        align === "center"
          ? "mx-auto max-w-3xl text-center"
          : className?.includes("max-w-")
          ? ""
          : "max-w-3xl",
        className
      )}
    >
      <p className="text-xs font-bold uppercase tracking-[0.26em] text-[var(--brand-gold-muted)] dark:text-[var(--brand-gold)]">{eyebrow}</p>
      <h2 className={classNames(
        "text-balance text-3xl font-black tracking-tight text-slate-950 sm:text-5xl dark:text-white",
        titleClassName
      )}>
        {title}
      </h2>
      <p className="max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300">{text}</p>
    </Reveal>
  );
}
