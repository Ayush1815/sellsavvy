import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Clock, Globe, Mail, Phone } from "lucide-react";
import { initialAuditForm, type AuditForm } from "../../data/auditForm";
import { siteConfig } from "../../config/site";
import { classNames } from "../../lib/classNames";
import { trackEvent } from "../../lib/analytics";
import { AuditSubmitError, submitAudit } from "../../lib/submitAudit";
import { Reveal, SectionHeader } from "../ui/Reveal";
import { ButtonLink } from "../ui/ButtonLink";

export function AuditFormSection() {
  const [form, setForm] = useState<AuditForm>(initialAuditForm);
  const [errors, setErrors] = useState<Partial<Record<keyof AuditForm, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const startedRef = useRef(false);

  const markStarted = () => {
    if (startedRef.current) return;
    startedRef.current = true;
    trackEvent("form_start", { form: "audit" });
  };

  const updateField = (field: keyof AuditForm, value: string) => {
    markStarted();
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setSubmitted(false);
    setSubmitError(null);
  };

  const validate = () => {
    const nextErrors: Partial<Record<keyof AuditForm, string>> = {};
    if (!form.name.trim()) nextErrors.name = "Enter your name.";
    if (!form.business.trim()) nextErrors.business = "Enter your business name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) nextErrors.email = "Enter a valid email address.";
    if (!form.goal.trim()) nextErrors.goal = "Choose your main growth goal.";
    return nextErrors;
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    setSubmitError(null);

    try {
      await submitAudit({
        ...form,
        source: window.location.pathname,
      });
      setSubmitted(true);
      trackEvent("form_submit", { form: "audit", platform: form.platform });
      setForm(initialAuditForm);
      startedRef.current = false;
    } catch (error) {
      const message =
        error instanceof AuditSubmitError
          ? error.message
          : "Could not submit right now. Email us directly and we will respond shortly.";
      setSubmitError(message);
      trackEvent("form_error", { form: "audit" });
    } finally {
      setSubmitting(false);
    }
  };

  const fieldBase =
    "mt-2 w-full rounded-2xl border border-[var(--border-soft)] bg-white px-4 py-3.5 text-sm font-semibold text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-[var(--brand-gold)] focus:ring-4 focus:ring-amber-500/15 dark:bg-white/8 dark:text-white dark:placeholder:text-slate-500";

  return (
    <section className="border-t border-slate-200/80 py-16 dark:border-white/10 sm:py-20">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.86fr_1.14fr] lg:px-8">
        <div>
          <SectionHeader
            eyebrow="Book an audit"
            title="Tell us where your ecommerce growth is stuck."
            text="The form is intentionally short. Share the basics and we will use the audit to focus on the few changes most likely to move performance."
          />
          <div className="mt-10 grid gap-3 text-sm text-slate-600 dark:text-slate-300">
            <span className="flex items-center gap-2">
              <Mail className="h-4 w-4 shrink-0 text-[var(--brand-gold-muted)] dark:text-[var(--brand-gold)]" />
              <a href={`mailto:${siteConfig.email}`} className="font-semibold hover:text-[var(--brand-gold-muted)] dark:hover:text-[var(--brand-gold)]">
                {siteConfig.email}
              </a>
            </span>
            <span className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0 text-[var(--brand-gold-muted)] dark:text-[var(--brand-gold)]" />
              {siteConfig.phone}
            </span>
            <span className="flex items-center gap-2">
              <Globe className="h-4 w-4 shrink-0 text-[var(--brand-gold-muted)] dark:text-[var(--brand-gold)]" />
              Remote ecommerce support
            </span>
            <span className="flex items-center gap-2 rounded-2xl border border-emerald-500/20 bg-emerald-50/80 px-3 py-2 text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-200">
              <Clock className="h-4 w-4 shrink-0" />
              Typical reply: {siteConfig.responseTime}
            </span>
          </div>
        </div>

        <Reveal>
          <form
            onSubmit={onSubmit}
            noValidate
            className="rounded-[2rem] border border-[var(--border-soft)] bg-[var(--surface-light-elevated)] p-5 shadow-[0_34px_100px_-62px_rgba(11,37,64,0.72)] dark:bg-[var(--surface-dark-elevated)] sm:p-7"
          >
            <input
              type="text"
              name="website"
              value={form.website}
              onChange={(event) => updateField("website", event.target.value)}
              tabIndex={-1}
              autoComplete="off"
              className="pointer-events-none absolute -left-[9999px] h-0 w-0 opacity-0"
              aria-hidden="true"
            />

            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block text-sm font-bold text-slate-800 dark:text-slate-100">
                Name
                <input
                  value={form.name}
                  onFocus={markStarted}
                  onChange={(event) => updateField("name", event.target.value)}
                  className={classNames(fieldBase, errors.name && "border-red-500")}
                  autoComplete="name"
                  placeholder="Your name"
                />
                {errors.name && <span className="mt-2 block text-xs font-semibold text-red-600">{errors.name}</span>}
              </label>

              <label className="block text-sm font-bold text-slate-800 dark:text-slate-100">
                Work email
                <input
                  type="email"
                  value={form.email}
                  onChange={(event) => updateField("email", event.target.value)}
                  className={classNames(fieldBase, errors.email && "border-red-500")}
                  autoComplete="email"
                  placeholder="you@brand.com"
                />
                {errors.email && <span className="mt-2 block text-xs font-semibold text-red-600">{errors.email}</span>}
              </label>

              <label className="block text-sm font-bold text-slate-800 dark:text-slate-100">
                Business name
                <input
                  value={form.business}
                  onChange={(event) => updateField("business", event.target.value)}
                  className={classNames(fieldBase, errors.business && "border-red-500")}
                  autoComplete="organization"
                  placeholder="Brand or store name"
                />
                {errors.business && (
                  <span className="mt-2 block text-xs font-semibold text-red-600">{errors.business}</span>
                )}
              </label>

              <label className="block text-sm font-bold text-slate-800 dark:text-slate-100">
                Phone (optional)
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(event) => updateField("phone", event.target.value)}
                  className={fieldBase}
                  autoComplete="tel"
                  placeholder="+91 or +1..."
                />
              </label>

              <label className="block text-sm font-bold text-slate-800 dark:text-slate-100 sm:col-span-2">
                Store URL (optional)
                <input
                  type="url"
                  value={form.companyUrl}
                  onChange={(event) => updateField("companyUrl", event.target.value)}
                  className={fieldBase}
                  placeholder="https://yourstore.com"
                />
              </label>

              <label className="block text-sm font-bold text-slate-800 dark:text-slate-100">
                Main platform
                <select value={form.platform} onChange={(event) => updateField("platform", event.target.value)} className={fieldBase}>
                  <option>Amazon / Flipkart</option>
                  <option>Shopify / D2C website</option>
                  <option>WooCommerce</option>
                  <option>Meesho</option>
                  <option>Multiple channels</option>
                </select>
              </label>

              <label className="block text-sm font-bold text-slate-800 dark:text-slate-100">
                Monthly revenue
                <select
                  value={form.monthlyRevenue}
                  onChange={(event) => updateField("monthlyRevenue", event.target.value)}
                  className={fieldBase}
                >
                  <option>Under $10k</option>
                  <option>$10k - $50k</option>
                  <option>$50k - $150k</option>
                  <option>$150k+</option>
                  <option>Pre-launch</option>
                </select>
              </label>

              <label className="block text-sm font-bold text-slate-800 dark:text-slate-100 sm:col-span-2">
                Growth goal
                <select value={form.goal} onChange={(event) => updateField("goal", event.target.value)} className={fieldBase}>
                  <option>Improve marketplace sales</option>
                  <option>Improve ads and ROAS</option>
                  <option>Build or improve website</option>
                  <option>Improve creative and content</option>
                  <option>Need ongoing growth support</option>
                </select>
              </label>
            </div>

            <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="submit"
                disabled={submitting}
                className="shine-button relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-[var(--brand-gold)] px-7 py-4 text-sm font-black text-[#071122] shadow-[0_22px_52px_-28px_rgba(207,156,45,0.56)] transition hover:bg-[var(--brand-gold-hover)] disabled:cursor-not-allowed disabled:opacity-70"
              >
                <span className="relative z-10">{submitting ? "Sending..." : "Book Free Growth Audit"}</span>
                <ArrowRight className="relative z-10 h-4 w-4" />
              </button>
              <p className="text-xs leading-6 text-slate-500 dark:text-slate-400">
                We use your details only to prepare and respond to your audit request.
              </p>
            </div>

            {submitError && (
              <p className="mt-4 rounded-2xl border border-red-500/25 bg-red-50 p-4 text-sm font-semibold text-red-700 dark:bg-red-500/10 dark:text-red-200">
                {submitError}{" "}
                <a href={`mailto:${siteConfig.email}`} className="underline">
                  Email {siteConfig.email}
                </a>
              </p>
            )}

            <AnimatePresence>
              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-5 space-y-4 rounded-2xl border border-emerald-500/25 bg-emerald-50 p-4 text-sm text-emerald-900 dark:bg-emerald-500/10 dark:text-emerald-100"
                >
                  <p className="font-bold">Request received. Here is what happens next:</p>
                  <ol className="list-decimal space-y-1 pl-5 leading-7">
                    <li>We review your channels and revenue band.</li>
                    <li>You receive a focused audit summary within {siteConfig.responseTime.toLowerCase()}.</li>
                    <li>We walk through priorities on a no-pressure call.</li>
                  </ol>
                  {siteConfig.calendlyUrl ? (
                    <a
                      href={siteConfig.calendlyUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex font-bold underline"
                      onClick={() => trackEvent("cta_click", { label: "calendly_post_submit" })}
                    >
                      Pick a time on our calendar
                    </a>
                  ) : (
                    <ButtonLink to="/growth-system" variant="secondary">
                      See how our growth system works
                    </ButtonLink>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
