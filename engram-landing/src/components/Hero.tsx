"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { hero } from "@/content/copy";
import { EASE, MonoLabel, PrimaryButton, GhostButton } from "./ui";
import MemoryGraph from "./MemoryGraph";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const graphY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const graphOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <section ref={ref} className="relative px-6 pt-32 pb-20 sm:pt-40 lg:px-8 lg:pb-28">
      <div className="relative z-10 mx-auto grid max-w-content grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-12">
        {/* ---------- left ---------- */}
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <MonoLabel className="block">{hero.label}</MonoLabel>
          </motion.div>

          <h1 className="mt-6 text-[44px] font-normal leading-[1.04] tracking-tightest text-ink sm:text-[58px] lg:text-[72px]">
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.06 }}
            >
              {hero.headline1}
            </motion.span>
            <motion.span
              className="block text-muted"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.16 }}
            >
              {hero.headline2}
            </motion.span>
          </h1>

          <motion.p
            className="mt-6 max-w-md text-lg leading-relaxed text-muted"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.26 }}
          >
            {hero.subheading}
          </motion.p>

          <motion.div
            className="mt-8 flex flex-col gap-3 sm:flex-row"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.36 }}
          >
            <PrimaryButton href="#cta">{hero.ctaPrimary}</PrimaryButton>
            <GhostButton href="#architecture">{hero.ctaSecondary}</GhostButton>
          </motion.div>

          <motion.div
            className="mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <MonoLabel className="mb-3 block">{hero.trustCaption}</MonoLabel>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {hero.trust.map((t) => (
                <span key={t} className="font-mono text-xs text-muted">
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ---------- right: memory graph ---------- */}
        <motion.div
          className="relative"
          style={{ y: graphY, opacity: graphOpacity }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
        >
          <div className="relative">
            <div className="absolute -inset-6 rounded-3xl border border-line/60" />
            <div className="relative">
              <MemoryGraph />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
