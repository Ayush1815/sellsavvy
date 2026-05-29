export type ChannelLander = {
  slug: string;
  platform: string;
  title: string;
  description: string;
  bullets: string[];
  relatedCaseSlug: string;
};

export const channelLanders: ChannelLander[] = [
  {
    slug: "amazon-growth",
    platform: "Amazon",
    title: "Amazon growth management for brands that need cleaner listings and sharper ads.",
    description:
      "We manage catalog hygiene, listing optimization, campaign structure, and weekly reporting so Amazon revenue moves with margin discipline.",
    bullets: [
      "Listing and keyword rebuilds",
      "Campaign tiering and budget guardrails",
      "Inventory and catalog issue tracking",
    ],
    relatedCaseSlug: "peakform-gear",
  },
  {
    slug: "flipkart-growth",
    platform: "Flipkart",
    title: "Flipkart account operations built for visibility, conversion, and fewer returns.",
    description:
      "SellSavvy handles listing quality, promotional planning, and performance reviews for brands selling on Flipkart.",
    bullets: [
      "Catalog and content improvements",
      "Promo and pricing coordination",
      "Weekly performance summaries",
    ],
    relatedCaseSlug: "northloom-home",
  },
  {
    slug: "shopify-growth",
    platform: "Shopify",
    title: "Shopify growth: storefront speed, conversion, and paid traffic that lands with intent.",
    description:
      "From product page rewrites to Meta and Google campaigns, we align your Shopify store with measurable D2C outcomes.",
    bullets: [
      "Storefront UX and speed fixes",
      "Landing page and funnel builds",
      "ROAS-focused paid media",
    ],
    relatedCaseSlug: "mira-skin-studio",
  },
];

export function getChannelLander(slug: string) {
  return channelLanders.find((item) => item.slug === slug);
}
