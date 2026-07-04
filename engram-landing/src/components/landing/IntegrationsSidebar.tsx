"use client";

import { motion } from "framer-motion";
import type { ComponentType } from "react";
import {
  CalendarDays,
  FileText,
  Mail,
  MessageSquareText,
  Mic2,
  Orbit,
  Video,
} from "lucide-react";
import { EASE } from "@/components/ui";

export type Integration = {
  id: string;
  title: string;
  status: "connected" | "inactive";
};

type IntegrationsSidebarProps = {
  integrations: Integration[];
  activeIntegration: string;
  onSelectIntegration: (id: string) => void;
};

const ICON_MAP: Record<string, ComponentType<{ className?: string }>> = {
  gmail: Mail,
  calendar: CalendarDays,
  slack: MessageSquareText,
  zoom: Video,
  notion: FileText,
  fireflies: Mic2,
  hubspot: Orbit,
};

const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -8 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE } },
};

export default function IntegrationsSidebar({
  integrations,
  activeIntegration,
  onSelectIntegration,
}: IntegrationsSidebarProps) {
  return (
    <aside className="flex h-auto flex-col border-b border-white/10 bg-[#111110] p-4 md:h-full md:border-b-0 md:border-r md:p-5">
      <div className="flex items-center gap-2 text-white">
        <span className="inline-flex h-5 w-5 items-center justify-center rounded-md bg-white/[0.04]">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden>
            <circle cx="7" cy="8" r="2.6" fill="#ff6b2c" />
            <circle cx="17" cy="12" r="2.8" fill="#f7f7f4" opacity="0.9" />
            <circle cx="7" cy="16" r="2.4" fill="#f7f7f4" opacity="0.7" />
            <path d="M9.5 8.8L14.6 11.1M9.4 15.2L14.5 12.8" stroke="#f7f7f4" strokeOpacity=".45" />
          </svg>
        </span>
        <span className="text-[16px] font-medium tracking-[-0.02em]">Engram</span>
      </div>

      <p className="mt-6 text-[12px] text-white/55 md:mt-8">Sources</p>

      <motion.ul
        className="mt-3 flex gap-2 overflow-x-auto pb-1 md:mt-4 md:block md:space-y-1 md:overflow-visible md:pb-0"
        variants={listVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {integrations.map((integration) => {
          const isActive = integration.id === activeIntegration;
          const Icon = ICON_MAP[integration.id] ?? Orbit;

          return (
            <motion.li key={integration.id} variants={itemVariants} className="min-w-[178px] md:min-w-0">
              <button
                type="button"
                onClick={() => onSelectIntegration(integration.id)}
                className={`group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-all duration-200 ease-editorial ${
                  isActive
                    ? "border-l-2 border-accent bg-white/[0.05] text-white"
                    : "border-l-2 border-transparent text-white/75 hover:bg-white/[0.03] hover:text-white"
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span className="flex-1 truncate text-[13px]">{integration.title}</span>
                <span
                  className={`h-2 w-2 shrink-0 rounded-full ${
                    integration.status === "connected" ? "bg-green-500" : "bg-white/30"
                  }`}
                />
              </button>
            </motion.li>
          );
        })}
      </motion.ul>

      <button
        type="button"
        className="mt-4 inline-flex items-center justify-center rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-[12px] text-white/85 transition-colors duration-200 ease-editorial hover:bg-white/[0.04] md:mt-auto"
      >
        Manage Integrations
      </button>
    </aside>
  );
}
