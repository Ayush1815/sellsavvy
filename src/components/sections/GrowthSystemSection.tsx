import { growthSteps } from "../../data/growthSteps";
import { Reveal, SectionHeader } from "../ui/Reveal";

export function GrowthSystemSection() {
  return (
    <section className="relative overflow-hidden border-t border-[var(--border-soft)] py-16 sm:py-20">
      <div className="absolute inset-x-0 top-0 -z-10 h-64 bg-[radial-gradient(circle_at_50%_0%,rgba(207,156,45,0.11),transparent_55%)] dark:bg-[radial-gradient(circle_at_50%_0%,rgba(228,189,96,0.12),transparent_55%)]" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Growth system"
          title="Clear priorities, careful execution, measurable movement."
          text="The workflow is intentionally simple. We diagnose what matters, execute in the right order, and keep every recommendation tied to a business reason."
          align="center"
        />

        <div className="mt-14 grid gap-4 lg:grid-cols-5">
          {growthSteps.map((step, index) => {
            const Icon = step.Icon;
            return (
              <Reveal key={step.title} delay={index * 0.06}>
                <div className="relative h-full rounded-[1.5rem] border border-[var(--border-soft)] bg-[var(--surface-light-elevated)] p-5 shadow-[0_24px_70px_-52px_rgba(11,37,64,0.58)] backdrop-blur-xl dark:bg-white/7">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase tracking-[0.2em] text-[var(--brand-gold-muted)] dark:text-[var(--brand-gold)]">
                      0{index + 1}
                    </span>
                    <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-950 text-white dark:bg-white dark:text-slate-950">
                      <Icon className="h-4 w-4" />
                    </span>
                  </div>
                  <h3 className="mt-6 text-xl font-black text-slate-950 dark:text-white">{step.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{step.text}</p>
                  {index < growthSteps.length - 1 && (
                    <div className="absolute -right-2 top-1/2 hidden h-px w-4 bg-[var(--brand-gold)] opacity-[0.45] lg:block" />
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
