import { Link } from "react-router-dom";
import { ArrowRight, DollarSign } from "lucide-react";
import { caseStudies, spotlightCaseIndex } from "../../data/caseStudies";
import { Reveal, SectionHeader } from "../ui/Reveal";

export function CaseSpotlight() {
  const active = caseStudies[spotlightCaseIndex];

  return (
    <section className="border-t border-slate-200/80 py-16 dark:border-white/10 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeader
            eyebrow="Case study"
            title="Proof from the field."
            text="How cleaner execution and sharper reporting changed momentum for a marketplace brand."
          />
          <div className="flex flex-wrap gap-4">
            <Link
              to={`/case-studies/${active.slug}`}
              className="inline-flex items-center gap-2 text-sm font-bold text-[var(--brand-gold-muted)] transition hover:gap-3 dark:text-[var(--brand-gold)]"
            >
              Read full story
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/case-studies"
              className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 transition hover:gap-3 dark:text-slate-300"
            >
              All case studies
            </Link>
          </div>
        </div>

        <Reveal className="mt-10">
          <div className="grid gap-4 rounded-[2rem] border border-[var(--border-soft)] bg-[var(--surface-light-elevated)] p-4 shadow-[0_34px_110px_-62px_rgba(11,37,64,0.72)] dark:bg-[var(--surface-dark-elevated)] lg:grid-cols-[0.5fr_1fr]">
            <div className="rounded-[1.5rem] bg-[var(--brand-navy)] p-7 text-white">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--brand-gold)]">Featured</p>
              <p className="mt-8 text-5xl font-black tracking-tight sm:text-6xl">{active.result}</p>
              <p className="mt-3 text-sm leading-7 text-white/72 dark:text-slate-600">{active.metric}</p>
              <div className="mt-8 flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-[var(--brand-gold)]">
                  <DollarSign className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-black">{active.brand}</p>
                  <p className="text-sm text-white/60 dark:text-slate-500">{active.channel}</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center rounded-[1.5rem] border border-[var(--border-soft)] bg-slate-50 p-6 dark:bg-white/7">
              <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">{active.challenge}</p>
              <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">{active.action}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
