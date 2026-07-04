"use client";

import { motion } from "framer-motion";
import { cta } from "@/content/copy";

export default function FinalCTA() {
  return (
    <section className="relative border-t border-border py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, #3b82f6 0%, transparent 50%), radial-gradient(ellipse 60% 50% at 80% 70%, #60a5fa 0%, transparent 40%), radial-gradient(ellipse 50% 40% at 20% 30%, #2563eb 0%, transparent 40%)",
          backgroundSize: "200% 200%",
          animation: "gradient-mesh 8s ease-in-out infinite",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")",
          backgroundSize: "200px 200px",
          animation: "noise 0.5s steps(3) infinite",
        }}
      />

      <motion.div
        className="relative z-10 max-w-2xl mx-auto text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
          {cta.headline}
        </h2>
        <p className="mt-4 text-muted text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
          {cta.subtext}
        </p>
        <button className="mt-8 px-8 py-3.5 bg-white text-black font-semibold rounded-lg hover:bg-accent-light hover:text-white transition-all duration-200 text-sm">
          Connect Gmail
        </button>
        <p className="mt-4 text-xs text-muted-dark">{cta.disclaimer}</p>
      </motion.div>
    </section>
  );
}
