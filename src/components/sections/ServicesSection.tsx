import { motion } from "motion/react";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";
import { channelLanders } from "../../data/channelLanders";
import { services } from "../../data/services";
import { classNames } from "../../lib/classNames";
import { Reveal, SectionHeader } from "../ui/Reveal";

export function ServicesSection() {
  return (
    <section className="border-t border-slate-200/80 py-12 dark:border-white/10 sm:py-14">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div>
          <SectionHeader
            className="max-w-none lg:max-w-6xl xl:max-w-7xl"
            titleClassName="lg:text-4xl xl:text-5xl lg:text-pretty"
            eyebrow="Services"
            title="We offer end-to-end digital growth services crafted to help brands scale revenue, strengthen their presence, and unlock your potential."
            text="Each route is built around a concrete operating need: marketplace control, digital demand, product visuals, website conversion, or social consistency."
          />
        </div>

        <div className="mt-10 flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
          <div className="-mx-4 flex flex-nowrap overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:overflow-x-visible sm:px-0 sm:pb-0 gap-3">
            {channelLanders.map((channel) => (
              <Link
                key={channel.slug}
                to={`/services/${channel.slug}`}
                className="shrink-0 rounded-full border border-[var(--border-soft)] bg-white/80 px-5 py-2.5 text-sm font-bold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-[var(--brand-gold)] hover:text-[var(--brand-gold-muted)] hover:shadow-md dark:bg-white/7 dark:text-slate-200 dark:hover:text-[var(--brand-gold)]"
              >
                {channel.platform} growth
              </Link>
            ))}
          </div>
          <Reveal className="w-full lg:max-w-sm lg:shrink-0 rounded-3xl border border-slate-200 bg-white/70 p-5 text-sm leading-7 text-slate-600 shadow-[0_24px_80px_-48px_rgba(15,23,42,0.6)] dark:border-white/10 dark:bg-white/7 dark:text-slate-300 relative before:absolute before:inset-0 before:-z-10 before:rounded-3xl before:bg-gradient-to-br before:from-[var(--brand-gold-soft)] before:to-transparent before:opacity-50 sm:before:hidden">
            Start with the audit. We will identify the route with the fastest operational payoff, then build the plan around your channels, margins, and team capacity.
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.Icon;
            return (
              <Reveal key={service.title} delay={Math.min(index * 0.04, 0.22)} className="h-full">
                <motion.article
                  whileHover={{ y: -6 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 260, damping: 24 }}
                  className="group flex h-full flex-col rounded-[1.5rem] border border-[var(--border-soft)] bg-[var(--surface-light-elevated)] p-6 sm:p-8 shadow-[0_20px_60px_-44px_rgba(11,37,64,0.65)] transition-colors hover:border-[var(--brand-gold)] dark:bg-[var(--surface-dark-elevated)]"
                >
                  <div className="mb-6 overflow-hidden rounded-xl bg-slate-100 dark:bg-white/5 border border-[var(--border-soft)] aspect-video w-full">
                    <img src={service.image} alt={service.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="flex items-start justify-between gap-5">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--brand-gold-soft)] text-[var(--brand-gold-muted)] transition-colors group-hover:bg-[var(--brand-gold)] group-hover:text-[#071122] dark:text-[var(--brand-gold)]">
                      <Icon className="h-5 w-5" />
                    </span>
                    <Link
                      to={`/services/${service.slug}`}
                      className="rounded-full border border-[var(--border-soft)] px-3 py-1.5 text-xs font-bold text-slate-600 transition hover:border-[var(--brand-gold)] hover:text-[var(--brand-gold-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-gold)] dark:text-slate-300 dark:hover:text-[var(--brand-gold)] shrink-0"
                    >
                      Learn more
                    </Link>
                  </div>
                  <h3 className="mt-6 text-xl lg:text-2xl font-black tracking-tight text-slate-950 dark:text-white">{service.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300 flex-grow">{service.description}</p>
                  <ul className="mt-6 grid gap-2 text-sm text-slate-700 dark:text-slate-300 sm:grid-cols-2 lg:grid-cols-1">
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
