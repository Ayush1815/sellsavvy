import { motion } from "motion/react";

export function DashboardCard() {
  return (
    <motion.div
      animate={{ y: [-6, 6, -6] }}
      transition={{
        repeat: Infinity,
        duration: 6,
        ease: "easeInOut",
      }}
      className="w-[28rem] sm:w-[32rem] md:w-[34rem] rounded-3xl border border-white/60 bg-white/65 p-6 text-slate-800 shadow-[0_24px_60px_-15px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.7)] backdrop-blur-2xl transition-all duration-300 dark:border-white/10 dark:bg-[#09111e]/70 dark:text-slate-200 dark:shadow-[0_30px_70px_-15px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.05)]"
    >
      {/* Dashboard Header */}
      <div className="flex items-center justify-between border-b border-slate-200/50 pb-4 mb-5 dark:border-white/10">
        <div className="flex items-center gap-2">
          {/* Custom logo mark */}
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--brand-gold-muted)] to-[var(--brand-gold)] text-white shadow-md">
            <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="font-extrabold text-[0.95rem] tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent dark:from-white dark:to-slate-300">
            SellSavvy
          </span>
        </div>
        {/* Date Selector Pill */}
        <div className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-white/70 px-3 py-1.5 text-[0.72rem] font-bold text-slate-600 transition shadow-xs hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10">
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          This Month
          <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>

      {/* Row 1: KPI Cards */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        {/* KPI: Gross Sales */}
        <div className="rounded-2xl border border-slate-100 bg-white/80 p-4 shadow-xs dark:border-white/5 dark:bg-[#121c2f]/50">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-[0.7rem] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Gross Sales
            </span>
            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="1" x2="12" y2="23" />
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </div>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white">
              ₹12.4L
            </span>
            <span className="inline-flex items-center text-[0.68rem] font-bold text-emerald-600 dark:text-emerald-400">
              <svg viewBox="0 0 24 24" className="h-3 w-3 mr-0.5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="18 15 12 9 6 15" />
              </svg>
              {/* Light Mode displays 8.7%, Dark Mode displays 12.5% */}
              <span className="block dark:hidden">8.7%</span>
              <span className="hidden dark:block">12.5%</span>
            </span>
          </div>
          <div className="flex items-center justify-between mt-1">
            <span className="text-[0.68rem] font-semibold text-slate-400 dark:text-slate-500">
              2.46K units
            </span>
            {/* Tiny Sparkline */}
            <svg className="w-14 h-6" viewBox="0 0 60 24" fill="none">
              <defs>
                <linearGradient id="blueSparkGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.22" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0,18 C10,16 15,10 25,12 C35,14 42,4 60,2" stroke="#3b82f6" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M0,18 C10,16 15,10 25,12 C35,14 42,4 60,2 L60,24 L0,24 Z" fill="url(#blueSparkGrad)" />
            </svg>
          </div>
        </div>

        {/* KPI: Orders */}
        <div className="rounded-2xl border border-slate-100 bg-white/80 p-4 shadow-xs dark:border-white/5 dark:bg-[#121c2f]/50">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-[0.7rem] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Orders
            </span>
            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
            </div>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white">
              1.32K
            </span>
            <span className="inline-flex items-center text-[0.68rem] font-bold text-emerald-600 dark:text-emerald-400">
              <svg viewBox="0 0 24 24" className="h-3 w-3 mr-0.5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="18 15 12 9 6 15" />
              </svg>
              {/* Light Mode displays 7.3%, Dark Mode displays 8.4% */}
              <span className="block dark:hidden">7.3%</span>
              <span className="hidden dark:block">8.4%</span>
            </span>
          </div>
          <div className="flex items-center justify-between mt-1">
            <span className="text-[0.68rem] font-semibold text-slate-400 dark:text-slate-500">
              vs last month
            </span>
            {/* Tiny Bar Chart */}
            <div className="flex items-end gap-0.5 h-6">
              {[6, 12, 18, 14, 10, 16, 22, 19].map((height, i) => (
                <div
                  key={i}
                  className="w-1 rounded-xs bg-indigo-500/78 dark:bg-indigo-400"
                  style={{ height: `${height}px` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Row 2: Charts and Top Channel */}
      <div className="grid grid-cols-5 gap-4">
        {/* Left Card: Sales Growth Line Chart (3/5 columns) */}
        <div className="col-span-3 rounded-2xl border border-slate-100 bg-white/80 p-4 shadow-xs dark:border-white/5 dark:bg-[#121c2f]/50">
          <span className="text-[0.7rem] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Sales Growth
          </span>
          <div className="relative mt-2.5 h-[5.2rem] w-full">
            {/* SVG Chart */}
            <svg className="w-full h-full" viewBox="0 0 160 64" fill="none">
              <defs>
                <linearGradient id="lineChartGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.18" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                </linearGradient>
              </defs>
              {/* Grid Lines */}
              <line x1="0" y1="12" x2="160" y2="12" stroke="currentColor" strokeWidth="0.8" className="text-slate-200/50 dark:text-white/5" />
              <line x1="0" y1="36" x2="160" y2="36" stroke="currentColor" strokeWidth="0.8" className="text-slate-200/50 dark:text-white/5" />
              {/* The Line */}
              <path
                d="M5,50 C28,45 42,32 64,28 C86,24 100,14 124,12 C142,10 148,6 155,5"
                stroke="url(#chartLineStroke)"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
              <path
                d="M5,50 C28,45 42,32 64,28 C86,24 100,14 124,12 C142,10 148,6 155,5 L155,60 L5,60 Z"
                fill="url(#lineChartGrad)"
              />
              {/* Interactive Dot */}
              <circle cx="124" cy="12" r="3.5" fill="#3b82f6" className="shadow-md dark:fill-[var(--brand-gold)]" />
              <circle cx="124" cy="12" r="6" stroke="#3b82f6" strokeWidth="1.5" strokeOpacity="0.4" className="dark:stroke-[var(--brand-gold)]" />
              
              <defs>
                <linearGradient id="chartLineStroke" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          {/* Months Labels */}
          <div className="flex justify-between items-center text-[0.62rem] font-bold text-slate-400 dark:text-slate-500 mt-2 px-1">
            <span>Jan</span>
            <span>Feb</span>
            <span>Mar</span>
            <span>Apr</span>
            <span>May</span>
            <span>Jun</span>
          </div>
        </div>

        {/* Right Card: Top Channel (2/5 columns) */}
        <div className="col-span-2 rounded-2xl border border-slate-100 bg-white/80 p-4 flex flex-col justify-between shadow-xs dark:border-white/5 dark:bg-[#121c2f]/50">
          <div>
            <span className="text-[0.7rem] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Top Channel
            </span>
            <div className="flex items-center gap-2 mt-3">
              {/* Shopify Bag */}
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-[#96bf48] to-[#609928] text-white shadow-xs">
                <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="currentColor">
                  <path d="M19 6h-2c0-2.76-2.24-5-5-5S7 3.24 7 6H5c-1.1 0-2 .9-2 2v11c0 1.66 1.34 3 3 3h12c1.66 0 3-1.34 3-3V8c0-1.1-.9-2-2-2zm-7-3c1.66 0 3 1.34 3 3H9c0-1.66 1.34-3 3-3zm7 16c0 .55-.45 1-1 1H6c-.55 0-1-.45-1-1V8h14v11z" />
                </svg>
              </div>
              <span className="text-[0.78rem] font-extrabold tracking-tight text-slate-800 dark:text-slate-100">
                Shopify
              </span>
            </div>
          </div>
          
          <div className="mt-2.5">
            <div className="flex justify-between items-center text-[0.68rem] font-extrabold text-slate-700 dark:text-slate-200 mb-1.5">
              <span>48%</span>
              <span className="text-[0.62rem] font-semibold text-slate-400 dark:text-slate-500">
                of total sales
              </span>
            </div>
            {/* Progress Bar */}
            <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden dark:bg-white/5">
              <div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-emerald-400" style={{ width: "48%" }} />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
