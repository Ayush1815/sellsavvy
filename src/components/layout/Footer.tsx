import { Link } from "react-router-dom";
import { Globe, Mail, Phone } from "lucide-react";
import { siteConfig } from "../../config/site";
import { BrandMark } from "../brand/BrandMark";
import { navItems } from "../../data/navItems";

export function Footer() {
  return (
    <footer className="border-t border-[var(--border-soft)] bg-[var(--surface-light-elevated)] py-14 dark:bg-[var(--surface-dark)]">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr_0.8fr]">
          <div>
            <BrandMark variant="footer" />
            <p className="mt-5 max-w-md text-sm leading-7 text-slate-600 dark:text-slate-300">
              Premium ecommerce account management, performance marketing, storefront development, creative support,
              and reporting for brands ready to grow with more discipline.
            </p>
            <p className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
              Smart solution for smart sellers
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 text-sm">
            <div>
              <p className="font-black text-slate-950 dark:text-white">Navigate</p>
              <div className="mt-4 grid gap-2 text-slate-600 dark:text-slate-300">
                {navItems.map((item) => (
                  <Link key={item.path} to={item.path} className="transition hover:text-[var(--brand-gold-muted)] dark:hover:text-[var(--brand-gold)]">
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <p className="font-black text-slate-950 dark:text-white">Legal</p>
              <div className="mt-4 grid gap-2 text-slate-600 dark:text-slate-300">
                <Link to="/privacy" className="transition hover:text-[var(--brand-gold-muted)] dark:hover:text-[var(--brand-gold)]">
                  Privacy policy
                </Link>
                <Link to="/terms" className="transition hover:text-[var(--brand-gold-muted)] dark:hover:text-[var(--brand-gold)]">
                  Terms of service
                </Link>
                <Link to="/contact" className="transition hover:text-[var(--brand-gold-muted)] dark:hover:text-[var(--brand-gold)]">
                  Service standards
                </Link>
              </div>
            </div>
          </div>
          <div>
            <p className="font-black text-slate-950 dark:text-white">Contact</p>
            <div className="mt-4 grid gap-3 text-sm text-slate-600 dark:text-slate-300">
              <span className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-[var(--brand-gold-muted)] dark:text-[var(--brand-gold)]" />
                <a href={`mailto:${siteConfig.email}`} className="hover:text-[var(--brand-gold-muted)] dark:hover:text-[var(--brand-gold)]">
                  {siteConfig.email}
                </a>
              </span>
              <span className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-[var(--brand-gold-muted)] dark:text-[var(--brand-gold)]" /> {siteConfig.phone}
              </span>
              <span className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-[var(--brand-gold-muted)] dark:text-[var(--brand-gold)]" /> Remote ecommerce support
              </span>
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-col justify-between gap-4 border-t border-slate-200 pt-6 text-xs text-slate-500 dark:border-white/10 dark:text-slate-400 sm:flex-row">
          <p>(c) 2026 SellSavvy. All rights reserved.</p>
          <p>You sell. We manage. We scale together.</p>
        </div>
      </div>
    </footer>
  );
}
