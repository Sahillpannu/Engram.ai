"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useMotionTemplate, useSpring } from "framer-motion";

export default function BackgroundFX() {
  const mx = useMotionValue(50);
  const my = useMotionValue(20);
  const sx = useSpring(mx, { stiffness: 90, damping: 30, mass: 0.4 });
  const sy = useSpring(my, { stiffness: 90, damping: 30, mass: 0.4 });

  const spotlight = useMotionTemplate`radial-gradient(
    600px circle at ${sx}% ${sy}%,
    rgba(245, 78, 0, 0.05),
    transparent 60%
  )`;

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mx.set((e.clientX / window.innerWidth) * 100);
      my.set((e.clientY / window.innerHeight) * 100);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 grid-overlay" />
      <motion.div className="absolute inset-0" style={{ background: spotlight }} />
      <div className="absolute inset-0 noise-overlay" />
    </div>
  );
}
