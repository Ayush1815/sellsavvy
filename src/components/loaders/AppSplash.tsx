import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { siteConfig } from "../../config/site";

const STORAGE_KEY = "sellsavvy-splash-seen";

export function AppSplash({ onDone }: { onDone: () => void }) {
  const reducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (reducedMotion || sessionStorage.getItem(STORAGE_KEY) === "1") {
      onDone();
      return;
    }

    const timer = window.setTimeout(() => {
      sessionStorage.setItem(STORAGE_KEY, "1");
      setVisible(false);
      window.setTimeout(onDone, 420);
    }, 1600);

    return () => window.clearTimeout(timer);
  }, [onDone, reducedMotion]);

  if (!visible && reducedMotion) return null;
  if (!visible) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[var(--surface-light)] dark:bg-[#03080d]"
      initial={{ opacity: 1 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.45 }}
      aria-hidden="true"
    >
      <motion.div 
        className="loader-brand-card flex flex-col items-center gap-5 text-center"
        animate={{ scale: visible ? 1 : 0.85, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.img
          src="/brand/sellsavvy-mark-transparent.webp"
          alt="SellSavvy Logo"
          width={160}
          height={128}
          decoding="async"
          className="loader-logo drop-shadow-xl"
          initial={reducedMotion ? false : { scale: 0.6, opacity: 0 }}
          animate={{ scale: visible ? [0.6, 1.15, 0.95, 1] : 0.9, opacity: visible ? 1 : 0 }}
          transition={{ duration: 0.85, ease: "easeOut", times: [0, 0.4, 0.7, 1] }}
        />
        <div>
          <p className="text-xl font-black tracking-tight text-[var(--brand-navy)]">
            Sell<span className="text-[var(--brand-gold)]">Savvy</span>
          </p>
          <p className="mt-2 text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-slate-500">
            {siteConfig.tagline}
          </p>
        </div>
        <div className="h-1 w-32 overflow-hidden rounded-full bg-slate-200">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-[var(--brand-gold-hover)] via-[var(--brand-gold)] to-[var(--brand-gold-hover)]"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.35, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
