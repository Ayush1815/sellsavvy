import { Check } from "lucide-react";
import { ButtonLink } from "../ui/ButtonLink";
import { Reveal } from "../ui/Reveal";

export function CtaBanner() {
  return (
    <section className="px-4 py-10 sm:px-6 lg:px-8">
      <Reveal>
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-[var(--border-soft)] bg-[var(--surface-light-elevated)] p-8 text-[var(--text-primary)] shadow-[0_34px_110px_-70px_rgba(11,37,64,0.62)] dark:bg-[var(--brand-navy-900)] dark:text-white sm:p-10 lg:p-12">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.7fr] lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[var(--brand-gold-muted)] dark:text-[var(--brand-gold)]">Free growth audit</p>
              <h2 className="mt-5 max-w-3xl text-balance text-3xl font-black tracking-tight sm:text-5xl">
                Get a clear ecommerce growth plan before you spend another month guessing.
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--text-muted)] dark:text-slate-300">
                We will review your storefront, marketplace setup, ads, creative quality, and reporting. You leave with
                custom recommendations and no-pressure next steps.
              </p>
            </div>
            <div className="rounded-[1.5rem] border border-[var(--border-soft)] bg-white/70 p-5 dark:bg-white/7">
              {["Custom strategy", "Clear recommendations", "No-pressure consultation", "Execution support"].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 border-b border-slate-200/80 py-3 last:border-b-0 dark:border-white/10"
                >
                  <Check className="h-5 w-5 text-[var(--brand-gold-muted)] dark:text-[var(--brand-gold)]" />
                  <span className="font-bold">{item}</span>
                </div>
              ))}
              <div className="mt-5">
                <ButtonLink to="/contact" variant="primary">
                  Book Free Growth Audit
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
