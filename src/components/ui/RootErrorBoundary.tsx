import { useEffect, useState } from "react";
import { useRouteError, Link } from "react-router-dom";
import { RefreshCw, Home, AlertTriangle, Sparkles } from "lucide-react";

export function RootErrorBoundary() {
  const error = useRouteError() as any;
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [isRetrying, setIsRetrying] = useState(false);

  // Sync theme with localStorage
  useEffect(() => {
    const savedTheme = window.localStorage.getItem("sellsavvy-theme") as "light" | "dark" | null;
    const activeTheme = savedTheme || "dark";
    setTheme(activeTheme);
    document.documentElement.classList.toggle("dark", activeTheme === "dark");
  }, []);

  // Handle auto-reload on dynamic import failure
  useEffect(() => {
    if (!error) return;

    const errorMessage = error.message || String(error);
    const isChunkError =
      /Failed to fetch dynamically imported module/.test(errorMessage) ||
      /Loading chunk .* failed/.test(errorMessage) ||
      errorMessage.includes("dynamically imported module");

    if (isChunkError) {
      // Check if we already retried recently
      const lastRetry = window.sessionStorage.getItem("sellsavvy-chunk-retry");
      const now = Date.now();

      // If last retry was more than 10 seconds ago, retry automatically
      if (!lastRetry || now - parseInt(lastRetry, 10) > 10000) {
        setIsRetrying(true);
        window.sessionStorage.setItem("sellsavvy-chunk-retry", String(now));
        
        // Brief delay before reload to make it feel deliberate and clear the cache
        const timer = setTimeout(() => {
          window.location.reload();
        }, 800);

        return () => clearTimeout(timer);
      }
    }
  }, [error]);

  const handleManualReload = () => {
    setIsRetrying(true);
    // Force reload bypassing cache if possible
    window.location.reload();
  };

  const errorMessage = error?.message || "An unexpected application error occurred.";

  return (
    <div className={`min-h-screen w-full flex flex-col items-center justify-center bg-[var(--surface-light)] text-slate-900 transition-colors duration-300 dark:bg-[var(--surface-dark)] dark:text-white px-6 py-12 relative overflow-hidden`}>
      {/* Background Gradients */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_16%_12%,rgba(207,156,45,0.08),transparent_35%),radial-gradient(circle_at_88%_18%,rgba(11,37,64,0.06),transparent_35%)] dark:bg-[radial-gradient(circle_at_18%_14%,rgba(228,189,96,0.12),transparent_32%),radial-gradient(circle_at_82%_18%,rgba(28,110,126,0.1),transparent_30%)]" />
      <div className="noise-layer pointer-events-none fixed inset-0 z-[70] opacity-[0.035] mix-blend-multiply dark:mix-blend-screen" />

      <div className="w-full max-w-xl text-center relative z-10 flex flex-col items-center">
        {/* Animated Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border-soft)] bg-white/40 dark:bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-slate-700 shadow-sm backdrop-blur-xl dark:text-[var(--brand-gold-muted)] mb-8">
          <Sparkles className="h-3.5 w-3.5 text-[var(--brand-gold-muted)] dark:text-[var(--brand-gold)]" />
          System Update Recovery
        </div>

        {isRetrying ? (
          <div className="flex flex-col items-center space-y-6">
            {/* Spinning Loader */}
            <div className="relative flex items-center justify-center">
              <div className="h-20 w-20 rounded-full border-2 border-[var(--brand-gold)] border-t-transparent animate-spin" />
              <AlertTriangle className="absolute h-8 w-8 text-[var(--brand-gold)] animate-pulse" />
            </div>
            
            <h1 className="text-3xl font-black tracking-tight mt-6">Updating Application...</h1>
            <p className="text-slate-500 dark:text-slate-400 max-w-md">
              We are fetching the latest updates to SellSavvy. This will only take a moment.
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            {/* Warning Icon */}
            <div className="h-20 w-20 rounded-3xl bg-[var(--brand-gold-soft)] dark:bg-amber-500/10 flex items-center justify-center border border-[var(--brand-gold)]/20 shadow-xl mb-8">
              <AlertTriangle className="h-10 w-10 text-[var(--brand-gold)]" />
            </div>

            <h1 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
              Temporary Loading Error
            </h1>

            <p className="mt-4 text-slate-600 dark:text-slate-300 text-base sm:text-lg max-w-md leading-relaxed">
              We recently updated SellSavvy. The browser was trying to load an older version of some files.
            </p>

            {/* Error Detail Panel */}
            <div className="w-full mt-8 p-5 rounded-2xl border border-[var(--border-soft)] bg-white/40 dark:bg-white/5 backdrop-blur-md text-left text-xs font-mono overflow-auto max-h-40 shadow-inner text-slate-500 dark:text-slate-400 select-all">
              <span className="text-rose-500 font-bold block mb-1">Details:</span>
              {errorMessage}
            </div>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <button
                onClick={handleManualReload}
                className="shine-button group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-[var(--brand-gold)] px-8 py-4 text-sm font-black text-[#071122] shadow-[0_16px_34px_-26px_rgba(207,156,45,0.58)] hover:bg-[var(--brand-gold-hover)] transition cursor-pointer"
              >
                <RefreshCw className="h-4 w-4 transition-transform group-hover:rotate-45" />
                Reload Application
              </button>

              <Link
                to="/"
                className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full border border-[var(--border-soft)] bg-white/94 dark:bg-[#0c1622] px-8 py-4 text-sm font-bold text-slate-900 dark:text-white hover:border-[var(--brand-gold)] hover:bg-white dark:hover:bg-[#111e2e] transition cursor-pointer"
              >
                <Home className="h-4 w-4" />
                Back to Home
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
