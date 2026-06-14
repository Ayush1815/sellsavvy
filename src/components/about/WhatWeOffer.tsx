import { Reveal, SectionHeader } from "../ui/Reveal";
import { ArrowUpRight, TrendingUp, Handshake, ShieldCheck, Cpu, BarChart } from "lucide-react";

const offers = [
  {
    title: "Driven by Purpose",
    text: "We combine creativity, strategy, and technology to deliver impactful solutions that transform businesses and build long-term success.",
    Icon: Cpu,
  },
  {
    title: "Powered by Results",
    text: "We focus on delivering measurable outcomes that drive real business growth, visibility, and performance.",
    Icon: TrendingUp,
  },
  {
    title: "Your Growth Partner",
    text: "We are not just a service provider—we are your growth partner, committed to delivering measurable results and building your brand's future.",
    Icon: Handshake,
  },
  {
    title: "Experts You Can Trust",
    text: "With experience, dedication, and a passion for excellence, we provide reliable and effective solutions tailored to your business needs.",
    Icon: ShieldCheck,
  },
  {
    title: "Innovation Meets Excellence",
    text: "Our team thrives on innovation and excellence, delivering modern solutions that keep your business ahead of the competition.",
    Icon: ArrowUpRight,
  },
  {
    title: "Building Brands",
    text: "We help businesses create a strong identity, grow their presence, and achieve success through strategic planning and execution.",
    Icon: BarChart,
  },
];

export function WhatWeOffer() {
  return (
    <section id="solutions" className="relative overflow-hidden py-16 sm:py-24 border-b border-[var(--border-soft)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <div>
            <SectionHeader 
              eyebrow="Our Solutions"
              title="What We Offer"
              text="We offer a wide range of result-driven services designed to help businesses grow and succeed in a competitive market. From digital marketing and brand building to storefront engineering, our solutions are tailored to deliver measurable growth."
              align="left"
            />
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {offers.map((item, index) => {
                const Icon = item.Icon;
                return (
                  <Reveal key={item.title} delay={index * 0.05}>
                    <div className="rounded-2xl border border-[var(--border-soft)] bg-[var(--surface-light-elevated)] p-5 dark:bg-white/5 shadow-sm">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--brand-gold-muted)]/15 text-[var(--brand-gold-muted)] dark:bg-[var(--brand-gold)]/10 dark:text-[var(--brand-gold)] mb-4">
                        <Icon className="h-5 w-5" />
                      </span>
                      <h3 className="text-base font-bold text-slate-950 dark:text-white mb-2">{item.title}</h3>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{item.text}</p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
          <Reveal delay={0.2} className="relative aspect-square max-w-[500px] mx-auto w-full lg:max-w-none">
            <div className="absolute inset-0 bg-gradient-to-tr from-[var(--brand-gold-muted)]/20 to-transparent rounded-[2rem] -z-10 blur-xl" />
            <img 
              src="/media/about/solutions.png" 
              alt="Analytics and E-commerce growth dashboard visualization" 
              className="w-full h-full object-cover rounded-[2rem] border border-[var(--border-soft)] shadow-2xl"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
