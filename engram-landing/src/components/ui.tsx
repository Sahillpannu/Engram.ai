"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ReactNode } from "react";

export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
export const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function MonoLabel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`font-mono text-[11px] uppercase tracking-[0.18em] text-muted ${className}`}
    >
      {children}
    </span>
  );
}

export function PrimaryButton({
  children,
  href = "#",
  className = "",
  showArrow = true,
}: {
  children: ReactNode;
  href?: string;
  className?: string;
  showArrow?: boolean;
}) {
  return (
    <a
      href={href}
      className={`group inline-flex items-center justify-center gap-2 rounded-lg bg-ink px-5 py-2.5 text-sm font-medium text-bg transition-colors duration-200 hover:bg-[#3a3833] ${className}`}
    >
      {children}
      {showArrow && (
        <ArrowRight
          size={15}
          className="transition-transform duration-200 group-hover:translate-x-0.5"
        />
      )}
    </a>
  );
}

export function GhostButton({
  children,
  href = "#",
  className = "",
}: {
  children: ReactNode;
  href?: string;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center gap-2 rounded-lg border border-line bg-card px-5 py-2.5 text-sm font-medium text-ink transition-colors duration-200 hover:border-ink/25 hover:bg-bg ${className}`}
    >
      {children}
    </a>
  );
}

export function SectionIntro({
  eyebrow,
  headline,
  subtext,
  align = "left",
  className = "",
}: {
  eyebrow: string;
  headline: string;
  subtext?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <motion.div
      className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""} ${className}`}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease: EASE }}
    >
      <MonoLabel className="mb-5 block">{eyebrow}</MonoLabel>
      <h2 className="text-balance text-[32px] font-normal leading-[1.08] tracking-tightest text-ink sm:text-[42px]">
        {headline}
      </h2>
      {subtext && (
        <p
          className={`mt-5 text-[17px] leading-relaxed text-muted ${align === "center" ? "mx-auto max-w-xl" : "max-w-lg"}`}
        >
          {subtext}
        </p>
      )}
    </motion.div>
  );
}

export function SectionShell({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`relative border-t border-line px-6 py-24 lg:px-8 lg:py-32 ${className}`}
    >
      <div className="relative z-10 mx-auto max-w-content">{children}</div>
    </section>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
        <line
          x1="6"
          y1="7"
          x2="17"
          y2="12"
          stroke="var(--ink)"
          strokeWidth="1.4"
          opacity="0.28"
        />
        <line
          x1="6"
          y1="17"
          x2="17"
          y2="12"
          stroke="var(--ink)"
          strokeWidth="1.4"
          opacity="0.28"
        />
        <circle cx="6" cy="7" r="2.6" fill="var(--ink)" />
        <circle cx="6" cy="17" r="2.6" fill="var(--ink)" />
        <circle cx="17" cy="12" r="3.4" fill="var(--accent)" />
      </svg>
      <span className="text-[17px] font-medium tracking-tight text-ink">
        Engram
      </span>
    </span>
  );
}
