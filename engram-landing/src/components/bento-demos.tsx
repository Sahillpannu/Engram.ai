"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import { EASE } from "./ui";

/* ------------------------------------------------------------------ */
/* shared looping helper                                               */
/* ------------------------------------------------------------------ */
function useLoopingCount(max: number, stepMs: number, holdMs = 0) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let cancelled = false;
    const run = (n: number) => {
      if (cancelled) return;
      setCount(n);
      if (n < max) {
        window.setTimeout(() => run(n + 1), stepMs);
      } else {
        window.setTimeout(() => run(0), holdMs + stepMs);
      }
    };
    run(0);
    return () => {
      cancelled = true;
    };
  }, [max, stepMs, holdMs]);
  return count;
}

/* ------------------------------------------------------------------ */
/* Semantic memory search — typewriter + highlighted results           */
/* ------------------------------------------------------------------ */
const QUERIES = [
  "pricing decision last quarter",
  "demo with Acme",
  "contract draft",
];
const RESULTS: string[][] = [
  [
    "Q3 pricing decision — volume discount agreed",
    "Email from Acme — pushback on enterprise tier",
  ],
  [
    "Demo with Acme — scheduled Tue 2:00pm",
    "Prep notes — enterprise demo flow",
  ],
  [
    "Contract draft — redlines from legal",
    "Email — contract draft attached",
  ],
];

function highlight(text: string, query: string) {
  const qWords = query.toLowerCase().replace(/[^a-z\s]/g, "").split(/\s+/).filter(Boolean);
  return text.split(" ").map((word, i) => {
    const clean = word.toLowerCase().replace(/[^a-z]/g, "");
    const match = qWords.some((qw) => clean === qw || (qw.length > 3 && clean.includes(qw)));
    return (
      <span key={i}>
        {match ? <mark className="rounded bg-accent-soft px-0.5 text-ink">{word}</mark> : word}
        {i < text.split(" ").length - 1 ? " " : ""}
      </span>
    );
  });
}

