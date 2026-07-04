"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { faq } from "@/content/copy";
import { EASE, SectionShell, SectionIntro } from "./ui";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <SectionShell id="faq">
      <SectionIntro eyebrow={faq.eyebrow} headline={faq.headline} />

      <div className="mt-12 max-w-3xl space-y-3">
        {faq.items.map((item, i) => {
          const open = openIndex === i;
          return (
            <motion.div
              key={i}
              className="overflow-hidden rounded-xl border border-line bg-card"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, ease: EASE, delay: (i % 6) * 0.05 }}
            >
              <button
                onClick={() => setOpenIndex(open ? null : i)}
                className="flex w-full items-center justify-between px-5 py-4 text-left"
              >
                <span className="text-[15px] font-normal text-ink pr-4">
                  {item.question}
                </span>
                <motion.span
                  animate={{ rotate: open ? 180 : 0 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="shrink-0"
                >
                  <ChevronDown
                    size={17}
                    className={`transition-colors ${open ? "text-accent" : "text-muted"}`}
                  />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-4 text-[14px] leading-relaxed text-muted">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </SectionShell>
  );
}
