"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MoreHorizontal } from "lucide-react";
import { EASE } from "@/components/ui";

export type MemoryItem = {
  id: string;
  icon: string;
  title: string;
  description: string;
  source: string;
  time: string;
};

type MemoryListProps = {
  memories: MemoryItem[];
};

const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.18 },
  },
};

const rowVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export default function MemoryList({ memories }: MemoryListProps) {
  const [selectedId, setSelectedId] = useState<string>(memories[0]?.id ?? "");

  return (
    <section className="mt-6">
      <div className="mb-3 flex items-center justify-between">
        <h4 className="text-[15px] font-normal tracking-[-0.02em] text-white/92">Recent Memories</h4>
        <button
          type="button"
          className="text-[12px] text-accent transition-colors duration-200 ease-editorial hover:text-[#ff8350]"
        >
          View all
        </button>
      </div>

      <motion.div
        className="overflow-hidden rounded-xl border border-white/[0.06] bg-black/15"
        variants={listVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {memories.map((memory, index) => {
          const isSelected = selectedId === memory.id;
          const isLast = index === memories.length - 1;
          const selectItem = () => setSelectedId(memory.id);

          return (
            <motion.div
              key={memory.id}
              variants={rowVariants}
              role="button"
              tabIndex={0}
              onClick={selectItem}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  selectItem();
                }
              }}
              className={`group flex h-[72px] w-full items-center justify-between px-4 text-left transition-colors duration-200 ease-editorial ${
                isSelected ? "bg-white/[0.04]" : "hover:bg-white/[0.03]"
              } ${!isLast ? "border-b border-white/[0.05]" : ""}`}
            >
              <div className="flex min-w-0 items-center gap-3">
                <span className="text-[18px]">{memory.icon}</span>
                <div className="min-w-0">
                  <p className="truncate text-[13px] text-white/90">{memory.title}</p>
                  <p className="truncate text-[12px] text-white/55">{memory.description}</p>
                </div>
              </div>

              <div className="ml-4 flex items-center gap-3 pl-2">
                <p className="hidden text-[12px] text-white/45 sm:block">
                  {memory.source}
                  <span className="mx-2 text-white/25">·</span>
                  {memory.time}
                </p>
                <button
                  type="button"
                  className="inline-flex h-7 w-7 items-center justify-center rounded-md text-white/45 opacity-0 transition-all duration-200 ease-editorial group-hover:bg-white/[0.06] group-hover:text-white/80 group-hover:opacity-100"
                  aria-label={`More actions for ${memory.title}`}
                >
                  <MoreHorizontal size={14} />
                </button>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
