import { useEffect, useRef } from "react";

type PlatformConfig = {
  name: string;
  icon: React.ReactNode;
  bgLight: string;
  bgDark: string;
  borderLight: string;
  borderDark: string;
};

// 6 Custom High-Fidelity Brand SVGs
const PLATFORMS: PlatformConfig[] = [
  {
    name: "Amazon",
    bgLight: "bg-white",
    bgDark: "bg-[#0d1627]/90",
    borderLight: "border-slate-200/60 shadow-[0_8px_20px_rgba(0,0,0,0.06)]",
    borderDark: "border-white/10 shadow-[0_12px_28px_rgba(0,0,0,0.4)]",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6.5 w-6.5 text-[#111] dark:text-white" fill="none">
        {/* Amazon Lowercase 'a' */}
        <path d="M12 14c-1.5 0-2.5-.5-2.5-1.5s1-1.5 2.5-1.5c1.5 0 2 .5 2 1.5v1.5h-2Z" fill="currentColor" />
        <path d="M12.5 7.5c-3 0-5 1.5-5 4s2 4 4.5 4c1 0 2-.5 2.5-1v1c0 .8-.5 1-1.5 1-.8 0-1.5-.2-2-.5l-.5 1.5c.8.3 1.8.5 2.8.5 2.2 0 3.2-1 3.2-3V9.5c0-1.5-1-2-4-2ZM14 11.5c0-.8-.5-1-1.5-1s-1.5.2-1.5.8.5.8 1.5.8 1.5-.2 1.5-.6Z" fill="currentColor" />
        {/* Smile Curved Arrow */}
        <path d="M5 18.5c4 2.2 9.5 2.2 13.5 0" stroke="#f5a623" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M17 17.5c.8.4 1.3.8 1.7 1.2-.4.4-.8.8-1.2 1.5" stroke="#f5a623" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: "Flipkart",
    bgLight: "bg-white",
    bgDark: "bg-[#0d1627]/90",
    borderLight: "border-slate-200/60 shadow-[0_8px_20px_rgba(0,0,0,0.06)]",
    borderDark: "border-white/10 shadow-[0_12px_28px_rgba(0,0,0,0.4)]",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6.5 w-6.5" fill="none">
        {/* Shopping bag body */}
        <path d="M19 8H5c-1.1 0-2 .9-2 2v9c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-9c0-1.1-.9-2-2-2Z" fill="#2874f0" />
        {/* Bag handle */}
        <path d="M8 8V6c0-2.2 1.8-4 4-4s4 1.8 4 4v2" stroke="#ffe11b" strokeWidth="2.2" strokeLinecap="round" />
        {/* Yellow star symbol on Flipkart bag */}
        <path d="M12 11l.7 1.8h1.8l-1.4 1.1.5 1.8-1.6-1.1-1.6 1.1.5-1.8-1.4-1.1h1.8z" fill="#ffe11b" />
      </svg>
    ),
  },
  {
    name: "Meta Ads",
    bgLight: "bg-white",
    bgDark: "bg-[#0d1627]/90",
    borderLight: "border-slate-200/60 shadow-[0_8px_20px_rgba(0,0,0,0.06)]",
    borderDark: "border-white/10 shadow-[0_12px_28px_rgba(0,0,0,0.4)]",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6.5 w-6.5" fill="none">
        <path d="M16.4 7.5C14.2 7.5 12.5 9 12 10.2c-.5-1.2-2.2-2.7-4.4-2.7C4.5 7.5 2 9.7 2 12.5s2.5 5 5.6 5c2.2 0 3.9-1.5 4.4-2.7.5 1.2 2.2 2.7 4.4 2.7 3.1 0 5.6-2.2 5.6-5s-2.5-5-5.6-5Zm0 8.2c-1.8 0-3.1-1.3-3.6-2.3a4.2 4.2 0 0 1 0-1.8c.5-1 1.8-2.3 3.6-2.3 1.8 0 3.6 1.3 3.6 3.2s-1.8 3.2-3.6 3.2ZM7.6 15.7c-1.8 0-3.6-1.3-3.6-3.2s1.8-3.2 3.6-3.2c1.8 0 3.1 1.3 3.6 2.3a4.2 4.2 0 0 1 0 1.8c-.5 1-1.8 2.3-3.6 2.3Z" fill="#0064e0" />
      </svg>
    ),
  },
  {
    name: "Analytics",
    bgLight: "bg-white",
    bgDark: "bg-[#0d1627]/90",
    borderLight: "border-slate-200/60 shadow-[0_8px_20px_rgba(0,0,0,0.06)]",
    borderDark: "border-white/10 shadow-[0_12px_28px_rgba(0,0,0,0.4)]",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" stroke="#10b981" />
        <line x1="12" y1="20" x2="12" y2="4" stroke="#3b82f6" />
        <line x1="6" y1="20" x2="6" y2="14" stroke="#f59e0b" />
      </svg>
    ),
  },
  {
    name: "Meesho",
    bgLight: "bg-white",
    bgDark: "bg-[#0d1627]/90",
    borderLight: "border-slate-200/60 shadow-[0_8px_20px_rgba(0,0,0,0.06)]",
    borderDark: "border-white/10 shadow-[0_12px_28px_rgba(0,0,0,0.4)]",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6.5 w-6.5" fill="none">
        <rect width="24" height="24" rx="6" fill="#ff1b83" />
        {/* Meesho Stylized Lowercase 'm' */}
        <path d="M6 16.5V9.5c0-.8.6-1.5 1.5-1.5h.5c.8 0 1.4.5 1.6 1.2c.2-.7.8-1.2 1.6-1.2h.5c.9 0 1.6.7 1.6 1.6v6.9" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: "Myntra",
    bgLight: "bg-white",
    bgDark: "bg-[#0d1627]/90",
    borderLight: "border-slate-200/60 shadow-[0_8px_20px_rgba(0,0,0,0.06)]",
    borderDark: "border-white/10 shadow-[0_12px_28px_rgba(0,0,0,0.4)]",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6.5 w-6.5" fill="none">
        {/* Modern 3D overlapping M gradient */}
        <path d="M4 17V7l5 5 5-5v10" stroke="url(#myntraGrad)" strokeWidth="3.8" strokeLinecap="round" strokeLinejoin="round" />
        <defs>
          <linearGradient id="myntraGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff3f6c" />
            <stop offset="50%" stopColor="#f7a01d" />
            <stop offset="100%" stopColor="#c015b6" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
];

