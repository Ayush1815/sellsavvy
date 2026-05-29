type AnalyticsProps = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: AnalyticsProps }) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

const PLAUSIBLE_DOMAIN = import.meta.env.VITE_PLAUSIBLE_DOMAIN as string | undefined;
const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;

function sendToApi(event: string, props?: AnalyticsProps) {
  const body = JSON.stringify({
    event,
    props,
    path: window.location.pathname,
    ts: new Date().toISOString(),
  });

  if (navigator.sendBeacon) {
    navigator.sendBeacon("/api/analytics", new Blob([body], { type: "application/json" }));
    return;
  }

  fetch("/api/analytics", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true,
  }).catch(() => undefined);
}

export function trackEvent(event: string, props?: AnalyticsProps) {
  if (import.meta.env.DEV) {
    console.debug("[analytics]", event, props);
  }

  sendToApi(event, props);

  if (PLAUSIBLE_DOMAIN && window.plausible) {
    window.plausible(event, props ? { props } : undefined);
  }

  if (GA_ID && window.gtag) {
    window.gtag("event", event, props);
  }
}

export function trackPageView(path: string, title?: string) {
  trackEvent("page_view", { path, title: title ?? document.title });

  if (GA_ID && window.gtag) {
    window.gtag("config", GA_ID, { page_path: path, page_title: title });
  }
}

export function initAnalyticsScripts() {
  if (typeof document === "undefined") return;

  if (PLAUSIBLE_DOMAIN && !document.querySelector("[data-plausible]")) {
    const script = document.createElement("script");
    script.defer = true;
    script.dataset.domain = PLAUSIBLE_DOMAIN;
    script.dataset.plausible = "true";
    script.src = "https://plausible.io/js/script.js";
    document.head.appendChild(script);
  }

  if (GA_ID && !document.querySelector("[data-ga]")) {
    const loader = document.createElement("script");
    loader.async = true;
    loader.dataset.ga = "true";
    loader.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(loader);

    const inline = document.createElement("script");
    inline.dataset.ga = "true";
    inline.textContent = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GA_ID}', { send_page_view: false });
    `;
    document.head.appendChild(inline);
  }
}
