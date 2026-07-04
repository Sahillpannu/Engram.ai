"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { EASE, MonoLabel } from "@/components/ui";
import BillingToggle, { type BillingCycle } from "./BillingToggle";
import PricingCard, { type Plan } from "./PricingCard";

const PLANS: Plan[] = [
  {
    name: "Free",
    monthlyPrice: "$0",
    yearlyPrice: "$0",
    subtitle: "For trying Engram.",
    features: [
      "Connect Gmail",
      "Connect Calendar",
      "1,000 memories",
      "Basic search",
      "1 workspace",
      "Community support",
    ],
    cta: "Get Started",
    footnote: "Cancel anytime.",
  },
  {
    name: "Pro",
    monthlyPrice: "$19",
    monthlyCadence: "/mo",
    yearlyPrice: "$15",
    yearlyCadence: "/mo billed yearly",
    subtitle: "For power users and personal agents.",
    features: [
      "Unlimited memories",
      "Semantic search",
      "Meeting intelligence",
      "Cross-source retrieval",
      "Priority indexing",
      "Memory insights",
      "Unlimited workspaces",
      "API access",
    ],
    cta: "Start Pro",
    featured: true,
    footnote: "Cancel anytime.",
  },
  {
    name: "Team",
    monthlyPrice: "$49",
    monthlyCadence: "/user/mo",
    yearlyPrice: "$39",
    yearlyCadence: "/user/mo billed yearly",
    subtitle: "For teams building agent workflows.",
    features: [
      "Everything in Pro",
      "Shared memory spaces",
      "Team workspaces",
      "Roles and permissions",
      "Slack integration",
      "Audit logs",
      "SSO",
      "Admin dashboard",
    ],
    cta: "Start Team",
    footnote: "Cancel anytime.",
  },
  {
    name: "Enterprise",
    monthlyPrice: "Custom",
    yearlyPrice: "Custom",
    subtitle: "For organizations running memory infrastructure at scale.",
    features: [
      "Everything in Team",
      "Private deployments",
      "Dedicated support",
      "Custom integrations",
      "Compliance controls",
      "SOC2 / GDPR",
      "On-prem support",
      "SLA guarantees",
      "Dedicated success manager",
    ],
    cta: "Contact Sales",
    footnote: "Talk to our team.",
  },
];

export default function PricingSection() {
  const [cycle, setCycle] = useState<BillingCycle>("monthly");

  return (
    <motion.section
      id="pricing"
      className="relative border-t border-white/[0.08] px-6 py-[140px] lg:px-8"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.5, ease: EASE }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "linear-gradient(to bottom, transparent 0%, black 25%, black 75%, transparent 100%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1280px]">
        <div className="mx-auto max-w-[760px] text-center">
          <MonoLabel className="block">Pricing</MonoLabel>
          <h2 className="mt-6 text-[40px] font-normal tracking-[-0.05em] text-ink sm:text-[48px] lg:text-[56px]">
            Simple pricing for every stage.
          </h2>
          <p className="mt-5 text-[18px] leading-relaxed text-muted">
            Start free. Upgrade as your agents and memory grow.
          </p>
        </div>

        <div className="mt-10">
          <BillingToggle cycle={cycle} onChange={setCycle} />
        </div>

        <motion.div
          className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.08 }}
          variants={{
            hidden: { opacity: 1 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.08, delayChildren: 0.05 },
            },
          }}
        >
          {PLANS.map((plan, index) => (
            <PricingCard
              key={plan.name}
              plan={plan}
              isYearly={cycle === "yearly"}
              delay={index * 0.02}
            />
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
