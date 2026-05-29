export type CaseCategory = "all" | "marketplace" | "d2c";

export type CaseStudy = {
  slug: string;
  brand: string;
  category: "marketplace" | "d2c";
  channel: string;
  result: string;
  metric: string;
  challenge: string;
  action: string;
  summary: string;
};

export function getCaseStudyBySlug(slug: string) {
  return caseStudies.find((item) => item.slug === slug);
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "trove-and-table",
    brand: "Trove & Table",
    summary:
      "Marketplace revenue grew 128% after listing rebuilds, catalog cleanup, and weekly ad reviews on Amazon and Flipkart.",
    category: "marketplace",
    channel: "Amazon and Flipkart",
    result: "+128%",
    metric: "monthly marketplace revenue",
    challenge:
      "Listings were buried under weak keywords, inconsistent images, and uneven stock planning.",
    action:
      "We rebuilt priority listings, cleaned catalog issues, refreshed creatives, and set weekly ad reviews.",
  },
  {
    slug: "mira-skin-studio",
    brand: "Mira Skin Studio",
    summary:
      "D2C ROAS reached 3.9x through landing page redesign, offer tightening, and clearer Meta campaign structure.",
    category: "d2c",
    channel: "Shopify and Meta Ads",
    result: "3.9x",
    metric: "blended ROAS",
    challenge:
      "Paid traffic was landing on slow pages with unclear product education and weak retargeting.",
    action:
      "We redesigned the landing flow, tightened the offer, rebuilt campaigns, and added reporting clarity.",
  },
  {
    slug: "northloom-home",
    brand: "Northloom Home",
    summary:
      "Return pressure dropped 41% after clearer product visuals and catalog detail improvements on Meesho and Flipkart.",
    category: "marketplace",
    channel: "Meesho and Flipkart",
    result: "41%",
    metric: "lower return pressure",
    challenge:
      "Product expectations were mismatched because imagery and catalog details did not answer buyer doubts.",
    action:
      "We created clearer product visuals, updated size and care information, and improved account response routines.",
  },
  {
    slug: "peakform-gear",
    brand: "PeakForm Gear",
    summary:
      "Amazon ad efficiency improved 4.4x by restructuring campaigns around proven converting terms and margin guardrails.",
    category: "marketplace",
    channel: "Amazon marketplace",
    result: "4.4x",
    metric: "ad efficiency",
    challenge:
      "The brand had profitable products but campaigns mixed awareness, discovery, and conversion budgets.",
    action:
      "We rebuilt campaign tiers, moved budget into proven terms, and tracked weekly margin movement.",
  },
  {
    slug: "casa-verde-living",
    brand: "Casa Verde Living",
    summary:
      "Checkout completion rose 72% after mobile journey simplification and tighter Google landing pages.",
    category: "d2c",
    channel: "WooCommerce and Google",
    result: "+72%",
    metric: "checkout completion",
    challenge:
      "Traffic quality was improving, but mobile checkout and product comparison pages created friction.",
    action:
      "We simplified the mobile journey, rewrote product pages, and connected paid search to tighter landing pages.",
  },
];

export const spotlightCaseIndex = 0;
