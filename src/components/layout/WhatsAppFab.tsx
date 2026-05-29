import { MessageCircle } from "lucide-react";
import { siteConfig } from "../../config/site";
import { trackEvent } from "../../lib/analytics";

export function WhatsAppFab() {
  if (!siteConfig.whatsapp) return null;

  return (
    <a
      href={siteConfig.whatsapp}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      onClick={() => trackEvent("cta_click", { label: "whatsapp_fab" })}
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_18px_50px_-20px_rgba(37,211,102,0.85)] transition hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface-dark)] lg:bottom-8 lg:right-8"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}
