import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { getCaseStudyBySlug } from "../data/caseStudies";
import { useSeo } from "../hooks/useSeo";
import { CaseStudyJsonLd } from "../components/seo/SiteJsonLd";
import { ButtonLink } from "../components/ui/ButtonLink";
import { Reveal } from "../components/ui/Reveal";

export default function CaseStudyDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const study = slug ? getCaseStudyBySlug(slug) : undefined;

  useSeo({
    title: study ? `${study.brand} Case Study | SellSavvy` : "Case Study | SellSavvy",
    description: study?.summary ?? "Ecommerce growth case study from SellSavvy.",
    path: study ? `/case-studies/${study.slug}` : "/case-studies",
  });

  if (!study) return <Navigate to="/case-studies" replace />;

  return (
    <div className="pt-24">
      <CaseStudyJsonLd slug={study.slug} brand={study.brand} description={study.summary} result={study.result} />
      <article className="border-b border-slate-200/80 py-16 dark:border-white/10 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Link
            to="/case-studies"
            className="inline-flex items-center gap-2 text-sm font-bold text-[var(--brand-gold-muted)] dark:text-[var(--brand-gold)]"
          >
            <ArrowLeft className="h-4 w-4" />
            All case studies
          </Link>

          <Reveal className="mt-8">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--brand-gold-muted)] dark:text-[var(--brand-gold)]">
              {study.category === "d2c" ? "D2C" : "Marketplace"} · {study.channel}
            </p>
            <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950 dark:text-white sm:text-5xl">
              {study.brand}
            </h1>
            <p className="mt-6 text-6xl font-black text-slate-950 dark:text-white">{study.result}</p>
            <p className="mt-2 text-lg text-slate-600 dark:text-slate-300">{study.metric}</p>
            <p className="mt-8 text-base leading-8 text-slate-600 dark:text-slate-300">{study.summary}</p>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <Reveal>
              <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-[#0b1720]">
                <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500">Before</h2>
                <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">{study.challenge}</p>
              </div>
            </Reveal>
            <Reveal delay={0.06}>
              <div className="rounded-[1.5rem] border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-[#0b1720]">
                <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500">What changed</h2>
                <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">{study.action}</p>
              </div>
            </Reveal>
          </div>

          <div className="mt-12">
            <ButtonLink to="/contact" trackLabel="case_study_audit">
              Book a growth audit
            </ButtonLink>
          </div>
        </div>
      </article>
    </div>
  );
}
