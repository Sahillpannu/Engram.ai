"use client";

import { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot } from "lucide-react";
import { EASE } from "./ui";

const ACCENT = "#ff6b2c";

type Source = {
  id: string;
  icon: string;
  app: string;
  detail: string;
  floatDelay: number;
};

const sources: Source[] = [
  {
    id: "gmail",
    icon: "📧",
    app: "Gmail",
    detail: "Contract draft attached",
    floatDelay: 0,
  },
  {
    id: "calendar",
    icon: "📅",
    app: "Calendar",
    detail: "Demo with Acme",
    floatDelay: 0.9,
  },
  {
    id: "meetings",
    icon: "🎥",
    app: "Meetings",
    detail: "Enterprise pricing call",
    floatDelay: 1.8,
  },
  {
    id: "slack",
    icon: "💬",
    app: "Slack",
    detail: "#sales pricing discussion",
    floatDelay: 2.6,
  },
  {
    id: "notion",
    icon: "📝",
    app: "Notion",
    detail: "Acme onboarding plan",
    floatDelay: 3.2,
  },
];

const statusFrames = [
  { id: "typing", text: "Searching memory..." },
  { id: "first", text: "Found contract discussion" },
  { id: "second", text: "Acme requested enterprise pricing." },
];

function Packet({
  pathId,
  begin,
  duration,
}: {
  pathId: string;
  begin: string;
  duration: string;
}) {
  return (
    <circle r="3" fill={ACCENT} filter="url(#hero-packet-glow)">
      <animateMotion dur={duration} begin={begin} repeatCount="indefinite">
        <mpath href={`#${pathId}`} />
      </animateMotion>
    </circle>
  );
}

const SourceCard = forwardRef<
  HTMLDivElement,
  { source: Source; index: number }
