"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { pricing } from "@/content/copy";
import { EASE, MonoLabel, SectionShell, SectionIntro } from "./ui";

export default function Pricing() {
  return (
    <SectionShell id="pricing">
      <SectionIntro
        eyebrow={pricing.eyebrow}
        headline={pricing.headline}
        subtext={pricing.subtext}
      />

      <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-3">
        {pricing.tiers.map((tier, i) => {
          const featured = tier.featured;
          return (
            <motion.div
              key={tier.name}
              className={`flex flex-col rounded-2xl border p-6 ${
                featured
                  ? "border-ink bg-ink text-bg"
                  : "border-line bg-card text-ink"
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: EASE, delay: i * 0.08 }}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-normal tracking-tight">{tier.name}</h3>
                {featured && (
                  <MonoLabel className="text-accent">POPULAR</MonoLabel>
                )}
              </div>

              <div className="mt-5 flex items-baseline gap-1">
                <span className="text-4xl font-normal tracking-tightest">
                  {tier.price}
                </span>
                {tier.cadence && (
                  <span
                    className={`font-mono text-sm ${featured ? "text-bg/60" : "text-muted"}`}
                  >
                    {tier.cadence}
                  </span>
                )}
              </div>
              <p
                className={`mt-3 text-[13px] leading-relaxed ${
                  featured ? "text-bg/70" : "text-muted"
                }`}
              >
                {tier.blurb}
              </p>

              <ul className="mt-6 flex-1 space-y-3">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <Check
                      size={15}
                      className={`mt-0.5 shrink-0 ${featured ? "text-accent" : "text-ink"}`}
                    />
                    <span
                      className={`text-[14px] ${featured ? "text-bg/85" : "text-ink"}`}
                    >
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                {featured ? (
                  <a
                    href="#cta"
                    className="inline-flex w-full items-center justify-center rounded-lg bg-bg px-5 py-2.5 text-sm font-medium text-ink transition-colors duration-200 hover:bg-bg/85"
                  >
                    {tier.cta}
                  </a>
                ) : (
                  <a
                    href="#cta"
                    className="inline-flex w-full items-center justify-center rounded-lg border border-line bg-card px-5 py-2.5 text-sm font-medium text-ink transition-colors duration-200 hover:border-ink/25 hover:bg-bg"
                  >
                    {tier.cta}
                  </a>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </SectionShell>
  );
}
