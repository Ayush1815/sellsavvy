import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { trackEvent } from "../../lib/analytics";
import { classNames } from "../../lib/classNames";

type ButtonLinkProps = {
  to: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "dark";
  trackLabel?: string;
};

export function ButtonLink({ to, children, variant = "primary", trackLabel }: ButtonLinkProps) {
  return (
    <motion.div whileTap={{ scale: 0.98 }} whileHover={{ y: -2 }} className="inline-flex">
      <Link
        to={to}
        onClick={() =>
          trackEvent("cta_click", {
            label: trackLabel ?? (typeof children === "string" ? children : to),
            destination: to,
          })
        }
        className={classNames(
          "shine-button group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-3 text-sm font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-gold)] focus-visible:ring-offset-2",
          variant === "primary" &&
            "bg-[var(--brand-gold)] text-[#071122] shadow-[0_16px_34px_-26px_rgba(207,156,45,0.58)] hover:bg-[var(--brand-gold-hover)] hover:shadow-[0_18px_38px_-30px_rgba(185,130,22,0.52)] dark:text-[#071122]",
          variant === "secondary" &&
            "border border-[var(--border-soft)] bg-white/60 text-slate-900 backdrop-blur-xl hover:border-[var(--brand-gold)] hover:bg-white dark:bg-white/8 dark:text-white dark:hover:border-[var(--brand-gold)] dark:hover:bg-white/12",
          variant === "dark" &&
            "bg-slate-950 text-white shadow-[0_18px_50px_-28px_rgba(2,6,23,0.9)] hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100",
        )}
      >
        <span className="relative z-10">{children}</span>
        <ArrowRight className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </Link>
    </motion.div>
  );
}
