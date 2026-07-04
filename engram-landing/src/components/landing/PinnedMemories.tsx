"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Pin } from "lucide-react";
import { EASE } from "@/components/ui";

export type PinnedMemory = {
  id: string;
  title: string;
  detail: string;
  source: string;
  time: string;
};

type PinnedMemoriesProps = {
  memories: PinnedMemory[];
};

const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.28 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export default function PinnedMemories({ memories }: PinnedMemoriesProps) {
  const [activeId, setActiveId] = useState<string>(memories[0]?.id ?? "");

  return (
    <section className="mt-6">
      <h4 className="mb-3 text-[15px] font-normal tracking-[-0.02em] text-white/92">Pinned</h4>

      <motion.div
        className="grid grid-cols-1 gap-3 lg:grid-cols-3"
        variants={listVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
      >
        {memories.map((memory) => {
          const isActive = activeId === memory.id;

          return (
            <motion.button
              key={memory.id}
              type="button"
              onClick={() => setActiveId(memory.id)}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.25, ease: EASE }}
              variants={cardVariants}
              className={`rounded-[18px] border bg-card-secondary p-5 text-left transition-colors duration-200 ease-editorial ${
                isActive
                  ? "border-accent/50 bg-[#1a1918]"
                  : "border-white/10 hover:border-white/15 hover:bg-[#1c1c1b]"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <h5 className="text-[14px] font-medium text-white/92">{memory.title}</h5>
                <Pin size={14} className={isActive ? "text-accent" : "text-white/45"} />
              </div>
              <p className="mt-2 text-[12px] text-white/55">{memory.detail}</p>
              <p className="mt-4 text-[12px] text-white/50">
                {memory.source}
                <span className="mx-2 text-white/25">·</span>
                {memory.time}
              </p>
            </motion.button>
          );
        })}
      </motion.div>
    </section>
  );
}
