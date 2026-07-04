"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, useTime, useTransform } from "framer-motion";
import {
  Inbox,
  GitBranch,
  Brain,
  Layers,
  Database,
  Bot,
  Zap,
  LucideIcon,
} from "lucide-react";
import { architecture } from "@/content/copy";

const iconMap: Record<string, LucideIcon> = {
  Inbox,
  GitBranch,
  Brain,
  Layers,
  Database,
  Bot,
  Zap,
};

function FlowDot({
  delay,
  pipelineHeight,
}: {
  delay: number;
  pipelineHeight: number;
}) {
  const time = useTime();
  const cycle = 7;

  const translateY = useTransform(time, (t) => {
    const p = ((t / 1000 + delay) % cycle) / cycle;
    return p * pipelineHeight;
  });

  const opacity = useTransform(time, (t) => {
    const p = ((t / 1000 + delay) % cycle) / cycle;
    if (p < 0.05 || p > 0.95) return 0;
    if (p < 0.15) return (p - 0.05) / 0.1;
    if (p > 0.85) return (0.95 - p) / 0.1;
    return 1;
  });

  return (
    <motion.div
      className="absolute left-1/2 w-2 h-2 rounded-full bg-accent z-10 pointer-events-none"
      style={{
        translateY,
        opacity,
        translateX: "-50%",
        boxShadow: "0 0 8px #3b82f6, 0 0 16px #3b82f6",
      }}
    />
  );
}

function GlowNode({
  children,
  nodeIndex,
  isInView,
  totalNodes,
}: {
  children: React.ReactNode;
  nodeIndex: number;
  isInView: boolean;
  totalNodes: number;
}) {
  const time = useTime();
  const cycle = 7;

  const glowOpacity = useTransform(time, (t) => {
    if (!isInView) return 0;
    const segmentLength = cycle / totalNodes;
    const nodeTime = nodeIndex * segmentLength;
    const p = ((t / 1000 - nodeTime + cycle) % cycle) / segmentLength;
    if (p > 0.7 && p < 0.9) return (p - 0.7) / 0.2 * 0.6;
    if (p >= 0.9) return 0.6 - (p - 0.9) / 0.1 * 0.6;
    return 0;
  });

  return (
    <motion.div className="relative" style={{ zIndex: 1 }}>
      <motion.div
        className="absolute inset-0 rounded-xl pointer-events-none"
        style={{
          opacity: glowOpacity,
          boxShadow: "0 0 20px #3b82f6, 0 0 40px #3b82f6, inset 0 0 8px #3b82f6",
        }}
      />
      {children}
    </motion.div>
  );
}

export default function ArchitectureDiagram() {
  const sectionRef = useRef<HTMLElement>(null);
  const pipelineRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.15 });
  const [pipelineHeight, setPipelineHeight] = useState(700);

  useEffect(() => {
    if (pipelineRef.current) {
      const observer = new ResizeObserver((entries) => {
        setPipelineHeight(entries[0].contentRect.height);
      });
      observer.observe(pipelineRef.current);
      return () => observer.disconnect();
    }
  }, []);

  const dots = [0, 1.75, 3.5, 5.25];

  return (
    <section
      id="architecture"
      ref={sectionRef}
      className="border-t border-border py-24 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-3xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs tracking-[0.2em] uppercase text-accent font-semibold mb-4">
            {architecture.eyebrow}
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
            {architecture.headline}
          </h2>
          <p className="mt-4 text-muted text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            {architecture.body}
          </p>
        </motion.div>

        <div className="relative" ref={pipelineRef}>
          {dots.map((delay, i) => (
            <FlowDot key={i} delay={delay} pipelineHeight={pipelineHeight} />
          ))}

          <div className="space-y-0">
            {architecture.stages.map((stage, i) => {
              const Icon = iconMap[stage.icon];
              const isFirst = i === 0;
              const isLast = i === architecture.stages.length - 1;

              return (
                <div key={stage.id} className="flex flex-col items-center">
                  <GlowNode
                    nodeIndex={i}
                    isInView={isInView}
                    totalNodes={architecture.stages.length}
                  >
                    <motion.div
                      className={`w-full max-w-md border border-border rounded-xl p-5 bg-[#0d0d0d] text-center ${
                        isFirst ? "border-accent/30" : ""
                      } ${isLast ? "border-accent/30" : ""}`}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{ duration: 0.4, delay: i * 0.08 }}
                    >
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <Icon size={20} className="text-accent" />
                        <span className="font-bold text-white text-sm">
                          {stage.title}
                        </span>
                      </div>

                      {stage.items ? (
                        <div className="flex flex-wrap items-center justify-center gap-2 mt-2">
                          {stage.items.map((item) => (
                            <span
                              key={item}
                              className="text-xs px-3 py-1 rounded-full border border-border text-muted bg-[#111]"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <p className="text-xs text-muted mt-2 leading-relaxed">
                          {stage.description}
                        </p>
                      )}
                    </motion.div>
                  </GlowNode>

                  {!isLast && (
                    <div className="flex flex-col items-center py-3 relative">
                      <svg
                        width="2"
                        height="44"
                        className="absolute"
                        aria-hidden="true"
                      >
                        <defs>
                          <linearGradient
                            id={`lineGrad-${i}`}
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
                            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.4" />
                          </linearGradient>
                        </defs>
                        <line
                          x1="1"
                          y1="0"
                          x2="1"
                          y2="44"
                          stroke={`url(#lineGrad-${i})`}
                          strokeWidth="1"
                          strokeDasharray="4 4"
                        />
                      </svg>
                      <div className="h-8 w-px border-l border-dashed border-accent/40" />
                      <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-accent/40" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
