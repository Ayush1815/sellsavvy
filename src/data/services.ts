import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  Camera,
  Instagram,
  Layers,
  Monitor,
  Search,
  ShieldCheck,
  ShoppingBag,
  TrendingUp,
} from "lucide-react";

export type Service = {
  title: string;
  description: string;
  bullets: string[];
  Icon: LucideIcon;
  span: string;
};

export const services: Service[] = [
  {
    title: "Ecommerce account management",
    description:
      "Daily marketplace operations for brands that need clean listings, consistent inventory, and sharper execution.",
    bullets: ["Catalog hygiene", "Listing optimization", "Inventory and issue tracking"],
    Icon: ShoppingBag,
    span: "lg:col-span-5",
  },
  {
    title: "Performance marketing",
    description:
      "Practical ad management across marketplaces, Meta, and Google with clear margin guardrails.",
    bullets: ["Campaign structure", "ROAS tracking", "Budget and bid reviews"],
    Icon: TrendingUp,
    span: "lg:col-span-7",
  },
  {
    title: "Website design and development",
    description:
      "Fast, conversion-focused Shopify, WooCommerce, and custom storefronts built around the buying journey.",
    bullets: ["Storefront UX", "Speed improvements", "Checkout refinement"],
    Icon: Monitor,
    span: "lg:col-span-7",
  },
  {
    title: "Landing pages and funnels",
    description:
      "Campaign-specific pages that keep offers clear, reduce drop-offs, and make testing easier.",
    bullets: ["Offer pages", "Lead funnels", "A/B test planning"],
    Icon: Layers,
    span: "lg:col-span-5",
  },
  {
    title: "Social media management",
    description:
      "A steady content system for product education, trust, launches, and retargeting support.",
    bullets: ["Content calendars", "Post design", "Brand messaging"],
    Icon: Instagram,
    span: "lg:col-span-4",
  },
  {
    title: "SEO optimization",
    description:
      "Keyword-led improvements for marketplace listings, product pages, and evergreen site traffic.",
    bullets: ["Keyword mapping", "On-page fixes", "Search visibility"],
    Icon: Search,
    span: "lg:col-span-4",
  },
  {
    title: "Analytics and reporting",
    description:
      "Readable weekly and monthly reporting that connects sales, spend, catalog health, and next actions.",
    bullets: ["Dashboards", "Weekly notes", "Decision summaries"],
    Icon: BarChart3,
    span: "lg:col-span-4",
  },
  {
    title: "Product creatives and photoshoots",
    description:
      "Sharper product visuals for ads, listings, storefronts, and social proof without overcomplicating the process.",
    bullets: ["Product shoots", "Listing creatives", "Ad variants"],
    Icon: Camera,
    span: "lg:col-span-6",
  },
  {
    title: "Growth support and ongoing management",
    description:
      "A retained operating partner for brands that need consistent execution, testing, and accountability.",
    bullets: ["Monthly planning", "Issue follow-up", "Scale roadmaps"],
    Icon: ShieldCheck,
    span: "lg:col-span-6",
  },
];

export const featuredServiceIndices = [0, 1, 2];
