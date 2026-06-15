export const siteConfig = {
  name: "SellSavvy",
  tagline: "Smart solution for smart sellers",
  url: import.meta.env.VITE_SITE_URL ?? "https://sellsavvy.com",
  email: import.meta.env.VITE_CONTACT_EMAIL ?? "sellsavvyservices@gmail.com",
  phone: "+91 79850 07920",
  whatsapp: "https://wa.me/917985007920",
  instagram: "https://www.instagram.com/_sellsavvy_?igsh=NmlpMnd0eWhzYmVi",
  facebook: "https://www.facebook.com/share/p/17W4t7v1pD/",
  calendlyUrl: import.meta.env.VITE_CALENDLY_URL ?? "",
  responseTime: "Within 1 business day",
} as const;
