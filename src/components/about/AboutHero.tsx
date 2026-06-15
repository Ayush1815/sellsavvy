import { Reveal } from "../ui/Reveal";

export function AboutHero() {
  return (
    <section className="relative overflow-hidden pt-24 pb-12 sm:pt-36 sm:pb-24 border-b border-[var(--border-soft)]">
      <div className="absolute inset-x-0 top-0 -z-10 h-[500px] bg-[radial-gradient(circle_at_50%_0%,rgba(207,156,45,0.08),transparent_60%)] dark:bg-[radial-gradient(circle_at_50%_0%,rgba(228,189,96,0.1),transparent_60%)]" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid gap-8 sm:gap-12 lg:grid-cols-12 lg:gap-16 items-center">
          {/* Left Column: Mission copy */}
          <div className="lg:col-span-7">
            <Reveal>
              <p className="text-xs font-bold uppercase tracking-[0.26em] text-[var(--brand-gold-muted)] dark:text-[var(--brand-gold)] mb-4">
                Our Mission & Vision
              </p>
              <h1 className="text-balance text-4xl font-black leading-[1.1] tracking-tight text-slate-950 sm:text-5xl lg:text-6xl dark:text-white">
                Transforming Ecommerce for the Better
              </h1>
              <p className="mt-6 text-base leading-8 text-slate-600 sm:text-lg dark:text-slate-300">
                Most ecommerce brands struggle with execution. They hire agencies that operate like black boxes—focusing on vanity metrics instead of actual business growth. 
              </p>
              <p className="mt-4 text-base leading-8 text-slate-600 sm:text-lg dark:text-slate-300">
                At SellSavvy, we've built a unified system that bridges the gap between storefront development, performance marketing, and creative support. We operate with absolute transparency, serving as the outsourced operations engine for your digital storefront.
              </p>
            </Reveal>
          </div>

          {/* Right Column: Visual support image */}
          <div className="lg:col-span-5">
            <Reveal delay={0.2} className="relative aspect-square w-full max-w-[420px] mx-auto lg:max-w-none">
              <div className="absolute inset-0 bg-gradient-to-tr from-[var(--brand-gold-muted)]/15 to-transparent rounded-[2rem] -z-10 blur-xl" />
              <img 
                src="/media/about/hero.png" 
                alt="Sleek glassmorphic strategic ecommerce growth arrow" 
                className="w-full h-full object-cover rounded-[2rem] border border-[var(--border-soft)] shadow-2xl"
              />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
