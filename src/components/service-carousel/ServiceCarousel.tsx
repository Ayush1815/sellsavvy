import { useCallback, useEffect, useMemo, useState, type CSSProperties } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "motion/react";
import { ArrowLeft, ArrowRight, Film, MoveRight } from "lucide-react";
import { serviceCarouselSlides, type ServiceCarouselSlide } from "../../data/serviceCarousel";
import { classNames } from "../../lib/classNames";

type ServiceCarouselProps = {
  eyebrow?: string;
  title?: string;
  copy?: string;
  className?: string;
};

type SlideCssVars = CSSProperties & {
  "--slide-accent": string;
  "--slide-accent-rgb": string;
  "--slide-secondary-accent": string;
};

const carouselIntervalMs = 3000;
const slideAspectRatio = "5 / 2";
const slideMotion = {
  x: { type: "spring", stiffness: 155, damping: 26, mass: 0.9 },
  opacity: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
  scale: { duration: 0.42, ease: [0.22, 1, 0.36, 1] },
} as const;
const activeSlideVariants: Variants = {
  enter: (slideDirection: number) => ({
    opacity: 0,
    x: slideDirection * 54,
    scale: 0.988,
  }),
  center: {
    opacity: 1,
    x: 0,
    scale: 1,
  },
  exit: (slideDirection: number) => ({
    opacity: 0,
    x: slideDirection * -34,
    scale: 0.992,
  }),
};
const swipeConfidenceThreshold = 14000;

function swipePower(offset: number, velocity: number) {
  return Math.abs(offset) * velocity;
}

