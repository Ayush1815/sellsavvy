import { Compass, LayoutDashboard, Search, Sliders, TrendingUp } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type GrowthStep = {
  title: string;
  text: string;
  Icon: LucideIcon;
};

export const growthSteps: GrowthStep[] = [
  {
    title: "Audit",
    text: "We inspect catalog quality, ads, storefront speed, reporting, and operational leaks.",
    Icon: Search,
  },
  {
    title: "Strategy",
    text: "You get a custom plan with priorities, budget guidance, and measurable next steps.",
    Icon: Compass,
  },
  {
    title: "Execute",
    text: "Our team handles the practical work: listings, campaigns, creatives, pages, and reporting.",
    Icon: Sliders,
  },
  {
    title: "Report",
    text: "You see what changed, what moved, and what we recommend next in plain language.",
    Icon: LayoutDashboard,
  },
  {
    title: "Scale",
    text: "We compound what works across marketplace, D2C, paid media, and retention channels.",
    Icon: TrendingUp,
  },
];
