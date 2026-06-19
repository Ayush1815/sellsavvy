import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

type HeroTheme = "light" | "dark";

function readTheme(): HeroTheme {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function HeroVideoPlaceholder() {
  return (
    <div className="hero-video-placeholder absolute inset-0 flex items-center justify-center" aria-hidden="true">
      <div className="hero-video-placeholder__panel">
        <div className="grid gap-3">
          <div className="h-3 w-24 rounded-full bg-current opacity-25" />
          <div className="grid grid-cols-[0.55fr_1fr] gap-4">
            <div className="grid gap-2">
              <div className="h-14 rounded-2xl bg-current opacity-10" />
              <div className="h-14 rounded-2xl bg-current opacity-10" />
              <div className="h-14 rounded-2xl bg-current opacity-10" />
            </div>
            <div className="rounded-2xl border border-current/10 p-4">
              <div className="mb-5 h-3 w-28 rounded-full bg-current opacity-20" />
              <svg viewBox="0 0 220 88" className="h-24 w-full text-[var(--brand-gold)]" fill="none">
                <path d="M4 72 C34 60 44 44 68 48 C94 52 104 20 128 28 C156 38 170 10 216 14" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
                <path d="M4 72 C34 60 44 44 68 48 C94 52 104 20 128 28 C156 38 170 10 216 14 L216 88 L4 88 Z" fill="currentColor" opacity="0.12" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function HeroVisual() {
  const reducedMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [theme, setTheme] = useState<HeroTheme>(readTheme);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const observer = new MutationObserver(() => setTheme(readTheme()));
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    setTheme(readTheme());
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!videoRef.current || reducedMotion) return;
    videoRef.current.playbackRate = 1.15;
  }, [reducedMotion, theme]);

  const source = theme === "dark" ? "/media/Dark.webm" : "/media/lllll.webm";
  const posterSource = theme === "dark" ? "/media/dark_poster.webp" : "/media/light_poster.webp";

  useEffect(() => {
    setReady(false);
  }, [source]);

  return (
    <div className="hero-media relative select-none">
      <div className="pointer-events-none absolute -inset-10 -z-10 rounded-[3rem] bg-[radial-gradient(circle_at_60%_48%,rgba(207,156,45,0.11),transparent_60%)] dark:bg-[radial-gradient(circle_at_58%_48%,rgba(228,189,96,0.16),transparent_56%)]" />

      <div className="hero-video-frame">
        <HeroVideoPlaceholder />
        {reducedMotion ? (
          <div className="hero-video-fallback" aria-label="Static SellSavvy growth dashboard preview" />
        ) : (
          <div className="hero-video-wrapper">
            <video
              key={source}
              ref={videoRef}
              src={source}
              poster={posterSource}
              className={`hero-video pointer-events-none transition-opacity duration-500 ${ready ? "opacity-100" : "opacity-0"}`}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              onLoadedData={() => setReady(true)}
              onCanPlay={() => {
                setReady(true);
                const playPromise = videoRef.current?.play();
                if (playPromise) void playPromise.catch(() => undefined);
              }}
              aria-label={`${theme === "dark" ? "Dark" : "Light"} theme SellSavvy growth dashboard animation`}
            />
            {ready && (
              <div
                className="absolute z-10 hidden sm:flex flex-col items-center justify-center rounded-2xl border border-slate-200/50 bg-white/80 px-4 py-2 text-[0.7rem] font-bold text-slate-700 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-slate-950/80 dark:text-slate-300 leading-tight text-center whitespace-nowrap"
                style={{
                  top: "84%",
                  left: "88%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                <span>Begin your growth</span>
                <span>with SellSavvy today!</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
