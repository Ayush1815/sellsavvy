import { motion, useReducedMotion } from "motion/react";

export function RouteLoader() {
  const reducedMotion = useReducedMotion();

  return (
    <div className="min-h-[50vh] pt-28" aria-busy="true" aria-label="Loading page">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 h-3 w-40 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
          {!reducedMotion && (
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-[var(--brand-gold-hover)] via-[var(--brand-gold)] to-[var(--brand-gold-hover)]"
              initial={{ x: "-100%" }}
              animate={{ x: "200%" }}
              transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
              style={{ width: "45%" }}
            />
          )}
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-40 animate-pulse rounded-[1.5rem] border border-slate-200/80 bg-slate-100 dark:border-white/10 dark:bg-white/5"
              style={{ animationDelay: `${i * 120}ms` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
