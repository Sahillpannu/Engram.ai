"use client";

import { motion } from "framer-motion";
import { MonoLabel } from "./ui";

const INK = "#26251e";
const MUTED = "#5a5852";
const LINE = "#e6e5e0";
const ACCENT = "#f54e00";
const CARD = "#ffffff";

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
    <circle r={3.4} fill={fill} filter={glow ? "url(#mg-dotglow)" : undefined}>
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
            <feGaussianBlur stdDeviation="14" />
          </filter>
          <filter id="mg-dotglow" x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="2.4" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* connectors */}
        <path id="mg-email" d="M 206 96 C 253 96 253 240 300 240" stroke={LINE} strokeWidth="1.5" />
        <path id="mg-cal" d="M 206 240 L 300 240" stroke={LINE} strokeWidth="1.5" />
        <path id="mg-meet" d="M 206 384 C 253 384 253 240 300 240" stroke={LINE} strokeWidth="1.5" />
        <path id="mg-mem" d="M 460 240 L 524 240" stroke={LINE} strokeWidth="1.5" />

        {/* flowing data packets */}
        <FlowDot pathId="mg-email" begin="0s" dur="3s" fill={MUTED} />
        <FlowDot pathId="mg-email" begin="1.5s" dur="3s" fill={MUTED} />
        <FlowDot pathId="mg-cal" begin="0.3s" dur="3s" fill={MUTED} />
        <FlowDot pathId="mg-cal" begin="1.8s" dur="3s" fill={MUTED} />
        <FlowDot pathId="mg-meet" begin="0.6s" dur="3s" fill={MUTED} />
        <FlowDot pathId="mg-meet" begin="2.1s" dur="3s" fill={MUTED} />
        <FlowDot pathId="mg-mem" begin="0s" dur="2.4s" fill={ACCENT} glow />
        <FlowDot pathId="mg-mem" begin="0.8s" dur="2.4s" fill={ACCENT} glow />
        <FlowDot pathId="mg-mem" begin="1.6s" dur="2.4s" fill={ACCENT} glow />

        {/* ---------- source nodes ---------- */}
        {[
          { y: 56, title: "EMAIL", lines: ["Contract draft", "attached"] },
          { y: 200, title: "CALENDAR", lines: ["Demo with Acme"] },
          { y: 344, title: "MEETING", lines: ["Customer requested", "enterprise pricing"] },
        ].map((n) => (
          <g key={n.title}>
            <rect
              x={20}
              y={n.y}
              width={186}
              height={80}
              rx={12}
              fill="none"
              stroke={INK}
              strokeWidth={1}
              opacity={0.08}
            >
              <animate
                attributeName="opacity"
                values="0.05;0.13;0.05"
                dur="3.4s"
                repeatCount="indefinite"
              />
            </rect>
            <rect
              x={24}
              y={n.y + 4}
              width={178}
              height={72}
              rx={10}
              fill={CARD}
              stroke={LINE}
              strokeWidth={1}
            />
            <circle cx={40} cy={n.y + 24} r={3} fill={INK} />
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
            <text x={40} y={n.y + 52} fontSize={13.5} fill={INK}>
              {n.lines[0]}
            </text>
            {n.lines[1] && (
              <text x={40} y={n.y + 69} fontSize={13.5} fill={INK}>
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
            rx={10}
            fill={CARD}
            stroke={LINE}
            strokeWidth={1}
          />
          <circle cx={316} cy={224} r={3} fill={INK} />
          <text x={326} y={228} className="font-mono" fontSize={11} letterSpacing={1.4} fill={MUTED}>
            KNOWLEDGE
          </text>
          <text x={316} y={252} fontSize={13} fill={INK}>
            structured
          </text>
          <text x={316} y={269} fontSize={13} fill={INK}>
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
            rx={18}
            fill={ACCENT}
            filter="url(#mg-glow)"
          >
            <animate
              attributeName="opacity"
              values="0.14;0.32;0.14"
              dur="3.2s"
              repeatCount="indefinite"
            />
          </rect>
          {/* node body */}
          <rect
            x={524}
            y={148}
            width={168}
            height={184}
            rx={14}
            fill={INK}
          />
          <circle cx={608} cy={186} r={4} fill={ACCENT} />
          <text
            x={608}
            y={232}
            textAnchor="middle"
            className="font-mono"
            fontSize={17}
            letterSpacing={2}
            fill="#f7f7f4"
          >
            ENGRAM
          </text>
          <text
            x={608}
            y={258}
            textAnchor="middle"
            className="font-mono"
            fontSize={17}
            letterSpacing={2}
            fill="#f7f7f4"
          >
            MEMORY
          </text>
          <text
            x={608}
            y={288}
            textAnchor="middle"
            className="font-mono"
            fontSize={10}
            letterSpacing={1.2}
            fill="#f7f7f4"
            opacity={0.5}
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
              <p className="mt-1 text-sm text-ink">{s.lines.join(" ")}</p>
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

        <div className="rounded-xl bg-ink p-5 text-center">
          <p className="font-mono text-sm tracking-[0.15em] text-bg">ENGRAM MEMORY</p>
          <p className="mt-1.5 font-mono text-[10px] tracking-[0.15em] text-bg/55">
            persistent memory layer
          </p>
        </div>
      </div>
    </div>
  );
}
