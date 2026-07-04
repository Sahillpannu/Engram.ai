"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { howItWorks } from "@/content/copy";
import { EASE, MonoLabel, SectionShell, SectionIntro } from "./ui";
import HowItWorksVisual from "./HowItWorksVisual";

export default function HowItWorks() {
  const desktopStepsRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [mobileOpenIndex, setMobileOpenIndex] = useState(0);

  const totalSteps = howItWorks.steps.length;
  const scrollStepCount = Math.max(totalSteps - 1, 1);
  const { scrollYProgress } = useScroll({
    target: desktopStepsRef,
    offset: ["start 22%", "end 78%"],
  });
  const lineProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const nextIndex = Math.max(
      0,
      Math.min(totalSteps - 1, Math.round(value * scrollStepCount))
    );

    setActiveIndex((current) => (current === nextIndex ? current : nextIndex));
  });

  return (
    <SectionShell id="how-it-works" className="py-[160px]">
      <SectionIntro
        eyebrow={howItWorks.eyebrow}
        headline={howItWorks.headline}
        subtext={howItWorks.subtext}
      />

      <div className="mt-16 hidden grid-cols-[1.2fr_0.8fr] gap-20 lg:grid">
        <div className="relative">
          <div className="sticky top-[120px] h-[600px]">
            <HowItWorksVisual activeIndex={activeIndex} />
          </div>
        </div>

        <div ref={desktopStepsRef} className="relative pl-14">
          <div className="absolute bottom-[calc(42.5vh-1px)] left-1 top-[calc(42.5vh-1px)] w-px bg-white/10" />
          <motion.div
            className="absolute left-1 top-[calc(42.5vh-1px)] w-px origin-top bg-accent"
            style={{
              scaleY: lineProgress,
              height: `calc(${Math.max(totalSteps - 1, 1)} * 85vh)`,
            }}
          />

          {howItWorks.steps.map((step, index) => {
            const isActive = activeIndex === index;

            return (
              <div key={step.number} className="flex min-h-[85vh] items-center">
                <div className="relative max-w-md">
                  <motion.span
                    className="absolute -left-[58px] top-2 h-2.5 w-2.5 rounded-full border"
                    animate={{
                      backgroundColor: isActive ? "var(--accent)" : "rgba(0,0,0,0)",
                      borderColor: isActive ? "var(--accent)" : "rgba(255,255,255,0.2)",
                      scale: isActive ? 1 : 0.92,
                    }}
                    transition={{ duration: 0.6, ease: EASE }}
                  />
                  <MonoLabel className={isActive ? "text-accent" : "text-white/40"}>
                    {step.number}
                  </MonoLabel>
                  <h3
                    className={`mt-3 text-4xl font-normal tracking-tight transition-colors duration-500 ${
                      isActive ? "text-white" : "text-white/40"
                    }`}
                  >
                    {step.title}
                  </h3>
                  <p
                    className={`mt-4 text-[17px] leading-relaxed transition-colors duration-500 ${
                      isActive ? "text-white/85" : "text-white/45"
                    }`}
                  >
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-12 space-y-4 lg:hidden">
        {howItWorks.steps.map((step, index) => {
          const isOpen = mobileOpenIndex === index;

          return (
            <div
              key={step.number}
              className="overflow-hidden rounded-[24px] border border-white/10 bg-card/60 px-5 py-4"
            >
              <button
                type="button"
                onClick={() => setMobileOpenIndex(index)}
                className="flex w-full items-center justify-between gap-4 text-left"
                aria-expanded={isOpen}
                aria-controls={`how-it-works-mobile-panel-${step.number}`}
              >
                <div>
                  <MonoLabel className={isOpen ? "text-accent" : "text-white/45"}>
                    {step.number}
                  </MonoLabel>
                  <h3
                    className={`mt-2 text-2xl tracking-tight transition-colors duration-300 ${
                      isOpen ? "text-white" : "text-white/75"
                    }`}
                  >
                    {step.title}
                  </h3>
                </div>
                <motion.span
                  className="font-mono text-lg text-white/60"
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.35, ease: EASE }}
                >
                  +
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`how-it-works-mobile-panel-${step.number}`}
                    initial={{ height: 0, opacity: 0, y: 10 }}
                    animate={{ height: "auto", opacity: 1, y: 0 }}
                    exit={{ height: 0, opacity: 0, y: -6 }}
                    transition={{ duration: 0.6, ease: EASE }}
                    className="overflow-hidden"
                  >
                    <p className="mt-4 text-[16px] leading-relaxed text-white/78">
                      {step.desc}
                    </p>
                    <div className="mt-5 h-[300px]">
                      <HowItWorksVisual activeIndex={index} compact />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </SectionShell>
  );
}
