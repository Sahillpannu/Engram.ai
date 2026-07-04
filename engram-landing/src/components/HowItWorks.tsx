"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  MotionValue,
} from "framer-motion";
import {
  ArrowDownToLine,
  Filter,
  Layers,
  Zap,
  LucideIcon,
} from "lucide-react";
import { howItWorks } from "@/content/copy";

const iconMap: Record<string, LucideIcon> = {
  ArrowDownToLine,
  Filter,
  Layers,
  Zap,
};

const TOTAL_PATH_LENGTH = 150;

function getPathD(pathType: "ltr" | "rtl" | "mobile"): string {
  switch (pathType) {
    case "ltr":
      return "M 50 0 L 50 40 Q 50 48 58 48 L 92 48 Q 100 48 100 56 L 100 100";
    case "rtl":
      return "M 50 0 L 50 40 Q 50 48 42 48 L 8 48 Q 0 48 0 56 L 0 100";
    case "mobile":
      return "M 50 0 L 50 100";
  }
}

function dotPosition(
  progress: number,
  pathType: "ltr" | "rtl" | "mobile"
): { x: number; y: number } {
  if (pathType === "mobile") {
    return { x: 50, y: progress * 100 };
  }
  const t = progress;
  if (pathType === "ltr") {
    if (t <= 0.45) return { x: 50, y: t * (100 / 0.45) };
    if (t <= 0.66) {
      const pt = (t - 0.45) / 0.21;
      return { x: 50 + pt * 50, y: 48 };
    }
    return { x: 100, y: 48 + ((t - 0.66) / 0.34) * 52 };
  } else {
    if (t <= 0.45) return { x: 50, y: t * (100 / 0.45) };
    if (t <= 0.66) {
      const pt = (t - 0.45) / 0.21;
      return { x: 50 - pt * 50, y: 48 };
    }
    return { x: 0, y: 48 + ((t - 0.66) / 0.34) * 52 };
  }
}

function ConnectorSVG({
  pathType,
  drawProgress,
  connectorIdx,
}: {
  pathType: "ltr" | "rtl";
  drawProgress: MotionValue<number>;
  connectorIdx: number;
}) {
  const pathData = getPathD(pathType);
  const mobilePath = getPathD("mobile");

  const dashOffset = useTransform(
    drawProgress,
    [0, 1],
    [TOTAL_PATH_LENGTH, 0]
  );
  const glowOpacity = useTransform(drawProgress, [0, 0.95, 1], [1, 1, 0]);

  const dotX = useTransform(drawProgress, (v) =>
    dotPosition(v, pathType).x
  );
  const dotY = useTransform(drawProgress, (v) =>
    dotPosition(v, pathType).y
  );
  const dotMobileX = useTransform(drawProgress, (v) =>
    dotPosition(v, "mobile").x
  );
  const dotMobileY = useTransform(drawProgress, (v) =>
    dotPosition(v, "mobile").y
  );

  const dotLeftPct = useTransform(dotX, (x) => `${x}%`);
  const dotTopPct = useTransform(dotY, (y) => `${y}%`);
  const dotMobileLeftPct = useTransform(dotMobileX, (x) => `${x}%`);
  const dotMobileTopPct = useTransform(dotMobileY, (y) => `${y}%`);

  return (
    <div className="relative h-28 md:h-32 overflow-visible">
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full overflow-visible"
      >
        <defs>
          <filter id={`connector-glow-${connectorIdx}`}>
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* desktop zigzag path - glow layer */}
        <motion.path
          d={pathData}
          stroke="#3b82f6"
          strokeWidth="0.6"
          fill="none"
          className="hidden md:block"
          style={{
            strokeDashoffset: dashOffset,
            strokeDasharray: TOTAL_PATH_LENGTH,
            opacity: glowOpacity,
            filter: `url(#connector-glow-${connectorIdx})`,
          }}
        />

        {/* desktop zigzag path - dashed overlay */}
        <motion.path
          d={pathData}
          stroke="#3b82f6"
          strokeWidth="1"
          strokeDasharray="5 5"
          strokeLinecap="round"
          fill="none"
          className="hidden md:block"
          style={{
            strokeDashoffset: dashOffset,
            strokeDasharray: `${TOTAL_PATH_LENGTH}`,
            opacity: 0.35,
          }}
        />

        {/* mobile straight path - glow layer */}
        <motion.path
          d={mobilePath}
          stroke="#3b82f6"
          strokeWidth="0.6"
          fill="none"
          className="md:hidden"
          style={{
            strokeDashoffset: dashOffset,
            strokeDasharray: TOTAL_PATH_LENGTH,
            opacity: glowOpacity,
            filter: `url(#connector-glow-${connectorIdx})`,
          }}
        />

        {/* mobile straight path - dashed overlay */}
        <motion.path
          d={mobilePath}
          stroke="#3b82f6"
          strokeWidth="1"
          strokeDasharray="5 5"
          strokeLinecap="round"
          fill="none"
          className="md:hidden"
          style={{
            strokeDashoffset: dashOffset,
            strokeDasharray: `${TOTAL_PATH_LENGTH}`,
            opacity: 0.35,
          }}
        />
      </svg>

      {/* traveling dot - desktop */}
      <motion.div
        className="absolute w-2.5 h-2.5 rounded-full bg-accent pointer-events-none z-10 hidden md:block"
        style={{
          left: dotLeftPct,
          top: dotTopPct,
          marginLeft: "-5px",
          marginTop: "-5px",
          boxShadow: "0 0 8px #3b82f6, 0 0 18px #3b82f6",
        }}
      />

      {/* traveling dot - mobile */}
      <motion.div
        className="absolute w-2.5 h-2.5 rounded-full bg-accent pointer-events-none z-10 block md:hidden"
        style={{
          left: dotMobileLeftPct,
          top: dotMobileTopPct,
          marginLeft: "-5px",
          marginTop: "-5px",
          boxShadow: "0 0 8px #3b82f6, 0 0 18px #3b82f6",
        }}
      />
    </div>
  );
}

