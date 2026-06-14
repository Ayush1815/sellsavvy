import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Check } from "lucide-react";
import { classNames } from "../../lib/classNames";

interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  className?: string;
}

export function CustomSelect({ value, onChange, options, className }: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
      document.addEventListener("keydown", handleEscape);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  return (
    <div className="relative w-full" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={classNames(
          "flex items-center justify-between text-left transition-all duration-200",
          className,
          isOpen ? "border-[var(--brand-gold)] ring-4 ring-amber-500/15" : ""
        )}
      >
        <span className="block truncate">{value || "Select an option"}</span>
        <ChevronDown
          className={classNames(
            "h-4 w-4 shrink-0 transition-transform duration-200",
            isOpen ? "rotate-180" : "text-slate-400 dark:text-slate-500"
          )}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
            className="absolute z-50 mt-2 w-full overflow-hidden rounded-2xl border border-slate-200 bg-white p-1.5 shadow-xl dark:border-white/12 dark:bg-slate-900 dark:backdrop-blur-xl"
          >
            {options.map((option) => {
              const isSelected = option === value;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    onChange(option);
                    setIsOpen(false);
                  }}
                  className={classNames(
                    "flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold transition-colors",
                    isSelected
                      ? "bg-[var(--brand-gold)]/10 text-[var(--brand-gold)]"
                      : "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/10"
                  )}
                >
                  {option}
                  {isSelected && <Check className="h-4 w-4 shrink-0" />}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
