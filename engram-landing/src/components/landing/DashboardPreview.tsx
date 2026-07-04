"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Search, Settings2, SendHorizontal, Sparkles } from "lucide-react";
import { EASE } from "@/components/ui";
import IntegrationsSidebar, { type Integration } from "./IntegrationsSidebar";
import MemoryList, { type MemoryItem } from "./MemoryList";
import PinnedMemories, { type PinnedMemory } from "./PinnedMemories";

const BACKGROUND_IMAGE =
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2200&q=80";

const integrations: Integration[] = [
  { id: "gmail", title: "Gmail", status: "connected" },
  { id: "calendar", title: "Google Calendar", status: "connected" },
  { id: "slack", title: "Slack", status: "connected" },
  { id: "zoom", title: "Zoom", status: "inactive" },
  { id: "notion", title: "Notion", status: "connected" },
  { id: "fireflies", title: "Fireflies", status: "connected" },
  { id: "hubspot", title: "HubSpot", status: "inactive" },
];

const chips = [
  "Summarize recent meetings",
  "Find pricing discussions",
  "What did Acme ask for?",
  "Show contract changes",
];

const memories: MemoryItem[] = [
  {
    id: "demo-call",
    icon: "📅",
    title: "Demo call with Acme Corp",
    description: "Discussed enterprise plan and custom pricing",
    source: "Google Calendar",
    time: "2h ago",
  },
  {
    id: "contract-draft",
    icon: "📧",
    title: "Acme – Contract draft attached",
    description: "Emailed by John Smith",
    source: "Gmail",
    time: "5h ago",
  },
  {
    id: "pricing-thread",
    icon: "💬",
    title: "#sales – Pricing conversation",
    description: "Customers looking for annual commitment discounts",
    source: "Slack",
    time: "1d ago",
  },
  {
    id: "onboarding-plan",
    icon: "📝",
    title: "Acme onboarding plan",
    description: "Internal implementation notes",
    source: "Notion",
    time: "2d ago",
  },
];

const pinnedMemories: PinnedMemory[] = [
  {
    id: "acme-pricing",
    title: "Acme pricing discussion",
    detail: "Key points from last 3 conversations",
    source: "Slack",
    time: "3d ago",
  },
  {
    id: "enterprise-reqs",
    title: "Enterprise requirements",
    detail: "Technical & security requirements",
    source: "Notion",
    time: "5d ago",
  },
  {
    id: "q4-planning",
    title: "Q4 planning call",
    detail: "Roadmap and deliverables",
    source: "Google Calendar",
    time: "1w ago",
  },
];

export default function DashboardPreview() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIntegration, setActiveIntegration] = useState("gmail");
  const [prompt, setPrompt] = useState("");
  const [selectedChip, setSelectedChip] = useState<string | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [18, -18]);

  return (
    <section ref={sectionRef} className="relative px-6 py-[120px] lg:px-8">
      <div className="mx-auto w-full max-w-[1400px]">
        <motion.div
          className="relative h-[850px] overflow-hidden rounded-[32px]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <motion.div
            className="absolute inset-0 scale-[1.03] bg-cover bg-center"
            style={{
              y: imageY,
              backgroundImage: `url("${BACKGROUND_IMAGE}")`,
            }}
            aria-hidden
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(11, 11, 10, 0.5), rgba(11, 11, 10, 0.8))",
            }}
            aria-hidden
          />

          <div className="relative z-10 flex h-full items-center justify-center px-3 py-12 sm:px-6">
            <motion.div
              className="h-[650px] w-[1100px] max-w-[95%]"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <motion.div
                className="h-full overflow-hidden rounded-[24px] border border-white/10 bg-card"
                animate={{ y: [0, -8] }}
                transition={{ duration: 12, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
                style={{ willChange: "transform" }}
              >
                <div className="flex h-full flex-col md:grid md:grid-cols-[220px_1fr] lg:grid-cols-[240px_1fr]">
                  <IntegrationsSidebar
                    integrations={integrations}
                    activeIntegration={activeIntegration}
                    onSelectIntegration={setActiveIntegration}
                  />

                  <div className="h-full overflow-y-auto bg-card p-5 sm:p-7 md:p-8">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <h3 className="text-[20px] font-normal tracking-[-0.03em] text-ink">
                        <span className="mr-2 inline-block">🧠</span>
                        Engram Memory
                      </h3>

                      <div className="flex items-center gap-2">
                        <label className="group relative flex h-10 w-[220px] items-center rounded-xl border border-white/10 bg-black/20 px-3 transition-colors duration-200 ease-editorial focus-within:border-white/20 focus-within:bg-black/30">
                          <Search size={14} className="text-white/50" />
                          <input
                            type="text"
                            placeholder="Search memories..."
                            className="ml-2 w-full bg-transparent text-[13px] text-ink placeholder:text-white/45 focus:outline-none"
                          />
                          <span className="ml-2 rounded-md border border-white/15 bg-white/[0.03] px-1.5 py-0.5 font-mono text-[11px] text-white/50">
                            ⌘K
                          </span>
                        </label>

                        <button
                          type="button"
                          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/25 text-white/70 transition-all duration-200 ease-editorial hover:bg-white/[0.06] hover:text-white"
                          aria-label="Open settings"
                        >
                          <Settings2 size={15} />
                        </button>

                        <button
                          type="button"
                          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/20 text-sm text-white/90 transition-colors duration-200 ease-editorial hover:bg-white/[0.08]"
                          aria-label="Open profile"
                        >
                          N
                        </button>
                      </div>
                    </div>

                    <div className="mt-6 rounded-2xl border border-white/10 bg-black/25 p-3">
                      <div className="relative flex min-h-[64px] items-start gap-3 rounded-xl border border-white/10 bg-[#10100f] px-4 py-3">
                        <Sparkles size={14} className="mt-1 text-accent" />
                        <textarea
                          value={prompt}
                          onChange={(event) => setPrompt(event.target.value)}
                          rows={1}
                          placeholder="Ask your memory..."
                          className="h-[28px] flex-1 resize-none bg-transparent text-[15px] leading-7 text-ink placeholder:text-transparent focus:outline-none"
                        />
                        {!prompt && (
                          <div className="pointer-events-none absolute left-11 top-4 flex items-center text-[15px] text-white/45">
                            Ask your memory...
                            <motion.span
                              className="ml-1 h-4 w-[1px] bg-white/80"
                              animate={{ opacity: [0, 1, 0] }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            />
                          </div>
                        )}
                        <button
                          type="button"
                          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-white/80 transition-colors duration-200 ease-editorial hover:bg-white/[0.1] hover:text-white"
                          aria-label="Send prompt"
                        >
                          <SendHorizontal size={14} />
                        </button>
                      </div>

                      <div className="mt-3 flex flex-wrap gap-2">
                        {chips.map((chip) => {
                          const active = selectedChip === chip;
                          return (
                            <button
                              key={chip}
                              type="button"
                              onClick={() => setSelectedChip(active ? null : chip)}
                              className={`rounded-full border px-3 py-1.5 text-[12px] transition-colors duration-200 ease-editorial ${
                                active
                                  ? "border-accent/50 bg-accent-soft text-white"
                                  : "border-white/10 bg-white/[0.03] text-white/75 hover:bg-white/[0.06]"
                              }`}
                            >
                              {chip}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <MemoryList memories={memories} />
                    <PinnedMemories memories={pinnedMemories} />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
