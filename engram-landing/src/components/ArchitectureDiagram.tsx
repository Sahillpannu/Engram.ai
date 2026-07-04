"use client";

import { Fragment, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { architecture } from "@/content/copy";
import { EASE, MonoLabel, SectionShell, SectionIntro } from "./ui";

const num = (i: number) => String(i + 1).padStart(2, "0");

function Connector({ vertical = false }: { vertical?: boolean }) {
  const dots = [0, 1];
  return (
    <div
      className={`relative ${vertical ? "my-1 h-8 w-px" : "mx-1 h-px flex-1 min-w-[18px]"}`}
    >
      <div
        className={`absolute bg-line ${vertical ? "left-0 top-0 h-full w-px" : "left-0 top-0 h-px w-full"}`}
      />
      {dots.map((d) => (
        <motion.span
          key={d}
          className="absolute h-1.5 w-1.5 rounded-full bg-accent"
          style={{ x: "-50%", y: "-50%" }}
          animate={
            vertical
              ? { top: ["0%", "100%"], opacity: [0, 1, 1, 0] }
              : { left: ["0%", "100%"], opacity: [0, 1, 1, 0] }
          }
          transition={{
            duration: vertical ? 1.6 : 2.2,
            repeat: Infinity,
            ease: "linear",
            delay: d * (vertical ? 0.8 : 1.1),
          }}
        />
      ))}
    </div>
  );
}

function NodeButton({
  stage,
  i,
  active,
  hovered,
  vertical,
  onSelect,
  onHover,
}: {
  stage: (typeof architecture.stages)[number];
  i: number;
  active: boolean;
  hovered: boolean;
  vertical: boolean;
  onSelect: () => void;
  onHover: (v: boolean) => void;
}) {
  const isOn = active || hovered;
  return (
    <button
      onClick={onSelect}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      className={`group relative text-left transition-colors duration-200 ${
        vertical
          ? `flex w-full items-center gap-3 rounded-xl border bg-card p-4 ${
              active ? "border-ink/30" : "border-line hover:border-ink/20"
            }`
          : `flex w-[128px] shrink-0 flex-col rounded-xl border bg-card p-3.5 ${
              active ? "border-ink/30" : "border-line hover:border-ink/20"
            }`
      }`}
    >
      {/* hover tooltip (desktop only) */}
      {!vertical && (
        <AnimatePresence>
          {hovered && !active && (
            <motion.div
              className="absolute -top-3 left-1/2 z-20 w-[210px] -translate-x-1/2 -translate-y-full rounded-lg border border-line bg-card p-3"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.25, ease: EASE }}
            >
              <p className="text-[12px] leading-snug text-muted">{stage.desc}</p>
            </motion.div>
          )}
        </AnimatePresence>
      )}

      <div
        className={`flex items-center gap-2 ${vertical ? "" : "justify-between"}`}
      >
        <span className="font-mono text-[10px] text-muted">{num(i)}</span>
        <span
          className={`h-1.5 w-1.5 rounded-full transition-colors duration-200 ${
            isOn ? "bg-accent" : "bg-line"
          }`}
        />
      </div>

      <div className={vertical ? "flex-1" : "mt-2"}>
        <div className="text-sm font-normal text-ink">{stage.title}</div>
        <MonoLabel className="mt-0.5 block text-muted/80">{stage.label}</MonoLabel>
      </div>
    </button>
  );
}

function DetailPanel({ active }: { active: number }) {
  const stage = architecture.stages[active];
  return (
    <motion.div
      key={active}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="mt-8 rounded-2xl border border-line bg-card p-6"
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-accent">{num(active)}</span>
          <h3 className="text-xl font-normal tracking-tight text-ink">
            {stage.title}
          </h3>
        </div>
        <MonoLabel>{stage.label}</MonoLabel>
      </div>
      <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted">
        {stage.detail}
      </p>
      <div className="mt-5 flex flex-wrap gap-2">
        {stage.items.map((it) => (
          <span
            key={it}
            className="rounded-md border border-line bg-bg/60 px-2.5 py-1 font-mono text-[11px] text-ink"
          >
            {it}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function ArchitectureDiagram() {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);
  const stages = architecture.stages;

  return (
    <SectionShell id="architecture">
      <SectionIntro
        eyebrow={architecture.eyebrow}
        headline={architecture.headline}
        subtext={architecture.body}
      />

      {/* desktop: horizontal */}
      <div className="mt-14 hidden md:block">
        <div className="flex items-center">
          {stages.map((s, i) => (
            <Fragment key={s.id}>
              <NodeButton
                stage={s}
                i={i}
                active={active === i}
                hovered={hovered === i}
                vertical={false}
                onSelect={() => setActive(i)}
                onHover={(v) => setHovered(v ? i : null)}
              />
              {i < stages.length - 1 && <Connector />}
            </Fragment>
          ))}
        </div>
        <DetailPanel active={active} />
      </div>

      {/* mobile: vertical */}
      <div className="mt-10 md:hidden">
        <div className="flex flex-col">
          {stages.map((s, i) => (
            <Fragment key={s.id}>
              <NodeButton
                stage={s}
                i={i}
                active={active === i}
                hovered={false}
                vertical
                onSelect={() => setActive(i)}
                onHover={() => {}}
              />
              {i < stages.length - 1 && <Connector vertical />}
            </Fragment>
          ))}
        </div>
        <DetailPanel active={active} />
      </div>
    </SectionShell>
  );
}
