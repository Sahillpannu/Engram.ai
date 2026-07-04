"use client";

import { motion } from "framer-motion";
import { EASE } from "./ui";

const NEW_MEMORIES = [
  "Contract draft attached",
  "Demo with Acme",
  "Pricing discussion",
];

export default function IngestDemo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="relative h-full overflow-hidden">
      <div className="absolute inset-y-8 left-[42%] w-px bg-white/15" />
      <motion.div
        className="absolute inset-y-8 left-[42%] w-px bg-accent/85"
        animate={{ opacity: [0.35, 0.85, 0.35] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      />

      {[0, 1, 2].map((index) => (
        <motion.span
          key={index}
          className="absolute left-[42%] h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-accent"
          animate={{ y: [8, 215], opacity: [0, 1, 1, 0] }}
          transition={{
            duration: 1.9,
            ease: "easeInOut",
            repeat: Infinity,
            delay: index * 0.42,
          }}
        />
      ))}

      <div className="relative z-10 grid h-full grid-cols-[1fr_1.05fr] gap-7">
        <div className="space-y-3">
          {["Gmail", "Calendar", "Zoom", "Slack"].map((source, index) => (
            <motion.div
              key={source}
              className="flex items-center justify-between rounded-[16px] border border-white/10 bg-[#10100f] px-3.5 py-3"
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: index * 0.08 }}
            >
              <p className="font-mono text-[11px] tracking-[0.08em] text-white/62">{source}</p>
              <span className="h-2 w-2 rounded-full bg-accent/80" />
            </motion.div>
          ))}
        </div>

        <div className="relative pl-3">
          {NEW_MEMORIES.map((memory, index) => (
            <motion.div
              key={memory}
              className="absolute left-0 right-1 rounded-[18px] border border-white/10 bg-[#171715] px-4 py-3"
              style={{ top: `${index * 70 + 42}px` }}
              initial={{ opacity: 0, x: 24, y: 10 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.22 + index * 0.14 }}
            >
              <p className="font-mono text-[10px] tracking-[0.12em] text-white/40">MEMORY</p>
              <p className="mt-1.5 text-[14px] text-white/88">{memory}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {!compact && (
        <motion.p
          className="absolute bottom-2 left-2 font-mono text-[11px] tracking-[0.1em] text-accent/85"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          STREAMING INTO ENGRAM
        </motion.p>
      )}
    </div>
  );
}
