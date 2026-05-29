import { Link, Navigate, useParams } from "react-router-dom";
import { Check } from "lucide-react";
import { getCaseStudyBySlug } from "../data/caseStudies";
import { getChannelLander } from "../data/channelLanders";
import { useSeo } from "../hooks/useSeo";
import { ButtonLink } from "../components/ui/ButtonLink";
import { Reveal } from "../components/ui/Reveal";

export default function ChannelLanderPage() {
  const { channelSlug } = useParams<{ channelSlug: string }>();
  const lander = channelSlug ? getChannelLander(channelSlug) : undefined;
  const relatedCase = lander ? getCaseStudyBySlug(lander.relatedCaseSlug) : undefined;

  useSeo({
    title: lander ? `${lander.platform} Growth | SellSavvy` : "Services | SellSavvy",
    description: lander?.description ?? "Channel-specific ecommerce growth services.",
    path: lander ? `/services/${lander.slug}` : "/services",
  });

  if (!lander) return <Navigate to="/services" replace />;

  return (
    <div className="pt-24">
      <section className="border-b border-slate-200/80 py-16 dark:border-white/10 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Link to="/services" className="text-sm font-bold text-[var(--brand-gold-muted)] dark:text-[var(--brand-gold)]">
            ← All services
          </Link>
          <Reveal className="mt-8">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--brand-gold-muted)] dark:text-[var(--brand-gold)]">
              {lander.platform} growth
            </p>
            <h1 className="mt-4 text-balance text-4xl font-black tracking-tight text-slate-950 dark:text-white sm:text-5xl">
              {lander.title}
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-300">{lander.description}</p>
            <ul className="mt-8 space-y-3">
              {lander.bullets.map((bullet) => (
                <li key={bullet} className="flex items-center gap-3 text-slate-700 dark:text-slate-200">
                  <Check className="h-5 w-5 shrink-0 text-[var(--brand-gold-muted)] dark:text-[var(--brand-gold)]" />
                  {bullet}
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink to="/contact" trackLabel={`channel_${lander.slug}_audit`}>
                Book free audit
              </ButtonLink>
              {relatedCase && (
                <ButtonLink to={`/case-studies/${relatedCase.slug}`} variant="secondary" trackLabel="channel_related_case">
                  See related case study
                </ButtonLink>
              )}
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
