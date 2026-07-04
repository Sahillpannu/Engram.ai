"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EASE } from "./ui";

const MEMORY_CARDS = [
  "Notes from Acme demo",
  "Q3 pricing requirement",
  "Follow-up due Tuesday",
  "Legal review pending",
];

const ENTITY_CARDS = [
  { label: "People", value: "4" },
  { label: "Companies", value: "2" },
  { label: "Meetings", value: "6" },
  { label: "Tasks", value: "9" },
];

export default function StructureDemo({ compact = false }: { compact?: boolean }) {
  const [showEntities, setShowEntities] = useState(false);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setShowEntities((value) => !value);
    }, 2800);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="relative h-full">
      <AnimatePresence mode="wait">
        {!showEntities ? (
          <motion.div
            key="memory"
            className="grid h-full grid-cols-2 gap-3"
            initial={{ opacity: 0, scale: 0.985 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            {MEMORY_CARDS.map((card, index) => (
              <motion.div
                key={card}
                className="rounded-[18px] border border-white/10 bg-[#121211] p-4"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: EASE, delay: index * 0.08 }}
              >
                <p className="font-mono text-[10px] tracking-[0.12em] text-white/38">MEMORY</p>
                <p className="mt-2 text-[14px] text-white/86">{card}</p>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="entities"
            className="relative h-full"
            initial={{ opacity: 0, scale: 0.985 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <div className="grid grid-cols-2 gap-3">
              {ENTITY_CARDS.map((entity, index) => (
                <motion.div
                  key={entity.label}
                  className="rounded-[18px] border border-white/10 bg-[#151514] p-4"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: EASE, delay: index * 0.08 }}
                >
                  <p className="font-mono text-[10px] tracking-[0.12em] text-white/42">
                    {entity.label.toUpperCase()}
                  </p>
                  <p className="mt-2 text-[21px] tracking-tight text-white">{entity.value}</p>
                </motion.div>
              ))}
            </div>

            <svg
              viewBox="0 0 420 190"
              className="absolute bottom-2 left-1 right-1 h-[150px] w-[calc(100%-0.5rem)]"
              role="presentation"
              aria-hidden
            >
              <g stroke="rgba(255,255,255,0.22)" strokeWidth="1.1">
                <line x1="56" y1="36" x2="210" y2="96" />
                <line x1="360" y1="38" x2="210" y2="96" />
                <line x1="60" y1="150" x2="210" y2="96" />
                <line x1="360" y1="146" x2="210" y2="96" />
              </g>
              {[{ x: 56, y: 36 }, { x: 360, y: 38 }, { x: 60, y: 150 }, { x: 360, y: 146 }, { x: 210, y: 96 }].map(
                (node, index) => (
                  <motion.circle
                    key={index}
                    cx={node.x}
                    cy={node.y}
                    r={index === 4 ? 5 : 3.5}
                    fill={index === 4 ? "var(--accent)" : "rgba(247,247,244,0.78)"}
                    animate={{ opacity: [0.45, 1, 0.45] }}
                    transition={{ duration: 1.8, repeat: Infinity, delay: index * 0.12 }}
                  />
                )
              )}
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

      {!compact && (
        <motion.p
          className="absolute bottom-1 left-1 font-mono text-[11px] tracking-[0.1em] text-accent/85"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        >
          KNOWLEDGE GRAPH READY
        </motion.p>
      )}
    </div>
  );
}
