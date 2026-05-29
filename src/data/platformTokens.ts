export type PlatformToken = {
  name: string;
  tone: string;
};

export const platformTokens: PlatformToken[] = [
  { name: "Amazon", tone: "from-[#202b3a] to-[#f5a623]" },
  { name: "Flipkart", tone: "from-[#1e55a6] to-[#f8d24b]" },
  { name: "Shopify", tone: "from-[#1f7a46] to-[#a7d46f]" },
  { name: "WooCommerce", tone: "from-[#5444a7] to-[#8c7cf0]" },
  { name: "Meesho", tone: "from-[#8c2a52] to-[#f08ab5]" },
  { name: "Meta Ads", tone: "from-[#0f5fb8] to-[#65b4ff]" },
  { name: "Analytics", tone: "from-[#2d6257] to-[#70d8bd]" },
  { name: "Reporting", tone: "from-[#473426] to-[#d6a95f]" },
];
