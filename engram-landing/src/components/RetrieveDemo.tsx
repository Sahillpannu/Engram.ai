"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { EASE } from "./ui";

const QUERY = "What did Acme ask for?";

export default function RetrieveDemo({ compact = false }: { compact?: boolean }) {
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCharCount((current) => (current >= QUERY.length ? 0 : current + 1));
    }, 95);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="relative h-full">
      <motion.div
        className="rounded-[18px] border border-white/10 bg-[#0f0f0e] p-3"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <p className="font-mono text-[10px] tracking-[0.12em] text-white/42">SEARCH</p>
        <div className="mt-2 flex h-11 items-center rounded-xl border border-white/10 bg-[#171715] px-3">
          <span className="text-[14px] text-white/72">{QUERY.slice(0, charCount)}</span>
          <motion.span
            className="ml-1 h-4 w-px bg-white/65"
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.9, repeat: Infinity }}
          />
        </div>
      </motion.div>

      <motion.div
        className="mt-3 rounded-[18px] border border-accent/30 bg-accent/10 p-3"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE, delay: 0.18 }}
      >
        <p className="font-mono text-[10px] tracking-[0.12em] text-accent/85">AI RESPONSE</p>
        <p className="mt-2 text-[14px] text-white/92">Acme requested enterprise pricing.</p>
      </motion.div>

      <motion.div
        className="mt-3 rounded-[18px] border border-white/10 bg-[#151514] p-3"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE, delay: 0.28 }}
      >
        <p className="font-mono text-[10px] tracking-[0.12em] text-white/44">MATCHED MEMORIES</p>
        <div className="mt-2 space-y-1.5 text-[13px] text-white/74">
          <p>- Pricing discussion (Zoom)</p>
          <p>- Follow-up thread (Gmail)</p>
          <p>- Decision log (Notion)</p>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-2 right-2 rounded-[16px] border border-white/10 bg-[#111110] px-3 py-2"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{
          opacity: 1,
          scale: [1, 1.03, 1],
          borderColor: [
            "rgba(255,255,255,0.1)",
            "rgba(255,107,44,0.45)",
            "rgba(255,255,255,0.1)",
          ],
        }}
        transition={{
          opacity: { duration: 0.6, ease: EASE, delay: 0.4 },
          scale: { duration: 2.3, repeat: Infinity, ease: "easeInOut" },
          borderColor: { duration: 2.3, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <p className="font-mono text-[10px] tracking-[0.12em] text-white/42">AGENT</p>
        <p className="text-[12px] text-white/85">Grounded response ready</p>
      </motion.div>

      {!compact && (
        <motion.p
          className="absolute bottom-2 left-2 font-mono text-[11px] tracking-[0.1em] text-accent/85"
          animate={{ opacity: [0.45, 1, 0.45] }}
          transition={{ duration: 1.7, repeat: Infinity, ease: "easeInOut" }}
        >
          MEMORY RECALL COMPLETE
        </motion.p>
      )}
    </div>
  );
}
