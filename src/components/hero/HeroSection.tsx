import { motion, useReducedMotion } from "motion/react";
import { Sparkles } from "lucide-react";
import { ButtonLink } from "../ui/ButtonLink";
import { Reveal } from "../ui/Reveal";
import { HeroVisual } from "./HeroVisual";

export function HeroSection() {
  const reducedMotion = useReducedMotion();

  const lineVariants = {
    hidden: { opacity: 0, y: 16, filter: "blur(6px)" },
    show: (delay: number) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        delay,
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    }),
  };

  return (
    <section
      id="hero"
      className="relative overflow-x-clip bg-[var(--surface-light)] text-slate-900 transition-colors duration-300 dark:bg-[var(--surface-dark)] dark:text-white"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_16%_12%,rgba(207,156,45,0.09),transparent_32%),radial-gradient(circle_at_88%_18%,rgba(11,37,64,0.07),transparent_34%)] dark:bg-[radial-gradient(circle_at_18%_14%,rgba(228,189,96,0.13),transparent_32%),radial-gradient(circle_at_82%_18%,rgba(28,110,126,0.12),transparent_30%)]" />

      {/* 
        Grid layout:
        - Mobile (<lg): single column — text then video stacked, with padding for fixed header
        - Desktop (lg+): two columns side-by-side, vertically centered in viewport height
      */}
      <div className="mx-auto grid w-full max-w-[1440px] items-center gap-6 px-4 pb-16 pt-24 sm:gap-10 sm:px-6 sm:pb-20 sm:pt-32 lg:min-h-[100svh] lg:grid-cols-[minmax(380px,0.88fr)_minmax(0,1.12fr)] lg:gap-8 lg:pl-8 lg:pr-0 lg:py-0 2xl:gap-10">

        {/* ── Left: Text Content ── */}
        <div className="relative z-10 flex w-full flex-col justify-center lg:py-24">
          <motion.div
            initial={reducedMotion ? false : "hidden"}
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.12 } },
            }}
          >
            {/* Badge */}
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 18 },
                show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
              }}
              className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-soft)] bg-white/50 px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.22em] text-slate-700 shadow-sm backdrop-blur-xl dark:bg-white/5 dark:text-[var(--brand-gold-muted)]"
            >
              <Sparkles className="h-3 w-3 text-[var(--brand-gold-muted)] dark:text-[var(--brand-gold)]" />
              Ecommerce growth partner
            </motion.p>

            {/* Headline */}
            <h1
              aria-label="You sell. We manage. We scale together."
              className="mt-5 text-[1.75rem] font-black leading-[1.2] tracking-tight text-slate-900 sm:text-4xl sm:leading-[1.18] lg:text-5xl xl:text-[3.25rem] dark:text-white"
            >
              <span aria-hidden="true" className="block overflow-visible pb-1 pt-0.5">
                <motion.span
                  variants={lineVariants}
                  custom={reducedMotion ? 0 : 0.1}
                  initial="hidden"
                  animate="show"
                  className="block"
                >
                  You sell.
                </motion.span>
              </span>

              <span aria-hidden="true" className="mt-0.5 block overflow-visible pb-1 pt-0.5">
                <motion.span
                  variants={lineVariants}
                  custom={reducedMotion ? 0 : 0.55}
                  initial="hidden"
                  animate="show"
                  className="block"
                >
                  We manage.
                </motion.span>
              </span>

              <span aria-hidden="true" className="mt-0.5 block overflow-visible pb-5 pt-0.5">
                <motion.span
                  variants={lineVariants}
                  custom={reducedMotion ? 0 : 1.15}
                  initial="hidden"
                  animate="show"
                  className="gold-shimmer-text block font-black tracking-tight"
                >
                  We scale together.
                </motion.span>
              </span>
            </h1>

            {/* Description */}
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 1.6 } },
              }}
              className="mt-4 max-w-lg text-sm leading-7 text-slate-600 sm:text-base sm:leading-8 dark:text-slate-300"
            >
              SellSavvy manages the moving parts of ecommerce growth: marketplace
              operations, storefront development, product creatives, SEO, and
              transparent reporting—so you can focus on what you do best: selling.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 18 },
                show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 1.75 } },
              }}
              className="mt-8 flex flex-col w-full gap-3 sm:w-auto sm:flex-row sm:flex-wrap"
            >
              <ButtonLink to="/contact" className="w-full sm:w-auto">Book Free Growth Audit</ButtonLink>
              <ButtonLink to="/#growth-system" variant="secondary" className="w-full sm:w-auto">
                Explore Growth System
              </ButtonLink>
            </motion.div>
          </motion.div>
        </div>

        {/* ── Right: Hero Visual ── */}
        <Reveal
          delay={0.3}
          className="relative z-10 flex w-full min-w-0 items-center justify-center overflow-hidden lg:justify-start lg:mt-16 xl:mt-24"
        >
          <HeroVisual />
        </Reveal>
      </div>
    </section>
  );
}
