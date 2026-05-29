import { Html, useProgress } from "@react-three/drei";
import { useReducedMotion } from "motion/react";

export function HeroSceneLoader() {
  const { progress } = useProgress();
  const reducedMotion = useReducedMotion();
  const value = reducedMotion ? 100 : Math.round(progress);

  return (
    <Html center>
      <div className="flex w-44 flex-col items-center gap-3 rounded-2xl border border-white/10 bg-black/50 px-4 py-3 backdrop-blur-xl">
        <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-[var(--brand-gold)]">Loading scene</p>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[var(--brand-gold-hover)] via-[var(--brand-gold)] to-[var(--brand-gold-hover)] transition-all duration-300"
            style={{ width: `${value}%` }}
          />
        </div>
        <p className="text-xs font-bold tabular-nums text-white/70">{value}%</p>
      </div>
    </Html>
  );
}
