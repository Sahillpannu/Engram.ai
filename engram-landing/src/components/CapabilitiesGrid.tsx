"use client";

import { motion } from "framer-motion";
import {
  Bot,
  Brain,
  Mail,
  Tags,
  MailCheck,
  RefreshCw,
  Calendar,
  HardDrive,
  Video,
  LucideIcon,
} from "lucide-react";
import { capabilities } from "@/content/copy";

const iconMap: Record<string, LucideIcon> = {
  Bot,
  Brain,
  Mail,
  Tags,
  MailCheck,
  RefreshCw,
  Calendar,
  HardDrive,
  Video,
};

const COLS = 3;

function AnimatedCard({
  item,
  index,
}: {
  item: (typeof capabilities.items)[number];
  index: number;
}) {
  const Icon = iconMap[item.icon];
  const col = index % COLS;
  const row = Math.floor(index / COLS);
  const staggerDelay = 0.08;
  const delay = (col + row) * staggerDelay;

  return (
    <motion.div
      className="group traveling-border p-6 border-b border-r border-border bg-[#0d0d0d] flex flex-col gap-3 hover:bg-[#111] transition-colors duration-200 relative"
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.45,
        delay,
        ease: [0.2, 0.0, 0.0, 1.0],
      }}
    >
      <motion.div
        className="flex items-center gap-3"
        initial={{ opacity: 0, rotate: -10, scale: 0.6 }}
        whileInView={{ opacity: 1, rotate: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{
          duration: 0.4,
          delay: delay + 0.15,
          ease: [0.34, 1.56, 0.64, 1],
        }}
      >
        <Icon size={20} className="text-accent shrink-0" />
        <h3 className="font-bold text-white text-sm">{item.title}</h3>
      </motion.div>
      <motion.p
        className="text-xs text-muted leading-relaxed"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.35, delay: delay + 0.25 }}
      >
        {item.description}
      </motion.p>
    </motion.div>
  );
}

export default function CapabilitiesGrid() {
  return (
    <section
      id="capabilities"
      className="border-t border-border py-24 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs tracking-[0.2em] uppercase text-accent font-semibold mb-4">
            {capabilities.eyebrow}
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight max-w-3xl mx-auto">
            {capabilities.headline}
          </h2>
          <p className="mt-3 text-muted text-sm sm:text-base max-w-2xl mx-auto">
            {capabilities.subtext}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border border-border">
          {capabilities.items.map((item, i) => (
            <AnimatedCard key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
