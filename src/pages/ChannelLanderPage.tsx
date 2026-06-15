import { createElement, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  Layers3,
  Sparkles,
} from "lucide-react";
import { getChannelLander, type ChannelLander } from "../data/channelLanders";
import { getCanonicalServiceSlug, getServiceBySlug, type Service } from "../data/services";
import { useSeo } from "../hooks/useSeo";
import { ButtonLink } from "../components/ui/ButtonLink";
import { Reveal } from "../components/ui/Reveal";
import { classNames } from "../lib/classNames";

type ServiceVisual = {
  hero: {
    light: string;
    dark: string;
    alt: string;
  };
  deliverablesImage: string;
  architectureImage: string;
  workflowImage: string;
  controlPointsImage: string;
  alt: string;
  kicker: string;
  title: string;
  caption: string;
  chips: string[];
  stats: Array<{
    label: string;
    value: string;
  }>;
};

const splineViewerScriptSrc = "https://unpkg.com/@splinetool/viewer/build/spline-viewer.js";

const splineHeroScene = {
  sceneUrl: "https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode",
  fallbackImage: "/media/services/Website_design_5.webp",
  title: "Spline website experience",
  caption: "Interactive websites for better engagement.",
};

let splineViewerScriptPromise: Promise<void> | null = null;

const serviceVisuals: Record<string, ServiceVisual> = {
  "e-commerce-account-management": {
    hero: {
      light: "/media/services/E-commerce_management_1.webp",
      dark: "/media/services/E-commerce_management_1.webp",
      alt: "Custom ecommerce operations hero with marketplace dashboard, cart, packages, mobile storefront, and reporting props",
    },
    deliverablesImage: "/media/services/E-commerce_management_2.webp",
    architectureImage: "/media/services/E-commerce_management_3.webp",
    workflowImage: "/media/services/Ecommerce_workflow_custom.png",
    controlPointsImage: "/media/services/Ecommerce_controlpoints_custom.png",
    alt: "E-commerce account dashboard showing total sales and orders",
    kicker: "Marketplace control room",
    title: "Accounts, catalog, orders, and promotions in one operating view.",
    caption: "A practical command layer for marketplaces that need daily attention and clean reporting.",
    chips: ["Catalog health", "Order flow", "PPC readiness"],
    stats: [
      { label: "marketplaces", value: "8" },
      { label: "weekly checks", value: "14" },
    ],
  },
  "digital-marketing-services": {
    hero: {
      light: "/media/services/digital_marketing_1.webp",
      dark: "/media/services/digital_marketing_1.webp",
      alt: "Custom digital marketing hero with performance dashboard, ads cards, SEO panel, target, and megaphone",
    },
    deliverablesImage: "/media/services/digital_marketing_2.webp",
    architectureImage: "/media/services/digital_marketing_3.webp",
    workflowImage: "/media/services/reference/digital-marketing-dashboard.webp",
    controlPointsImage: "/media/services/carousel/digital-marketing-new.webp",
    alt: "Digital marketing campaign metrics and ROAS tracking",
    kicker: "Demand engine",
    title: "Search, paid media, content, and reporting connected to one growth plan.",
    caption: "Campaign visibility, audience testing, and conversion insight without scattered dashboards.",
    chips: ["SEO", "Meta Ads", "Google Ads"],
    stats: [
      { label: "channels", value: "6" },
      { label: "report loops", value: "30d" },
    ],
  },
  "e-commerce-photoshoot": {
    hero: {
      light: "/media/services/Photoshoot_1.webp",
      dark: "/media/services/Photoshoot_1.webp",
      alt: "Custom product photoshoot hero with camera, studio lights, perfume bottle, styling props, and campaign reference cards",
    },
    deliverablesImage: "/media/services/Photoshoot_architecture_custom.png",
    architectureImage: "/media/services/Photoshoot_deliverables_custom.png",
    workflowImage: "/media/services/Photoshoot_workflow_custom.png",
    controlPointsImage: "/media/services/carousel/ecommerce-photoshoot-new.webp",
    alt: "Product photography studio setup and styling",
    kicker: "Product visual studio",
    title: "Shoot planning, clean product frames, and campaign-ready visual assets.",
    caption: "Visuals planned for listings, banners, ads, social posts, and product detail pages.",
    chips: ["Professional shoot", "Lavish studio", "Infographics"],
    stats: [
      { label: "image sets", value: "6" },
      { label: "asset slots", value: "42" },
    ],
  },
  "website-design": {
    hero: {
      light: "/media/services/Website_design_5.webp",
      dark: "/media/services/Website_design_5.webp",
      alt: "Custom website development hero with responsive website screens, wireframe cards, code panel, and performance score",
    },
    deliverablesImage: "/media/services/Website_design_5.webp",
    architectureImage: "/media/services/Website_design_2.webp",
    workflowImage: "/media/services/Website_workflow_custom.png",
    controlPointsImage: "/media/services/Website_controlpoints_custom.png",
    alt: "Custom website wireframes and performance metrics",
    kicker: "Website experience",
    title: "Responsive pages shaped around clarity, trust, speed, and conversion.",
    caption: "Custom design and launch QA for business sites, stores, and landing pages.",
    chips: ["Responsive", "SEO-ready", "Speed QA"],
    stats: [
      { label: "launch checks", value: "8" },
      { label: "viewports", value: "3" },
    ],
  },
  "social-media-management": {
    hero: {
      light: "/media/services/social_media_management_1.webp",
      dark: "/media/services/social_media_management_1.webp",
      alt: "Custom social media management hero with content calendar, phone feed, reach chart, engagement card, and social reactions",
    },
    deliverablesImage: "/media/services/social_media_management_3.webp",
    architectureImage: "/media/services/social_media_management_4.webp",
    workflowImage: "/media/services/social_media_management_5.webp",
    controlPointsImage: "/media/services/social_media_management_7.webp",
    alt: "Social media content calendar and community engagement",
    kicker: "Content rhythm",
    title: "A monthly content system for posts, reels, engagement, and reporting.",
    caption: "Creative planning and performance reading for social channels that need consistency.",
    chips: ["Calendar", "Reels", "Community"],
    stats: [
      { label: "content loops", value: "6" },
      { label: "review cycle", value: "7d" },
    ],
  },
};

