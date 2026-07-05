"use client";

import { motion } from "framer-motion";
import type { ComponentType } from "react";
import { capabilities } from "@/content/copy";
import { EASE, MonoLabel, SectionShell, SectionIntro } from "./ui";
import {
  SearchDemo,
  TimelineDemo,
  EmailDemo,
  CalendarDemo,
  GraphDemo,
  SyncDemo,
} from "./bento-demos";

const DEMOS: Record<string, ComponentType> = {
  search: SearchDemo,
  timeline: TimelineDemo,
  email: EmailDemo,
  calendar: CalendarDemo,
  graph: GraphDemo,
  sync: SyncDemo,
};

const SPAN: Record<string, string> = {
  lg: "md:col-span-2 md:row-span-2",
  md: "md:col-span-2",
  sm: "md:col-span-1",
};

export default function CapabilitiesBento() {
  return (
    <SectionShell id="capabilities">
      <SectionIntro
        eyebrow={capabilities.eyebrow}
        headline={capabilities.headline}
        subtext={capabilities.subtext}
      />

      <div className="mt-14 grid grid-cols-1 gap-4 md:auto-rows-auto md:grid-cols-4">
        {capabilities.items.map((item, i) => {
          const Demo = DEMOS[item.demo];
          return (
            <motion.div
              key={item.id}
              className={`flex flex-col overflow-hidden rounded-2xl border border-line bg-card p-5 min-h-[200px] ${SPAN[item.span]}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: EASE, delay: (i % 4) * 0.06 }}
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-lg font-normal leading-tight tracking-tight text-ink">
                  {item.title}
                </h3>
                <MonoLabel className="mt-1 shrink-0 text-muted/70">{item.tag}</MonoLabel>
              </div>
              <p className="mt-2 text-[13px] leading-relaxed text-muted">{item.desc}</p>
              <div className="mt-4 min-h-0 flex-1 p-1">
                {Demo && <Demo />}
              </div>
            </motion.div>
          );
        })}
      </div>
    </SectionShell>
  );
}
