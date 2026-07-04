"use client";

import {
  Mail,
  Calendar,
  MessageSquare,
  Video,
  FileText,
  Mic,
  Building2,
  LucideIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import { integrations } from "@/content/copy";
import { EASE, MonoLabel } from "./ui";

const iconMap: Record<string, LucideIcon> = {
  Mail,
  Calendar,
  MessageSquare,
  Video,
  FileText,
  Mic,
  Building2,
};

function DockCard({ item }: { item: (typeof integrations)[number] }) {
  const Icon = iconMap[item.icon] ?? Mail;
  return (
    <div className="group relative mx-3 w-[230px] shrink-0 rounded-xl border border-line bg-card p-4 transition-transform duration-300 ease-editorial hover:-translate-y-1.5">
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-bg/60">
          <Icon size={16} className="text-ink" />
        </span>
        <div className="min-w-0">
          <div className="text-sm font-normal text-ink">{item.name}</div>
          <div className="truncate font-mono text-[11px] text-muted">{item.desc}</div>
        </div>
      </div>

      {/* syncing indicator */}
      <div className="mt-3 flex items-center gap-1.5 overflow-hidden opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <span className="flex gap-1">
          {[0, 1, 2].map((d) => (
            <span
              key={d}
              className="h-1 w-1 rounded-full bg-accent"
              style={{
                animation: "syncing-blink 1.2s ease-in-out infinite",
                animationDelay: `${d * 0.18}s`,
              }}
            />
          ))}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-wide text-muted">
          Syncing
        </span>
      </div>
    </div>
  );
}

export default function IntegrationsDock() {
  const row = [...integrations, ...integrations];
  return (
    <section id="integrations" className="relative border-t border-line py-20 lg:py-24">
      <motion.div
        className="relative z-10 mb-10 text-center"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <MonoLabel className="block">INTEGRATIONS</MonoLabel>
        <p className="mx-auto mt-3 max-w-md text-sm text-muted">
          Connect the tools you already use. Engram listens and remembers.
        </p>
      </motion.div>

      <div className="relative overflow-hidden">
        <div className="flex w-max animate-marquee">
          {row.map((item, i) => (
            <DockCard key={`${item.name}-${i}`} item={item} />
          ))}
        </div>

        {/* edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-bg to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-bg to-transparent" />
      </div>
    </section>
  );
}