export function PlatformOrbit() {
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let angle = 0;
    const radiusX = 240; // horizontal span
    const radiusY = 78;  // vertical tilt span
    let frameId: number;

    const tick = () => {
      // Rotate by 0.32 degrees per frame (very slow, smooth motion)
      angle = (angle + 0.32) % 360;
      const rad = (angle * Math.PI) / 180;

      iconRefs.current.forEach((el, index) => {
        if (!el) return;
        
        // Stagger angles equally: 360 / 6 = 60 degrees apart
        const theta = rad + (index * Math.PI * 2) / 6;
        
        const x = Math.cos(theta) * radiusX;
        const y = Math.sin(theta) * radiusY;
        const z = Math.sin(theta); // depth coordinate from -1 to 1

        // High-end layered scaling & opacity transition
        const scale = 0.84 + (z + 1) * 0.08; // scale varies between 0.84 and 1.0
        const opacity = 0.52 + (z + 1) * 0.24; // opacity varies between 0.52 and 1.0
        
        // Exact Z-Sorting layer: 5 if behind the dashboard card, 25 if in front
        const zIndex = z < 0 ? 5 : 25;

        // Apply hardware-accelerated style changes directly to DOM nodes
        el.style.transform = `translate3d(calc(${x}px - 50%), calc(${y}px - 50%), 0) scale(${scale})`;
        el.style.opacity = `${opacity}`;
        el.style.zIndex = `${zIndex}`;
      });

      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
      {/* Tilted Orbit Line Path - Behind the Dashboard, matches coordinates perfectly */}
      <svg className="absolute w-[480px] h-[156px] pointer-events-none opacity-30 dark:opacity-20" viewBox="0 0 480 156">
        <ellipse 
          cx="240" 
          cy="78" 
          rx="240" 
          ry="78" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="1.5" 
          strokeDasharray="5 6" 
          className="text-slate-400 dark:text-[var(--brand-gold)]" 
        />
      </svg>

      {/* Orbiting Platform Cards */}
      {PLATFORMS.map((platform, index) => (
        <div
          key={platform.name}
          ref={(node) => {
            iconRefs.current[index] = node;
          }}
          className={`absolute left-1/2 top-1/2 flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl border transition-all duration-300 pointer-events-auto select-none ${platform.bgLight} ${platform.borderLight} dark:${platform.bgDark} dark:${platform.borderDark}`}
          style={{ willChange: "transform, opacity" }}
          title={platform.name}
        >
          {platform.icon}
        </div>
      ))}
    </div>
  );
}