>(function SourceCard({ source, index }, ref) {
  return (
    <motion.div
      ref={ref}
      className="h-[72px] w-[180px] rounded-[18px] border border-white/10 bg-card px-3.5 py-2.5"
      initial={{ opacity: 0, x: -18 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      animate={{ y: [0, -6] }}
      whileHover={{ borderColor: "rgba(255,255,255,0.2)" }}
      transition={{
        opacity: { duration: 0.5, ease: EASE, delay: 0.2 + index * 0.08 },
        x: { duration: 0.5, ease: EASE, delay: 0.2 + index * 0.08 },
        y: {
          duration: 5,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse",
          delay: source.floatDelay,
        },
      }}
    >
      <p className="font-mono text-[9px] uppercase tracking-[0.13em] text-white/45">
        Source
      </p>
      <div className="mt-0.5 flex items-center gap-1.5">
        <span className="text-[14px]" aria-hidden>
          {source.icon}
        </span>
        <span className="text-[14px] text-white/92">{source.app}</span>
      </div>
      <p className="mt-0.5 truncate text-[11px] text-white/55">
        {source.detail}
      </p>
    </motion.div>
  );
});

const BrainGraph = () => {
  const nodes = useMemo(
    () => [
      { cx: 44, cy: 32, dx: 8, dy: -5, delay: 0 },
      { cx: 86, cy: 26, dx: -7, dy: 4, delay: 0.6 },
      { cx: 124, cy: 35, dx: 9, dy: 3, delay: 1.1 },
      { cx: 26, cy: 72, dx: 7, dy: -3, delay: 0.3 },
      { cx: 70, cy: 76, dx: -8, dy: 4, delay: 1.4 },
      { cx: 112, cy: 70, dx: 7, dy: -5, delay: 0.9 },
      { cx: 150, cy: 82, dx: -7, dy: 4, delay: 0.2 },
      { cx: 54, cy: 116, dx: 8, dy: 5, delay: 1.7 },
      { cx: 94, cy: 120, dx: -9, dy: -4, delay: 0.8 },
      { cx: 136, cy: 112, dx: 8, dy: 4, delay: 1.3 },
    ],
    []
  );

  return (
    <svg
      viewBox="0 0 176 132"
      className="mt-4 h-[92px] w-[136px] opacity-20"
      role="presentation"
      aria-hidden
    >
      <g stroke="rgba(247,247,244,0.55)" strokeWidth="0.8">
        <line x1="44" y1="32" x2="86" y2="26" />
        <line x1="86" y1="26" x2="124" y2="35" />
        <line x1="44" y1="32" x2="26" y2="72" />
        <line x1="86" y1="26" x2="70" y2="76" />
        <line x1="124" y1="35" x2="112" y2="70" />
        <line x1="112" y1="70" x2="150" y2="82" />
        <line x1="26" y1="72" x2="70" y2="76" />
        <line x1="70" y1="76" x2="112" y2="70" />
        <line x1="70" y1="76" x2="54" y2="116" />
        <line x1="112" y1="70" x2="94" y2="120" />
        <line x1="150" y1="82" x2="136" y2="112" />
        <line x1="54" y1="116" x2="94" y2="120" />
        <line x1="94" y1="120" x2="136" y2="112" />
      </g>
      {nodes.map((node, index) => (
        <motion.circle
          key={index}
          cx={node.cx}
          cy={node.cy}
          r="2.2"
          fill={ACCENT}
          animate={{
            cx: [node.cx, node.cx + node.dx, node.cx],
            cy: [node.cy, node.cy + node.dy, node.cy],
          }}
          transition={{
            duration: 6.5,
            ease: "easeInOut",
            repeat: Infinity,
            delay: node.delay,
          }}
        />
      ))}
    </svg>
  );
};

const BrainCard = forwardRef<HTMLDivElement>(function BrainCard(_, ref) {
  return (
    <motion.div
      ref={ref}
      className="relative flex h-[220px] w-[220px] flex-col items-center rounded-[28px] border border-white/10 bg-[#0b0b0a] pt-8"
      initial={{ opacity: 0, scale: 0.94 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: EASE, delay: 0.8 }}
      animate={{
        scale: [1, 1.015, 1],
        borderColor: [
          "rgba(255,255,255,0.08)",
          "rgba(255,107,44,0.45)",
          "rgba(255,255,255,0.08)",
        ],
      }}
    >
      <div
        className="pointer-events-none absolute -inset-10 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255,107,44,0.15), transparent 70%)",
        }}
        aria-hidden
      />

      {/* Input dot */}
      <motion.span
        className="absolute left-1/2 top-[30px] h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-accent"
        animate={{ scale: [1, 1.8, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.span
        className="absolute left-1/2 top-[30px] h-2.5 w-2.5 -translate-x-1/2 rounded-full border border-accent/60"
        animate={{ scale: [1, 5, 1], opacity: [0.5, 0, 0.5] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
      />

      {/* Output dot */}
      <span className="absolute bottom-3 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-accent" />

      <p className="mt-3 text-center text-[28px] leading-[1.05] tracking-[0.13em] text-white/95">
        ENGRAM
        <br />
        BRAIN
      </p>
      <p className="mt-2 text-[11px] tracking-[0.05em] text-white/50">
        persistent memory layer
      </p>
      <BrainGraph />
    </motion.div>
  );
});

const AgentCard = forwardRef<HTMLDivElement, { statusIndex: number }>(
  function AgentCard({ statusIndex }, ref) {
    return (
      <motion.div
        ref={ref}
        className="relative flex w-[220px] flex-col items-start rounded-[28px] border border-white/10 bg-[#0b0b0a] p-6"
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, ease: EASE, delay: 1.05 }}
      >
        <span className="absolute left-1/2 top-3 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-accent" />

        <Bot className="h-7 w-7 text-white/92" />
        <p className="mt-3 text-[17px] text-white/92">AI Agent</p>
        <p className="mt-1 text-[11px] text-white/55">
          Answers questions, drafts replies, takes action
        </p>

        <div className="mt-4 w-full rounded-xl border border-white/10 bg-[#10100f] p-2.5">
          <AnimatePresence mode="wait">
            <motion.p
              key={statusFrames[statusIndex].id}
              className="flex min-h-7 items-center text-[11px] text-white/78"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.35, ease: EASE }}
            >
              {statusIndex === 0 ? (
                <span className="inline-flex items-center gap-1.5">
                  <motion.span
                    className="h-1.5 w-1.5 rounded-full bg-accent"
                    animate={{ opacity: [0.2, 1, 0.2] }}
                    transition={{ duration: 0.9, repeat: Infinity, delay: 0 }}
                  />
                  <motion.span
                    className="h-1.5 w-1.5 rounded-full bg-accent"
                    animate={{ opacity: [0.2, 1, 0.2] }}
                    transition={{ duration: 0.9, repeat: Infinity, delay: 0.16 }}
                  />
                  <motion.span
                    className="h-1.5 w-1.5 rounded-full bg-accent"
                    animate={{ opacity: [0.2, 1, 0.2] }}
                    transition={{ duration: 0.9, repeat: Infinity, delay: 0.32 }}
                  />
                  <span>Searching memory...</span>
                </span>
              ) : (
                statusFrames[statusIndex].text
              )}
            </motion.p>
          </AnimatePresence>
        </div>

        <div className="mt-2.5 space-y-1 text-[10px] text-white/58">
          <p className="truncate">• Found contract discussion</p>
          <p className="truncate">• Acme requested enterprise pricing.</p>
        </div>
      </motion.div>
    );
  }
);

export default function MemoryGraph() {
  const [statusIndex, setStatusIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const sourceRefs = useRef<(HTMLDivElement | null)[]>([]);
  const brainRef = useRef<HTMLDivElement>(null);
  const agentRef = useRef<HTMLDivElement>(null);
  const [sourcePaths, setSourcePaths] = useState<string[]>([]);
  const [agentPath, setAgentPath] = useState<string>("");

  useEffect(() => {
    const calc = () => {
      const container = containerRef.current;
      if (!container) return;
      const cRect = container.getBoundingClientRect();

      const brain = brainRef.current?.getBoundingClientRect();
      const agent = agentRef.current?.getBoundingClientRect();
      if (!brain || !agent) return;

      const destX = brain.left + brain.width / 2 - cRect.left;
      const destY = brain.top - cRect.top + 30;

      const paths = sources.map((_, i) => {
        const rect = sourceRefs.current[i]?.getBoundingClientRect();
        if (!rect) return "";
        const startX = rect.right - cRect.left;
        const startY = rect.top + rect.height / 2 - cRect.top;
        const midX = (startX + destX) / 2;
        return `M ${startX} ${startY} C ${midX} ${startY}, ${destX} ${destY - 24}, ${destX} ${destY}`;
      });
      setSourcePaths(paths);

      const startX = brain.left + brain.width / 2 - cRect.left;
      const startY = brain.bottom - cRect.top - 12;
      const endX = agent.left + agent.width / 2 - cRect.left;
      const endY = agent.top - cRect.top + 12;
      const midY = (startY + endY) / 2;
      setAgentPath(
        `M ${startX} ${startY} C ${startX} ${midY}, ${endX} ${midY}, ${endX} ${endY}`
      );
    };

    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setStatusIndex((current) => (current + 1) % statusFrames.length);
    }, 2600);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full">
      <div className="hidden md:block">
        <motion.div
          className="relative h-[640px] overflow-hidden rounded-[32px] border border-white/10 bg-[#111110] p-8 xl:h-[680px]"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)",
              backgroundSize: "52px 52px",
            }}
            aria-hidden
          />

          <p className="absolute left-8 top-7 z-30 text-[14px] text-white/90">
            <span className="mr-2 text-accent">●</span>
            All knowledge flows into Engram
          </p>
          <p className="absolute left-8 top-[3.25rem] z-30 text-[12px] text-white/50">
            One memory layer for your AI agents
          </p>

          <div
            ref={containerRef}
            className="relative mx-auto h-full w-full max-w-[760px]"
          >
            <svg
              className="absolute inset-0 h-full w-full overflow-visible"
              role="img"
              aria-label="Data from tools continuously flows into Engram Brain and then powers the AI Agent"
            >
              <defs>
                <filter
                  id="hero-packet-glow"
                  x="-300%"
                  y="-300%"
                  width="700%"
                  height="700%"
                >
                  <feGaussianBlur stdDeviation="2.4" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {sources.map((source, index) => {
                const d = sourcePaths[index];
                if (!d) return null;
                return (
                  <g key={source.id}>
                    <motion.path
                      id={`src-path-${source.id}`}
                      d={d}
                      fill="none"
                      stroke="rgba(255,255,255,0.15)"
                      strokeWidth="1.3"
                      strokeLinecap="round"
                      initial={{ pathLength: 0, opacity: 0.2 }}
                      whileInView={{ pathLength: 1, opacity: 1 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{
                        duration: 0.8,
                        ease: EASE,
                        delay: 0.5 + index * 0.08,
                      }}
                    />
                    <motion.path
                      d={d}
                      fill="none"
                      stroke={ACCENT}
                      strokeWidth="1"
                      strokeLinecap="round"
                      opacity="0.16"
                      animate={{ opacity: [0.05, 0.6, 0.05] }}
                      transition={{
                        duration: 2.8,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1.2 + index * 0.24,
                      }}
                    />
                    <Packet
                      pathId={`src-path-${source.id}`}
                      begin={`${index * 0.4}s`}
                      duration="2.6s"
                    />
                  </g>
                );
              })}

              {agentPath && (
                <g>
                  <motion.path
                    id="brain-agent-path"
                    d={agentPath}
                    fill="none"
                    stroke="rgba(255,255,255,0.15)"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0.2 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.8, ease: EASE, delay: 1.05 }}
                  />
                  <motion.path
                    d={agentPath}
                    fill="none"
                    stroke={ACCENT}
                    strokeWidth="1"
                    strokeLinecap="round"
                    opacity="0.18"
                    animate={{ opacity: [0.04, 0.56, 0.04] }}
                    transition={{
                      duration: 3.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 2.8,
                    }}
                  />
                  <Packet
                    pathId="brain-agent-path"
                    begin="0s"
                    duration="2.8s"
                  />
                </g>
              )}
            </svg>

            <div className="absolute left-5 top-16 flex flex-col gap-5">
              {sources.map((source, index) => (
                <SourceCard
                  key={source.id}
                  ref={(el) => {
                    sourceRefs.current[index] = el;
                  }}
                  source={source}
                  index={index}
                />
              ))}
            </div>

            <div className="absolute left-1/2 top-20 -translate-x-1/2">
              <BrainCard ref={brainRef} />
            </div>

            <div className="absolute left-1/2 top-[328px] -translate-x-1/2">
              <AgentCard ref={agentRef} statusIndex={statusIndex} />
            </div>
          </div>
        </motion.div>
      </div>

      <div className="md:hidden">
        <motion.div
          className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#111110] p-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)",
              backgroundSize: "44px 44px",
            }}
            aria-hidden
          />

          <div className="relative z-10 space-y-2">
            {sources.map((source, index) => (
              <motion.div
                key={source.id}
                className="rounded-2xl border border-white/10 bg-card px-4 py-3"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.45, ease: EASE, delay: 0.12 + index * 0.05 }}
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-white/45">
                  Source
                </p>
                <p className="mt-1 text-[15px] text-white/92">
                  <span className="mr-1.5">{source.icon}</span>
                  {source.app}
                </p>
                <p className="text-[12px] text-white/55">{source.detail}</p>
              </motion.div>
            ))}
          </div>

          <div className="relative z-10 mx-auto my-4 h-12 w-px bg-white/15">
            <motion.span
              className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-accent"
              animate={{ y: [0, 38], opacity: [0, 1, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          <motion.div
            className="relative z-10 mx-auto w-full max-w-[280px] rounded-[26px] border border-white/10 bg-[#0b0b0a] px-5 pb-5 pt-8 text-center"
            animate={{ scale: [1, 1.015, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-accent" />
            <p className="mt-4 text-[26px] leading-[1.05] tracking-[0.13em] text-white/95">
              ENGRAM
              <br />
              BRAIN
            </p>
            <p className="mt-2 text-[11px] text-white/55">persistent memory layer</p>
          </motion.div>

          <div className="relative z-10 mx-auto my-4 h-12 w-px bg-white/15">
            <motion.span
              className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-accent"
              animate={{ y: [0, 38], opacity: [0, 1, 0] }}
              transition={{ duration: 1.9, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
            />
          </div>

          <motion.div
            className="relative z-10 mx-auto w-full max-w-[240px] rounded-[22px] border border-white/10 bg-card p-4 text-center"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.45, ease: EASE, delay: 0.55 }}
          >
            <Bot className="mx-auto h-8 w-8 text-white/92" />
            <p className="mt-1 text-[18px] text-white/92">AI Agent</p>
            <p className="text-[12px] text-white/55">
              Answers questions, drafts replies, takes action
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
