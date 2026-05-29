export const siteConfig = {
  name: "SellSavvy",
  tagline: "Smart solution for smart sellers",
  url: import.meta.env.VITE_SITE_URL ?? "https://sellsavvy.com",
  email: import.meta.env.VITE_CONTACT_EMAIL ?? "growth@sellsavvy.com",
  phone: import.meta.env.VITE_CONTACT_PHONE ?? "+91 79850 07920",
  whatsapp: import.meta.env.VITE_WHATSAPP_URL ?? "",
  calendlyUrl: import.meta.env.VITE_CALENDLY_URL ?? "",
  responseTime: "Within 1 business day",
} as const;