function getServiceVisual(slug: string) {
  return serviceVisuals[slug] ?? serviceVisuals["e-commerce-account-management"];
}

function loadSplineViewerScript() {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.customElements.get("spline-viewer")) return Promise.resolve();
  if (splineViewerScriptPromise) return splineViewerScriptPromise;

  splineViewerScriptPromise = new Promise<void>((resolve, reject) => {
    const finishWhenDefined = () => {
      if (window.customElements.get("spline-viewer")) {
        resolve();
        return;
      }

      window.customElements.whenDefined("spline-viewer").then(() => resolve()).catch(reject);
    };

    const existingScript = document.querySelector<HTMLScriptElement>(`script[src="${splineViewerScriptSrc}"]`);
    if (existingScript) {
      existingScript.addEventListener("load", finishWhenDefined, { once: true });
      existingScript.addEventListener("error", () => reject(new Error("Spline viewer script failed to load.")), { once: true });
      finishWhenDefined();
      return;
    }

    const script = document.createElement("script");
    script.type = "module";
    script.src = splineViewerScriptSrc;
    script.addEventListener("load", finishWhenDefined, { once: true });
    script.addEventListener("error", () => reject(new Error("Spline viewer script failed to load.")), { once: true });
    document.head.appendChild(script);
  });

  return splineViewerScriptPromise;
}

