import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

export function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  start,
  duration = 1200,
  delay = 0,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  start?: boolean;
  duration?: number;
  delay?: number;
}) {
  const [display, setDisplay] = useState(0);
  const [hasPlayed, setHasPlayed] = useState(false);
  const reducedMotion = useReducedMotion();
  const shouldPlay = start ?? hasPlayed;

  useEffect(() => {
    if (!shouldPlay) return;
    if (reducedMotion) {
      setDisplay(value);
      return;
    }

    let frameId = 0;
    let timeoutId = 0;
    let startTime = 0;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(value * eased);
      if (progress < 1) frameId = window.requestAnimationFrame(animate);
    };

    setDisplay(0);
    timeoutId = window.setTimeout(() => {
      frameId = window.requestAnimationFrame(animate);
    }, delay);

    return () => {
      window.clearTimeout(timeoutId);
      window.cancelAnimationFrame(frameId);
    };
  }, [delay, duration, reducedMotion, shouldPlay, value]);

  return (
    <motion.span
      viewport={start === undefined ? { once: true } : undefined}
      onViewportEnter={start === undefined ? () => setHasPlayed(true) : undefined}
      className="tabular-nums"
    >
      {prefix}
      {display.toFixed(decimals)}
      {suffix}
    </motion.span>
  );
}