function StepCard({
  step,
  index,
  activation,
}: {
  step: (typeof howItWorks.steps)[number];
  index: number;
  activation: MotionValue<number>;
}) {
  const Icon = iconMap[step.icon];
  const isEven = index % 2 === 0;

  const rowOpacity = useTransform(activation, [0, 0.85, 1], [0.3, 0.3, 1]);
  const iconScale = useSpring(
    useTransform(activation, [0.88, 1], [0.8, 1]),
    { stiffness: 350, damping: 18 }
  );
  const iconGlow = useTransform(
    activation,
    [0.9, 0.94, 0.97, 1],
    [0, 0, 1, 0]
  );

  const numOpacity = useTransform(activation, [0.85, 0.93], [0, 1]);
  const numY = useTransform(activation, [0.85, 0.93], [10, 0]);

  const titleOpacity = useTransform(activation, [0.88, 0.96], [0, 1]);
  const titleY = useTransform(activation, [0.88, 0.96], [10, 0]);

  const descOpacity = useTransform(activation, [0.91, 0.99], [0, 1]);
  const descY = useTransform(activation, [0.91, 0.99], [10, 0]);

  const iconNode = (
    <div className="flex-1 flex items-center justify-center relative">
      <motion.div
        className="w-20 h-20 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center relative"
        style={{ scale: iconScale, opacity: rowOpacity }}
      >
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            opacity: iconGlow,
            boxShadow:
              "0 0 24px #3b82f6, 0 0 48px #3b82f6, inset 0 0 8px #3b82f6",
          }}
        />
        <div className="relative z-10 flex items-center justify-center">
          <Icon size={32} className="text-accent" />
        </div>
      </motion.div>
    </div>
  );

  const textNode = (
    <motion.div
      className="flex-1 text-center lg:text-left"
      style={{ opacity: rowOpacity }}
    >
      <motion.span
        className="text-xs font-mono text-accent bg-accent/10 px-2 py-0.5 rounded inline-block mb-2"
        style={{ opacity: numOpacity, y: numY }}
      >
        {step.number}
      </motion.span>
      <motion.h3
        className="text-xl font-bold text-white mb-2"
        style={{ opacity: titleOpacity, y: titleY }}
      >
        {step.title}
      </motion.h3>
      <motion.p
        className="text-sm text-muted leading-relaxed max-w-md mx-auto lg:mx-0"
        style={{ opacity: descOpacity, y: descY }}
      >
        {step.description}
      </motion.p>
    </motion.div>
  );

  return (
    <motion.div
      className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 py-12 ${
        !isEven ? "md:flex-row-reverse" : ""
      }`}
      style={{ opacity: rowOpacity }}
    >
      {isEven ? (
        <>
          {iconNode}
          {textNode}
        </>
      ) : (
        <>
          {textNode}
          {iconNode}
        </>
      )}
    </motion.div>
  );
}

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);
  const [pillPositions, setPillPositions] = useState<
    { left: number; width: number }[]
  >([]);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  const c0Ref = useRef<HTMLDivElement>(null);
  const c1Ref = useRef<HTMLDivElement>(null);
  const c2Ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress: c0Raw } = useScroll({
    target: c0Ref,
    offset: ["start end", "end 55%"],
  });
  const { scrollYProgress: c1Raw } = useScroll({
    target: c1Ref,
    offset: ["start end", "end 55%"],
  });
  const { scrollYProgress: c2Raw } = useScroll({
    target: c2Ref,
    offset: ["start end", "end 55%"],
  });

  const c0Progress = useSpring(c0Raw, { stiffness: 90, damping: 28 });
  const c1Progress = useSpring(c1Raw, { stiffness: 90, damping: 28 });
  const c2Progress = useSpring(c2Raw, { stiffness: 90, damping: 28 });

  const step0Active = useMotionValue(1);
  const step1Active = useTransform(c0Progress, [0.85, 1], [0, 1]);
  const step2Active = useTransform(c1Progress, [0.85, 1], [0, 1]);
  const step3Active = useTransform(c2Progress, [0.85, 1], [0, 1]);

  const stepActivations = [step0Active, step1Active, step2Active, step3Active];
  const connectorProgresses = [c0Progress, c1Progress, c2Progress];
  const pathTypes: ("ltr" | "rtl")[] = ["ltr", "rtl", "ltr"];

  const measurePills = useCallback(() => {
    const positions = tabRefs.current.map((tab) => {
      if (!tab) return { left: 0, width: 0 };
      return {
        left: tab.offsetLeft,
        width: tab.offsetWidth,
      };
    });
    setPillPositions(positions);
  }, []);

  useEffect(() => {
    measurePills();
    window.addEventListener("resize", measurePills);
    return () => window.removeEventListener("resize", measurePills);
  }, [measurePills]);

  useEffect(() => {
    const currentSteps = stepRefs.current;

    const stepObserver = new IntersectionObserver(
      (entries) => {
        let maxRatio = 0;
        let maxIdx = 0;
        entries.forEach((entry) => {
          const idx = currentSteps.indexOf(entry.target as HTMLDivElement);
          if (idx !== -1 && entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio;
            maxIdx = idx;
          }
        });
        if (maxRatio > 0.3) {
          setActiveStep(maxIdx);
        }
      },
      { threshold: [0, 0.3, 0.5, 0.7, 1], rootMargin: "-20% 0px -20% 0px" }
    );

    currentSteps.forEach((ref) => {
      if (ref) stepObserver.observe(ref);
    });

    return () => {
      currentSteps.forEach((ref) => {
        if (ref) stepObserver.unobserve(ref);
      });
    };
  }, []);

  const handleTabClick = (i: number) => {
    setActiveStep(i);
    stepRefs.current[i]?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="border-t border-border py-24 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs tracking-[0.2em] uppercase text-accent font-semibold mb-4">
            {howItWorks.eyebrow}
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
            {howItWorks.headline}
          </h2>
          <p className="mt-3 text-muted text-sm max-w-xl mx-auto">
            {howItWorks.subtext}
          </p>
        </motion.div>

        <div className="flex justify-center mb-16">
          <div className="relative inline-flex border border-border rounded-full p-1 bg-[#0d0d0d]">
            {pillPositions.length === howItWorks.steps.length && (
              <motion.div
                className="absolute top-1 bottom-1 rounded-full bg-accent z-0"
                animate={{
                  left: pillPositions[activeStep]?.left ?? 0,
                  width: pillPositions[activeStep]?.width ?? 0,
                }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            {howItWorks.steps.map((step, i) => (
              <button
                key={i}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                onClick={() => handleTabClick(i)}
                className={`relative z-10 px-3 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-colors duration-200 ${
                  activeStep === i
                    ? "text-white"
                    : "text-muted hover:text-white"
                }`}
              >
                <span className="hidden sm:inline">{step.number} </span>
                {step.tab}
              </button>
            ))}
          </div>
        </div>

        <div>
          {howItWorks.steps.map((step, i) => (
            <div key={i}>
              <div
                ref={(el) => {
                  stepRefs.current[i] = el;
                }}
              >
                <StepCard
                  step={step}
                  index={i}
                  activation={stepActivations[i]}
                />
              </div>

              {i < howItWorks.steps.length - 1 && (
                <div
                  ref={
                    i === 0
                      ? c0Ref
                      : i === 1
                      ? c1Ref
                      : c2Ref
                  }
                >
                  <ConnectorSVG
                    pathType={pathTypes[i]}
                    drawProgress={connectorProgresses[i]}
                    connectorIdx={i}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
