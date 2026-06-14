import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  CalendarDays,
  Camera,
  Clapperboard,
  FileSearch,
  Gauge,
  Globe2,
  Instagram,
  Megaphone,
  MousePointer2,
  Palette,
  Search,
  Share2,
  ShoppingBag,
  Smartphone,
  Tags,
  TrendingUp,
  Truck,
  UsersRound,
} from "lucide-react";

export type ServiceCarouselSlideId =
  | "e-commerce-account-management"
  | "digital-marketing-services"
  | "e-commerce-photoshoot"
  | "website-design"
  | "social-media-management";

export type ServiceCarouselSlide = {
  id: ServiceCarouselSlideId;
  eyebrow: string;
  routePath: string;
  routeLabel: string;
  images: {
    light: string;
    dark: string;
  };
  imageAlt: string;
  Icon: LucideIcon;
  headline: Array<{
    text?: string;
    before?: string;
    accent?: string;
    after?: string;
  }>;
  description: string;
  cta: string;
  proof: {
    value: string;
    text: string;
  };
  accent: string;
  accentRgb: string;
  secondaryAccent: string;
  features: Array<{
    label: string;
    Icon: LucideIcon;
  }>;
};

export const serviceCarouselSlides: ServiceCarouselSlide[] = [
  {
    id: "e-commerce-account-management",
    eyebrow: "E-commerce account management",
    routePath: "/services/e-commerce-account-management",
    routeLabel: "Amazon, Flipkart, Meesho, Myntra, JioMart, Ajio, Shopify",
    images: {
      light: "/media/services/carousel/ecommerce-account-management-light.webp?v=clean-20260611",
      dark: "/media/services/carousel/ecommerce-account-management-dark.webp?v=clean-20260611",
    },
    imageAlt: "Ecommerce dashboard scene with shopping cart, boxes, phone storefront, and sales analytics",
    Icon: ShoppingBag,
    headline: [
      { text: "Marketplace operations" },
      { before: "that", accent: "stay ready." },
    ],
    description:
      "Account setup, listing SEO, order flow, inventory, marketplace ads, support queues, and reporting run from one operating system.",
    cta: "Manage your marketplace",
    proof: {
      value: "12+",
      text: "years of commerce execution.",
    },
    accent: "#0f6dff",
    accentRgb: "15 109 255",
    secondaryAccent: "#1f766f",
    features: [
      { label: "Catalog SEO", Icon: Tags },
      { label: "Orders", Icon: Truck },
      { label: "Ads support", Icon: Megaphone },
      { label: "Reporting", Icon: BarChart3 },
    ],
  },
  {
    id: "social-media-management",
    eyebrow: "Social media management",
    routePath: "/services/social-media-management",
    routeLabel: "Calendar, content, reels, community, paid support, analytics",
    images: {
      light: "/media/services/carousel/social-media-management-light.webp?v=clean-20260611",
      dark: "/media/services/carousel/social-media-management-dark.webp?v=clean-20260611",
    },
    imageAlt: "Social media management phone scene with content calendar, engagement chart, reach report, and social icons",
    Icon: Instagram,
    headline: [
      { before: "Content that", accent: "connects." },
      { before: "Communities that", accent: "grow." },
    ],
    description:
      "We plan, create, and optimize content across Instagram, Facebook, and short-form video so your brand stays consistent, engaging, and conversion-ready.",
    cta: "Let's grow your brand",
    proof: {
      value: "150K+",
      text: "engagements generated.",
    },
    accent: "#0f6dff",
    accentRgb: "15 109 255",
    secondaryAccent: "#8b5cf6",
    features: [
      { label: "Content creation", Icon: CalendarDays },
      { label: "Community mgmt", Icon: UsersRound },
      { label: "Reels & shorts", Icon: Smartphone },
      { label: "Reporting", Icon: BarChart3 },
    ],
  },
  {
    id: "website-design",
    eyebrow: "Website design",
    routePath: "/services/website-design",
    routeLabel: "Custom UI, responsive build, SEO structure, speed QA",
    images: {
      light: "/media/services/carousel/website-design-light.webp?v=clean-20260611",
      dark: "/media/services/carousel/website-design-dark.webp?v=clean-20260611",
    },
    imageAlt: "Website design scene with responsive screens, wireframe cards, performance score, and code panel",
    Icon: Globe2,
    headline: [
      { text: "Websites that" },
      { before: "", accent: "work.", after: "beautifully." },
    ],
    description:
      "Fast, conversion-focused websites and landing pages built to improve trust, clarify your offer, and turn traffic into enquiries.",
    cta: "Build your website",
    proof: {
      value: "Modern",
      text: "design. Smooth experience.",
    },
    accent: "#0f6dff",
    accentRgb: "15 109 255",
    secondaryAccent: "#2563eb",
    features: [
      { label: "UI/UX design", Icon: MousePointer2 },
      { label: "Mobile responsive", Icon: Smartphone },
      { label: "SEO friendly", Icon: Search },
      { label: "Fast performance", Icon: Gauge },
    ],
  },
  {
    id: "digital-marketing-services",
    eyebrow: "Digital marketing services",
    routePath: "/services/digital-marketing-services",
    routeLabel: "SEO, Meta Ads, Google Ads, content, email, reporting",
    images: {
      light: "/media/services/carousel/digital-marketing-banner-light.webp",
      dark: "/media/services/carousel/digital-marketing-banner-dark.webp",
    },
    imageAlt: "Digital marketing dashboard banner with laptop analytics, campaign phone, megaphone, social icons, and marketing plan notebook",
    Icon: TrendingUp,
    headline: [
      { text: "Turn clicks into" },
      { accent: "customers." },
    ],
    description:
      "Google Ads, Meta Ads, and SEO campaigns engineered to attract qualified leads, improve ROAS, and scale revenue with transparent reporting.",
    cta: "Book a growth consultation",
    proof: {
      value: "500+",
      text: "brands scaled. Ready for the next one?",
    },
    accent: "#0f6dff",
    accentRgb: "15 109 255",
    secondaryAccent: "#7c3aed",
    features: [
      { label: "Google Ads", Icon: Megaphone },
      { label: "Meta Ads", Icon: Share2 },
      { label: "SEO focused", Icon: Search },
      { label: "ROI tracking", Icon: BarChart3 },
    ],
  },
  {
    id: "e-commerce-photoshoot",
    eyebrow: "E-commerce photoshoot",
    routePath: "/services/e-commerce-photoshoot",
    routeLabel: "White background, lifestyle, detail, infographic, ad assets",
    images: {
      light: "/media/services/carousel/ecommerce-photoshoot-light.webp?v=clean-20260611",
      dark: "/media/services/carousel/ecommerce-photoshoot-dark.webp?v=clean-20260611",
    },
    imageAlt: "Product photoshoot studio with camera, lighting, perfume, product cards, and styling props",
    Icon: Camera,
    headline: [
      { text: "Visuals that" },
      { accent: "sell the story." },
    ],
    description:
      "Editorial campaigns, fashion shoots, and premium product photography crafted to make your brand look unforgettable across web, ads, and social.",
    cta: "Book a shoot",
    proof: {
      value: "4",
      text: "content formats your audience wants to save.",
    },
    accent: "#4f46e5",
    accentRgb: "79 70 229",
    secondaryAccent: "#c99543",
    features: [
      { label: "Product photos", Icon: Camera },
      { label: "Fashion campaigns", Icon: Clapperboard },
      { label: "Model direction", Icon: FileSearch },
      { label: "Creative styling", Icon: Palette },
    ],
  },
];