export function SearchDemo() {
  const [qi, setQi] = useState(0);
  const [typed, setTyped] = useState("");
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const timers: number[] = [];
    const run = (idx: number) => {
      if (cancelled) return;
      const q = QUERIES[idx % QUERIES.length];
      setQi(idx % QUERIES.length);
      setTyped("");
      setShowResults(false);
      for (let i = 1; i <= q.length; i++) {
        timers.push(window.setTimeout(() => !cancelled && setTyped(q.slice(0, i)), 55 * i));
      }
      const done = 55 * q.length + 160;
      timers.push(window.setTimeout(() => !cancelled && setShowResults(true), done));
      const hold = done + 2400;
      for (let i = q.length - 1; i >= 0; i--) {
        timers.push(
          window.setTimeout(() => !cancelled && setTyped(q.slice(0, i)), hold + 38 * (q.length - i))
        );
      }
      timers.push(window.setTimeout(() => run(idx + 1), hold + 38 * q.length + 500));
    };
    run(0);
    return () => {
      cancelled = true;
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, []);

  return (
    <div className="flex flex-1 flex-col gap-3">
      <div className="flex items-center gap-2 rounded-lg border border-line bg-white/[0.03] px-3 py-2">
        <Search size={13} className="text-muted" />
        <span className="font-mono text-xs text-ink">
          {typed}
          <motion.span
            className="ml-0.5 inline-block h-3 w-px bg-ink align-middle"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.9, repeat: Infinity }}
          />
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2">
        <AnimatePresence mode="popLayout">
          {showResults &&
            RESULTS[qi].map((r, i) => (
              <motion.div
                key={`${qi}-${i}`}
                className="rounded-lg border border-line bg-white/[0.02] p-2.5"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: EASE, delay: i * 0.08 }}
              >
                <p className="text-[12px] leading-snug text-ink">{highlight(r, QUERIES[qi])}</p>
                <div className="mt-1.5 flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-accent" />
                  <span className="font-mono text-[10px] text-muted-foreground">
                    memory · score {(0.92 - i * 0.08).toFixed(2)}
                  </span>
                </div>
              </motion.div>
            ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Meeting intelligence — timeline                                     */
/* ------------------------------------------------------------------ */
const TIMELINE = [
  { t: "10:02", label: "Decision", text: "Volume discount for Acme" },
  { t: "10:14", label: "Action", text: "Send redlined contract" },
  { t: "10:31", label: "Commit", text: "Follow up Friday" },
];

export function TimelineDemo() {
  const count = useLoopingCount(TIMELINE.length, 900, 1600);
  return (
    <div className="flex flex-1 flex-col justify-center gap-2.5">
      {TIMELINE.map((e, i) => {
        const on = i < count;
        return (
          <motion.div
            key={i}
            className="flex items-center gap-2.5"
            animate={{ opacity: on ? 1 : 0.25, x: on ? 0 : -6 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <span className="font-mono text-[10px] text-muted">{e.t}</span>
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            <span className="font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
              {e.label}
            </span>
            <span className="text-[12px] text-ink/80">{e.text}</span>
          </motion.div>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Email understanding — parsed chips                                  */
/* ------------------------------------------------------------------ */
const EMAIL_CHIPS = [
  { k: "intent", v: "Reply needed" },
  { k: "entities", v: "Acme · Contract" },
  { k: "action", v: "Send redlines" },
];

export function EmailDemo() {
  const count = useLoopingCount(EMAIL_CHIPS.length, 700, 1400);
  return (
    <div className="flex flex-1 flex-col gap-2.5">
      <div className="rounded-lg border border-line bg-white/[0.02] p-2.5">
        <p className="text-[11px] text-muted-foreground">Acme Procurement</p>
        <p className="text-[12px] text-ink/85">RE: Enterprise pricing</p>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {EMAIL_CHIPS.map((c, i) => {
          const on = i < count;
          return (
            <motion.span
              key={c.k}
              className="inline-flex items-center gap-1.5 rounded-md border border-line bg-white/[0.02] px-2 py-1"
              animate={{ opacity: on ? 1 : 0.2, y: on ? 0 : 6 }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              <span className="font-mono text-[10px] text-muted-foreground">{c.k}</span>
              <span className="text-[11px] text-ink">{c.v}</span>
            </motion.span>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Calendar context — mini week                                        */
/* ------------------------------------------------------------------ */
export function CalendarDemo() {
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  const nums = [7, 8, 9, 10, 11, 12, 13];
  const active = 1;
  return (
    <div className="flex flex-1 flex-col gap-2.5">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-wide text-muted-foreground">July</span>
        <span className="font-mono text-[10px] text-muted-foreground">2026</span>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {days.map((d, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <span className="font-mono text-[9px] text-muted-foreground">{d}</span>
            <span
              className={`flex h-5 w-5 items-center justify-center rounded text-[10px] ${
                i === active ? "bg-accent-soft font-mono text-accent" : "font-mono text-muted"
              }`}
            >
              {nums[i]}
            </span>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-1.5 rounded-md border border-line bg-white/[0.02] px-2 py-1.5">
        <motion.span
          className="h-1.5 w-1.5 rounded-full bg-accent"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <span className="text-[11px] text-ink/85">2:00pm — Demo, Globex</span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Memory retrieval — mini graph                                       */
/* ------------------------------------------------------------------ */
export function GraphDemo() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <svg viewBox="0 0 120 70" fill="none" className="h-auto w-full max-w-[220px]">
        <path id="bg1" d="M 16 18 C 60 18 60 35 104 35" stroke="rgba(255,255,255,0.08)" strokeWidth="1.2" />
        <path id="bg2" d="M 16 52 C 60 52 60 35 104 35" stroke="rgba(255,255,255,0.08)" strokeWidth="1.2" />
        <circle cx="16" cy="18" r="4" fill="#f7f7f4" opacity="0.5" />
        <circle cx="16" cy="52" r="4" fill="#f7f7f4" opacity="0.5" />
        <circle cx="104" cy="35" r="5.5" fill="#ff6b2c" />
        <circle r="2.6" fill="#a1a1aa">
          <animateMotion dur="2.4s" repeatCount="indefinite">
            <mpath href="#bg1" />
          </animateMotion>
        </circle>
        <circle r="2.6" fill="#a1a1aa">
          <animateMotion dur="2.4s" begin="1.2s" repeatCount="indefinite">
            <mpath href="#bg2" />
          </animateMotion>
        </circle>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Real-time sync — streaming events                                   */
/* ------------------------------------------------------------------ */
const SYNC_EVENTS = [
  "Gmail · new thread",
  "Calendar · event updated",
  "Fireflies · transcript ready",
  "Slack · mention parsed",
];

export function SyncDemo() {
  const count = useLoopingCount(SYNC_EVENTS.length, 1100, 1400);
  const visible = SYNC_EVENTS.slice(0, Math.max(count, 1));
  return (
    <div className="flex flex-1 flex-col gap-2">
      <div className="flex items-center gap-1.5">
        <motion.span
          className="h-1.5 w-1.5 rounded-full bg-accent"
          animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1, 0.8] }}
          transition={{ duration: 1.4, repeat: Infinity }}
        />
        <span className="font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
          syncing
        </span>
      </div>
      <div className="flex flex-col gap-1.5">
        <AnimatePresence mode="popLayout">
          {visible.map((e, i) => (
            <motion.div
              key={`${count}-${i}`}
              className="flex items-center gap-2 rounded-md border border-line bg-white/[0.02] px-2 py-1"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: EASE }}
            >
              <span className="font-mono text-[9px] text-accent">✓</span>
              <span className="text-[11px] text-ink/80">{e}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
