"use client";

import { AnimatePresence, motion } from "framer-motion";
import { EASE, MonoLabel } from "./ui";
import ConnectDemo from "./ConnectDemo";
import IngestDemo from "./IngestDemo";
import StructureDemo from "./StructureDemo";
import RetrieveDemo from "./RetrieveDemo";

const TITLES = ["Connect", "Ingest", "Structure", "Retrieve"];

const DEMOS = [ConnectDemo, IngestDemo, StructureDemo, RetrieveDemo];

export default function HowItWorksVisual({
  activeIndex,
  compact = false,
}: {
  activeIndex: number;
  compact?: boolean;
}) {
  const safeIndex = Math.max(0, Math.min(DEMOS.length - 1, activeIndex));
  const Demo = DEMOS[safeIndex];

  return (
    <div
      className={`relative h-full overflow-hidden border border-white/10 bg-[#141413] ${
        compact ? "rounded-[24px]" : "rounded-[32px]"
      }`}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: compact ? "38px 38px" : "46px 46px",
        }}
        aria-hidden
      />

      <div className="relative z-10 flex h-full flex-col p-6 sm:p-8">
        <div className="flex items-center justify-between">
          <MonoLabel className="text-white/55">Product Demo</MonoLabel>
          <MonoLabel className="text-accent">
            {String(safeIndex + 1).padStart(2, "0")}
          </MonoLabel>
        </div>

        <div className="mt-2 flex items-end justify-between">
          <p className="text-2xl tracking-tight text-white sm:text-[30px]">
            {TITLES[safeIndex]}
          </p>
          <motion.p
            key={safeIndex}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="font-mono text-[11px] tracking-[0.12em] text-white/45"
          >
            ENGRAM LIVE
          </motion.p>
        </div>

        <div className="relative mt-6 flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={safeIndex}
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.985 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="h-full"
            >
              <Demo compact={compact} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
