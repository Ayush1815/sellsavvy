import { Link } from "react-router-dom";
import { Mail, Phone, Facebook, Instagram } from "lucide-react";
import { siteConfig } from "../../config/site";
import { BrandMark } from "../brand/BrandMark";

export function Footer() {
  return (
    <footer className="bg-slate-950 py-12 sm:py-16 text-white">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4 md:gap-8 text-sm">
          {/* Column 1 - Brand */}
          <div className="space-y-6">
            <BrandMark variant="footer" />
            <p className="max-w-[280px] leading-7 text-slate-300">
              Premium ecommerce account management, performance marketing, storefront development, creative support,
              and reporting for brands ready to grow with more discipline.
            </p>
            <div>
              <p className="mb-4 font-bold text-white">We're on Social:</p>
              <div className="flex gap-3">
                <a 
                  href={siteConfig.facebook} 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1877F2] text-white transition-transform hover:-translate-y-1"
                >
                  <Facebook className="h-5 w-5" fill="currentColor" />
                </a>
                <a 
                  href={siteConfig.instagram} 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white transition-transform hover:-translate-y-1"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a 
                  href="mailto:sellsavvyservices@gmail.com"
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EA4335] text-white transition-transform hover:-translate-y-1"
                  aria-label="Email Us"
                >
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h3 className="mb-6 border-l-2 border-[var(--brand-gold)] pl-3 text-lg font-bold text-white">
              Quick Links
            </h3>
            <div className="flex flex-col space-y-3 text-slate-300">
              <Link to="/" className="w-fit transition hover:text-[var(--brand-gold)]">Home</Link>
              <Link to="/about" className="w-fit transition hover:text-[var(--brand-gold)]">About Us</Link>
              <Link to="/services" className="w-fit transition hover:text-[var(--brand-gold)]">Services</Link>
              <Link to="/faq" className="w-fit transition hover:text-[var(--brand-gold)]">FAQ</Link>
              <Link to="/contact" className="w-fit transition hover:text-[var(--brand-gold)]">Contact Us</Link>
              <Link to="/terms" className="w-fit transition hover:text-[var(--brand-gold)]">Terms & Conditions</Link>
            </div>
          </div>

          {/* Column 3 - Services */}
          <div>
            <h3 className="mb-6 border-l-2 border-[var(--brand-gold)] pl-3 text-lg font-bold text-white">
              Services
            </h3>
            <div className="flex flex-col space-y-3 text-slate-300">
              <Link to="/services/digital-marketing-services" className="w-fit transition hover:text-[var(--brand-gold)]">Digital Marketing Services</Link>
              <Link to="/services/e-commerce-account-management" className="w-fit transition hover:text-[var(--brand-gold)]">E-commerce Account Management</Link>
              <Link to="/services/e-commerce-photoshoot" className="w-fit transition hover:text-[var(--brand-gold)]">E-commerce Photoshoot</Link>
              <Link to="/services/website-design" className="w-fit transition hover:text-[var(--brand-gold)]">Website Design</Link>
              <Link to="/services/social-media-management" className="w-fit transition hover:text-[var(--brand-gold)]">Social Media Management</Link>
            </div>
          </div>

          {/* Column 4 - Contact Details */}
          <div>
            <h3 className="mb-6 border-l-2 border-[var(--brand-gold)] pl-3 text-lg font-bold text-white">
              Contact Details
            </h3>
            <div className="flex flex-col space-y-4 text-slate-300">
              <span className="flex items-start gap-3">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-[var(--brand-gold)]" />
                <span className="leading-relaxed">
                  <a href={`tel:${siteConfig.phone.replace(/\s+/g, '')}`} className="transition hover:text-[var(--brand-gold)]">
                    {siteConfig.phone}
                  </a>
                </span>
              </span>
              <span className="flex items-center gap-3">
                <Mail className="h-5 w-5 shrink-0 text-[var(--brand-gold)]" />
                <a href={`mailto:${siteConfig.email}`} className="transition hover:text-[var(--brand-gold)]">
                  {siteConfig.email}
                </a>
              </span>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col justify-between gap-4 border-t border-white/10 pt-8 text-sm text-slate-400 sm:flex-row">
          <p>© {new Date().getFullYear()} SellSavvy. All rights reserved.</p>
          <p>You sell. We manage. We scale together.</p>
        </div>
      </div>
    </footer>
  );
}