export function ServiceCarousel({
  eyebrow = "Services carousel",
  title = "Choose the service route your growth work needs next.",
  copy = "Each route opens into a focused service page, with clear visual systems for operations, marketing, creative production, websites, and social media.",
  className,
}: ServiceCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [held, setHeld] = useState(false);
  const reducedMotion = useReducedMotion();
  const activeSlide = serviceCarouselSlides[activeIndex];
  const previousSlide = serviceCarouselSlides[(activeIndex - 1 + serviceCarouselSlides.length) % serviceCarouselSlides.length];
  const nextSlide = serviceCarouselSlides[(activeIndex + 1) % serviceCarouselSlides.length];

  const slideVars = useMemo<SlideCssVars>(
    () => ({
      "--slide-accent": activeSlide.accent,
      "--slide-accent-rgb": activeSlide.accentRgb,
      "--slide-secondary-accent": activeSlide.secondaryAccent,
    }),
    [activeSlide],
  );

  const goToPrevious = useCallback(() => {
    setDirection(-1);
    setActiveIndex((current) => (current === 0 ? serviceCarouselSlides.length - 1 : current - 1));
  }, []);

  const goToNext = useCallback(() => {
    setDirection(1);
    setActiveIndex((current) => (current + 1) % serviceCarouselSlides.length);
  }, []);

  const goToSlide = useCallback(
    (index: number) => {
      if (index === activeIndex) return;
      setDirection(index > activeIndex ? 1 : -1);
      setActiveIndex(index);
    },
    [activeIndex],
  );

  useEffect(() => {
    if (held || reducedMotion) return;

    const interval = window.setInterval(goToNext, carouselIntervalMs);
    return () => window.clearInterval(interval);
  }, [goToNext, held, reducedMotion]);

  return (
    <section
      id="service-carousel"
      aria-labelledby="service-carousel-heading"
      className={classNames(
        "relative isolate overflow-hidden border-t border-slate-200/80 bg-[var(--surface-light)] py-8 text-slate-950 transition-colors duration-300 dark:border-white/10 dark:bg-[var(--surface-dark)] dark:text-white sm:py-10",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-[linear-gradient(180deg,rgba(15,109,255,0.08),transparent)] dark:bg-[linear-gradient(180deg,rgba(15,109,255,0.1),transparent)]" />
      <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">

        <div
          style={slideVars}
          onPointerEnter={() => setHeld(true)}
          onPointerLeave={() => setHeld(false)}
          onFocus={() => setHeld(true)}
          onBlur={() => setHeld(false)}
          className="relative mx-auto max-w-full [perspective:1800px] [transform-style:preserve-3d]"
        >
          <SidePreview slide={previousSlide} side="left" />
          <SidePreview slide={nextSlide} side="right" />

          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={activeSlide.id}
              custom={direction}
              drag={reducedMotion ? false : "x"}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.14}
              onDragStart={() => setHeld(true)}
              onDragEnd={(_, info) => {
                setHeld(false);
                const swipe = swipePower(info.offset.x, info.velocity.x);
                if (swipe < -swipeConfidenceThreshold) {
                  goToNext();
                } else if (swipe > swipeConfidenceThreshold) {
                  goToPrevious();
                }
              }}
              variants={activeSlideVariants}
              initial={reducedMotion ? false : "enter"}
              animate="center"
              exit={reducedMotion ? undefined : "exit"}
              transition={slideMotion}
              style={{ willChange: "transform, opacity" }}
              className="relative z-20 mx-auto max-w-full cursor-grab rounded-[1.65rem] border border-white/60 bg-white/52 p-1.5 shadow-[0_34px_100px_-62px_rgba(11,37,64,0.82),inset_0_1px_0_rgba(255,255,255,0.82)] backdrop-blur-2xl active:cursor-grabbing dark:border-white/12 dark:bg-white/[0.055] dark:shadow-[0_42px_110px_-64px_rgba(0,0,0,0.92),inset_0_1px_0_rgba(255,255,255,0.12)] sm:p-2"
            >
              <CarouselCard slide={activeSlide} activeIndex={activeIndex} onIndicatorClick={goToSlide} />
            </motion.div>
          </AnimatePresence>

          <CarouselButton direction="previous" onClick={goToPrevious} />
          <CarouselButton direction="next" onClick={goToNext} />
        </div>
      </div>
    </section>
  );
}

function SidePreview({ slide, side }: { slide: ServiceCarouselSlide; side: "left" | "right" }) {
  const previewTransform =
    side === "left"
      ? "translate3d(-9%, 0, -90px) rotateY(-22deg) rotateZ(-2deg) scale(0.88)"
      : "translate3d(9%, 0, -90px) rotateY(22deg) rotateZ(2deg) scale(0.88)";

  return (
    <div
      aria-hidden="true"
      style={{
        aspectRatio: slideAspectRatio,
        transform: previewTransform,
      }}
      className={classNames(
        "pointer-events-none absolute top-7 z-0 hidden w-[58rem] overflow-hidden rounded-[1.35rem] border border-white/24 bg-slate-950 shadow-[0_30px_80px_-48px_rgba(3,7,18,0.72)] opacity-52 blur-[0.2px] lg:block xl:w-[62rem]",
        side === "left" ? "-left-56 origin-right" : "-right-56 origin-left",
      )}
    >
      <ThemedSlideImage slide={slide} className="h-full w-full object-cover object-[58%_center]" decorative />
      <div className="absolute inset-0 bg-white/30 dark:bg-slate-950/22" />
    </div>
  );
}

function CarouselCard({
  slide,
  activeIndex,
  onIndicatorClick,
}: {
  slide: ServiceCarouselSlide;
  activeIndex: number;
  onIndicatorClick: (index: number) => void;
}) {
  const Icon = slide.Icon;

  return (
    <Link
      to={slide.routePath}
      aria-label={`Open ${slide.eyebrow}`}
      className="group relative block rounded-[1.55rem] outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-gold)]"
    >
      <div className="relative min-h-[32rem] overflow-hidden rounded-[1.4rem] border border-slate-950/5 bg-[#f7f9ff] shadow-[inset_0_1px_0_rgba(255,255,255,0.78)] dark:border-white/10 dark:bg-[#071017] sm:min-h-[28rem] sm:rounded-[1.28rem] md:min-h-[30rem] lg:min-h-0 lg:aspect-[5/2]">
        <ThemedSlideImage
          slide={slide}
          className="service-carousel-image absolute inset-0 h-full w-full object-cover object-[right_top] transition-transform duration-700 ease-out group-hover:scale-[1.03] sm:object-[66%_center]"
        />

        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(247,249,255,0.1)_25%,rgba(247,249,255,0.95)_55%,rgba(247,249,255,1)_100%)] dark:bg-[linear-gradient(180deg,transparent_0%,rgba(7,16,23,0.1)_25%,rgba(7,16,23,0.95)_55%,rgba(7,16,23,1)_100%)] sm:hidden" />
        
        <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-[75%] bg-[linear-gradient(90deg,rgba(248,250,247,1)_0%,rgba(248,250,247,0.96)_40%,rgba(248,250,247,0.6)_65%,rgba(248,250,247,0.1)_85%,transparent_100%)] dark:bg-[linear-gradient(90deg,rgba(7,16,23,1)_0%,rgba(7,16,23,0.96)_40%,rgba(7,16,23,0.6)_65%,rgba(7,16,23,0.1)_85%,transparent_100%)] sm:block lg:w-[65%]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-24 bg-[linear-gradient(180deg,transparent,rgba(248,250,247,0.7))] dark:bg-[linear-gradient(180deg,transparent,rgba(7,16,23,0.7))] sm:block" />

        <div className="absolute inset-0 z-10 flex w-full flex-col justify-end p-5 pb-14 sm:justify-center sm:p-8 sm:pb-12 md:p-10 md:pb-14 lg:p-12 lg:pb-16">
          <div className="grid w-full gap-2.5 sm:max-w-[26rem] sm:gap-2 md:max-w-[30rem] lg:max-w-[34rem]">
            <p className="inline-flex max-w-max items-center gap-2 rounded-full border border-slate-950/10 bg-white/90 px-3 py-1.5 text-[0.6rem] font-black uppercase tracking-[0.15em] text-slate-900 shadow-[0_14px_40px_-34px_rgba(11,37,64,0.72)] backdrop-blur-xl dark:border-white/16 dark:bg-[#0f1722]/90 dark:text-white/90 sm:px-3 sm:text-[0.62rem]">
              <Icon className="h-3.5 w-3.5 text-[var(--slide-accent)]" strokeWidth={2} />
              <span className="truncate">{slide.eyebrow}</span>
            </p>

            <h3 className="text-balance text-[1.6rem] font-black uppercase leading-[0.98] tracking-tight text-slate-950 dark:text-white min-[430px]:text-[1.8rem] sm:text-[1.9rem] md:text-[2.2rem] lg:text-[2.6rem] xl:text-[2.8rem]">
              {slide.headline.map((part, index) => (
                <span key={`${slide.id}-${index}`} className="block">
                  {part.text}
                  {part.before ? `${part.before} ` : ""}
                  {part.accent && <span className="text-[var(--slide-accent)]">{part.accent}</span>}
                  {part.after ? ` ${part.after}` : ""}
                </span>
              ))}
            </h3>

            <p className="max-w-[28rem] text-[0.8rem] font-medium leading-[1.4] text-slate-700 dark:text-slate-300 sm:text-[0.8rem] sm:font-semibold sm:leading-[1.4] md:text-[0.9rem] md:leading-6 lg:max-w-[30rem]">
              {slide.description}
            </p>

            <div className="mt-1 grid w-full grid-cols-2 gap-2 sm:mt-1.5 sm:max-w-[29rem] md:mt-2 md:grid-cols-4 lg:mt-3">
              {slide.features.map((feature, idx) => (
                <span
                  key={feature.label}
                  className={classNames(
                    "flex min-h-[2.8rem] items-center justify-center gap-1.5 rounded-[0.68rem] border border-slate-950/10 bg-white/90 px-2 py-1.5 text-center text-[0.55rem] font-black uppercase leading-3 tracking-[0.02em] text-slate-800 shadow-[0_14px_40px_-34px_rgba(11,37,64,0.62),inset_0_1px_0_rgba(255,255,255,0.72)] backdrop-blur-xl transition-[transform,border-color] duration-300 group-hover:-translate-y-0.5 group-hover:border-[var(--slide-accent)] dark:border-white/10 dark:bg-[#0f1722]/80 dark:text-slate-200 sm:min-h-[3.15rem] sm:flex-col sm:text-[0.56rem] lg:min-h-[3.35rem] lg:text-[0.59rem]",
                    idx >= 2 ? "hidden md:flex" : "flex"
                  )}
                >
                  <feature.Icon className="h-3.5 w-3.5 shrink-0 text-[var(--slide-accent)] sm:mb-1 sm:h-4 sm:w-4" strokeWidth={2} />
                  <span>{feature.label}</span>
                </span>
              ))}
            </div>

            <div className="mt-2 flex flex-wrap items-center gap-3 sm:mt-2 md:mt-3 lg:gap-4">
              <span className="inline-flex min-h-11 w-full items-center justify-center gap-3 rounded-[0.7rem] bg-[#0f6dff] px-4 py-2 text-[0.75rem] font-black uppercase tracking-[0.02em] text-white shadow-[0_18px_48px_-25px_rgba(15,109,255,0.82),inset_0_1px_0_rgba(255,255,255,0.28)] transition-[transform,background-color] duration-300 group-hover:-translate-y-0.5 group-hover:bg-[#075be0] dark:shadow-[0_0_32px_-16px_rgba(15,109,255,0.9),inset_0_1px_0_rgba(255,255,255,0.22)] sm:w-auto sm:min-h-10 sm:min-w-[12rem] sm:text-[0.75rem] md:min-h-11 md:min-w-[13.5rem] md:text-[0.8rem]">
                {slide.cta}
                <MoveRight className="h-4 w-4 shrink-0" strokeWidth={2.2} />
              </span>
              <div className="hidden min-w-0 items-center gap-2 sm:flex">
                <AvatarStack />
                <p className="min-w-0 max-w-[12rem] text-[0.7rem] font-semibold leading-tight text-slate-700 dark:text-white/74 lg:text-[0.76rem]">
                  <span className="block font-black text-slate-950 dark:text-white">{slide.proof.value}</span> {slide.proof.text}
                </p>
              </div>
            </div>
          </div>
        </div>

        <SlideIndicators activeIndex={activeIndex} onIndicatorClick={onIndicatorClick} />
      </div>
    </Link>
  );
}

