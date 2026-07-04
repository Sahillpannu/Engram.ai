"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { howItWorks } from "@/content/copy";
import { EASE, MonoLabel, SectionShell, SectionIntro } from "./ui";

export default function HowItWorks() {
  const railRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ["start 78%", "end 58%"],
  });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <SectionShell id="how-it-works">
      <SectionIntro
        eyebrow={howItWorks.eyebrow}
        headline={howItWorks.headline}
        subtext={howItWorks.subtext}
      />

      <div ref={railRef} className="relative mt-16 pl-10 sm:pl-14">
        {/* track */}
        <div className="absolute bottom-1 left-3 top-1 w-px bg-line sm:left-4" />
        {/* progress line */}
        <motion.div
          className="absolute left-3 top-1 w-px origin-top bg-ink sm:left-4"
          style={{ scaleY, height: "calc(100% - 0.5rem)" }}
        />

        <div className="space-y-12 sm:space-y-16">
          {howItWorks.steps.map((s) => (
            <div key={s.number} className="relative">
              {/* dot */}
              <motion.span
                className="absolute -left-[26px] top-1.5 h-3 w-3 rounded-full border border-line bg-card sm:-left-[30px]"
                initial={{ backgroundColor: "rgba(0,0,0,0)", borderColor: "var(--line)" }}
                whileInView={{ backgroundColor: "var(--ink)", borderColor: "var(--ink)" }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ duration: 0.4, ease: EASE }}
              />
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, ease: EASE }}
              >
                <div className="flex items-baseline gap-3">
                  <MonoLabel className="text-accent">{s.number}</MonoLabel>
                </div>
                <h3 className="mt-2 text-2xl font-normal tracking-tight text-ink sm:text-3xl">
                  {s.title}
                </h3>
                <p className="mt-3 max-w-lg text-[16px] leading-relaxed text-muted">
                  {s.desc}
                </p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
