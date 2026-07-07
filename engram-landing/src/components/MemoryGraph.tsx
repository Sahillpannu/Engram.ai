"use client";

import {
  forwardRef,
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion, useReducedMotion, Variants } from "framer-motion";
import { Bot } from "lucide-react";
import { EASE } from "./ui";

// ─── Constants ───────────────────────────────────────────────────────────────

const ACCENT = "#ff6b2c";

type Source = {
  id: string;
  icon: string;
  app: string;
  detail: string;
  floatDelay: number;
};

const sources: Source[] = [
  { id: "gmail",    icon: "📧", app: "Gmail",    detail: "Contract draft attached",   floatDelay: 0   },
  { id: "calendar", icon: "📅", app: "Calendar", detail: "Demo with Acme",            floatDelay: 0.9 },
  { id: "meetings", icon: "🎥", app: "Meetings", detail: "Enterprise pricing call",   floatDelay: 1.8 },
  { id: "slack",    icon: "💬", app: "Slack",    detail: "#sales pricing discussion", floatDelay: 2.6 },
  { id: "notion",   icon: "📝", app: "Notion",   detail: "Acme onboarding plan",      floatDelay: 3.2 },
];

const statusFrames = [
  { id: "typing", text: "Searching memory..." },
  { id: "first",  text: "Found contract discussion" },
  { id: "second", text: "Acme requested enterprise pricing." },
];

// ─── Animation Variants ──────────────────────────────────────────────────────

const cardInVariants: Variants = {
  hidden: { opacity: 0, x: -14 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: EASE, delay: 0.2 + i * 0.08 },
  }),
};

const brainCardVariants: Variants = {
  hidden:  { opacity: 0, scale: 0.94 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: EASE, delay: 0.6 } },
};

const agentCardVariants: Variants = {
  hidden:  { opacity: 0, x: 14 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE, delay: 0.9 } },
};

const dotVariants: Variants = {
  animate: (delay: number) => ({
    opacity: [0.2, 1, 0.2],
    transition: { duration: 0.9, repeat: Infinity, delay },
  }),
};

// ─── Path helpers ─────────────────────────────────────────────────────────────

/**
 * Horizontal S-curve: right-centre of srcRect → left-centre of destRect.
 * Control points pull horizontally so the curve is smooth and never vertical.
 */
function buildHPath(srcRect: DOMRect, destRect: DOMRect, cRect: DOMRect): string {
  const x1 = srcRect.right  - cRect.left;
  const y1 = srcRect.top    + srcRect.height  / 2 - cRect.top;
  const x2 = destRect.left  - cRect.left;
  const y2 = destRect.top   + destRect.height / 2 - cRect.top;
  // Midpoint for symmetric bezier handles
  const mx = (x1 + x2) / 2;
  return `M ${x1} ${y1} C ${mx} ${y1}, ${mx} ${y2}, ${x2} ${y2}`;
}

// ─── FlowingPath ─────────────────────────────────────────────────────────────

