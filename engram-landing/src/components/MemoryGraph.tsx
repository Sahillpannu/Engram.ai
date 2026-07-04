"use client";

import { motion } from "framer-motion";
import { MonoLabel } from "./ui";

const CARD_BG = "#141413";
const CARD_LINE = "rgba(255,255,255,0.08)";
const INK = "#f7f7f4";
const MUTED = "#a1a1aa";
const MUTED_FG = "#71717a";
const LINE = "rgba(255,255,255,0.08)";
const ACCENT = "#ff6b2c";

const sources = [
  { tag: "email", title: "EMAIL", lines: ["Contract draft", "attached"] },
  { tag: "calendar", title: "CALENDAR", lines: ["Demo with Acme"] },
  { tag: "meeting", title: "MEETING", lines: ["Customer requested", "enterprise pricing"] },
];

function FlowDot({
  pathId,
  begin,
  dur,
  fill,
  glow,
}: {
  pathId: string;
  begin: string;
  dur: string;
  fill: string;
  glow?: boolean;
}) {
  return (
    <circle r={glow ? 3.8 : 3} fill={fill} filter={glow ? "url(#mg-dotglow)" : undefined}>
      <animateMotion dur={dur} begin={begin} repeatCount="indefinite" rotate="auto">
        <mpath href={`#${pathId}`} />
      </animateMotion>
    </circle>
  );
}

