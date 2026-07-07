"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { SiGmail, SiGooglecalendar } from "react-icons/si";
import { Lock, Check, Loader2 } from "lucide-react";
import {
  EASE,
  MonoLabel,
  PrimaryButton,
  GhostButton,
  Logo,
} from "@/components/ui";

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return reduced;
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

function OnboardingGraphic({ gradientId = "onboarding-glow" }: { gradientId?: string }) {
  const reduced = useReducedMotion();

  return (
    <svg
      viewBox="0 0 800 800"
      className="absolute -right-32 top-1/2 h-[110%] w-[110%] -translate-y-1/2 opacity-[0.20]"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <defs>
        <radialGradient id={gradientId} cx="50%" cy="50%" r="50%" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ff6b2c" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#ff6b2c" stopOpacity="0" />
        </radialGradient>
        <path id={`orbit-120-${gradientId}`} d="M 400 280 A 120 120 0 1 1 399.99 280" fill="none" />
        <path id={`orbit-144-${gradientId}`} d="M 280 320 A 144 144 0 1 1 279.99 320" fill="none" />
        <filter id={`glow-${gradientId}`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      <circle cx="400" cy="400" r="280" fill={`url(#${gradientId})`} />

      <g stroke="rgba(247,247,244,0.3)" strokeWidth="0.8" fill="none">
        <circle cx="400" cy="400" r="180" strokeDasharray="1128 4">
          {!reduced && <animateTransform attributeName="transform" type="rotate" from="0 400 400" to="360 400 400" dur="80s" repeatCount="indefinite" />}
        </circle>
        <circle cx="400" cy="400" r="240" strokeDasharray="1505 4">
          {!reduced && <animateTransform attributeName="transform" type="rotate" from="360 400 400" to="0 400 400" dur="100s" repeatCount="indefinite" />}
        </circle>
        <circle cx="400" cy="400" r="300" strokeDasharray="1882 4">
          {!reduced && <animateTransform attributeName="transform" type="rotate" from="0 400 400" to="360 400 400" dur="120s" repeatCount="indefinite" />}
        </circle>
      </g>

      <g stroke="rgba(255,107,44,0.4)" strokeWidth="1.2" fill="none">
        <path d="M 280 320 C 340 320 360 400 400 400" strokeDasharray="4 8">
          {!reduced && <animate attributeName="stroke-dashoffset" from="0" to="-24" dur="2s" repeatCount="indefinite" />}
        </path>
        <path d="M 520 320 C 460 320 440 400 400 400" strokeDasharray="4 8">
          {!reduced && <animate attributeName="stroke-dashoffset" from="0" to="-24" dur="2.2s" repeatCount="indefinite" />}
        </path>
        <path d="M 280 480 C 340 480 360 400 400 400" strokeDasharray="4 8">
          {!reduced && <animate attributeName="stroke-dashoffset" from="0" to="-24" dur="1.8s" repeatCount="indefinite" />}
        </path>
        <path d="M 520 480 C 460 480 440 400 400 400" strokeDasharray="4 8">
          {!reduced && <animate attributeName="stroke-dashoffset" from="0" to="-24" dur="2.4s" repeatCount="indefinite" />}
        </path>
        <path d="M 400 280 C 400 340 460 360 460 400" strokeDasharray="4 8">
          {!reduced && <animate attributeName="stroke-dashoffset" from="0" to="-24" dur="2.1s" repeatCount="indefinite" />}
        </path>
        <path d="M 400 520 C 400 460 340 440 340 400" strokeDasharray="4 8">
          {!reduced && <animate attributeName="stroke-dashoffset" from="0" to="-24" dur="1.9s" repeatCount="indefinite" />}
        </path>
      </g>

      <g fill="#ff6b2c" filter={`url(#glow-${gradientId})`}>
        <circle cx="280" cy="320" r="3" opacity="0.8">
          {!reduced && <animate attributeName="r" values="3;5;3" dur="3s" repeatCount="indefinite" begin="0s" />}
          {!reduced && <animate attributeName="opacity" values="0.6;1;0.6" dur="3s" repeatCount="indefinite" begin="0s" />}
        </circle>
        <circle cx="520" cy="320" r="3" opacity="0.8">
          {!reduced && <animate attributeName="r" values="3;5;3" dur="3s" repeatCount="indefinite" begin="0.5s" />}
          {!reduced && <animate attributeName="opacity" values="0.6;1;0.6" dur="3s" repeatCount="indefinite" begin="0.5s" />}
        </circle>
        <circle cx="280" cy="480" r="3" opacity="0.8">
          {!reduced && <animate attributeName="r" values="3;5;3" dur="3s" repeatCount="indefinite" begin="1s" />}
          {!reduced && <animate attributeName="opacity" values="0.6;1;0.6" dur="3s" repeatCount="indefinite" begin="1s" />}
        </circle>
        <circle cx="520" cy="480" r="3" opacity="0.8">
          {!reduced && <animate attributeName="r" values="3;5;3" dur="3s" repeatCount="indefinite" begin="1.5s" />}
          {!reduced && <animate attributeName="opacity" values="0.6;1;0.6" dur="3s" repeatCount="indefinite" begin="1.5s" />}
        </circle>
        <circle cx="400" cy="280" r="3" opacity="0.8">
          {!reduced && <animate attributeName="r" values="3;5;3" dur="3s" repeatCount="indefinite" begin="2s" />}
          {!reduced && <animate attributeName="opacity" values="0.6;1;0.6" dur="3s" repeatCount="indefinite" begin="2s" />}
        </circle>
        <circle cx="400" cy="520" r="3" opacity="0.8">
          {!reduced && <animate attributeName="r" values="3;5;3" dur="3s" repeatCount="indefinite" begin="2.5s" />}
          {!reduced && <animate attributeName="opacity" values="0.6;1;0.6" dur="3s" repeatCount="indefinite" begin="2.5s" />}
        </circle>
      </g>

      <g transform="translate(400, 400)">
        <circle cx="0" cy="0" r="15" stroke="#ff6b2c" strokeWidth="1" fill="none" opacity="0">
          {!reduced && <animate attributeName="r" values="15;40" dur="3s" repeatCount="indefinite" />}
          {!reduced && <animate attributeName="opacity" values="0.6;0" dur="3s" repeatCount="indefinite" />}
        </circle>
        <circle cx="0" cy="0" r="15" stroke="#ff6b2c" strokeWidth="1" fill="none" opacity="0">
          {!reduced && <animate attributeName="r" values="15;40" dur="3s" begin="1s" repeatCount="indefinite" />}
          {!reduced && <animate attributeName="opacity" values="0.6;0" dur="3s" begin="1s" repeatCount="indefinite" />}
        </circle>
        <circle cx="0" cy="0" r="15" stroke="#ff6b2c" strokeWidth="1" fill="none" opacity="0">
          {!reduced && <animate attributeName="r" values="15;40" dur="3s" begin="2s" repeatCount="indefinite" />}
          {!reduced && <animate attributeName="opacity" values="0.6;0" dur="3s" begin="2s" repeatCount="indefinite" />}
        </circle>
        <circle cx="0" cy="0" r="8" fill="#ff6b2c" filter={`url(#glow-${gradientId})`}>
          {!reduced && <animate attributeName="opacity" values="0.8;1;0.8" dur="2s" repeatCount="indefinite" />}
        </circle>
      </g>

      <g fill="#ff6b2c" opacity="0.9">
        <circle r="4">
          {!reduced && (<><animateMotion dur="25s" repeatCount="indefinite"><mpath href={`#orbit-120-${gradientId}`} /></animateMotion><animate attributeName="opacity" values="0.5;1;0.5" dur="3.5s" repeatCount="indefinite" /></>)}
        </circle>
        <circle r="4">
          {!reduced && (<><animateMotion dur="35s" begin="-17.5s" repeatCount="indefinite"><mpath href={`#orbit-120-${gradientId}`} /></animateMotion><animate attributeName="opacity" values="0.5;1;0.5" dur="4s" repeatCount="indefinite" /></>)}
        </circle>
        <circle r="3.5">
          {!reduced && (<><animateMotion dur="30s" repeatCount="indefinite"><mpath href={`#orbit-144-${gradientId}`} /></animateMotion><animate attributeName="opacity" values="0.5;1;0.5" dur="3.2s" repeatCount="indefinite" /></>)}
        </circle>
        <circle r="3.5">
          {!reduced && (<><animateMotion dur="40s" begin="-7.48s" repeatCount="indefinite"><mpath href={`#orbit-144-${gradientId}`} /></animateMotion><animate attributeName="opacity" values="0.5;1;0.5" dur="3.8s" repeatCount="indefinite" /></>)}
        </circle>
        <circle r="3.5">
          {!reduced && (<><animateMotion dur="45s" begin="-22.5s" repeatCount="indefinite"><mpath href={`#orbit-144-${gradientId}`} /></animateMotion><animate attributeName="opacity" values="0.5;1;0.5" dur="4.2s" repeatCount="indefinite" /></>)}
        </circle>
        <circle r="3.5">
          {!reduced && (<><animateMotion dur="50s" begin="-34.35s" repeatCount="indefinite"><mpath href={`#orbit-144-${gradientId}`} /></animateMotion><animate attributeName="opacity" values="0.5;1;0.5" dur="3.6s" repeatCount="indefinite" /></>)}
        </circle>
      </g>
    </svg>
  );
}

type Particle = {
  size: number;
  left: number;
  duration: number;
  delay: number;
  drift: number;
};

function FloatingParticles() {
  const reduced = useReducedMotion();
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: 25 }, () => ({
        size: Math.random() * 2 + 1,
        left: Math.random() * 100,
        duration: Math.random() * 15 + 15,
        delay: Math.random() * 15,
        drift: (Math.random() - 0.5) * 100,
      }))
    );
  }, []);

  if (reduced || particles.length === 0) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white/10"
          style={{ width: p.size, height: p.size, left: `${p.left}%`, bottom: "-5%" }}
          animate={{ y: ["0vh", "-110vh"], x: [0, p.drift], opacity: [0, 0.6, 0.6, 0] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "linear" }}
        />
      ))}
    </div>
  );
}

