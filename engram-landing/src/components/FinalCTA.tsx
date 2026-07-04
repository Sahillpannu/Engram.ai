"use client";

import { motion } from "framer-motion";
import { cta } from "@/content/copy";
import { EASE, MonoLabel, PrimaryButton, GhostButton } from "./ui";

export default function FinalCTA() {
  return (
    <section
      id="cta"
      className="relative overflow-hidden border-t border-line px-6 py-28 lg:px-8 lg:py-36"
    >
      {/* faint memory graph illustration */}
      <svg
        viewBox="0 0 720 480"
        fill="none"
        className="pointer-events-none absolute right-[-6%] top-1/2 hidden h-[140%] -translate-y-1/2 opacity-[0.05] lg:block"
        aria-hidden
      >
        <path d="M 206 96 C 253 96 253 240 300 240" stroke="#26251e" strokeWidth="1.5" />
        <path d="M 206 240 L 300 240" stroke="#26251e" strokeWidth="1.5" />
        <path d="M 206 384 C 253 384 253 240 300 240" stroke="#26251e" strokeWidth="1.5" />
        <path d="M 460 240 L 524 240" stroke="#26251e" strokeWidth="1.5" />
        <circle cx="24" cy="96" r="6" fill="#26251e" />
        <circle cx="24" cy="240" r="6" fill="#26251e" />
        <circle cx="24" cy="384" r="6" fill="#26251e" />
        <circle cx="608" cy="240" r="12" fill="#f54e00" />
      </svg>

      <div className="relative z-10 mx-auto max-w-2xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <MonoLabel className="mb-5 block">{cta.eyebrow}</MonoLabel>
          <h2 className="text-balance text-[40px] font-normal leading-[1.05] tracking-tightest text-ink sm:text-[56px]">
            {cta.headline}
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-[17px] leading-relaxed text-muted">
            {cta.subtext}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <PrimaryButton href="#">{cta.ctaPrimary}</PrimaryButton>
            <GhostButton href="#">{cta.ctaSecondary}</GhostButton>
          </div>
          <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
            {cta.disclaimer}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
