import { Link } from "react-router-dom";
import { motion } from "motion/react";

type BrandMarkProps = {
  animationKey?: string;
  variant?: "header" | "footer";
};

export function BrandMark({ animationKey = "static", variant = "header" }: BrandMarkProps) {
  return (
    <Link
      to="/"
      className={
        variant === "header"
          ? "navbar-brand flex min-h-12 items-center gap-3"
          : "flex items-center gap-3 bg-slate-200 -mx-4 px-4 py-4 sm:mx-0 sm:rounded-xl sm:px-5"
      }
      aria-label="SellSavvy home"
    >
      <motion.span
        key={animationKey}
        className="brand-mark-content flex items-center gap-3"
        initial={{ opacity: 0, y: -7 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="brand-mark-logo-surface flex shrink-0 items-center justify-center">
          <img
            src="/brand/sellsavvy-mark-transparent.webp"
            alt="SellSavvy logo"
            width={52}
            height={42}
            decoding="async"
            className="h-[42px] w-auto shrink-0 select-none object-contain"
          />
        </span>
        <span className="leading-none pt-1">
          <span className="block text-[1.4rem] font-extrabold tracking-tight text-[var(--brand-navy)]">
            SellSavvy
          </span>
          <span className="block mt-0.5 text-[0.62rem] font-semibold uppercase tracking-[0.25em] text-slate-800 max-[430px]:hidden">
            Smart solution for smart sellers
          </span>
        </span>
      </motion.span>
    </Link>
  );
}
