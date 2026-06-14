import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // Give the DOM time to render the new page before scrolling
      const id = hash.slice(1);
      const attempt = (tries: number) => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        } else if (tries > 0) {
          setTimeout(() => attempt(tries - 1), 100);
        }
      };
      setTimeout(() => attempt(10), 80);
    } else {
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({ top: 0, left: 0, behavior: reducedMotion ? "auto" : "smooth" });
      document.getElementById("main")?.focus({ preventScroll: true });
    }
  }, [pathname, hash]);

  return null;
}
