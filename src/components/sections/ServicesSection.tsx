import { motion } from "motion/react";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";
import { channelLanders } from "../../data/channelLanders";
import { services } from "../../data/services";
import { classNames } from "../../lib/classNames";
import { Reveal, SectionHeader } from "../ui/Reveal";

export function ServicesSection() {
  return (
    <section className="border-t border-slate-200/80 py-16 dark:border-white/10 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeader
            eyebrow="Services"
            title="A complete ecommerce growth desk, without the clutter."
            text="Each service is built around a business outcome: cleaner operations, stronger conversion, better visibility, and decisions you can actually act on."
          />
          <Reveal className="max-w-sm rounded-3xl border border-slate-200 bg-white/70 p-5 text-sm leading-7 text-slate-600 shadow-[0_24px_80px_-48px_rgba(15,23,42,0.6)] dark:border-white/10 dark:bg-white/7 dark:text-slate-300">
            Start with the audit. We will identify the best first channel to fix, then build the growth plan around your margins and capacity.
          </Reveal>
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {channelLanders.map((channel) => (
            <Link
              key={channel.slug}
              to={`/services/${channel.slug}`}
              className="rounded-full border border-[var(--border-soft)] bg-white/80 px-4 py-2 text-sm font-bold text-slate-700 transition hover:border-[var(--brand-gold)] hover:text-[var(--brand-gold-muted)] dark:bg-white/7 dark:text-slate-200 dark:hover:text-[var(--brand-gold)]"
            >
              {channel.platform} growth
            </Link>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 lg:grid-cols-12">
          {services.map((service, index) => {
            const Icon = service.Icon;
            return (
              <Reveal key={service.title} delay={Math.min(index * 0.04, 0.22)} className={service.span}>
                <motion.article
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 260, damping: 24 }}
                  className="group flex h-full flex-col rounded-[1.5rem] border border-[var(--border-soft)] bg-[var(--surface-light-elevated)] p-6 shadow-[0_20px_60px_-44px_rgba(11,37,64,0.65)] transition-colors hover:border-[var(--brand-gold)] dark:bg-[var(--surface-dark-elevated)]"
                >
                  <div className="flex items-start justify-between gap-5">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--brand-gold-soft)] text-[var(--brand-gold-muted)] transition-colors group-hover:bg-[var(--brand-gold)] group-hover:text-[#071122] dark:text-[var(--brand-gold)]">
                      <Icon className="h-5 w-5" />
                    </span>
                    <Link
                      to="/contact"
                      className="rounded-full border border-[var(--border-soft)] px-3 py-1.5 text-xs font-bold text-slate-600 transition hover:border-[var(--brand-gold)] hover:text-[var(--brand-gold-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-gold)] dark:text-slate-300 dark:hover:text-[var(--brand-gold)]"
                    >
                      Learn more
                    </Link>
                  </div>
                  <h3 className="mt-6 text-2xl font-black tracking-tight text-slate-950 dark:text-white">{service.title}</h3>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300">{service.description}</p>
                  <ul className="mt-6 grid gap-2 text-sm text-slate-700 dark:text-slate-300 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                    {service.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-center gap-2">
                        <Check className="h-4 w-4 shrink-0 text-[var(--brand-gold-muted)] dark:text-[var(--brand-gold)]" />
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
