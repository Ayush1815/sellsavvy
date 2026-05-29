import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { faqs } from "../../data/faqs";
import { classNames } from "../../lib/classNames";
import { SectionHeader } from "../ui/Reveal";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="border-t border-[var(--border-soft)] py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="FAQ"
          title="Straight answers before we start."
          text="The goal is a calm, clear partnership. Here are the questions ecommerce teams usually ask before booking an audit."
          align="center"
        />

        <div className="mt-12 divide-y divide-slate-200 overflow-hidden rounded-[1.5rem] border border-[var(--border-soft)] bg-[var(--surface-light-elevated)] dark:divide-white/10 dark:bg-[var(--surface-dark-elevated)]">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={faq.q}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="flex w-full items-center justify-between gap-6 px-5 py-5 text-left transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--brand-gold)] dark:hover:bg-white/6 sm:px-7"
                  aria-expanded={isOpen}
                >
                  <span className="text-base font-black text-slate-950 dark:text-white">{faq.q}</span>
                  <ChevronDown
                    className={classNames(
                      "h-5 w-5 shrink-0 text-[var(--brand-gold-muted)] transition-transform dark:text-[var(--brand-gold)]",
                      isOpen && "rotate-180",
                    )}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-6 text-sm leading-7 text-slate-600 dark:text-slate-300 sm:px-7">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
