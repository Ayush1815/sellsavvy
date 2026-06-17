import { useCallback, useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { Theme } from "../types/theme";
import { getInitialTheme } from "../types/theme";
import { Footer } from "../components/layout/Footer";
import { Header } from "../components/layout/Header";
import { ScrollToTop } from "../components/layout/ScrollToTop";
import { AppSplash } from "../components/loaders/AppSplash";
import { OrganizationJsonLd } from "../components/seo/SiteJsonLd";
import { initAnalyticsScripts, trackPageView } from "../lib/analytics";
import { WhatsAppFab } from "../components/layout/WhatsAppFab";

export function AppShell() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const [splashDone, setSplashDone] = useState(false);
  const location = useLocation();
  const reducedMotion = useReducedMotion();

  const finishSplash = useCallback(() => setSplashDone(true), []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.style.colorScheme = theme;
    window.localStorage.setItem("sellsavvy-theme", theme);
  }, [theme]);

  useEffect(() => {
    initAnalyticsScripts();
  }, []);

  useEffect(() => {
    if (!splashDone) return;
    trackPageView(location.pathname, document.title);
  }, [location.pathname, splashDone]);

  return (
    <div className="min-h-screen bg-[var(--surface-light)] text-slate-950 antialiased transition-colors duration-300 dark:bg-[var(--surface-dark)] dark:text-white">
      <OrganizationJsonLd />
      {!splashDone && <AppSplash onDone={finishSplash} />}
      <ScrollToTop />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-slate-950 focus:ring-2 focus:ring-[var(--brand-gold)]"
      >
        Skip to content
      </a>
      <div className="noise-overlay" />
      <Header theme={theme} onToggleTheme={() => setTheme(theme === "dark" ? "light" : "dark")} />
      <div className={splashDone ? undefined : "invisible"}>
        <main id="main" tabIndex={-1} className="outline-none">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={location.pathname}
              initial={reducedMotion ? false : { opacity: 0, y: 12, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={reducedMotion ? undefined : { opacity: 0, y: -10, filter: "blur(6px)" }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
        <Footer />
        <WhatsAppFab />
      </div>
    </div>
  );
}
