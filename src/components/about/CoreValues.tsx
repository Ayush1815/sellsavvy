import { Trophy, Target, ShieldCheck } from "lucide-react";
import { Reveal, SectionHeader } from "../ui/Reveal";

const values = [
  {
    title: "Our Mission",
    text: "To empower ecommerce businesses with smart, result-driven solutions that fuel sustainable scale and consistent growth.",
    Icon: Trophy,
  },
  {
    title: "Our Vision",
    text: "We envision a future where every brand we partner with reaches its full market potential with confidence and clarity.",
    Icon: Target,
  },
  {
    title: "Our Values",
    text: "We believe in transparency, discipline, and building trust. We are committed to delivering premium work that exceeds expectations.",
    Icon: ShieldCheck,
  },
];

export function CoreValues() {
  return (
    <section id="values" className="relative overflow-hidden py-16 sm:py-24 border-b border-[var(--border-soft)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader 
          eyebrow="Core Foundation"
          title="Built on transparency and results."
          text="Our focus is not just on delivering services, but on building long-term partnerships that drive consistent success for your storefront."
          align="center"
        />

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {values.map((item, index) => {
            const Icon = item.Icon;
            return (
              <Reveal key={item.title} delay={index * 0.1}>
                <div className="relative h-full flex flex-col items-center text-center rounded-[1.5rem] border border-[var(--border-soft)] bg-[var(--surface-light-elevated)] p-8 sm:p-10 shadow-[0_12px_40px_-24px_rgba(11,37,64,0.15)] dark:bg-white/5">
                  <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-950 text-white dark:bg-white dark:text-slate-950 mb-6">
                    <Icon className="h-7 w-7" />
                  </span>
                  <h3 className="text-xl font-black text-slate-950 dark:text-white mb-4">{item.title}</h3>
                  <p className="text-base leading-7 text-slate-600 dark:text-slate-300">{item.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
