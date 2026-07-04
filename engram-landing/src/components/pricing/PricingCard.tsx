"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { EASE } from "@/components/ui";

export type Plan = {
  name: string;
  subtitle: string;
  features: string[];
  cta: string;
  featured?: boolean;
  footnote: string;
  href?: string;
  monthlyPrice: string;
  monthlyCadence?: string;
  yearlyPrice: string;
  yearlyCadence?: string;
};

type PricingCardProps = {
  plan: Plan;
  isYearly: boolean;
  delay?: number;
};

export default function PricingCard({ plan, isYearly, delay = 0 }: PricingCardProps) {
  const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
  const cadence = isYearly ? plan.yearlyCadence : plan.monthlyCadence;
  const featured = Boolean(plan.featured);

  return (
    <motion.article
      className={`group flex min-h-[680px] flex-col rounded-[24px] border bg-card p-8 transition-all duration-300 ease-editorial ${
        featured ? "border-accent/35" : "border-white/10"
      } hover:-translate-y-1.5 hover:border-white/15 hover:bg-card-secondary`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: EASE, delay }}
    >
      <div className="mb-3 min-h-8">
        {featured && (
          <span className="inline-flex rounded-full bg-accent-soft px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.08em] text-accent">
            Most Popular
          </span>
        )}
      </div>

      <h3 className="text-[22px] font-normal tracking-[-0.03em] text-ink">{plan.name}</h3>

      <div className="mt-4 flex items-end gap-1">
        <span className="text-[44px] font-normal leading-none tracking-[-0.05em] text-ink">
          {price}
        </span>
        {cadence && <span className="pb-1 text-[14px] text-muted">{cadence}</span>}
      </div>

      <p className="mt-4 text-[15px] leading-relaxed text-muted">{plan.subtitle}</p>

      <div className="my-7 border-t border-white/[0.08]" />

      <ul className="flex flex-1 flex-col gap-[18px]">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3">
            <Check size={16} className="mt-1 shrink-0 text-green-500" />
            <span className="text-[15px] leading-[1.6] text-white/88">{feature}</span>
          </li>
        ))}
      </ul>

      <a
        href={plan.href ?? "#cta"}
        className={`mt-8 inline-flex h-12 w-full items-center justify-center rounded-[14px] text-[14px] font-medium transition-colors duration-300 ease-editorial ${
          featured
            ? "bg-accent text-white hover:bg-accent-hover"
            : "border border-white/10 bg-transparent text-white hover:bg-white/[0.03]"
        }`}
      >
        {plan.cta}
      </a>

      <p className="mt-4 text-[12px] text-white/45">{plan.footnote}</p>
    </motion.article>
  );
}
