import { motion } from "motion/react";
import type { Theme } from "../../types/theme";
import { classNames } from "../../lib/classNames";

function SunGlyph() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
      <circle cx="12" cy="12" r="4" fill="currentColor" />
      <path
        d="M12 2.5v2.2M12 19.3v2.2M4.7 4.7l1.6 1.6M17.7 17.7l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.7 19.3l1.6-1.6M17.7 6.3l1.6-1.6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MoonGlyph() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" style={{ transform: "rotate(75deg)" }}>
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="currentColor" />
    </svg>
  );
}

export function ThemeToggle({
  theme,
  onToggle,
  compact = false,
}: {
  theme: Theme;
  onToggle: () => void;
  compact?: boolean;
}) {
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={classNames(
        "group relative flex items-center justify-center rounded-full border border-[var(--border-soft)] bg-white/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.75),0_12px_30px_-18px_rgba(15,23,42,0.65)] backdrop-blur-xl transition hover:scale-[1.04] active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-gold)] dark:bg-white/8 text-[var(--brand-navy)] hover:text-[var(--brand-gold-muted)] dark:text-[#d8e1ec] dark:hover:text-[var(--brand-gold)]",
        compact ? "h-[2.4rem] w-[2.4rem]" : "h-11 w-11"
      )}
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <motion.div
          initial={false}
          animate={{ opacity: isDark ? 0 : 1, rotate: isDark ? -90 : 0, scale: isDark ? 0.3 : 1 }}
          transition={{ duration: 0.4 }}
          className="absolute"
        >
          <SunGlyph />
        </motion.div>
        <motion.div
          initial={false}
          animate={{ opacity: isDark ? 1 : 0, rotate: isDark ? 0 : 90, scale: isDark ? 1 : 0.3 }}
          transition={{ duration: 0.4 }}
          className="absolute"
        >
          <MoonGlyph />
        </motion.div>
      </motion.div>
    </button>
  );
}
