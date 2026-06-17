import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Reveal, SectionHeader } from "../ui/Reveal";
import { classNames } from "../../lib/classNames";

const capabilitiesData = {
  solution: {
    title: "Solution",
    text: "We specialize in delivering smart, result-driven solutions tailored to your ecommerce needs. From strategic planning to execution, we help brands build a strong digital presence, streamline operations, and achieve measurable growth.",
  },
  advantages: {
    title: "Advantages",
    text: "Our team focuses on understanding your goals and turning them into impactful results through innovative approaches, deep platform expertise, and reliable service. We prioritize long-term equity over short-term spikes.",
  },
};

export function Capabilities() {
  const [activeTab, setActiveTab] = useState<"solution" | "advantages">("solution");

  return (
    <section className="relative overflow-hidden py-16 sm:py-24 border-b border-[var(--border-soft)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:gap-12 lg:grid-cols-12 lg:gap-16 items-center">
          {/* Left Column: Text & Tabs */}
          <div className="lg:col-span-7">
            <SectionHeader 
              eyebrow="Our Capabilities"
              title="Expertise tailored for ecommerce scale."
              text="At SellSavvy, our capabilities are built on a strong foundation of expertise, innovation, and a results-driven approach. We specialize in delivering comprehensive solutions tailored to meet the unique needs of every brand we work with."
              align="left"
            />
            
            <Reveal delay={0.1}>
              <div className="mt-8 relative rounded-2xl border border-[var(--border-soft)] bg-[var(--surface-light-elevated)] p-6 dark:bg-white/5 shadow-sm">
                <div className="flex flex-wrap sm:flex-nowrap gap-2 rounded-xl bg-slate-200/50 p-1 dark:bg-slate-800/50 mb-6">
                {(["solution", "advantages"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={classNames(
                      "relative flex-1 rounded-lg py-2 text-sm font-bold transition-colors focus:outline-none",
                      activeTab === tab
                        ? "text-slate-950 dark:text-white"
                        : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                    )}
                  >
                    {activeTab === tab && (
                      <motion.div
                        layoutId="capabilities-tab"
                        className="absolute inset-0 rounded-lg bg-white shadow-sm dark:bg-white/10"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <span className="relative z-10 capitalize">{tab}</span>
                  </button>
                ))}
              </div>

              <div className="relative min-h-[100px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="text-base leading-relaxed text-slate-700 dark:text-slate-300">
                      {capabilitiesData[activeTab].text}
                    </p>
                  </motion.div>
                </AnimatePresence>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Image Visual */}
          <div className="lg:col-span-5">
            <Reveal delay={0.2} className="relative aspect-square w-full max-w-[420px] mx-auto lg:max-w-none">
              <div className="absolute inset-0 bg-gradient-to-tr from-[var(--brand-gold-muted)]/15 to-transparent rounded-[2rem] -z-10 blur-xl" />
              <img 
                src="/media/about/capabilities_workflow.png" 
                alt="Business workflow diagram on a glass whiteboard showing Discovery, Conversion, and Advocacy" 
                className="w-full h-full object-cover rounded-[2rem] border border-[var(--border-soft)] shadow-2xl"
              />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
