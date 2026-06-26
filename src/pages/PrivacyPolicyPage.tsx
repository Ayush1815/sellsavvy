import { useSeo } from "../hooks/useSeo";
import { siteConfig } from "../config/site";

export default function PrivacyPolicyPage() {
  useSeo({
    title: "Privacy Policy | SellSavvy",
    description:
      "Learn how SellSavvy collects, uses, and protects your personal information when you request a free ecommerce audit.",
    path: "/privacy",
  });

  return (
    <main className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mb-10">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--brand-gold-muted)] dark:text-[var(--brand-gold)]">
          Legal
        </p>
        <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950 dark:text-white sm:text-5xl">
          Privacy Policy
        </h1>
        <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
          Last updated: 28 May 2026
        </p>
      </div>

      <div className="prose prose-slate dark:prose-invert max-w-none space-y-10 text-slate-700 dark:text-slate-300">

        <section>
          <h2 className="text-xl font-black text-slate-900 dark:text-white">1. Who we are</h2>
          <p className="mt-3 leading-7">
            SellSavvy (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) is a premium ecommerce account management
            and growth agency. Our website is{" "}
            <a
              href={siteConfig.url}
              className="font-semibold text-[var(--brand-gold-muted)] underline dark:text-[var(--brand-gold)]"
              target="_blank"
              rel="noreferrer"
            >
              {siteConfig.url}
            </a>
            . You can reach us at{" "}
            <a
              href={`mailto:${siteConfig.email}`}
              className="font-semibold text-[var(--brand-gold-muted)] underline dark:text-[var(--brand-gold)]"
            >
              {siteConfig.email}
            </a>
            .
          </p>
        </section>

        <div className="border-t border-slate-200 dark:border-white/10" />

        <section>
          <h2 className="text-xl font-black text-slate-900 dark:text-white">2. What data we collect</h2>
          <p className="mt-3 leading-7">
            We collect only the information you actively provide when submitting our free audit request form:
          </p>
          <ul className="mt-3 list-disc space-y-1 pl-6 leading-7">
            <li>Full name</li>
            <li>Work or business email address</li>
            <li>Business / store name</li>
            <li>Primary sales platform (e.g. Amazon, Shopify)</li>

            <li>Main growth goal</li>
            <li>Phone number <span className="text-slate-500">(optional)</span></li>
            <li>Store URL <span className="text-slate-500">(optional)</span></li>
          </ul>
          <p className="mt-4 leading-7">
            If you have enabled optional analytics (Plausible or Google Analytics 4), we may collect
            aggregated, anonymised page-view and interaction events such as clicks and form start events.
            These are never linked back to personally identifiable information without your consent.
          </p>
        </section>

        <div className="border-t border-slate-200 dark:border-white/10" />

        <section>
          <h2 className="text-xl font-black text-slate-900 dark:text-white">3. How we use your data</h2>
          <p className="mt-3 leading-7">We use your information exclusively to:</p>
          <ul className="mt-3 list-disc space-y-1 pl-6 leading-7">
            <li>Prepare and deliver your free ecommerce growth audit</li>
            <li>Contact you with the audit findings and our recommended next steps</li>
            <li>Respond to any follow-up questions you have about our services</li>
          </ul>
          <p className="mt-4 font-semibold text-slate-900 dark:text-white">
            We do not sell, rent, or trade your personal data to any third party.
          </p>
          <p className="mt-2 leading-7">
            We will never add you to a bulk marketing list without your explicit consent. Every follow-up
            we send is directly related to your audit request.
          </p>
        </section>

        <div className="border-t border-slate-200 dark:border-white/10" />

        <section>
          <h2 className="text-xl font-black text-slate-900 dark:text-white">4. How your data is stored</h2>
          <p className="mt-3 leading-7">
            Audit submissions are stored in a secure JSON file on our private server. Access is restricted
            to authorised SellSavvy team members only. We may also forward a notification to an internal
            Slack channel or CRM tool (e.g. via webhook) so that our team can respond quickly.
          </p>
          <p className="mt-3 leading-7">
            We take reasonable technical and organisational measures to protect your data against
            unauthorised access, alteration, or disclosure. These include encrypted HTTPS transmission,
            server-side rate limiting, and access control.
          </p>
        </section>

        <div className="border-t border-slate-200 dark:border-white/10" />

        <section>
          <h2 className="text-xl font-black text-slate-900 dark:text-white">5. Data retention</h2>
          <p className="mt-3 leading-7">
            We retain your contact information for as long as is reasonably necessary to deliver the audit,
            respond to follow-up questions, and maintain business records — typically no longer than
            24 months from the date of your submission unless you become an ongoing client, in which case
            standard client record-keeping periods apply.
          </p>
        </section>

        <div className="border-t border-slate-200 dark:border-white/10" />

        <section>
          <h2 className="text-xl font-black text-slate-900 dark:text-white">6. Your rights</h2>
          <p className="mt-3 leading-7">You have the right to:</p>
          <ul className="mt-3 list-disc space-y-1 pl-6 leading-7">
            <li>
              <strong>Access</strong> — request a copy of the personal data we hold about you
            </li>
            <li>
              <strong>Rectification</strong> — ask us to correct inaccurate information
            </li>
            <li>
              <strong>Erasure</strong> — request deletion of your data (&ldquo;right to be forgotten&rdquo;)
            </li>
            <li>
              <strong>Objection</strong> — object to our processing of your data at any time
            </li>
          </ul>
          <p className="mt-4 leading-7">
            To exercise any of these rights, email us at{" "}
            <a
              href={`mailto:${siteConfig.email}`}
              className="font-semibold text-[var(--brand-gold-muted)] underline dark:text-[var(--brand-gold)]"
            >
              {siteConfig.email}
            </a>{" "}
            with the subject line <em>&ldquo;Data Request&rdquo;</em>. We will respond within 30 days.
          </p>
        </section>

        <div className="border-t border-slate-200 dark:border-white/10" />

        <section>
          <h2 className="text-xl font-black text-slate-900 dark:text-white">7. Cookies</h2>
          <p className="mt-3 leading-7">
            Our website does not use tracking cookies by default. If you have opted in to analytics
            (Plausible or GA4), those providers may set first-party or third-party cookies per their
            respective privacy policies. Plausible Analytics is cookieless by design.
          </p>
        </section>

        <div className="border-t border-slate-200 dark:border-white/10" />

        <section>
          <h2 className="text-xl font-black text-slate-900 dark:text-white">8. Third-party services</h2>
          <p className="mt-3 leading-7">We may use the following third-party services:</p>
          <ul className="mt-3 list-disc space-y-1 pl-6 leading-7">
            <li>
              <strong>Resend</strong> — transactional email delivery of lead notifications to our team
              (your data is transmitted to Resend solely for this purpose)
            </li>
            <li>
              <strong>Google Fonts</strong> — font delivery (no personal data is shared)
            </li>
            <li>
              <strong>Plausible / Google Analytics 4</strong> — optional, anonymised analytics
            </li>
          </ul>
        </section>

        <div className="border-t border-slate-200 dark:border-white/10" />

        <section>
          <h2 className="text-xl font-black text-slate-900 dark:text-white">9. Changes to this policy</h2>
          <p className="mt-3 leading-7">
            We may update this Privacy Policy from time to time. When we do, we will revise the
            &ldquo;Last updated&rdquo; date at the top. We encourage you to review this page periodically.
            Continued use of our services after changes constitutes acceptance of the revised policy.
          </p>
        </section>

        <div className="border-t border-slate-200 dark:border-white/10" />

        <section>
          <h2 className="text-xl font-black text-slate-900 dark:text-white">10. Contact</h2>
          <p className="mt-3 leading-7">
            If you have any questions or concerns about this Privacy Policy or how we handle your
            personal data, please contact us:
          </p>
          <div className="mt-4 inline-flex flex-col gap-1 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm dark:border-white/10 dark:bg-white/5">
            <span className="font-bold text-slate-900 dark:text-white">SellSavvy</span>
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-[var(--brand-gold-muted)] underline dark:text-[var(--brand-gold)]"
            >
              {siteConfig.email}
            </a>
            {siteConfig.phone && (
              <span className="text-slate-600 dark:text-slate-400">{siteConfig.phone}</span>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
