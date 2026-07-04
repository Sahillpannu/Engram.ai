"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { faq } from "@/content/copy";

const springConfig = {
  type: "spring" as const,
  stiffness: 250,
  damping: 28,
  mass: 0.8,
};

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section
      id="faq"
      className="border-t border-border py-24 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-2xl mx-auto">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs tracking-[0.2em] uppercase text-accent font-semibold mb-4">
            {faq.eyebrow}
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
            {faq.headline}
          </h2>
        </motion.div>

        <div className="space-y-3">
          {faq.items.map((item, i) => (
            <motion.div
              key={i}
              className="border border-border rounded-xl overflow-hidden bg-[#0d0d0d]"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.35, delay: i * 0.06 }}
            >
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left group"
              >
                <span className="text-sm font-medium text-white pr-4">
                  {item.question}
                </span>
                <motion.span
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  transition={springConfig}
                  className="shrink-0"
                >
                  <ChevronDown
                    size={18}
                    className="text-muted group-hover:text-white transition-colors"
                  />
                </motion.span>
              </button>
              <AnimatePresence initial={false} mode="wait">
                {openIndex === i && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{
                      height: springConfig,
                      opacity: { duration: 0.2 },
                    }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 text-sm text-muted leading-relaxed">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
