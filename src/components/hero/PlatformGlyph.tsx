import { BarChart3, LayoutDashboard } from "lucide-react";

export function PlatformGlyph({ name }: { name: string }) {
  if (name === "Meta Ads") {
    return (
      <svg viewBox="0 0 36 24" aria-hidden="true" className="h-6 w-9">
        <path
          d="M3 16c3.2-8 6.4-12 10-12 3.4 0 5.1 5.6 8.5 9.8C23.8 16.7 26 18 28 18c2.8 0 4.8-2.2 5-5.4"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M33 16C29.8 8 26.6 4 23 4c-3.4 0-5.1 5.6-8.5 9.8C12.2 16.7 10 18 8 18c-2.8 0-4.8-2.2-5-5.4"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (name === "Analytics" || name === "Reporting") {
    return name === "Analytics" ? <BarChart3 className="h-6 w-6" /> : <LayoutDashboard className="h-6 w-6" />;
  }

  const letter =
    name === "Amazon"
      ? "a"
      : name === "Flipkart"
        ? "F"
        : name === "Shopify"
          ? "S"
          : name === "WooCommerce"
            ? "W"
            : "M";

  return (
    <svg viewBox="0 0 34 34" aria-hidden="true" className="h-7 w-7">
      <rect x="3" y="3" width="28" height="28" rx="9" fill="currentColor" opacity="0.14" />
      <path d="M10 23.5c4 2.5 10 2.5 14 0" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <text
        x="17"
        y="20.5"
        textAnchor="middle"
        fontSize="13"
        fontWeight="800"
        fontFamily="Outfit, sans-serif"
        fill="currentColor"
      >
        {letter}
      </text>
    </svg>
  );
}
