"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { problem } from "@/content/copy";
import { EASE, MonoLabel } from "./ui";

export default function ProblemSection() {
  const [gone, setGone] = useState(0);
  const total = problem.cards.length;

  useEffect(() => {
    const cycle = () => {
      setGone(0);
      const t: number[] = [];
      for (let i = 1; i <= total; i++) {
        t.push(window.setTimeout(() => setGone(i), 600 * i));
      }
      t.push(window.setTimeout(() => setGone(0), 600 * total + 1500));
      return t;
    };
    let timers = cycle();
    const loop = window.setInterval(() => {
      timers = cycle();
    }, 600 * total + 2400);
    return () => {
      window.clearInterval(loop);
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, [total]);

  return (
    <section className="relative border-t border-line px-6 py-24 lg:px-8 lg:py-32">
      <div className="relative z-10 mx-auto grid max-w-content grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-20">
        {/* left */}
        <motion.div
          className="max-w-xl"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <MonoLabel className="mb-5 block">{problem.eyebrow}</MonoLabel>
          <h2 className="text-balance text-[32px] font-normal leading-[1.08] tracking-tightest text-ink sm:text-[44px]">
            {problem.headline}
          </h2>
          <p className="mt-5 text-[17px] leading-relaxed text-muted">{problem.body}</p>
        </motion.div>

        {/* right: animated deck */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
        >
          <div className="relative h-[360px] sm:h-[380px]">
            {problem.cards.map((c, i) => {
              const vanished = i < gone;
              return (
                <div
                  key={c.text}
                  className="absolute left-1/2 top-4 -translate-x-1/2"
                  style={{ zIndex: total - i }}
                >
                  <motion.div
                    className="w-[270px] rounded-2xl border border-line bg-card p-5 sm:w-[310px]"
                    initial={false}
                    animate={{
                      opacity: vanished ? 0 : 1,
                      y: vanished ? -54 : i * 16,
                      x: vanished ? 36 : (i - 2) * 8,
                      rotate: vanished ? (i - 2) * 2.5 + 12 : (i - 2) * 2.5,
                      scale: vanished ? 0.93 : 1,
                    }}
                    transition={{ duration: 0.55, ease: EASE }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                      <MonoLabel>{c.tag}</MonoLabel>
                    </div>
                    <p className="mt-2 text-sm text-ink">{c.text}</p>
                  </motion.div>
                </div>
              );
            })}

            <AnimatePresence>
              {gone === total && (
                <motion.div
                  className="absolute inset-0 flex flex-col items-center justify-center text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: EASE }}
                >
                  <MonoLabel className="mb-3 block">{problem.forgetLabel}</MonoLabel>
                  <p className="text-2xl font-normal tracking-tight text-ink sm:text-3xl">
                    {problem.restoreLabel}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
