import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import type { Theme } from "../../types/theme";
import { navItems } from "../../data/navItems";
import { classNames } from "../../lib/classNames";
import { BrandMark } from "../brand/BrandMark";
import { ThemeToggle } from "../ui/ThemeToggle";

type HeaderProps = {
  theme: Theme;
  onToggleTheme: () => void;
};

export function Header({ theme, onToggleTheme }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav
        className="mx-auto flex h-[5.8rem] max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:h-[5.55rem] lg:px-8"
        aria-label="Main navigation"
      >
        <BrandMark animationKey={theme} />
        <div className="nav-link-pill hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              prefetch="intent"
              className={({ isActive }) =>
                classNames(
                  "rounded-full px-4 py-2 text-[0.92rem] font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-gold)]",
                  isActive
                    ? "nav-link-active"
                    : "nav-link-idle",
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          <Link
            to="/contact"
            prefetch="intent"
            className="nav-audit-button relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-2.5 text-sm font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-gold)]"
          >
            Book audit
          </Link>
        </div>
        <div className="flex items-center gap-2 lg:hidden">
          <span className="hidden min-[520px]:inline-flex">
            <ThemeToggle compact theme={theme} onToggle={onToggleTheme} />
          </span>
          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border-soft)] bg-white/70 text-slate-950 backdrop-blur-xl transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-gold)] dark:bg-white/8 dark:text-white"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="mx-4 rounded-[1.5rem] border border-[var(--border-soft)] bg-[rgba(248,250,247,0.94)] px-4 py-4 shadow-[0_24px_60px_-34px_rgba(11,37,64,0.55)] backdrop-blur-xl dark:bg-[rgba(7,16,23,0.94)] lg:hidden"
          >
            <div className="mx-auto grid max-w-7xl gap-2">
              <div className="mb-2 flex items-center justify-between rounded-2xl border border-slate-200 bg-white/70 px-4 py-3 dark:border-white/10 dark:bg-white/7">
                <span className="text-sm font-bold text-slate-700 dark:text-slate-200">Theme</span>
                <ThemeToggle compact theme={theme} onToggle={onToggleTheme} />
              </div>
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-2xl px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-white dark:text-slate-200 dark:hover:bg-white/8"
                >
                  {item.label}
                </NavLink>
              ))}
              <Link
                to="/contact"
                onClick={() => setMobileOpen(false)}
                className="mt-2 rounded-2xl bg-[var(--brand-gold)] px-4 py-3 text-center text-sm font-black text-[#071122] hover:bg-[var(--brand-gold-hover)]"
              >
                Book Free Growth Audit
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
