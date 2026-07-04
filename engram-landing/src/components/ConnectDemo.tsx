"use client";

import { motion } from "framer-motion";
import { EASE } from "./ui";

const INTEGRATIONS = ["Gmail", "Calendar", "Slack", "Zoom", "Notion"];

export default function ConnectDemo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="relative h-full">
      {!compact && (
        <svg
          viewBox="0 0 760 360"
          className="pointer-events-none absolute inset-0 h-full w-full"
          role="presentation"
          aria-hidden
        >
          {INTEGRATIONS.map((_, index) => {
            const y = 42 + index * 62;
            return (
              <motion.path
                key={index}
                d={`M 190 ${y} C 280 ${y} 330 180 430 180`}
                fill="none"
                stroke="rgba(255,255,255,0.12)"
                strokeWidth="1.3"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0.2 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.6, ease: EASE, delay: 0.12 + index * 0.08 }}
              />
            );
          })}
        </svg>
      )}

      <div
        className={`relative z-10 grid h-full gap-4 ${
          compact ? "grid-cols-1 content-start" : "grid-cols-[minmax(0,1fr)_220px]"
        }`}
      >
        <div className="space-y-3 pr-2">
          {INTEGRATIONS.map((app, index) => (
            <motion.div
              key={app}
              className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#10100f] px-4 py-3"
              initial={{ opacity: 0, x: -22 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: index * 0.09 }}
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-[#171716] font-mono text-[11px] text-white/82">
                  {app.slice(0, 2).toUpperCase()}
                </span>
                <p className="text-[14px] text-white/88">{app}</p>
              </div>
              <motion.span
                className="h-2.5 w-2.5 rounded-full bg-[#19d47f]"
                initial={{ opacity: 0, scale: 0.4 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: EASE, delay: 0.5 + index * 0.1 }}
              />
            </motion.div>
          ))}
        </div>

        <div className={`flex justify-center ${compact ? "items-start" : "items-center"}`}>
          <motion.div
            className="relative w-full max-w-[220px] rounded-[24px] border border-white/10 bg-[#0f0f0e] px-4 py-5 text-center"
            animate={{
              borderColor: [
                "rgba(255,255,255,0.08)",
                "rgba(25,212,127,0.45)",
                "rgba(255,255,255,0.08)",
              ],
              scale: [1, 1.015, 1],
            }}
            transition={{ duration: 3.2, ease: "easeInOut", repeat: Infinity }}
          >
            <p className="font-mono text-[11px] tracking-[0.12em] text-white/48">ENGRAM</p>
            <p className="mt-1 text-[22px] tracking-tight text-white">Connected</p>
            <p className="mt-2 text-[12px] text-white/58">
              OAuth complete across your workspace.
            </p>
            <motion.div
              className="mx-auto mt-4 h-2 w-2 rounded-full bg-[#19d47f]"
              animate={{ opacity: [0.5, 1, 0.5], scale: [0.9, 1.2, 0.9] }}
              transition={{ duration: 1.8, ease: "easeInOut", repeat: Infinity }}
            />
          </motion.div>
        </div>
      </div>

      {!compact && (
        <motion.div
          className="absolute bottom-2 right-2 rounded-full border border-[#19d47f]/40 bg-[#19d47f]/15 px-3 py-1 font-mono text-[11px] tracking-[0.1em] text-[#8df2be]"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.5 }}
        >
          CONNECTED
        </motion.div>
      )}
    </div>
  );
}
