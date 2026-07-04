"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { hero } from "@/content/copy";

const fadeInWord = {
  hidden: { opacity: 0, filter: "blur(8px)", y: 12 },
  visible: (i: number) => ({
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: {
      duration: 0.45,
      delay: i * 0.07,
      ease: [0.2, 0.0, 0.0, 1.0],
    },
  }),
};

function WordByWord({ text, className }: { text: string; className?: string }) {
  return (
    <span className={className}>
      {text.split(" ").map((word, i) => (
        <motion.span
          key={i}
          custom={i}
          variants={fadeInWord}
          initial="hidden"
          animate="visible"
          className="inline-block"
          style={{ marginRight: "0.25em" }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const windowY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const windowScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.98]);
  const windowOpacity = useTransform(scrollYProgress, [0.7, 1], [1, 0.3]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h1 className="font-mono text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tight">
          <WordByWord text={hero.line1} className="text-white block" />
          <motion.span
            className="text-accent block mt-2"
            initial={{ opacity: 0, filter: "blur(8px)", y: 12 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            transition={{ duration: 0.5, delay: 0.6, ease: [0.2, 0.0, 0.0, 1.0] }}
          >
            {hero.line2}
          </motion.span>
        </h1>

        <motion.p
          className="mt-6 text-base sm:text-lg text-muted max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.75, ease: "easeOut" }}
        >
          {hero.subheading}
        </motion.p>

        <motion.div
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9, ease: "easeOut" }}
        >
          <button className="w-full sm:w-auto px-8 py-3.5 bg-white text-black font-semibold rounded-lg hover:bg-accent-light hover:text-white transition-all duration-200 text-sm">
            Connect Gmail
          </button>
          <a
            href="#how-it-works"
            className="w-full sm:w-auto px-8 py-3.5 border border-border text-white font-medium rounded-lg hover:border-white/30 hover:bg-white/5 transition-all duration-200 text-sm"
          >
            How it works
          </a>
        </motion.div>

        <motion.p
          className="mt-5 text-xs text-muted-dark tracking-[0.2em] uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.05 }}
        >
          {hero.integrationsCaption}
        </motion.p>
      </div>

      <motion.div
        className="mt-16 w-full max-w-3xl mx-auto relative z-10"
        style={{ y: windowY, scale: windowScale, opacity: windowOpacity }}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.05, ease: "easeOut" }}
      >
        <div className="relative">
          <div
            className="absolute inset-0 rounded-xl bg-accent/20 blur-3xl"
            style={{ animation: "pulse-glow 3s ease-in-out infinite" }}
          />
          <div className="relative rounded-xl border border-border bg-[#111] overflow-hidden shadow-2xl">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-[#1a1a1a]">
              <span className="w-3 h-3 rounded-full bg-red-500" />
              <span className="w-3 h-3 rounded-full bg-yellow-500" />
              <span className="w-3 h-3 rounded-full bg-green-500" />
              <div className="ml-3 flex-1">
                <div className="text-xs text-muted-dark bg-[#222] rounded-md px-3 py-1 w-fit font-mono">
                  {hero.mockWindow.title}
                </div>
              </div>
            </div>
            <div className="p-12 flex flex-col items-center justify-center text-center min-h-[240px]">
              <p className="text-muted text-sm mb-4">
                {hero.mockWindow.emptyState}
              </p>
              <button className="px-6 py-2.5 bg-accent text-white text-sm font-medium rounded-lg hover:bg-accent-light transition-all duration-200">
                Connect Gmail
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
