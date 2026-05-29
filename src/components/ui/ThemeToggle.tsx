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
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
      <path d="M20.2 14.4A7.5 7.5 0 0 1 9.6 3.8a8.8 8.8 0 1 0 10.6 10.6Z" fill="currentColor" />
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
        "group relative inline-flex items-center rounded-full border border-[var(--border-soft)] bg-white/70 p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.75),0_12px_30px_-18px_rgba(15,23,42,0.65)] backdrop-blur-xl transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface-light)] dark:bg-white/8 dark:focus-visible:ring-offset-[var(--surface-dark)]",
        compact ? "h-10 w-16" : "h-11 w-[5.4rem]",
      )}
    >
      <span
        className={classNames(
          "absolute text-[var(--brand-gold-muted)] transition-opacity group-hover:opacity-100 dark:text-[var(--brand-gold)]",
          compact ? "left-2" : "left-3",
        )}
      >
        <SunGlyph />
      </span>
      <span
        className={classNames(
          "absolute text-slate-200 transition-opacity group-hover:opacity-100",
          compact ? "right-2" : "right-3",
        )}
      >
        <MoonGlyph />
      </span>
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 520, damping: 34 }}
        className={classNames(
          "relative z-10 flex items-center justify-center rounded-full shadow-lg",
          compact ? "h-8 w-8" : "h-9 w-9",
          isDark
            ? compact
              ? "translate-x-6 bg-[#101923] text-[#d8e1ec]"
              : "translate-x-[2.65rem] bg-[#101923] text-[#d8e1ec]"
            : "translate-x-0 bg-[var(--brand-gold-soft)] text-[var(--brand-gold-muted)]",
        )}
      >
        {isDark ? <MoonGlyph /> : <SunGlyph />}
      </motion.span>
    </button>
  );
}
