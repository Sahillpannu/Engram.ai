"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EASE } from "./ui";

const ACCENT = "#ff6b2c";

type Source = {
  id: string;
  icon: string;
  app: string;
  detail: string;
  top: number;
  path: string;
  floatDelay: number;
};

const sources: Source[] = [
  {
    id: "gmail",
    icon: "📧",
    app: "Gmail",
    detail: "Contract draft attached",
    top: 92,
    path: "M 200 128 C 250 128 270 214 310 236",
    floatDelay: 0,
  },
  {
    id: "calendar",
    icon: "📅",
    app: "Calendar",
    detail: "Demo with Acme",
    top: 184,
    path: "M 200 220 C 252 220 272 248 310 258",
    floatDelay: 0.9,
  },
  {
    id: "meetings",
    icon: "🎥",
    app: "Meetings",
    detail: "Enterprise pricing call",
    top: 276,
    path: "M 200 312 C 252 312 272 274 310 276",
    floatDelay: 1.8,
  },
  {
    id: "slack",
    icon: "💬",
    app: "Slack",
    detail: "#sales pricing discussion",
    top: 368,
    path: "M 200 404 C 252 404 272 300 310 292",
    floatDelay: 2.6,
  },
  {
    id: "notion",
    icon: "📝",
    app: "Notion",
    detail: "Acme onboarding plan",
    top: 460,
    path: "M 200 496 C 252 496 272 326 310 306",
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

function PacketStream({
  pathId,
  baseDelay,
  duration,
}: {
  pathId: string;
  baseDelay: number;
  duration: number;
}) {
  return (
    <>
      <Packet pathId={pathId} begin={`${baseDelay}s`} duration={`${duration}s`} />
      <Packet pathId={pathId} begin={`${baseDelay + 0.36}s`} duration={`${duration}s`} />
      <Packet pathId={pathId} begin={`${baseDelay + 0.72}s`} duration={`${duration}s`} />
    </>
  );
}

function SourceCard({ source, index }: { source: Source; index: number }) {
  return (
    <motion.div
      className="absolute left-5 z-20 h-[72px] w-[180px] rounded-[18px] border border-white/10 bg-card px-3.5 py-2.5"
      style={{ top: source.top }}
      initial={{ opacity: 0, x: -18 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      animate={{ y: [0, -6] }}
      whileHover={{ borderColor: "rgba(255,255,255,0.2)" }}
      {...{
        transition: {
          opacity: { duration: 0.5, ease: EASE, delay: 0.2 + index * 0.08 },
          x: { duration: 0.5, ease: EASE, delay: 0.2 + index * 0.08 },
          y: {
            duration: 5,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse",
            delay: source.floatDelay,
          },
        },
      }}
    >
      <p className="font-mono text-[9px] uppercase tracking-[0.13em] text-white/45">Source</p>
      <div className="mt-0.5 flex items-center gap-1.5">
        <span className="text-[14px]" aria-hidden>
          {source.icon}
        </span>
        <span className="text-[14px] text-white/92">{source.app}</span>
      </div>
      <p className="mt-0.5 truncate text-[11px] text-white/55">{source.detail}</p>
    </motion.div>
  );
}

function BrainGraph() {
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
          animate={{ cx: [node.cx, node.cx + node.dx, node.cx], cy: [node.cy, node.cy + node.dy, node.cy] }}
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
}

export default function MemoryGraph() {
  const [statusIndex, setStatusIndex] = useState(0);

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
          className="relative h-[680px] overflow-hidden rounded-[32px] border border-white/10 bg-[#111110] p-8 lg:h-[720px] xl:h-[760px]"
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

          <div className="absolute inset-0 z-10 flex items-center justify-center">
            <div className="relative mx-auto aspect-[760/640] w-full max-w-[760px]">
              <svg
                viewBox="0 0 760 640"
                className="absolute inset-0 h-full w-full"
                role="img"
                aria-label="Data from tools continuously flows into Engram Brain and then powers the AI Agent"
              >
                <defs>
                  <filter id="hero-packet-glow" x="-300%" y="-300%" width="700%" height="700%">
                    <feGaussianBlur stdDeviation="2.4" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {sources.map((source, index) => (
                  <g key={source.id}>
                    <motion.path
                      id={`src-path-${source.id}`}
                      d={source.path}
                      fill="none"
                      stroke="rgba(255,255,255,0.15)"
                      strokeWidth="1.3"
                      strokeLinecap="round"
                      initial={{ pathLength: 0, opacity: 0.2 }}
                      whileInView={{ pathLength: 1, opacity: 1 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.8, ease: EASE, delay: 0.5 + index * 0.08 }}
                    />
                    <motion.path
                      d={source.path}
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
                    <PacketStream
                      pathId={`src-path-${source.id}`}
                      baseDelay={2 + index * 0.35}
                      duration={2.9}
                    />
                  </g>
                ))}

                <motion.path
                  id="brain-agent-path"
                  d="M 530 290 C 545 290 555 295 570 295"
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
                  d="M 530 290 C 545 290 555 295 570 295"
                  fill="none"
                  stroke={ACCENT}
                  strokeWidth="1"
                  strokeLinecap="round"
                  opacity="0.18"
                  animate={{ opacity: [0.04, 0.56, 0.04] }}
                  transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 2.8 }}
                />
                <PacketStream pathId="brain-agent-path" baseDelay={3} duration={3.8} />
              </svg>

              {sources.map((source, index) => (
                <SourceCard key={source.id} source={source} index={index} />
              ))}

              <motion.div
                className="absolute left-[310px] top-[180px] z-30"
                initial={{ opacity: 0, scale: 0.94 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: EASE, delay: 0.8 }}
              >
                <div
                  className="absolute -inset-10 rounded-full"
                  style={{
                    background: "radial-gradient(circle, rgba(255,107,44,0.15), transparent 70%)",
                  }}
                  aria-hidden
                />
                <motion.div
                  className="relative flex h-[220px] w-[220px] flex-col items-center rounded-[28px] border border-white/10 bg-[#0b0b0a] pt-8"
                  animate={{
                    scale: [1, 1.015, 1],
                    borderColor: [
                      "rgba(255,255,255,0.08)",
                      "rgba(255,107,44,0.45)",
                      "rgba(255,255,255,0.08)",
                    ],
                  }}
                  transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
                >
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
                  <p className="mt-3 text-center font-mono text-[28px] leading-[1.05] tracking-[0.13em] text-white/95">
                    ENGRAM
                    <br />
                    BRAIN
                  </p>
                  <p className="mt-2 text-[11px] tracking-[0.05em] text-white/50">
                    persistent memory layer
                  </p>
                  <BrainGraph />
                </motion.div>
              </motion.div>

              <motion.div
                className="absolute left-[570px] top-[200px] z-30 h-[190px] w-[170px] rounded-[20px] border border-white/10 bg-card p-4"
                initial={{ opacity: 0, x: 14 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, ease: EASE, delay: 1.05 }}
              >
                <div className="text-center">
                  <p className="text-[30px]">🤖</p>
                  <p className="mt-1 text-[17px] tracking-[0.02em] text-white/92">AI Agent</p>
                  <p className="text-[11px] text-white/55">Reasoning over memory</p>
                </div>

                <div className="mt-3 rounded-xl border border-white/10 bg-[#10100f] p-2.5">
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

              <div className="pointer-events-none absolute bottom-4 left-5 right-5 grid grid-cols-4 gap-3 border-t border-white/10 pt-4 text-[11px] text-white/58">
                <p>Unified memory</p>
                <p>Semantic search</p>
                <p>Always up to date</p>
                <p>Private and secure</p>
              </div>
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
                <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-white/45">Source</p>
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
            <p className="mt-4 font-mono text-[26px] leading-[1.05] tracking-[0.13em] text-white/95">
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
            <p className="text-[34px]">🤖</p>
            <p className="text-[18px] text-white/92">AI Agent</p>
            <p className="text-[12px] text-white/55">Reasoning over memory</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
