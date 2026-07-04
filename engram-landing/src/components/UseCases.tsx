"use client";

import { motion } from "framer-motion";
import {
  Headphones,
  CalendarClock,
  TrendingUp,
  Microscope,
  LucideIcon,
} from "lucide-react";
import { useCases } from "@/content/copy";
import { EASE, MonoLabel, SectionShell, SectionIntro } from "./ui";

const iconMap: Record<string, LucideIcon> = {
  Headphones,
  CalendarClock,
  TrendingUp,
  Microscope,
};

function Row({
  label,
  text,
  emphasize,
}: {
  label: string;
  text: string;
  emphasize?: boolean;
}) {
  return (
    <div>
      <MonoLabel className="mb-1 block">{label}</MonoLabel>
      <p className={`text-[14px] leading-relaxed ${emphasize ? "text-ink" : "text-muted"}`}>
        {text}
      </p>
    </div>
  );
}

export default function UseCases() {
  return (
    <SectionShell id="use-cases">
      <SectionIntro
        eyebrow={useCases.eyebrow}
        headline={useCases.headline}
        subtext={useCases.subtext}
      />

      <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2">
        {useCases.items.map((item, i) => {
          const Icon = iconMap[item.icon] ?? Headphones;
          return (
            <motion.div
              key={item.title}
              className="rounded-2xl border border-line bg-card p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: EASE, delay: (i % 2) * 0.08 }}
            >
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-bg/60">
                  <Icon size={16} className="text-ink" />
                </span>
                <h3 className="text-lg font-normal tracking-tight text-ink">
                  {item.title}
                </h3>
              </div>
              <div className="mt-5 space-y-4 border-t border-line pt-5">
                <Row label="PROBLEM" text={item.problem} />
                <Row label="MEMORY USED" text={item.memory} />
                <Row label="OUTCOME" text={item.outcome} emphasize />
              </div>
            </motion.div>
          );
        })}
      </div>
    </SectionShell>
  );
}