function HeroPanel() {
  return (
    <div className="relative hidden flex-col justify-between overflow-hidden bg-[#0a0a0a] p-12 lg:flex lg:w-[58%]">
      <FloatingParticles />
      <OnboardingGraphic />

      <motion.div
        className="relative z-10"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <div className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-[#141413]/80 px-4 py-2 backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          <MonoLabel className="text-white/70">ENGRAM MEMORY JOURNAL</MonoLabel>
        </div>
      </motion.div>

      <div className="relative z-10 max-w-xl">
        <motion.h1
          className="text-[56px] font-semibold leading-[1.05] tracking-tightest text-ink sm:text-[64px]"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
        >
          Your <span className="text-accent">memories</span> begin
          <br />
          here.
        </motion.h1>
        <motion.p
          className="mt-6 max-w-md text-xl leading-relaxed text-muted"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
        >
          Connect your digital life and let Engram quietly organize your emails,
          meetings, and moments into a personal memory journal.
        </motion.p>
      </div>

      <motion.div
        className="relative z-10 max-w-md"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE, delay: 0.3 }}
      >
        <p className="font-serif italic text-white/40 text-[17px] pl-1 border-l border-white/10">
          &ldquo;Every conversation has a story worth remembering.&rdquo;
        </p>
      </motion.div>
    </div>
  );
}