function ThemedSlideImage({
  slide,
  className,
  decorative = false,
}: {
  slide: ServiceCarouselSlide;
  className?: string;
  decorative?: boolean;
}) {
  return (
    <>
      <img
        src={slide.images.light}
        alt={decorative ? "" : slide.imageAlt}
        aria-hidden={decorative ? "true" : undefined}
        className={classNames(className, "dark:hidden")}
        loading="eager"
      />
      <img
        src={slide.images.dark}
        alt=""
        aria-hidden="true"
        className={classNames(className, "hidden dark:block")}
        loading="eager"
      />
    </>
  );
}

function AvatarStack() {
  const avatars = [
    { label: "A", background: "linear-gradient(135deg, #f2b8a0, #8d4f3f)" },
    { label: "R", background: "linear-gradient(135deg, #d7e8ff, #315f72)" },
    { label: "M", background: "linear-gradient(135deg, #f8d6b4, #9b5f4d)" },
  ];

  return (
    <div className="flex -space-x-2">
      {avatars.map((avatar) => (
        <span
          key={avatar.label}
          style={{ background: avatar.background }}
          className="grid h-10 w-10 place-items-center rounded-full border-2 border-white text-xs font-black text-white shadow-[0_12px_26px_-18px_rgba(3,7,18,0.72)] dark:border-[#070d16]"
        >
          {avatar.label}
        </span>
      ))}
    </div>
  );
}

