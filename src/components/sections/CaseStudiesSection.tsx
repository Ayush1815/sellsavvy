import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight, DollarSign } from "lucide-react";
import { caseStudies, type CaseCategory } from "../../data/caseStudies";
import { classNames } from "../../lib/classNames";
import { Reveal, SectionHeader } from "../ui/Reveal";

export function CaseStudiesSection() {
  const [category, setCategory] = useState<CaseCategory>("all");
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const reducedMotion = useReducedMotion();

  const filtered = useMemo(
    () => caseStudies.filter((item) => category === "all" || item.category === category),
    [category],
  );

  useEffect(() => {
    setActiveIndex(0);
  }, [category]);

  useEffect(() => {
    if (isPaused || filtered.length <= 1 || reducedMotion) return;
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % filtered.length);
    }, 5200);
    return () => window.clearInterval(timer);
  }, [filtered.length, isPaused, reducedMotion]);

  const active = filtered[activeIndex];

  const changeSlide = (direction: 1 | -1) => {
    setActiveIndex((current) => (current + direction + filtered.length) % filtered.length);
  };

  return (
    <section className="border-t border-slate-200/80 py-16 dark:border-white/10 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeader
            eyebrow="Case studies"
            title="Growth stories with practical work behind the numbers."
            text="A few examples of how cleaner execution, sharper creative, and better reporting can change ecommerce momentum."
          />
          <Reveal className="flex flex-wrap gap-2">
            {[
              ["all", "All"],
              ["marketplace", "Marketplace"],
              ["d2c", "D2C"],
            ].map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => setCategory(value as CaseCategory)}
                className={classNames(
                  "rounded-full border px-4 py-2 text-sm font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-gold)]",
                  category === value
                    ? "border-[var(--brand-gold)] bg-[var(--brand-gold)] text-[#071122]"
                    : "border-[var(--border-soft)] bg-white/70 text-slate-700 hover:border-[var(--brand-gold)] dark:bg-white/7 dark:text-slate-200",
                )}
              >
                {label}
              </button>
            ))}
          </Reveal>
        </div>

        <Reveal className="mt-12">
          <div
            className="relative rounded-[2rem] border border-[var(--border-soft)] bg-[var(--surface-light-elevated)] p-4 shadow-[0_34px_110px_-62px_rgba(11,37,64,0.72)] dark:bg-[var(--surface-dark-elevated)]"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="grid gap-4 lg:grid-cols-[0.74fr_1.26fr]">
              <div className="rounded-[1.5rem] bg-[var(--brand-navy)] p-7 text-white">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--brand-gold)]">Active result</p>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active.brand}
                    initial={reducedMotion ? false : { opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reducedMotion ? undefined : { opacity: 0, y: -18 }}
                    transition={{ duration: 0.36, ease: [0.16, 1, 0.3, 1] }}
                    className="mt-12"
                  >
                    <p className="text-6xl font-black tracking-tight">{active.result}</p>
                    <p className="mt-3 max-w-xs text-sm leading-7 text-white/72 dark:text-slate-600">{active.metric}</p>
                    <div className="mt-10 flex items-center gap-3">
                      <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-[var(--brand-gold)]">
                        <DollarSign className="h-5 w-5" />
                      </span>
                      <div>
                        <p className="font-black">{active.brand}</p>
                        <p className="text-sm text-white/60 dark:text-slate-500">{active.channel}</p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="min-h-[24rem] rounded-[1.5rem] border border-[var(--border-soft)] bg-slate-50 p-6 dark:bg-white/7">
                <AnimatePresence mode="wait">
                  <motion.article
                    key={`${active.brand}-${category}`}
                    initial={reducedMotion ? false : { opacity: 0, x: 18 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={reducedMotion ? undefined : { opacity: 0, x: -18 }}
                    transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
                    className="flex h-full flex-col justify-between"
                  >
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-[var(--brand-gold-soft)] px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-[var(--brand-gold-muted)] dark:text-[var(--brand-gold)]">
                          {active.category === "d2c" ? "D2C" : "Marketplace"}
                        </span>
                        <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-bold text-slate-600 dark:border-white/10 dark:bg-white/7 dark:text-slate-300">
                          {active.channel}
                        </span>
                      </div>
                      <h3 className="mt-8 text-3xl font-black tracking-tight text-slate-950 dark:text-white">
                        <Link
                          to={`/case-studies/${active.slug}`}
                          className="transition hover:text-[var(--brand-gold-muted)] dark:hover:text-[var(--brand-gold)]"
                        >
                          {active.brand}
                        </Link>
                      </h3>
                      <div className="mt-8 grid gap-4 md:grid-cols-2">
                        <div className="rounded-2xl border border-[var(--border-soft)] bg-white p-5 dark:bg-[var(--surface-dark-elevated)]">
                          <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Before</p>
                          <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{active.challenge}</p>
                        </div>
                        <div className="rounded-2xl border border-[var(--border-soft)] bg-white p-5 dark:bg-[var(--surface-dark-elevated)]">
                          <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">What changed</p>
                          <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{active.action}</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => changeSlide(-1)}
                          aria-label="Previous case study"
                          className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border-soft)] bg-white text-slate-700 transition hover:border-[var(--brand-gold)] hover:text-[var(--brand-gold-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-gold)] dark:bg-white/7 dark:text-white dark:hover:text-[var(--brand-gold)]"
                        >
                          <ChevronLeft className="h-5 w-5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => changeSlide(1)}
                          aria-label="Next case study"
                          className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border-soft)] bg-white text-slate-700 transition hover:border-[var(--brand-gold)] hover:text-[var(--brand-gold-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-gold)] dark:bg-white/7 dark:text-white dark:hover:text-[var(--brand-gold)]"
                        >
                          <ChevronRight className="h-5 w-5" />
                        </button>
                      </div>
                      <div className="flex items-center gap-2">
                        {filtered.map((item, index) => (
                          <button
                            key={item.brand}
                            type="button"
                            onClick={() => setActiveIndex(index)}
                            aria-label={`Show ${item.brand} case study`}
                            className={classNames(
                              "h-2.5 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-gold)]",
                              index === activeIndex ? "w-10 bg-[var(--brand-gold)]" : "w-2.5 bg-slate-300 dark:bg-white/20",
                            )}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.article>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
