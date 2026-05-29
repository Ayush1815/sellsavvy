import { motion } from "motion/react";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";
import { featuredServiceIndices, services } from "../../data/services";
import { Reveal, SectionHeader } from "../ui/Reveal";
import { ArrowRight } from "lucide-react";

export function ServicesTeaser() {
  const featured = featuredServiceIndices.map((i) => services[i]);

  return (
    <section className="border-t border-slate-200/80 py-16 dark:border-white/10 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeader
            eyebrow="Services"
            title="Growth desk capabilities built for operators."
            text="Account management, ads, storefronts, and reporting — coordinated under one team."
          />
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-sm font-bold text-[var(--brand-gold-muted)] transition hover:gap-3 dark:text-[var(--brand-gold)]"
          >
            View all services
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {featured.map((service, index) => {
            const Icon = service.Icon;
            return (
              <Reveal key={service.title} delay={index * 0.06}>
                <motion.article
                  whileHover={{ y: -4 }}
                  className="flex h-full flex-col rounded-[1.5rem] border border-[var(--border-soft)] bg-[var(--surface-light-elevated)] p-6 shadow-[0_20px_60px_-44px_rgba(11,37,64,0.65)] dark:bg-[var(--surface-dark-elevated)]"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--brand-gold-soft)] text-[var(--brand-gold-muted)] dark:text-[var(--brand-gold)]">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 text-xl font-black text-slate-950 dark:text-white">{service.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">{service.description}</p>
                  <ul className="mt-4 space-y-1.5 text-sm text-slate-700 dark:text-slate-300">
                    {service.bullets.slice(0, 2).map((bullet) => (
                      <li key={bullet} className="flex items-center gap-2">
                        <Check className="h-3.5 w-3.5 shrink-0 text-[var(--brand-gold-muted)] dark:text-[var(--brand-gold)]" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </motion.article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