export default function MemoryGraph() {
  return (
    <div className="relative w-full">
      {/* ---------------- desktop: full SVG graph ---------------- */}
      <svg
        viewBox="0 0 720 480"
        fill="none"
        className="hidden h-auto w-full md:block"
        role="img"
        aria-label="Memory graph: email, calendar and meeting data flowing into Engram memory"
      >
        <defs>
          <filter id="mg-glow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="18" />
          </filter>
          <filter id="mg-dotglow" x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id="mg-radial" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={ACCENT} stopOpacity="0.18" />
            <stop offset="65%" stopColor={ACCENT} stopOpacity="0.04" />
            <stop offset="100%" stopColor={ACCENT} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* radial glow behind the engram node */}
        <circle cx="608" cy="240" r="140" fill="url(#mg-radial)" />

        {/* connectors */}
        <path id="mg-email" d="M 206 96 C 253 96 253 240 300 240" stroke={LINE} strokeWidth="1.5" />
        <path id="mg-cal" d="M 206 240 L 300 240" stroke={LINE} strokeWidth="1.5" />
        <path id="mg-meet" d="M 206 384 C 253 384 253 240 300 240" stroke={LINE} strokeWidth="1.5" />
        <path id="mg-mem" d="M 460 240 L 524 240" stroke={LINE} strokeWidth="1.5" />

        {/* flowing data packets — muted ones */}
        <FlowDot pathId="mg-email" begin="0s" dur="3.2s" fill={MUTED} />
        <FlowDot pathId="mg-email" begin="1.6s" dur="3.2s" fill={MUTED} />
        <FlowDot pathId="mg-cal" begin="0.4s" dur="3.2s" fill={MUTED} />
        <FlowDot pathId="mg-cal" begin="2s" dur="3.2s" fill={MUTED} />
        <FlowDot pathId="mg-meet" begin="0.8s" dur="3.2s" fill={MUTED} />
        <FlowDot pathId="mg-meet" begin="2.4s" dur="3.2s" fill={MUTED} />

        {/* orange data packets into memory */}
        <FlowDot pathId="mg-mem" begin="0s" dur="2.2s" fill={ACCENT} glow />
        <FlowDot pathId="mg-mem" begin="0.7s" dur="2.2s" fill={ACCENT} glow />
        <FlowDot pathId="mg-mem" begin="1.4s" dur="2.2s" fill={ACCENT} glow />

        {/* ---------- source nodes ---------- */}
        {[
          { y: 56, title: "EMAIL", lines: ["Contract draft", "attached"] },
          { y: 200, title: "CALENDAR", lines: ["Demo with Acme"] },
          { y: 344, title: "MEETING", lines: ["Customer requested", "enterprise pricing"] },
        ].map((n, i) => (
          <g key={n.title} className={i === 0 ? "animate-float" : i === 1 ? "animate-float-delay" : "animate-float-delay-2"}>
            <rect
              x={20}
              y={n.y}
              width={186}
              height={80}
              rx={14}
              fill="none"
              stroke={LINE}
              strokeWidth={1}
              opacity={0.06}
            />
            <rect
              x={24}
              y={n.y + 4}
              width={178}
              height={72}
              rx={12}
              fill={CARD_BG}
              stroke={CARD_LINE}
              strokeWidth={1}
            />
            <circle cx={40} cy={n.y + 24} r={3} fill={MUTED_FG} />
            <text
              x={50}
              y={n.y + 28}
              className="font-mono"
              fontSize={11}
              letterSpacing={1.4}
              fill={MUTED}
            >
              {n.title}
            </text>
            <text x={40} y={n.y + 52} fontSize={13.5} fill={INK} opacity={0.85}>
              {n.lines[0]}
            </text>
            {n.lines[1] && (
              <text x={40} y={n.y + 69} fontSize={13.5} fill={INK} opacity={0.7}>
                {n.lines[1]}
              </text>
            )}
          </g>
        ))}

        {/* ---------- knowledge node ---------- */}
        <g>
          <rect
            x={300}
            y={200}
            width={160}
            height={80}
            rx={12}
            fill={CARD_BG}
            stroke={CARD_LINE}
            strokeWidth={1}
          />
          <circle cx={316} cy={224} r={3} fill={MUTED_FG} />
          <text x={326} y={228} className="font-mono" fontSize={11} letterSpacing={1.4} fill={MUTED}>
            KNOWLEDGE
          </text>
          <text x={316} y={252} fontSize={13} fill={INK} opacity={0.85}>
            structured
          </text>
          <text x={316} y={269} fontSize={13} fill={INK} opacity={0.7}>
            memory records
          </text>
        </g>

        {/* ---------- engram memory node (focal) ---------- */}
        <g>
          {/* glow halo */}
          <rect
            x={514}
            y={138}
            width={188}
            height={204}
            rx={20}
            fill={ACCENT}
            opacity="0.14"
            filter="url(#mg-glow)"
          />
          {/* node body */}
          <rect
            x={524}
            y={148}
            width={168}
            height={184}
            rx={16}
            fill="#0b0b0a"
          />
          <rect
            x={524}
            y={148}
            width={168}
            height={184}
            rx={16}
            fill="none"
            stroke="rgba(255,255,255,0.12)"
            strokeWidth={1}
          />
          <circle cx={608} cy={186} r={5} fill={ACCENT} />
          <text
            x={608}
            y={234}
            textAnchor="middle"
            className="font-mono"
            fontSize={18}
            letterSpacing={2.5}
            fill={INK}
          >
            ENGRAM
          </text>
          <text
            x={608}
            y={260}
            textAnchor="middle"
            className="font-mono"
            fontSize={18}
            letterSpacing={2.5}
            fill={INK}
          >
            MEMORY
          </text>
          <text
            x={608}
            y={290}
            textAnchor="middle"
            className="font-mono"
            fontSize={10}
            letterSpacing={1.2}
            fill={INK}
            opacity={0.45}
          >
            persistent layer
          </text>
        </g>
      </svg>

      {/* ---------------- mobile: vertical flow ---------------- */}
      <div className="md:hidden">
        <div className="space-y-2.5">
          {sources.map((s) => (
            <div
              key={s.tag}
              className="rounded-xl border border-line bg-card p-3.5"
            >
              <MonoLabel>{s.tag}</MonoLabel>
              <p className="mt-1 text-sm text-ink/80">{s.lines.join(" ")}</p>
            </div>
          ))}
        </div>

        <div className="relative mx-auto my-2 h-9 w-px bg-line">
          <motion.div
            className="absolute left-1/2 h-2 w-2 -translate-x-1/2 rounded-full"
            style={{ background: ACCENT }}
            animate={{ y: [0, 28], opacity: [0, 1, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="rounded-xl bg-[#0b0b0a] p-5 text-center border border-white/10">
          <p className="font-mono text-sm tracking-[0.15em] text-ink">ENGRAM MEMORY</p>
          <p className="mt-1.5 font-mono text-[10px] tracking-[0.15em] text-muted-foreground">
            persistent memory layer
          </p>
        </div>
      </div>
    </div>
  );
}