function SlideIndicators({
  activeIndex,
  onIndicatorClick,
}: {
  activeIndex: number;
  onIndicatorClick: (index: number) => void;
}) {
  return (
    <div className="absolute inset-x-0 bottom-5 z-20 flex justify-center gap-2">
      {serviceCarouselSlides.map((slide, index) => (
        <button
          key={slide.id}
          type="button"
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            onIndicatorClick(index);
          }}
          aria-label={`Show ${slide.eyebrow}`}
          aria-current={index === activeIndex ? "true" : undefined}
          className={classNames(
            "h-2.5 rounded-full transition-[width,background-color,box-shadow] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-gold)]",
            index === activeIndex
              ? "w-8 bg-[var(--slide-accent)] shadow-[0_0_18px_-6px_rgb(var(--slide-accent-rgb)/0.9)]"
              : "w-2.5 bg-slate-300/90 hover:bg-slate-400 dark:bg-white/26 dark:hover:bg-white/44",
          )}
        />
      ))}
    </div>
  );
}

function CarouselButton({ direction, onClick }: { direction: "previous" | "next"; onClick: () => void }) {
  const Icon = direction === "previous" ? ArrowLeft : ArrowRight;

  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.94 }}
      onClick={onClick}
      aria-label={direction === "previous" ? "Show previous service" : "Show next service"}
      className={classNames(
        "absolute top-1/2 z-30 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-slate-950/10 bg-white/78 text-[#0f6dff] shadow-[0_18px_42px_-28px_rgba(0,0,0,0.62)] backdrop-blur-md transition-colors duration-300 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-gold)] dark:border-white/16 dark:bg-white/8 dark:text-[#5d8dff] dark:hover:bg-white/12 md:grid sm:h-[3.25rem] sm:w-[3.25rem]",
        direction === "previous" ? "left-3 sm:left-4 lg:-left-4" : "right-3 sm:right-4 lg:-right-4",
      )}
    >
      <Icon className="h-5 w-5" strokeWidth={2.3} />
    </motion.button>
  );
}
