"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion, Variants } from "framer-motion";
import { hero } from "@/content/copy";
import { EASE, MonoLabel, PrimaryButton, GhostButton } from "./ui";
import MemoryGraph from "./MemoryGraph";

// Extracted animation variants for cleaner JSX and easier tuning
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE },
  },
};

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Use viewport units for parallax to scale better across screen sizes
  // Reduced motion users get no movement
  const graphY = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : "10vh"]);
  const graphOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <section
      ref={ref}
      aria-label="Hero"
      className="relative overflow-hidden px-6 pb-20 pt-20 sm:pt-24 lg:px-8 lg:pb-28"
    >
      {/* Subtle background glow for premium depth */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute left-1/2 top-0 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-b from-white/5 to-transparent blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto grid max-w-content grid-cols-1 items-center gap-10 lg:grid-cols-[5fr_7fr] lg:gap-12">
        {/* ---------- left ---------- */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative"
        >
          <motion.div variants={itemVariants}>
            <MonoLabel className="block">{hero.label}</MonoLabel>
          </motion.div>

          <h1 className="mt-6 text-[44px] font-normal leading-[1.04] tracking-tightest text-ink sm:text-[52px] lg:text-[60px]">
            <motion.span className="block" variants={itemVariants}>
              {hero.headline1}
            </motion.span>
            {/* text-ink/60 instead of text-muted for WCAG contrast compliance on H1 */}
            <motion.span className="block text-ink/60" variants={itemVariants}>
              {hero.headline2}
            </motion.span>
          </h1>

          <motion.p
            className="mt-6 max-w-prose text-lg leading-relaxed text-muted"
            variants={itemVariants}
          >
            {hero.subheading}
          </motion.p>

          <motion.div
            className="mt-8 flex flex-col gap-3 sm:flex-row"
            variants={itemVariants}
          >
            <PrimaryButton href="#cta">{hero.ctaPrimary}</PrimaryButton>
            <GhostButton href="#architecture">{hero.ctaSecondary}</GhostButton>
          </motion.div>

          <motion.div className="mt-12" variants={itemVariants}>
            <MonoLabel className="mb-3 block">{hero.trustCaption}</MonoLabel>
            {/* Semantic list for screen readers */}
            <ul role="list" className="flex flex-wrap gap-x-6 gap-y-2">
              {hero.trust.map((t) => (
                <li key={t} className="font-mono text-xs text-muted">
                  {t}
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* ---------- right: memory graph ---------- */}
        {/* Fix: Entrance animation on outer div, scroll-driven transforms on inner div
            — prevents the "ownership handoff" flicker from conflicting MotionValues */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
        >
          <motion.div
            style={{ y: graphY, opacity: graphOpacity }}
            className="relative z-10"
          >
            <MemoryGraph />
          </motion.div>
        </motion.div>
      </div>

      {/* ---------- bottom feature bar ---------- */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE, delay: 0.6 }}
        className="relative z-10 mx-auto mt-16 max-w-content border-t border-line pt-6"
      >
        <ul role="list" className="grid grid-cols-2 gap-4 text-[11px] text-muted sm:grid-cols-4">
          <li className="flex items-center gap-2 font-mono uppercase tracking-wider">
            <span className="h-1 w-1 rounded-full bg-blue-400" /> Unified memory
          </li>
          <li className="flex items-center gap-2 font-mono uppercase tracking-wider">
            <span className="h-1 w-1 rounded-full bg-emerald-400" /> Semantic search
          </li>
          <li className="flex items-center gap-2 font-mono uppercase tracking-wider">
            <span className="h-1 w-1 rounded-full bg-purple-400" /> Always up to date
          </li>
          <li className="flex items-center gap-2 font-mono uppercase tracking-wider">
            <span className="h-1 w-1 rounded-full bg-orange-400" /> Private &amp; secure
          </li>
        </ul>
      </motion.div>
    </section>
  );
}
