"use client";

import { motion } from "framer-motion";
import { EASE } from "@/components/ui";

export type BillingCycle = "monthly" | "yearly";

type BillingToggleProps = {
  cycle: BillingCycle;
  onChange: (cycle: BillingCycle) => void;
};

const OPTIONS: Array<{ id: BillingCycle; label: string }> = [
  { id: "monthly", label: "Monthly" },
  { id: "yearly", label: "Yearly" },
];

export default function BillingToggle({ cycle, onChange }: BillingToggleProps) {
  return (
    <div className="flex justify-center">
      <div className="relative inline-flex rounded-full border border-white/10 bg-white/[0.04] p-1">
        {OPTIONS.map((option) => {
          const isActive = option.id === cycle;

          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onChange(option.id)}
              className={`relative z-10 inline-flex min-w-[128px] items-center justify-center gap-2 rounded-full px-5 py-2 text-[14px] transition-colors duration-300 ${
                isActive ? "text-white" : "text-white/65 hover:text-white/90"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="billing-pill"
                  className="absolute inset-0 -z-10 rounded-full bg-card-secondary"
                  transition={{ duration: 0.5, ease: EASE }}
                />
              )}
              <span>{option.label}</span>
              {option.id === "yearly" && (
                <span className="rounded-full border border-accent/35 bg-accent-soft px-2 py-0.5 text-[11px] text-accent">
                  Save 20%
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
