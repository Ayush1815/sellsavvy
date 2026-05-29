import { useSeo } from "../hooks/useSeo";
import { ButtonLink } from "../components/ui/ButtonLink";

export default function NotFoundPage() {
  useSeo({
    title: "Page not found | SellSavvy",
    description: "The page you requested could not be found.",
    noindex: true,
  });

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 pt-24 text-center">
      <p className="text-xs font-bold uppercase tracking-[0.28em] text-[var(--brand-gold-muted)] dark:text-[var(--brand-gold)]">404</p>
      <h1 className="mt-4 text-4xl font-black text-slate-950 dark:text-white">This page is not in our catalog.</h1>
      <p className="mt-4 max-w-md text-slate-600 dark:text-slate-300">
        The link may be outdated. Explore services or book a growth audit and we will point you in the right direction.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <ButtonLink to="/">Back to home</ButtonLink>
        <ButtonLink to="/services" variant="secondary">
          View services
        </ButtonLink>
        <ButtonLink to="/contact" variant="secondary">
          Contact us
        </ButtonLink>
      </div>
    </div>
  );
}
