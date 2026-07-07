"use client";

import { motion } from "framer-motion";
import type { ComponentType } from "react";
import { capabilities } from "@/content/copy";
import { EASE, MonoLabel, SectionIntro } from "./ui";
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
    <section id="capabilities" className="relative border-t border-line px-6 py-24 lg:px-8 lg:py-[120px]">
      <div className="mx-auto w-full max-w-[1400px]">

        {/* Section intro — sits above the landscape container */}
        <div className="mx-auto max-w-content">
          <SectionIntro
            eyebrow={capabilities.eyebrow}
            headline={capabilities.headline}
            subtext={capabilities.subtext}
          />
        </div>

        {/*
          ── DashboardPreview-style outer container ──
          One rounded box, overflow-hidden. Background image fills it via
          absolute inset-0. All bento content is relative z-10 inside.
        */}
        <div className="relative mt-12 overflow-hidden rounded-[32px]">

          {/* Background image — fills the entire container, same as DashboardPreview */}
          <div
            className="absolute inset-0 scale-[1.03] bg-cover bg-center"
            style={{ backgroundImage: "url('/images/capabilities-bg.png')" }}
            aria-hidden
          />

          {/* Dark overlay gradient — top light, bottom heavy so cards are readable */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(11,11,10,0.25) 0%, rgba(11,11,10,0.55) 45%, rgba(11,11,10,0.88) 100%)",
            }}
            aria-hidden
          />

          {/* Foreground content — z-10 relative, padded inside the container */}
          <div className="relative z-10 px-8 pb-12 pt-16 lg:px-14 lg:pb-16">
            <div className="grid grid-cols-1 gap-4 md:auto-rows-auto md:grid-cols-4">
              {capabilities.items.map((item, i) => {
                const Demo = DEMOS[item.demo];
                return (
                  <motion.div
                    key={item.id}
                    className={`flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-card/90 backdrop-blur-md shadow-[0_4px_32px_rgba(0,0,0,0.55)] p-5 min-h-[200px] ${SPAN[item.span]}`}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.6, ease: EASE, delay: (i % 4) * 0.07 }}
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
          </div>

        </div>
      </div>
    </section>
  );
}
