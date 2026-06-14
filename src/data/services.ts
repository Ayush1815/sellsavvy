import type { LucideIcon } from "lucide-react";
import {
  Camera,
  Instagram,
  Monitor,
  ShoppingBag,
  TrendingUp,
} from "lucide-react";

export type Service = {
  slug: string;
  aliases?: string[];
  title: string;
  description: string;
  bullets: string[];
  Icon: LucideIcon;
  span: string;
  image: string;
  detail: {
    eyebrow: string;
    sourceUrl: string;
    intro: string;
    outcome: string;
    metric: {
      value: string;
      label: string;
    };
    valueProps: string[];
    deliverables: string[];
    modules: Array<{
      title: string;
      text: string;
    }>;
    workflow: Array<{
      title: string;
      text: string;
    }>;
    checkpoints: string[];
    bestFor: string[];
    faqs: Array<{
      question: string;
      answer: string;
    }>;
  };
};

export const services: Service[] = [
  {
    slug: "e-commerce-account-management",
    aliases: ["ecommerce-account-management"],
    title: "E-commerce account management",
    description:
      "Marketplace operations for sellers who need sharper listings, cleaner account health, and daily execution across every commerce channel.",
    bullets: ["Marketplace setup", "Listing SEO", "Orders, ads, and reporting"],
    Icon: ShoppingBag,
    span: "lg:col-span-1",
    image: "/media/services/E-commerce_management_1.webp",
    detail: {
      eyebrow: "Marketplace operations",
      sourceUrl: "https://www.bullzeyeservices.com/e-commerce-account-management/",
      intro:
        "A complete operating desk for brands selling on Amazon, Flipkart, Myntra, and Meesho. We handle account setup, catalog creation, search optimization, and daily compliance so founders can focus on product.",
      outcome:
        "Higher conversions, clean product pages, tighter inventory visibility, and a weekly rhythm for promotions and performance tracking.",
      metric: {
        value: "12+",
        label: "years of commerce context translated into a practical operating system.",
      },
      valueProps: [
        "Centralized account ownership for catalog, pricing, and promotion.",
        "Marketplace-specific listing standards tailored for Amazon, Flipkart, Myntra, and Meesho.",
        "A weekly action board separating revenue blockers and growth tests.",
      ],
      deliverables: [
        "Account setup and compliance workflows",
        "A+ Content creation and category mapping",
        "Search keyword and listing SEO",
        "Buy Box optimization and tracking",
        "Inventory forecasting and risk tracking",
        "PPC sponsored ads coordination",
      ],
      modules: [
        {
          title: "Account health command",
          text: "Suppression alerts, seller messages, and policy tasks tracked in one operating board.",
        },
        {
          title: "Catalog and listing desk",
          text: "Listings built for marketplace search, buyer clarity, and category compliance.",
        },
        {
          title: "Order and inventory control",
          text: "Stock movement and availability risks reviewed before they impact ranking.",
        },
        {
          title: "Promotion and ads support",
          text: "Sale events and ads planned around margin and stock position.",
        },
      ],
      workflow: [
        {
          title: "Audit the account",
          text: "Review catalog quality, warnings, inventory gaps, ad waste, and sales movement.",
        },
        {
          title: "Build the runbook",
          text: "Organize tasks by owner, cadence, and urgency for repeatable operations.",
        },
        {
          title: "Operate and improve",
          text: "Weekly cycle covering fixes, promotions, reporting, and expansion.",
        },
      ],
      checkpoints: [
        "Seller onboarding",
        "Catalog health",
        "Listing SEO",
        "Inventory risk",
        "Order rhythm",
        "Review queue",
        "Ad readiness",
        "Weekly reporting",
      ],
      bestFor: [
        "Amazon, Flipkart, Myntra, and Meesho sellers",
        "Brands overloaded with marketplace admin",
        "Teams expanding to new sales channels",
      ],
      faqs: [
        {
          question: "Can SellSavvy manage multiple marketplaces together?",
          answer:
            "Yes. We support Amazon, Flipkart, Myntra, and Meesho with platform-specific tasks tracked through one operating board.",
        },
        {
          question: "Does this include product listing optimization?",
          answer:
            "Yes. We optimize titles, bullets, descriptions, keywords, attributes, and image readiness.",
        },
        {
          question: "Can the team handle ads and promotions too?",
          answer:
            "Yes. We manage promotions and PPC campaigns aligned with your margin and stock position.",
        },
      ],
    },
  },
  {
    slug: "social-media-management",
    title: "Social media management",
    description:
      "Content planning, design, video, captions, community management, paid support, analytics, and reporting for brands that need a reliable publishing system.",
    bullets: ["Content calendar", "Reels and creatives", "Community and analytics"],
    Icon: Instagram,
    span: "lg:col-span-1",
    image: "/media/services/social_media_management_1.webp",
    detail: {
      eyebrow: "Social content system",
      sourceUrl: "https://www.bullzeyeservices.com/social-media-management/",
      intro:
        "A reliable publishing system managing content calendars, creative production, and community engagement. We produce strategic posts and short-form video that drive measurable reach.",
      outcome:
        "Your channels maintain a consistent rhythm, professional visual language, and engaged community, backed by transparent analytics.",
      metric: {
        value: "6",
        label: "operating loops: planning, creation, video, engagement, paid, and reporting.",
      },
      valueProps: [
        "Monthly content calendars aligned with product launches and audience behavior.",
        "Consistent graphic and short-form video production.",
        "Actionable analytics that inform the next month's strategy.",
      ],
      deliverables: [
        "Monthly content calendar and strategy planning",
        "Influencer coordination and outreach support",
        "Static posts, carousels, and short-form video (Reels/TikToks)",
        "Caption writing, hashtags, and brand messaging",
        "Community engagement and message management",
        "Engagement reports and audience growth analytics",
      ],
      modules: [
        {
          title: "Strategy and planning",
          text: "Mapping content themes, posting cadence, and campaign moments.",
        },
        {
          title: "Content creation",
          text: "Designing posts, graphics, and video tailored to each platform.",
        },
        {
          title: "Community care",
          text: "Managing comments and replies with a consistent brand voice.",
        },
        {
          title: "Growth and reporting",
          text: "Reviewing reach, engagement, and conversion signals to refine strategy.",
        },
      ],
      workflow: [
        {
          title: "Set direction",
          text: "Define brand voice, visual rules, and recurring content themes.",
        },
        {
          title: "Produce and publish",
          text: "Execute creative assets and scheduling via a predictable cadence.",
        },
        {
          title: "Measure and refine",
          text: "Analyze reach, saves, and clicks to improve future performance.",
        },
      ],
      checkpoints: [
        "Content calendar",
        "Creative design",
        "Caption system",
        "Video plan",
        "Publishing cadence",
        "Community response",
        "Influencer plan",
        "Analytics report",
      ],
      bestFor: [
        "Brands struggling with inconsistent posting",
        "Teams needing unified design, video, and community management",
        "Businesses utilizing social media for lead generation and trust",
      ],
      faqs: [
        {
          question: "Does this include reels and short-form video?",
          answer:
            "Yes. Short-form video direction, editing, and strategy are core to our monthly system.",
        },
        {
          question: "Can you manage comments and messages?",
          answer:
            "Yes. We handle community engagement with guidelines aligned strictly to your brand voice.",
        },
        {
          question: "Do you collaborate with influencers?",
          answer:
            "Yes. We offer influencer coordination and outreach support to amplify campaign reach.",
        },
      ],
    },
  },
  {
    slug: "website-design",
    aliases: ["website-design-development"],
    title: "Website design",
    description:
      "Responsive business websites, e-commerce stores, and landing pages built for speed, trust, search visibility, and clear conversion paths.",
    bullets: ["Custom UI", "Responsive build", "SEO and speed"],
    Icon: Monitor,
    span: "lg:col-span-1",
    image: "/media/services/Website_design_1.webp",
    detail: {
      eyebrow: "Web experience",
      sourceUrl: "https://www.bullzeyeservices.com/website-design/",
      intro:
        "Conversion-first website design combining custom UI, responsive architecture, and SEO fundamentals. We build storefronts and landing pages optimized for speed and revenue.",
      outcome:
        "A fast, mobile-optimized site that guides visitors effortlessly from browsing to purchase or enquiry.",
      metric: {
        value: "8",
        label: "launch checkpoints covering design, responsiveness, SEO, and performance testing.",
      },
      valueProps: [
        "Page structures engineered around conversion actions and business goals.",
        "Mobile-first responsive design ensuring seamless navigation on all devices.",
        "Pre-launch optimization for SEO, accessibility, and loading speed.",
      ],
      deliverables: [
        "Conversion-focused sitemap and strategy",
        "Mobile-first responsive UI/UX design",
        "Speed optimization and Core Web Vitals compliance",
        "SEO-ready technical structure and metadata",
        "E-commerce setup with streamlined checkout",
        "Post-launch QA and performance testing",
      ],
      modules: [
        {
          title: "Business websites",
          text: "Trust signals and service pages shaped specifically for lead generation.",
        },
        {
          title: "E-commerce storefronts",
          text: "Product discovery and frictionless checkout built for high conversion.",
        },
        {
          title: "Landing pages",
          text: "Targeted campaign pages focusing on single offers and primary actions.",
        },
        {
          title: "Optimization layer",
          text: "Integrated SEO basics, speed enhancements, and analytics readiness.",
        },
      ],
      workflow: [
        {
          title: "Understand the business",
          text: "Clarify goals, audience, and the critical conversion actions.",
        },
        {
          title: "Design and build",
          text: "Develop responsive layouts, visuals, and frontend implementation.",
        },
        {
          title: "Test and support",
          text: "Verify speed, SEO, form flows, and mobile behavior before launch.",
        },
      ],
      checkpoints: [
        "Sitemap approval",
        "Conversion paths",
        "Mobile UI",
        "SEO metadata",
        "Speed testing",
        "Accessibility",
        "Checkout QA",
        "Launch support",
      ],
      bestFor: [
        "Brands launching new e-commerce experiences",
        "Businesses replacing outdated, slow websites",
        "Marketing teams needing high-converting landing pages",
      ],
      faqs: [
        {
          question: "Can this route cover e-commerce websites?",
          answer:
            "Yes. We build complete e-commerce storefronts as well as lead-generation business websites.",
        },
        {
          question: "Will the site be fast and responsive?",
          answer:
            "Yes. We prioritize mobile-first design and speed optimization to meet Core Web Vitals standards.",
        },
        {
          question: "Do you include SEO best practices?",
          answer:
            "Yes. We deliver SEO-ready structures including optimized headings, metadata, and fast loading times.",
        },
      ],
    },
  },
  {
    slug: "digital-marketing-services",
    aliases: ["digital-marketing"],
    title: "Digital marketing services",
    description:
      "SEO, Meta, Google, content, email, and reporting shaped into a single growth plan instead of scattered campaign activity.",
    bullets: ["SEO strategy", "Meta and Google ads", "Performance reporting"],
    Icon: TrendingUp,
    span: "lg:col-span-1",
    image: "/media/services/digital_marketing_1.webp",
    detail: {
      eyebrow: "Demand generation",
      sourceUrl: "https://www.bullzeyeservices.com/digital-marketing-services/",
      intro:
        "Digital marketing for businesses that need ROAS-driven campaigns and qualified traffic. We align SEO, Google Ads, Meta Ads, and programmatic strategies into one cohesive growth plan.",
      outcome:
        "Every channel gets a measurable goal, clear creative angle, and consistent reporting, lowering acquisition costs and scaling revenue predictably.",
      metric: {
        value: "6",
        label: "growth channels coordinated: SEO, Meta, Google, programmatic, content, and web conversion.",
      },
      valueProps: [
        "Search, paid, and social work aligned around your target audience and offers.",
        "Campaign reporting that details what to pause and what to scale.",
        "Creative testing grounded in lead quality and return on ad spend.",
      ],
      deliverables: [
        "SEO audit, keyword mapping, and content strategy",
        "Google Ads and Meta Ads structure with budget guardrails",
        "Programmatic advertising and audience segmentation",
        "Weekly performance dashboards and insights",
        "Email campaign flows for retention and abandoned carts",
        "Landing-page recommendations for conversion optimization",
      ],
      modules: [
        {
          title: "Search visibility",
          text: "Mapping priority keywords, page intent, and technical blockers before executing SEO.",
        },
        {
          title: "Paid acquisition",
          text: "Structuring Google, Meta, and programmatic campaigns by audience and funnel stage.",
        },
        {
          title: "Content engine",
          text: "Aligning blogs, posts, and lead magnets to support search and paid traffic.",
        },
        {
          title: "Reporting rhythm",
          text: "Summarizing channel movement, spend quality, and the next strategic decision.",
        },
      ],
      workflow: [
        {
          title: "Read the market",
          text: "Analyze audience, competitors, conversion gaps, and campaign history.",
        },
        {
          title: "Build the channel plan",
          text: "Assign clear roles in the funnel for SEO, ads, email, and landing pages.",
        },
        {
          title: "Optimize with evidence",
          text: "Adjust budgets, keywords, and creative based on performance signals.",
        },
      ],
      checkpoints: [
        "SEO intent map",
        "Paid media structure",
        "Audience targeting",
        "Creative test plan",
        "Landing-page fit",
        "Lead quality",
        "Budget movement",
        "Monthly reporting",
      ],
      bestFor: [
        "Service businesses needing qualified enquiries",
        "E-commerce brands scaling Meta or Google campaigns",
        "Teams requiring consolidated channel reporting",
      ],
      faqs: [
        {
          question: "Does this cover both organic and paid marketing?",
          answer:
            "Yes. We handle SEO and content organically, while managing Meta Ads, Google Ads, and programmatic media.",
        },
        {
          question: "Can you support social media inside the digital plan?",
          answer:
            "Yes. Social strategy is included, but for daily execution, consider our dedicated social media management.",
        },
        {
          question: "How is reporting handled?",
          answer:
            "We provide weekly dashboards highlighting channel movement, spend efficiency, lead quality, and next steps.",
        },
      ],
    },
  },
  {
    slug: "e-commerce-photoshoot",
    aliases: ["brand-fashion-product-shoot"],
    title: "E-commerce photoshoot",
    description:
      "Product photography, white-background images, lifestyle frames, infographics, and campaign creatives built for listings, ads, and storefronts.",
    bullets: ["Product photography", "Marketplace-ready images", "Lifestyle and creative shots"],
    Icon: Camera,
    span: "lg:col-span-1",
    image: "/media/services/Photoshoot_1.webp",
    detail: {
      eyebrow: "Product visuals",
      sourceUrl: "https://www.bullzeyeservices.com/e-commerce-photoshoot/",
      intro:
        "A commerce-first shoot service balancing clean catalog photography with engaging lifestyle frames. We provide platform-compliant imagery optimized for Amazon, Shopify, and social channels.",
      outcome:
        "You receive a comprehensive asset library ready for A+ content, ad creatives, website banners, and social posts.",
      metric: {
        value: "6",
        label: "core image types per shoot: catalog, lifestyle, creative, detail, infographic, and marketplace crop.",
      },
      valueProps: [
        "Shot lists mapped to specific ad, web, and marketplace placements.",
        "Consistent lighting and styling to strengthen brand identity.",
        "Strict adherence to marketplace guidelines for backgrounds and resolution.",
      ],
      deliverables: [
        "Shoot concept and visual reference board",
        "Model coordination and talent scouting",
        "Props and set design aligned with brand identity",
        "Platform-compliant image specs (Amazon, Myntra, etc.)",
        "Lifestyle and creative product frames",
        "Edited exports organized by channel use",
      ],
      modules: [
        {
          title: "Marketplace catalog",
          text: "Clean, compliance-led product images for listing thumbnails and galleries.",
        },
        {
          title: "Lifestyle storytelling",
          text: "Products in context to showcase use, scale, and emotional fit.",
        },
        {
          title: "Creative campaigns",
          text: "Styled banners and ad-ready visuals for launches and promotions.",
        },
        {
          title: "Retouch and export",
          text: "Final files edited, named, and grouped for quick deployment.",
        },
      ],
      workflow: [
        {
          title: "Plan placements",
          text: "Define where each image will live before production begins.",
        },
        {
          title: "Run the shoot",
          text: "Execute lighting, styling, and angles for maximum conversion.",
        },
        {
          title: "Package assets",
          text: "Edit and export by use case: listing, ads, website, and social.",
        },
      ],
      checkpoints: [
        "Reference board",
        "Model selection",
        "Prop sourcing",
        "Lighting setup",
        "Angle coverage",
        "Retouch pass",
        "Crop variants",
        "Asset handoff",
      ],
      bestFor: [
        "Brands with weak or outdated listing images",
        "Fashion, beauty, home, and packaged goods",
        "Product launches requiring multi-channel assets",
      ],
      faqs: [
        {
          question: "Can the shoot cover Amazon and website images together?",
          answer:
            "Yes. We provide both marketplace-compliant catalog shots and rich lifestyle images for your site.",
        },
        {
          question: "Do you handle models and props?",
          answer:
            "Yes. We coordinate models, source props, and manage set design based on the approved mood board.",
        },
        {
          question: "Are the images ready for upload?",
          answer:
            "Yes. We provide platform-compliant specs formatted correctly for Amazon, Flipkart, Myntra, and Shopify.",
        },
      ],
    },
  },
];

export const featuredServiceIndices = [0, 1, 2];

export function getServiceBySlug(slug: string) {
  const normalizedSlug = slug.trim().toLowerCase();
  return services.find((service) => service.slug === normalizedSlug || service.aliases?.includes(normalizedSlug));
}

export function getCanonicalServiceSlug(slug: string) {
  return getServiceBySlug(slug)?.slug;
}
