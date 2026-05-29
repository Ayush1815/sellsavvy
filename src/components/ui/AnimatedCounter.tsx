import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

export function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}) {
  const [display, setDisplay] = useState(0);
  const [hasPlayed, setHasPlayed] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!hasPlayed) return;
    if (reducedMotion) {
      setDisplay(value);
      return;
    }

    let frame = 0;
    const totalFrames = 46;
    const animate = () => {
      frame += 1;
      const progress = Math.min(frame / totalFrames, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(value * eased);
      if (progress < 1) window.requestAnimationFrame(animate);
    };

    const id = window.requestAnimationFrame(animate);
    return () => window.cancelAnimationFrame(id);
  }, [hasPlayed, reducedMotion, value]);

  return (
    <motion.span
      viewport={{ once: true }}
      onViewportEnter={() => setHasPlayed(true)}
      className="tabular-nums"
    >
      {prefix}
      {display.toFixed(decimals)}
      {suffix}
    </motion.span>
  );
}