function FlowingPath({
  d,
  drawDelay,
  packetDelay,
  reduced,
}: {
  d: string;
  drawDelay: number;
  packetDelay: number;
  reduced: boolean;
}) {
  const DASH = 140;
  const GAP  = 300;

  return (
    <g>
      {/* Static rail */}
      <motion.path
        d={d}
        fill="none"
        stroke="rgba(255,255,255,0.10)"
        strokeWidth="1.5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.0, ease: EASE, delay: drawDelay }}
      />

      {/* Travelling accent dash — GPU-composited via strokeDashoffset */}
      {!reduced && (
        <motion.path
          d={d}
          fill="none"
          stroke={ACCENT}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray={`${DASH} ${GAP}`}
          initial={{ strokeDashoffset: 0, opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          animate={{ strokeDashoffset: [0, -(DASH + GAP)] }}
          transition={{
            strokeDashoffset: {
              duration: 2.2,
              repeat: Infinity,
              ease: "linear",
              delay: packetDelay,
            },
            opacity: { duration: 0.5, delay: drawDelay + 0.3 },
          }}
        />
      )}

      {/* Reduced-motion fallback: static accent line */}
      {reduced && (
        <path
          d={d}
          fill="none"
          stroke={ACCENT}
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.22"
        />
      )}
    </g>
  );
}

// ─── BrainGraph (internal neural net visualisation) ───────────────────────────

const brainNodes = [
  { cx: 44,  cy: 32,  dx: 8,  dy: -5, delay: 0   },
  { cx: 86,  cy: 26,  dx: -7, dy: 4,  delay: 0.6 },
  { cx: 124, cy: 35,  dx: 9,  dy: 3,  delay: 1.1 },
  { cx: 26,  cy: 72,  dx: 7,  dy: -3, delay: 0.3 },
  { cx: 70,  cy: 76,  dx: -8, dy: 4,  delay: 1.4 },
  { cx: 112, cy: 70,  dx: 7,  dy: -5, delay: 0.9 },
  { cx: 150, cy: 82,  dx: -7, dy: 4,  delay: 0.2 },
  { cx: 54,  cy: 116, dx: 8,  dy: 5,  delay: 1.7 },
  { cx: 94,  cy: 120, dx: -9, dy: -4, delay: 0.8 },
  { cx: 136, cy: 112, dx: 8,  dy: 4,  delay: 1.3 },
];

const brainEdges: [number, number, number, number][] = [
  [44,32,86,26],[86,26,124,35],[44,32,26,72],[86,26,70,76],[124,35,112,70],
  [112,70,150,82],[26,72,70,76],[70,76,112,70],[70,76,54,116],[112,70,94,120],
  [150,82,136,112],[54,116,94,120],[94,120,136,112],
];

function BrainGraph({ reduced }: { reduced: boolean }) {
  return (
    <svg
      viewBox="0 0 176 132"
      className="mt-2 h-[56px] w-[90px] opacity-20"
      role="presentation"
      aria-hidden
    >
      <g stroke="rgba(247,247,244,0.55)" strokeWidth="0.8">
        {brainEdges.map(([x1, y1, x2, y2], i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />
        ))}
      </g>
      {brainNodes.map((n, i) =>
        reduced ? (
          <circle key={i} cx={n.cx} cy={n.cy} r="2.2" fill={ACCENT} />
        ) : (
          <motion.circle
            key={i}
            cx={n.cx}
            cy={n.cy}
            r="2.2"
            fill={ACCENT}
            animate={{ cx: [n.cx, n.cx + n.dx, n.cx], cy: [n.cy, n.cy + n.dy, n.cy] }}
            transition={{ duration: 6.5, ease: "easeInOut", repeat: Infinity, delay: n.delay }}
          />
        )
      )}
    </svg>
  );
}

// ─── SourceCard ───────────────────────────────────────────────────────────────

const SourceCard = forwardRef<HTMLDivElement, { source: Source; index: number; reduced: boolean }>(
  function SourceCard({ source, index, reduced }, ref) {
    return (
      <motion.div
        ref={ref}
        className="w-full rounded-[16px] border border-white/10 bg-card px-3.5 py-3"
        custom={index}
        variants={cardInVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        animate={
          reduced
            ? {}
            : {
                y: [0, -5, 0],
                transition: {
                  duration: 5,
                  ease: "easeInOut",
                  repeat: Infinity,
                  delay: source.floatDelay,
                },
              }
        }
        whileHover={{ borderColor: "rgba(255,255,255,0.22)" }}
      >
        <p className="font-mono text-[9px] uppercase tracking-[0.13em] text-white/40">Source</p>
        <div className="mt-0.5 flex items-center gap-1.5">
          <span className="text-[13px]" aria-hidden>{source.icon}</span>
          <span className="text-[13px] font-medium text-white/90">{source.app}</span>
        </div>
        <p className="mt-0.5 truncate text-[10px] text-white/50">{source.detail}</p>
      </motion.div>
    );
  }
);

// ─── BrainCard ────────────────────────────────────────────────────────────────

const BrainCard = forwardRef<HTMLDivElement, { reduced: boolean }>(
  function BrainCard({ reduced }, ref) {
    return (
      <motion.div
        ref={ref}
        className="relative flex w-[175px] shrink-0 flex-col items-center rounded-[24px] border border-white/10 bg-[#0b0b0a] px-3 py-5"
        variants={brainCardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        animate={
          reduced
            ? {}
            : {
                scale: [1, 1.013, 1],
                borderColor: [
                  "rgba(255,255,255,0.08)",
                  "rgba(255,107,44,0.38)",
                  "rgba(255,255,255,0.08)",
                ],
                transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
              }
        }
      >
        {/* Subtle radial glow */}
        <div
          className="pointer-events-none absolute inset-0 rounded-[28px] opacity-60"
          style={{ background: "radial-gradient(circle at 50% 40%, rgba(255,107,44,0.10), transparent 70%)" }}
          aria-hidden
        />

        {/* Left connection dot (receives from sources) */}
        <span className="absolute left-3 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-accent" />

        {/* Right connection dot (sends to agent) */}
        <span className="absolute right-3 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-accent" />

        {/* Pulsing sonar ring */}
        {!reduced && (
          <motion.span
            className="absolute left-3 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full border border-accent/50"
            animate={{ scale: [1, 3.5], opacity: [0.6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
          />
        )}

        <p className="relative z-10 text-center text-[17px] font-medium leading-[1.08] tracking-[0.12em] text-white/95">
          ENGRAM<br />BRAIN
        </p>
        <p className="relative z-10 mt-1 text-[9px] tracking-[0.04em] text-white/40">
          persistent memory layer
        </p>
        <BrainGraph reduced={reduced} />
      </motion.div>
    );
  }
);

// ─── AgentCard ────────────────────────────────────────────────────────────────

function TypingDots() {
  return (
    <span className="inline-flex items-center gap-1.5">
      {[0, 0.18, 0.36].map((delay, i) => (
        <motion.span
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-accent"
          custom={delay}
          variants={dotVariants}
          animate="animate"
        />
      ))}
      <span className="ml-1">Searching memory...</span>
    </span>
  );
}

const AgentCard = forwardRef<HTMLDivElement, { statusIndex: number; reduced: boolean }>(
  function AgentCard({ statusIndex, reduced }, ref) {
    return (
      <motion.div
        ref={ref}
        className="relative flex w-[175px] shrink-0 flex-col items-start rounded-[24px] border border-white/10 bg-[#0b0b0a] p-4"
        variants={agentCardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Left connection dot (receives from brain) */}
        <span className="absolute left-3 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-accent" />

        <Bot className="h-5 w-5 text-white/90" />
        <p className="mt-2 text-[13px] font-medium text-white/92">AI Agent</p>
        <p className="mt-0.5 text-[9px] leading-relaxed text-white/50">
          Answers questions, drafts replies, takes action
        </p>

        {/* Status terminal */}
        <div className="mt-2.5 w-full overflow-hidden rounded-xl border border-white/10 bg-[#10100f] p-2">
          <AnimatePresence mode="wait">
            <motion.p
              key={statusFrames[statusIndex].id}
              className="flex min-h-[22px] items-center text-[9px] leading-snug text-white/78"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.28, ease: EASE }}
            >
              {statusIndex === 0 ? (
                reduced ? <span>Searching memory...</span> : <TypingDots />
              ) : (
                statusFrames[statusIndex].text
              )}
            </motion.p>
          </AnimatePresence>
        </div>

        <div className="mt-1.5 space-y-0.5 text-[8px] text-white/35">
          <p className="truncate">• Found contract discussion</p>
          <p className="truncate">• Acme requested pricing.</p>
        </div>
      </motion.div>
    );
  }
);

// ─── MobileConnector ─────────────────────────────────────────────────────────

function MobileConnector({ reduced, delay }: { reduced: boolean; delay: number }) {
  return (
    <div className="flex justify-center py-1">
      <div className="relative h-10 w-px bg-white/15">
        {!reduced && (
          <motion.span
            className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-accent"
            animate={{ y: [0, 30], opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay }}
          />
        )}
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function MemoryGraph() {
  const reduced = useReducedMotion() ?? false;
  const [statusIndex, setStatusIndex] = useState(0);

  // ── Refs ────────────────────────────────────────────────────────────────────
  // containerRef wraps the entire inner layout so the SVG coordinate space
  // matches the card positions exactly.
  const containerRef = useRef<HTMLDivElement>(null);
  const sourceRefs   = useRef<(HTMLDivElement | null)[]>([]);
  const brainRef     = useRef<HTMLDivElement>(null);
  const agentRef     = useRef<HTMLDivElement>(null);

  const [sourcePaths, setSourcePaths] = useState<string[]>([]);
  const [agentPath,   setAgentPath]   = useState<string>("");

  /**
   * calcPaths: measures the bounding rects of all cards relative to the
   * SVG container and builds horizontal S-curves connecting them.
   *
   * Source right-centre → Brain left-centre  (one path per source card)
   * Brain  right-centre → Agent left-centre  (single path)
   */
  const calcPaths = useCallback(() => {
    const container = containerRef.current;
    const brain     = brainRef.current;
    const agent     = agentRef.current;
    if (!container || !brain || !agent) return;

    const cRect     = container.getBoundingClientRect();
    const brainRect = brain.getBoundingClientRect();
    const agentRect = agent.getBoundingClientRect();

    // One path per source card: card right-centre → brain left-centre
    const paths = sources.map((_, i) => {
      const el = sourceRefs.current[i];
      if (!el) return "";
      return buildHPath(el.getBoundingClientRect(), brainRect, cRect);
    });
    setSourcePaths(paths);

    // Brain right-centre → Agent left-centre
    setAgentPath(buildHPath(brainRect, agentRect, cRect));
  }, []);

  // useLayoutEffect: runs synchronously after DOM paint → no path flash on mount
  useLayoutEffect(() => {
    calcPaths();

    // ResizeObserver: recalculate whenever any observed element changes size
    // (covers font loads, parent resizes, orientation changes, etc.)
    const ro = new ResizeObserver(calcPaths);
    if (containerRef.current) ro.observe(containerRef.current);
    sourceRefs.current.forEach((el) => { if (el) ro.observe(el); });
    if (brainRef.current) ro.observe(brainRef.current);
    if (agentRef.current) ro.observe(agentRef.current);

    return () => ro.disconnect();
  }, [calcPaths]);

  // Status terminal cycling (skipped in reduced-motion mode)
  useLayoutEffect(() => {
    if (reduced) return;
    const id = window.setInterval(
      () => setStatusIndex((c) => (c + 1) % statusFrames.length),
      2600
    );
    return () => window.clearInterval(id);
  }, [reduced]);

  // Memoised grid background so the style object is stable across renders
  const gridStyle = useMemo(
    () => ({
      backgroundImage:
        "linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px)," +
        "linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)",
      backgroundSize: "48px 48px",
    }),
    []
  );

  return (
    <div className="relative w-full">

      {/* ══════════════════════════════════════════════════════
          DESKTOP LAYOUT  (md and above)
          Horizontal flex row: [Sources] ──── [Brain] ──── [Agent]
          SVG is absolute inset-0 z-0, cards are relative z-10
      ══════════════════════════════════════════════════════ */}
      <div className="hidden md:block">
        <motion.div
          className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[#111110]"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          {/* Grid background */}
          <div className="pointer-events-none absolute inset-0 z-0" style={gridStyle} aria-hidden />

          {/* Header caption */}
          <div className="relative z-10 border-b border-white/[0.06] px-8 py-5">
            <p className="text-[14px] text-white/90">
              <span className="mr-2 text-accent">●</span>All knowledge flows into Engram
            </p>
            <p className="mt-0.5 text-[12px] text-white/45">One memory layer for your AI agents</p>
          </div>

          {/*
            The containerRef div is the coordinate origin for the SVG.
            All card rects are measured relative to this div.
            SVG: absolute inset-0 z-0 (behind cards)
            Cards: relative z-10 (in front of SVG)
          */}
          <div ref={containerRef} className="relative px-6 py-8">
            {/* SVG overlay — sits behind the flex cards */}
            <svg
              className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-visible"
              role="img"
              aria-label="Data flows from tools into Engram Brain, then powers the AI Agent"
            >
              <defs>
                <filter id="mg-glow" x="-200%" y="-200%" width="500%" height="500%">
                  <feGaussianBlur stdDeviation="2" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Source → Brain paths */}
              {sources.map((source, i) => {
                const d = sourcePaths[i];
                if (!d) return null;
                return (
                  <FlowingPath
                    key={source.id}
                    d={d}
                    drawDelay={0.4 + i * 0.08}
                    packetDelay={i * 0.44}
                    reduced={reduced}
                  />
                );
              })}

              {/* Brain → Agent path */}
              {agentPath && (
                <FlowingPath
                  d={agentPath}
                  drawDelay={0.9}
                  packetDelay={0.2}
                  reduced={reduced}
                />
              )}
            </svg>

            {/*
              Three-column flex row.
              Each column is relative z-10 so it renders above the SVG.
              justify-between pushes the columns to the edges, leaving the
              SVG paths full room to draw between them.
            */}
            <div className="relative z-10 flex items-center justify-between gap-6">

              {/* ── Left column: Source cards ── */}
              <div className="flex flex-col gap-3" style={{ width: 215 }}>
                {sources.map((source, i) => (
                  <SourceCard
                    key={source.id}
                    ref={(el) => { sourceRefs.current[i] = el; }}
                    source={source}
                    index={i}
                    reduced={reduced}
                  />
                ))}
              </div>

              {/* ── Centre column: Brain card ── */}
              <div className="flex flex-col items-center">
                <BrainCard ref={brainRef} reduced={reduced} />
              </div>

              {/* ── Right column: Agent card ── */}
              <div className="flex flex-col items-center">
                <AgentCard ref={agentRef} statusIndex={statusIndex} reduced={reduced} />
              </div>

            </div>
          </div>
        </motion.div>
      </div>

      {/* ══════════════════════════════════════════════════════
          MOBILE LAYOUT  (below md)
          Vertical flex-col stack with connector lines between sections
      ══════════════════════════════════════════════════════ */}
      <div className="md:hidden">
        <motion.div
          className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#111110] p-5"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <div className="pointer-events-none absolute inset-0 z-0" style={gridStyle} aria-hidden />

          <div className="relative z-10 flex flex-col">
            {/* Source cards */}
            <div className="space-y-2">
              {sources.map((source, i) => (
                <motion.div
                  key={source.id}
                  className="rounded-2xl border border-white/10 bg-card px-4 py-3"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.4, ease: EASE, delay: 0.1 + i * 0.05 }}
                >
                  <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-white/40">Source</p>
                  <p className="mt-0.5 text-[14px] font-medium text-white/92">
                    <span className="mr-1.5" aria-hidden>{source.icon}</span>
                    {source.app}
                  </p>
                  <p className="text-[11px] text-white/50">{source.detail}</p>
                </motion.div>
              ))}
            </div>

            {/* Connector: sources → brain */}
            <MobileConnector reduced={reduced} delay={0} />

            {/* Brain card */}
            <motion.div
              className="relative mx-auto w-full max-w-[260px] rounded-[24px] border border-white/10 bg-[#0b0b0a] px-5 pb-5 pt-6 text-center"
              animate={
                reduced ? {} : {
                  scale: [1, 1.013, 1],
                  transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                }
              }
            >
              <div
                className="pointer-events-none absolute inset-0 rounded-[24px]"
                style={{ background: "radial-gradient(circle at 50% 40%, rgba(255,107,44,0.10), transparent 70%)" }}
                aria-hidden
              />
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-accent" />
              <p className="mt-3 text-[22px] leading-[1.08] tracking-[0.12em] text-white/95">
                ENGRAM<br />BRAIN
              </p>
              <p className="mt-1.5 text-[11px] text-white/45">persistent memory layer</p>
            </motion.div>

            {/* Connector: brain → agent */}
            <MobileConnector reduced={reduced} delay={0.3} />

            {/* Agent card */}
            <motion.div
              className="relative mx-auto w-full max-w-[240px] rounded-[24px] border border-white/10 bg-[#0b0b0a] p-5 text-center"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.4, ease: EASE, delay: 0.5 }}
            >
              <Bot className="mx-auto h-7 w-7 text-white/90" />
              <p className="mt-2 text-[17px] font-medium text-white/92">AI Agent</p>
              <p className="mt-0.5 text-[11px] text-white/50">
                Answers questions, drafts replies, takes action
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>

    </div>
  );
}
