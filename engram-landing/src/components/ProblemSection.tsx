"use client";

import { motion } from "framer-motion";
import { Mail, CalendarClock, Briefcase, Users, MessageSquare } from "lucide-react";
import { problem } from "@/content/copy";

const iconMap: Record<string, React.ElementType> = {
  Mail,
  CalendarClock,
  Briefcase,
  Users,
  MessageSquare,
};

export default function ProblemSection() {
  return (
    <section className="border-t border-border py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs tracking-[0.2em] uppercase text-accent font-semibold mb-4">
            {problem.eyebrow}
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight max-w-3xl">
            {problem.headline}
          </h2>
          <p className="mt-4 text-muted text-base sm:text-lg max-w-2xl leading-relaxed">
            {problem.body}
          </p>
        </motion.div>

        <motion.div
          className="mt-14 border border-border rounded-xl p-8 bg-[#0d0d0d]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <p className="text-xs tracking-[0.15em] uppercase text-muted-dark mb-6 font-semibold">
            {problem.forgetsTitle}
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {problem.forgets.map((item, i) => {
              const Icon = iconMap[item.icon];
              return (
                <div
                  key={i}
                  className="flex items-center gap-3 text-sm text-muted border border-border rounded-lg px-4 py-3 bg-[#111]"
                >
                  <Icon size={18} className="text-accent shrink-0" />
                  <span>{item.text}</span>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
