"use client";

import { useRef, useState } from "react";
import { motion, useAnimationFrame } from "framer-motion";
import {
  Mail,
  Calendar,
  Video,
  Monitor,
  Sparkles,
  Database,
  Server,
  Code,
  LucideIcon,
} from "lucide-react";
import { integrations } from "@/content/copy";

const iconMap: Record<string, LucideIcon> = {
  Mail,
  Calendar,
  Video,
  Monitor,
  Sparkles,
  Database,
  Server,
  Code,
};

function MarqueeItem({
  item,
  rowRef,
}: {
  item: (typeof integrations)[number];
  rowRef: React.RefObject<HTMLDivElement | null>;
}) {
  const Icon = iconMap[item.icon];
  const ref = useRef<HTMLDivElement>(null);
  const [focus, setFocus] = useState(0);

  useAnimationFrame(() => {
    if (!ref.current || !rowRef.current) return;
    const rect = ref.current.getBoundingClientRect();
    const parentRect = rowRef.current.getBoundingClientRect();
    const center = rect.left + rect.width / 2;
    const parentCenter = parentRect.left + parentRect.width / 2;
    const dist = Math.abs(center - parentCenter);
    const maxDist = parentRect.width / 2;
    const focusVal = Math.max(0, 1 - dist / maxDist);
    setFocus(focusVal);
  });

  return (
    <motion.div
      ref={ref}
      className="flex items-center gap-3 px-6 py-3 border border-border rounded-lg mx-3 bg-[#0d0d0d] shrink-0"
      animate={{
        scale: 1 + focus * 0.08,
        borderColor: focus > 0.7 ? "rgba(59,130,246,0.5)" : "rgba(255,255,255,0.1)",
      }}
      transition={{ duration: 0.15 }}
      style={{
        filter: `brightness(${1 + focus * 0.4})`,
      }}
    >
      <Icon size={18} className="text-accent" />
      <span className="text-sm font-medium text-white whitespace-nowrap">
        {item.name}
      </span>
    </motion.div>
  );
}

export default function IntegrationsMarquee() {
  const rowRef = useRef<HTMLDivElement>(null);
  const items = [...integrations, ...integrations];

  return (
    <section
      id="integrations"
      className="border-t border-border py-16 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center">
        <p className="text-xs tracking-[0.2em] uppercase text-accent font-semibold">
          INTEGRATIONS
        </p>
      </div>

      <div className="relative" ref={rowRef}>
        <div className="flex animate-marquee">
          {items.map((item, i) => (
            <MarqueeItem key={i} item={item} rowRef={rowRef} />
          ))}
        </div>

        <div className="absolute top-0 left-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent pointer-events-none z-10" />
        <div className="absolute top-0 right-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent pointer-events-none z-10" />
      </div>
    </section>
  );
}
