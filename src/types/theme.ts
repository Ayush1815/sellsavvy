export type Theme = "light" | "dark";

export function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "dark";
  const stored = window.localStorage.getItem("sellsavvy-theme");
  if (stored === "light" || stored === "dark") return stored;
  return "dark";
}