function MobileHero() {
  return (
    <div className="relative overflow-hidden bg-[#0a0a0a] px-6 py-10 lg:hidden">
      <FloatingParticles />
      <div className="pointer-events-none absolute inset-0">
        <OnboardingGraphic />
      </div>
      <div className="relative z-10">
        <div className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-[#141413]/80 px-4 py-2">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          <MonoLabel className="text-white/70">ENGRAM MEMORY JOURNAL</MonoLabel>
        </div>
        <h1 className="mt-6 text-[36px] font-semibold leading-[1.05] tracking-tightest text-ink">
          Your <span className="text-accent">memories</span> begin
          <br />
          here.
        </h1>
        <p className="mt-4 max-w-md text-[15px] leading-relaxed text-muted">
          Connect your digital life and let Engram quietly organize your emails,
          meetings, and moments into a personal memory journal.
        </p>
      </div>
    </div>
  );
}

export default function OnboardingPage() {
  const router = useRouter();
  const [connectState, setConnectState] = useState<"idle" | "loading" | "connected">("idle");

  const handleConnect = (e: React.MouseEvent) => {
    e.preventDefault();
    if (connectState !== "idle") return;

    setConnectState("loading");
    setTimeout(() => {
      setConnectState("connected");
      
      // Delay navigation to let checkmark animate
      setTimeout(() => {
        router.push("/dashboard");
      }, 600);
    }, 1500);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#0a0a0a] lg:flex-row">
      <MobileHero />
      <HeroPanel />

      <div className="relative flex flex-1 flex-col justify-center bg-[#0a0a0a] px-6 py-8 lg:w-[42%] lg:flex-none">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-[100px]"
            style={{ background: "radial-gradient(circle, rgba(255,107,44,0.16), transparent 70%)" }}
            aria-hidden
          />
          <div className="absolute inset-0 opacity-[0.04]">
            <OnboardingGraphic gradientId="onboarding-glow-right" />
          </div>
        </div>

        {/* Reduced spacing to ensure 1-screen fit */}
        <div className="relative z-10 mx-auto w-full max-w-[460px] space-y-4">
          {/* Step indicator card - Compacted */}
          <motion.div
            className="rounded-xl border border-line bg-[#111110] p-3 flex items-center justify-between shadow-lg"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent text-[12px] font-medium text-white shadow-[0_0_15px_rgba(255,107,44,0.3)] font-mono">
                1
              </span>
              <div>
                <h3 className="text-[13px] font-medium text-ink leading-tight">Connect Google Account</h3>
                <p className="text-[10px] text-muted-foreground leading-none mt-0.5">Required to unlock Engram</p>
              </div>
            </div>

            <div className="relative flex h-5 w-5 items-center justify-center">
              <AnimatePresence mode="wait">
                {connectState === "connected" ? (
                  <motion.div
                    key="checked"
                    className="flex h-5 w-5 items-center justify-center rounded-full bg-accent text-white"
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <Check size={11} strokeWidth={3} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    className="h-4 w-4 rounded-full border-2 border-accent/70 bg-transparent"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                  />
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Main connection card - Compacted */}
          <motion.div
            className="rounded-xl border border-line bg-[#111110] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.4)]"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
          >
            <div className="flex flex-col items-center text-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] shadow-inner mb-3">
                <GoogleIcon />
              </div>
              <h2 className="text-[18px] font-semibold text-ink">Google Workspace</h2>
              <p className="text-[12px] text-muted mt-0.5">Gmail + Google Calendar</p>
            </div>

            <div className="mt-6 space-y-2.5">
              <div className="flex items-center gap-3 rounded-lg border border-line bg-white/[0.01] p-3 transition-colors duration-[250ms] hover:bg-white/[0.03]">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-line bg-[#151514]">
                  <SiGmail size={14} className="text-[#EA4335]" />
                </span>
                <div className="min-w-0">
                  <h4 className="text-[13px] font-medium text-ink leading-tight">Gmail</h4>
                  <p className="truncate text-[11px] text-muted mt-0.5">Read, summarize, and draft emails</p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-lg border border-line bg-white/[0.01] p-3 transition-colors duration-[250ms] hover:bg-white/[0.03]">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-line bg-[#151514]">
                  <SiGooglecalendar size={14} className="text-[#4285F4]" />
                </span>
                <div className="min-w-0">
                  <h4 className="text-[13px] font-medium text-ink leading-tight">Google Calendar</h4>
                  <p className="truncate text-[11px] text-muted mt-0.5">Schedule meetings and view events</p>
                </div>
              </div>
            </div>

            <div className="mt-6">
              {connectState === "connected" ? (
                <div className="flex w-full items-center justify-center gap-2 rounded-lg border border-accent/20 bg-accent/10 py-3 text-[14px] font-medium text-accent">
                  <Check size={15} strokeWidth={2.5} />
                  Google Connected
                </div>
              ) : (
                <button
                  onClick={handleConnect}
                  disabled={connectState === "loading"}
                  className="group flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3 text-[14px] font-medium text-white transition-all duration-[250ms] hover:bg-accent-hover disabled:opacity-80 disabled:cursor-not-allowed shadow-[0_4px_20px_rgba(255,107,44,0.15)] hover:shadow-[0_4px_25px_rgba(255,107,44,0.25)]"
                >
                  {connectState === "loading" ? (
                    <>
                      <Loader2 size={15} className="animate-spin" />
                      Connecting...
                    </>
                  ) : (
                    <>
                      <GoogleIcon />
                      Connect Google Account
                    </>
                  )}
                </button>
              )}
            </div>
          </motion.div>

          {/* Secondary skip row/card - Compacted */}
          <motion.div
            className="rounded-xl border border-line bg-[#111110] p-3.5 flex items-center justify-between shadow-lg"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.3 }}
          >
            <div className="min-w-0 pr-4">
              <h4 className="text-[12.5px] font-medium text-ink">Ready to explore?</h4>
              <p className="text-[10.5px] text-muted leading-tight mt-0.5">
                You can always connect later from Integrations.
              </p>
            </div>
            <GhostButton href="/dashboard" className="py-2 px-3.5 text-[12.5px] shrink-0 border border-white/5 bg-white/[0.01]">
              Skip for now →
            </GhostButton>
          </motion.div>

          {/* Privacy reassurance footer - Tighter */}
          <motion.div
            className="flex items-start gap-2 px-1 text-[10.5px] leading-relaxed text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.45 }}
          >
            <Lock size={11} className="shrink-0 mt-0.5 text-accent/70" />
            <p>
              Your memories remain yours. Engram only reads your information and never acts without your permission.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}