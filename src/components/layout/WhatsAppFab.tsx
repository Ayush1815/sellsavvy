import { siteConfig } from "../../config/site";
import { trackEvent } from "../../lib/analytics";

export function WhatsAppFab() {
  if (!siteConfig.whatsapp) return null;

  return (
    <div className="group fixed bottom-5 right-5 z-50 flex items-center gap-3 lg:bottom-8 lg:right-8">
      <div className="pointer-events-none opacity-0 translate-x-3 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-xl hidden sm:block relative">
        How can I help you?
        <div className="absolute -right-2 top-1/2 -mt-2 h-0 w-0 border-y-8 border-l-8 border-y-transparent border-l-white" />
      </div>
      <a
        href={siteConfig.whatsapp}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        onClick={() => trackEvent("cta_click", { label: "whatsapp_fab" })}
        className="flex h-12 w-12 items-center justify-center rounded-full transition hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 shadow-[0_18px_50px_-20px_rgba(37,211,102,0.85)]"
      >
        <img
          src="/media/whatsapp.png"
          alt="WhatsApp"
          loading="lazy"
          className="h-full w-full object-contain"
        />
      </a>
    </div>
  );
}