export default function ChannelLanderPage() {
  const { channelSlug } = useParams<{ channelSlug: string }>();
  const lander = channelSlug ? getChannelLander(channelSlug) : undefined;
  const service = !lander && channelSlug ? getServiceBySlug(channelSlug) : undefined;
  const canonicalServiceSlug = channelSlug ? getCanonicalServiceSlug(channelSlug) : undefined;

  useSeo({
    title: lander ? `${lander.platform} Growth | SellSavvy` : service ? `${service.title} | SellSavvy` : "Services | SellSavvy",
    description: lander?.description ?? service?.description ?? "Channel-specific ecommerce growth services.",
    path: lander ? `/services/${lander.slug}` : service ? `/services/${service.slug}` : "/services",
  });

  if (service && canonicalServiceSlug && channelSlug !== canonicalServiceSlug) {
    return <Navigate to={`/services/${canonicalServiceSlug}`} replace />;
  }

  if (service) return <ServiceDetailPage service={service} />;
  if (!lander) return <Navigate to="/services" replace />;

  return <MarketplaceLander lander={lander} />;
}

function MarketplaceLander({ lander }: { lander: ChannelLander }) {
  return (
    <div className="pt-24">
      <section className="border-b border-slate-200/80 py-16 dark:border-white/10 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Reveal className="mt-8">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--brand-gold-muted)] dark:text-[var(--brand-gold)]">
              {lander.platform} growth
            </p>
            <h1 className="mt-4 text-balance text-4xl font-black tracking-normal text-slate-950 dark:text-white sm:text-5xl">
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
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

function ServiceDetailPage({ service }: { service: Service }) {
  const Icon = service.Icon;
  const visual = getServiceVisual(service.slug);

  return (
    <div className="pt-24">
      <section className="relative isolate overflow-hidden border-b border-slate-200/80 py-16 dark:border-white/10 sm:py-20">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_20%_0%,rgba(207,156,45,0.13),transparent_36%),radial-gradient(circle_at_78%_24%,rgba(11,37,64,0.1),transparent_32%)] dark:bg-[radial-gradient(circle_at_20%_0%,rgba(228,189,96,0.12),transparent_36%),radial-gradient(circle_at_78%_24%,rgba(255,255,255,0.08),transparent_32%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mt-8 grid gap-10 lg:grid-cols-[0.45fr_0.55fr] lg:items-stretch">
            <Reveal>
              <p className="inline-flex items-center gap-2 rounded-full border border-[var(--border-soft)] bg-white/70 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-[var(--brand-gold-muted)] shadow-[0_16px_50px_-42px_rgba(11,37,64,0.55)] backdrop-blur-xl dark:bg-white/7 dark:text-[var(--brand-gold)]">
                <Icon className="h-4 w-4" strokeWidth={1.8} />
                {service.detail.eyebrow}
              </p>
              <h1 className="mt-6 max-w-4xl text-balance text-4xl font-black leading-tight tracking-normal text-slate-950 dark:text-white sm:text-6xl">
                {service.title}
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">{service.detail.intro}</p>
              <p className="mt-5 max-w-3xl text-base leading-8 text-slate-700 dark:text-slate-200">{service.detail.outcome}</p>
              <div className="mt-8 grid max-w-4xl grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {service.detail.valueProps.map((item) => (
                  <div
                    key={item}
                    className="rounded-[1.15rem] border border-[var(--border-soft)] bg-white/64 p-4 text-sm font-bold leading-7 text-slate-700 shadow-[0_18px_56px_-46px_rgba(11,37,64,0.62)] backdrop-blur-xl dark:bg-white/7 dark:text-slate-200"
                  >
                    {item}
                  </div>
                ))}
              </div>
              <div className="mt-10 flex flex-wrap gap-3">
                <ButtonLink to="/contact" trackLabel={`service_${service.slug}_audit`}>
                  Book free audit
                </ButtonLink>
                <ButtonLink to="/services" variant="secondary" trackLabel="service_all_services">
                  View all services
                </ButtonLink>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <ServiceHeroVisual service={service} visual={visual} />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden border-b border-slate-200/80 py-12 dark:border-white/10 sm:py-16">
        <SectionImageAura visual={visual} side="right" />
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.36fr_0.64fr] lg:px-8">
          <Reveal>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-[var(--brand-gold-muted)] dark:text-[var(--brand-gold)]">
              Deliverables
            </p>
            <h2 className="mt-4 max-w-md text-3xl font-black tracking-normal text-slate-950 dark:text-white sm:text-4xl">
              What gets built, fixed, or shipped.
            </h2>
            <ServiceSectionMedia image={visual.deliverablesImage} alt={visual.alt} className="mt-8" />
          </Reveal>
          <div className="grid gap-3 sm:grid-cols-2">
            {service.detail.deliverables.map((item, index) => (
              <Reveal key={item} delay={Math.min(index * 0.04, 0.18)}>
                <div className="group relative flex h-full gap-4 overflow-hidden rounded-[1.35rem] border border-[var(--border-soft)] bg-[var(--surface-light-elevated)] p-5 shadow-[0_20px_62px_-48px_rgba(11,37,64,0.64)] transition hover:-translate-y-1 hover:border-[var(--brand-gold)] dark:bg-[var(--surface-dark-elevated)]">
                  <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-[var(--brand-gold)] transition group-hover:scale-x-100" />
                  <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[var(--brand-gold-soft)] text-[var(--brand-gold-muted)] shadow-[0_12px_28px_-22px_rgba(168,115,18,0.8)] dark:text-[var(--brand-gold)]">
                    <CheckCircle2 className="h-4 w-4" strokeWidth={2} />
                  </span>
                  <div>
                    <p className="mt-0.5 text-sm font-bold leading-7 text-slate-700 dark:text-slate-200">{item}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden border-b border-slate-200/80 py-12 dark:border-white/10 sm:py-16">
        <SectionImageAura visual={visual} side="left" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.62fr_0.38fr] lg:items-end">
            <Reveal>
              <p className="text-xs font-black uppercase tracking-[0.24em] text-[var(--brand-gold-muted)] dark:text-[var(--brand-gold)]">
                Service architecture
              </p>
              <h2 className="mt-4 max-w-3xl text-3xl font-black tracking-normal text-slate-950 dark:text-white sm:text-4xl">
                The route is split into practical operating modules.
              </h2>
            </Reveal>
            <Reveal delay={0.05}>
              <ServiceInlinePanel image={visual.architectureImage} alt={visual.alt} kicker={visual.kicker} caption={visual.caption} />
            </Reveal>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {service.detail.modules.map((module, index) => (
              <Reveal key={module.title} delay={Math.min(index * 0.05, 0.18)}>
                <article className="relative h-full overflow-hidden rounded-[1.35rem] border border-[var(--border-soft)] bg-white/72 p-5 shadow-[0_18px_62px_-50px_rgba(11,37,64,0.66)] backdrop-blur-xl transition hover:-translate-y-1 hover:border-[var(--brand-gold)] dark:bg-white/7">
                  <div className="mb-8 flex items-center justify-end">
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-slate-950 text-white dark:bg-white dark:text-slate-950">
                      <Layers3 className="h-4 w-4" strokeWidth={1.8} />
                    </span>
                  </div>
                  <h3 className="mt-4 text-xl font-black text-slate-950 dark:text-white">{module.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{module.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>



      <section className="relative isolate overflow-hidden py-12 sm:py-16">
        <SectionImageAura visual={visual} side="right" />
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.34fr_0.66fr] lg:px-8">
          <Reveal>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-[var(--brand-gold-muted)] dark:text-[var(--brand-gold)]">
              Workflow
            </p>
            <h2 className="mt-4 text-3xl font-black tracking-normal text-slate-950 dark:text-white sm:text-4xl">
              A route from diagnosis to shipped work.
            </h2>
            <ServiceSectionMedia image={visual.workflowImage} alt={visual.alt} className="mt-8" compact />
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {service.detail.workflow.map((step, index) => (
              <Reveal key={step.title} delay={index * 0.06}>
                <article className="relative h-full overflow-hidden rounded-[1.5rem] border border-[var(--border-soft)] bg-white/74 p-6 shadow-[0_20px_70px_-52px_rgba(11,37,64,0.68)] transition hover:-translate-y-1 hover:border-[var(--brand-gold)] dark:bg-white/7">
                  <span className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[var(--brand-gold)] to-transparent opacity-70" />
                  <h3 className="mt-2 text-2xl font-black text-slate-950 dark:text-white">{step.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{step.text}</p>
                  {index < service.detail.workflow.length - 1 && (
                    <ArrowRight className="absolute bottom-5 right-5 h-5 w-5 text-[var(--brand-gold-muted)] opacity-60 dark:text-[var(--brand-gold)]" />
                  )}
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden border-t border-slate-200/80 py-12 dark:border-white/10 sm:py-16">
        <SectionImageAura visual={visual} side="left" />
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.42fr_0.58fr] lg:px-8">
          <Reveal>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-[var(--brand-gold-muted)] dark:text-[var(--brand-gold)]">
              Control points
            </p>
            <h2 className="mt-4 text-3xl font-black tracking-normal text-slate-950 dark:text-white sm:text-4xl">
              What we keep visible while the service is running.
            </h2>
            <p className="mt-4 max-w-md text-sm leading-7 text-slate-600 dark:text-slate-300">
              These checkpoints keep the route accountable, useful, and easy to review with your internal team.
            </p>
            <ServiceSignalPanel service={service} image={visual.controlPointsImage} alt={visual.alt} />
          </Reveal>

          <div className="flex flex-col gap-3">
            {service.detail.checkpoints.map((checkpoint, index) => (
              <Reveal key={checkpoint} delay={Math.min(index * 0.035, 0.18)}>
                <div className="group flex items-center gap-4 overflow-hidden rounded-[1.15rem] border border-[var(--border-soft)] bg-[var(--surface-light-elevated)] p-4 shadow-[0_18px_56px_-48px_rgba(11,37,64,0.62)] transition hover:-translate-y-0.5 hover:border-[var(--brand-gold)] dark:bg-[var(--surface-dark-elevated)]">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[var(--brand-gold-soft)] text-sm font-black text-[var(--brand-gold-muted)] dark:text-[var(--brand-gold)]">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  <p className="text-sm font-bold text-slate-700 dark:text-slate-200">{checkpoint}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200/80 py-12 dark:border-white/10 sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.34fr_0.66fr] lg:px-8">
          <Reveal>
            <p className="text-xs font-black uppercase tracking-[0.24em] text-[var(--brand-gold-muted)] dark:text-[var(--brand-gold)]">
              Questions
            </p>
            <h2 className="mt-4 text-3xl font-black tracking-normal text-slate-950 dark:text-white sm:text-4xl">
              Before you book the audit.
            </h2>
          </Reveal>

          <div className="divide-y divide-slate-200/70 rounded-[1.5rem] border border-[var(--border-soft)] bg-white/68 px-6 py-2 shadow-[0_24px_76px_-56px_rgba(11,37,64,0.68)] backdrop-blur-xl dark:divide-white/10 dark:bg-white/7">
            {service.detail.faqs.map((faq) => (
              <article key={faq.question} className="group py-6 transition-colors duration-300 hover:bg-slate-50/50 dark:hover:bg-white/5 -mx-3 px-3 rounded-xl">
                <h3 className="text-base font-black text-slate-950 dark:text-white transition-colors group-hover:text-[var(--brand-gold-muted)] dark:group-hover:text-[var(--brand-gold)]">{faq.question}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{faq.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function ServiceHeroVisual({ service, visual }: { service: Service; visual: ServiceVisual }) {
  const Icon = service.Icon;
  const isWebsiteDevelopment = service.slug === "website-design";

  return (
    <aside className="relative flex h-full flex-col overflow-hidden rounded-[1.9rem] border border-[var(--border-soft)] bg-[var(--surface-light-elevated)] p-3 shadow-[0_24px_60px_-24px_rgba(11,37,64,0.35)] backdrop-blur-xl dark:border-white/10 dark:bg-[#071017] dark:shadow-[0_36px_100px_-58px_rgba(7,16,23,0.9)]">
      {isWebsiteDevelopment ? (
        <figure className="relative flex-1 overflow-hidden rounded-[1.45rem] bg-slate-100/50 min-h-[16rem] sm:min-h-[22rem] lg:min-h-[28rem] dark:bg-[#071017]">
          <SplineViewerScene
            sceneUrl={splineHeroScene.sceneUrl}
            fallbackImage={splineHeroScene.fallbackImage}
            fallbackAlt={splineHeroScene.title}
            className="absolute inset-0 h-full w-full"
            eager
          />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(255,255,255,0)_60%,rgba(255,255,255,0.6))] dark:bg-[linear-gradient(180deg,transparent,rgba(7,16,23,0)_60%,rgba(7,16,23,0.2))]" />
          <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-slate-200/60 bg-white/70 px-3 py-2 text-[0.68rem] font-black uppercase tracking-[0.18em] text-slate-700 shadow-sm backdrop-blur-xl dark:border-white/14 dark:bg-white/10 dark:text-white/78 dark:shadow-[0_16px_44px_-32px_rgba(0,0,0,0.9)]">
            <Icon className="h-4 w-4 text-[var(--brand-gold-muted)] dark:text-[var(--brand-gold)]" strokeWidth={1.8} />
            3D website route
          </div>
        </figure>
      ) : (
        <figure className="relative flex-1 overflow-hidden rounded-[1.45rem] bg-slate-100/50 min-h-[16rem] sm:min-h-[22rem] lg:min-h-[28rem] dark:bg-[#071017]">
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-32 bg-gradient-to-t from-[var(--surface-light-elevated)] to-transparent dark:from-[#071017] sm:hidden" />
          <img
            src={visual.hero.light}
            alt={visual.hero.alt}
            className="absolute inset-0 h-full w-full object-cover object-center transition duration-700 hover:scale-[1.015] dark:hidden"
            loading="eager"
          />
          <img
            src={visual.hero.dark}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 hidden h-full w-full object-cover object-center transition duration-700 hover:scale-[1.015] dark:block"
            loading="eager"
          />
          <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-slate-200/60 bg-white/72 px-3 py-2 text-[0.68rem] font-black uppercase tracking-[0.18em] text-slate-700 shadow-sm backdrop-blur-xl dark:border-white/14 dark:bg-white/10 dark:text-white/78 dark:shadow-[0_16px_44px_-32px_rgba(0,0,0,0.9)]">
            <Icon className="h-4 w-4 text-[var(--brand-gold-muted)] dark:text-[var(--brand-gold)]" strokeWidth={1.8} />
            Custom service visual
          </div>
        </figure>
      )}

      <div className="relative z-20 -mt-16 mx-1 mb-1">
        <div className="rounded-[1.25rem] border border-[var(--border-soft)] bg-white/95 p-5 shadow-[0_20px_50px_-20px_rgba(11,37,64,0.35)] backdrop-blur-2xl dark:border-white/14 dark:bg-[#0a131c] dark:shadow-[0_24px_50px_-20px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.08)]">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-slate-500 dark:text-white/64">{visual.kicker}</p>
          <p className="mt-2 text-xl font-black leading-tight tracking-normal text-slate-950 dark:text-white">{visual.title}</p>
          <p className="mt-3 text-sm font-bold leading-6 text-slate-600 dark:text-white/70">
            {isWebsiteDevelopment ? splineHeroScene.caption : visual.caption}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {visual.chips.map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[0.66rem] font-black uppercase tracking-[0.13em] text-slate-600 dark:border-white/12 dark:bg-white/7 dark:text-white/68"
              >
                {chip}
              </span>
            ))}
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {visual.stats.map((stat) => (
              <div key={stat.label} className="rounded-[0.95rem] bg-slate-100/80 px-3 py-2 dark:bg-white/7">
                <p className="text-xl font-black leading-none text-slate-950 dark:text-white">{stat.value}</p>
                <p className="mt-1 text-[0.62rem] font-black uppercase tracking-[0.13em] text-slate-500 dark:text-white/50">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

    </aside>
  );
}

function SplineViewerScene({
  sceneUrl,
  fallbackImage,
  fallbackAlt,
  className,
  eager = false,
}: {
  sceneUrl: string;
  fallbackImage: string;
  fallbackAlt: string;
  className?: string;
  eager?: boolean;
}) {
  const [scriptReady, setScriptReady] = useState(() => typeof window !== "undefined" && Boolean(window.customElements.get("spline-viewer")));
  const [scriptFailed, setScriptFailed] = useState(false);

  useEffect(() => {
    let mounted = true;

    loadSplineViewerScript()
      .then(() => {
        if (mounted) setScriptReady(true);
      })
      .catch(() => {
        if (mounted) setScriptFailed(true);
      });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className={classNames("relative isolate overflow-hidden bg-[#071017]", className)}>
      <img
        src={fallbackImage}
        alt={fallbackAlt}
        className={classNames(
          "absolute inset-0 h-full w-full object-cover transition duration-700",
          scriptReady && !scriptFailed ? "scale-105 opacity-0 blur-[1px]" : "opacity-100",
        )}
        loading={eager ? "eager" : "lazy"}
      />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_54%_36%,rgba(228,189,96,0.08),transparent_28%),linear-gradient(135deg,rgba(7,16,23,0.04),rgba(7,16,23,0.18))]" />
      {scriptReady &&
        !scriptFailed &&
        createElement("spline-viewer", {
          className: "spline-viewer-element absolute inset-0 z-10 h-full w-full",
          url: sceneUrl,
          loading: eager ? "eager" : "lazy",
          "events-target": "global",
          background: "rgba(7,16,23,0)",
        } as Record<string, string>)}
      {!scriptReady && !scriptFailed && (
        <div className="absolute inset-0 grid place-items-center">
          <div className="rounded-full border border-white/12 bg-slate-950/46 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-white/66 backdrop-blur-xl">
            Loading 3D
          </div>
        </div>
      )}
    </div>
  );
}

function SectionImageAura({ visual, side }: { visual: ServiceVisual; side: "left" | "right" }) {
  return null;
}

function ServiceSectionMedia({
  image,
  alt,
  compact = false,
  className,
}: {
  image: string;
  alt: string;
  compact?: boolean;
  className?: string;
}) {
  return (
    <figure className={classNames("overflow-hidden rounded-[1.4rem] border border-[var(--border-soft)] bg-white/70 p-2 shadow-[0_22px_70px_-56px_rgba(11,37,64,0.7)] backdrop-blur-xl dark:bg-white/7", className)}>
      <div className="relative overflow-hidden rounded-[1.05rem]">
        <img
          src={image}
          alt={alt}
          className={classNames("w-full object-cover", compact ? "aspect-[16/9]" : "aspect-[4/3]")}
          loading="lazy"
        />
      </div>
    </figure>
  );
}

function ServiceInlinePanel({
  image,
  alt,
  kicker,
  caption,
}: {
  image: string;
  alt: string;
  kicker: string;
  caption: string;
}) {
  return (
    <div className="grid grid-cols-[4rem_1fr] sm:grid-cols-[5rem_1fr] gap-4 rounded-[1.35rem] border border-[var(--border-soft)] bg-white/72 p-3 shadow-[0_18px_58px_-48px_rgba(11,37,64,0.66)] backdrop-blur-xl dark:bg-white/7">
      <img src={image} alt={alt} className="h-16 w-16 sm:h-20 sm:w-20 rounded-[1rem] object-cover" loading="lazy" />
      <div className="min-w-0 py-1">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-[var(--brand-gold-muted)] dark:text-[var(--brand-gold)]">{kicker}</p>
        <p className="mt-2 text-sm font-bold leading-6 text-slate-700 dark:text-slate-200">{caption}</p>
      </div>
    </div>
  );
}

function ServiceSignalPanel({
  service,
  image,
  alt,
}: {
  service: Service;
  image: string;
  alt: string;
}) {
  return (
    <div className="mt-8 overflow-hidden rounded-[1.5rem] border border-[var(--border-soft)] bg-white/72 p-3 shadow-[0_22px_70px_-54px_rgba(11,37,64,0.72)] backdrop-blur-xl dark:bg-white/7">
      <div className="relative overflow-hidden rounded-[1.15rem]">
        <img src={image} alt={alt} className="aspect-[16/10] w-full object-cover" loading="lazy" />
      </div>
    </div>
  );
}
