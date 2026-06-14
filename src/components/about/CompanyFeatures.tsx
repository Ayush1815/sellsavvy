import { Briefcase, HeartHandshake, TrendingUp, Sparkles } from "lucide-react";
import { Reveal, SectionHeader } from "../ui/Reveal";

const features = [
  {
    title: "Precision in Every Service",
    text: "Our goal is to deliver solutions that hit the mark every time, helping ecommerce businesses grow with confidence and clear KPIs.",
    Icon: Briefcase,
  },
  {
    title: "Your Trusted Growth Partner",
    text: "We partner with you to build, scale, and succeed. SellSavvy ensures reliability, innovation, and long-term brand equity.",
    Icon: HeartHandshake,
  },
  {
    title: "Driven by Results",
    text: "SellSavvy is committed to providing smart, effective solutions that bring real growth and measurable outcomes to your bottom line.",
    Icon: TrendingUp,
  },
  {
    title: "Excellence is Our Target",
    text: "We deliver tailored strategies designed to meet your specific business goals and exceed market expectations.",
    Icon: Sparkles,
  },
];

export function CompanyFeatures() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-24 border-b border-[var(--border-soft)] bg-[var(--surface-light-alt)] dark:bg-[var(--surface-dark)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader 
          eyebrow="About Our Company"
          title="Why partner with SellSavvy?"
          text="We are not just a service provider — we are your growth partner, committed to delivering measurable results and building your brand's future."
          align="left"
        />

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
          {features.map((feature, index) => {
            const Icon = feature.Icon;
            return (
              <Reveal key={feature.title} delay={index * 0.1}>
                <div className="flex gap-5">
                  <div className="flex-shrink-0">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--brand-gold-muted)]/20 text-[var(--brand-gold-muted)] dark:bg-[var(--brand-gold)]/10 dark:text-[var(--brand-gold)]">
                      <Icon className="h-6 w-6" />
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-950 dark:text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
                      {feature.text}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
