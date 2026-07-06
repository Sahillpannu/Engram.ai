"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  EASE,
  MonoLabel,
  PrimaryButton,
  GhostButton,
  Input,
  Logo,
} from "@/components/ui";

const today = new Date().toLocaleDateString("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
});

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

function MemoryBriefItem({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
      <p className="text-[14px] leading-relaxed text-white/80">{text}</p>
    </div>
  );
}

function LoginGraphic({ gradientId = "login-glow" }: { gradientId?: string }) {
  const reduced = useReducedMotion();

  return (
    <svg
      viewBox="0 0 800 800"
      className="absolute -right-32 top-1/2 h-[110%] w-[110%] -translate-y-1/2 opacity-[0.18]"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <defs>
        <radialGradient
          id={gradientId}
          cx="50%"
          cy="50%"
          r="50%"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#ff6b2c" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#ff6b2c" stopOpacity="0" />
        </radialGradient>
        <path
          id={`orbit-120-${gradientId}`}
          d="M 400 280 A 120 120 0 1 1 399.99 280"
          fill="none"
        />
        <path
          id={`orbit-144-${gradientId}`}
          d="M 280 320 A 144 144 0 1 1 279.99 320"
          fill="none"
        />
      </defs>

      <circle cx="400" cy="400" r="280" fill={`url(#${gradientId})`} />

      <g stroke="rgba(247,247,244,0.45)" strokeWidth="0.8" fill="none">
        <circle cx="400" cy="400" r="180" strokeDasharray="1128 3">
          {!reduced && (
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 400 400"
              to="360 400 400"
              dur="80s"
              repeatCount="indefinite"
            />
          )}
        </circle>
        <circle cx="400" cy="400" r="240" strokeDasharray="1505 3">
          {!reduced && (
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="360 400 400"
              to="0 400 400"
              dur="100s"
              repeatCount="indefinite"
            />
          )}
        </circle>
        <circle cx="400" cy="400" r="300" strokeDasharray="1882 3">
          {!reduced && (
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 400 400"
              to="360 400 400"
              dur="120s"
              repeatCount="indefinite"
            />
          )}
        </circle>
      </g>

      <g stroke="rgba(255,107,44,0.35)" strokeWidth="1.2" fill="none">
        <path d="M 280 320 C 340 320 360 400 400 400" />
        <path d="M 520 320 C 460 320 440 400 400 400" />
        <path d="M 280 480 C 340 480 360 400 400 400" />
        <path d="M 520 480 C 460 480 440 400 400 400" />
        <path d="M 400 280 C 400 340 460 360 460 400" />
        <path d="M 400 520 C 400 460 340 440 340 400" />
      </g>

      <g fill="#ff6b2c">
        <circle cx="400" cy="400" r="8">
          {!reduced && (
            <animate
              attributeName="opacity"
              values="0.7;1;0.7"
              dur="3s"
              repeatCount="indefinite"
            />
          )}
        </circle>

        <circle r="5">
          {!reduced && (
            <>
              <animateMotion
                dur="25s"
                repeatCount="indefinite"
              >
                <mpath href={`#orbit-120-${gradientId}`} />
              </animateMotion>
              <animate
                attributeName="opacity"
                values="0.6;1;0.6"
                dur="3.5s"
                repeatCount="indefinite"
              />
            </>
          )}
        </circle>
        <circle r="5">
          {!reduced && (
            <>
              <animateMotion
                dur="35s"
                begin="-17.5s"
                repeatCount="indefinite"
              >
                <mpath href={`#orbit-120-${gradientId}`} />
              </animateMotion>
              <animate
                attributeName="opacity"
                values="0.6;1;0.6"
                dur="4s"
                repeatCount="indefinite"
              />
            </>
          )}
        </circle>

        <circle r="5">
          {!reduced && (
            <>
              <animateMotion
                dur="30s"
                repeatCount="indefinite"
              >
                <mpath href={`#orbit-144-${gradientId}`} />
              </animateMotion>
              <animate
                attributeName="opacity"
                values="0.6;1;0.6"
                dur="3.2s"
                repeatCount="indefinite"
              />
            </>
          )}
        </circle>
        <circle r="5">
          {!reduced && (
            <>
              <animateMotion
                dur="40s"
                begin="-7.48s"
                repeatCount="indefinite"
              >
                <mpath href={`#orbit-144-${gradientId}`} />
              </animateMotion>
              <animate
                attributeName="opacity"
                values="0.6;1;0.6"
                dur="3.8s"
                repeatCount="indefinite"
              />
            </>
          )}
        </circle>
        <circle r="5">
          {!reduced && (
            <>
              <animateMotion
                dur="45s"
                begin="-22.5s"
                repeatCount="indefinite"
              >
                <mpath href={`#orbit-144-${gradientId}`} />
              </animateMotion>
              <animate
                attributeName="opacity"
                values="0.6;1;0.6"
                dur="4.2s"
                repeatCount="indefinite"
              />
            </>
          )}
        </circle>
        <circle r="5">
          {!reduced && (
            <>
              <animateMotion
                dur="50s"
                begin="-34.35s"
                repeatCount="indefinite"
              >
                <mpath href={`#orbit-144-${gradientId}`} />
              </animateMotion>
              <animate
                attributeName="opacity"
                values="0.6;1;0.6"
                dur="3.6s"
                repeatCount="indefinite"
              />
            </>
          )}
        </circle>
      </g>
    </svg>
  );
}

function Divider() {
  return (
    <div className="my-6 flex items-center gap-4">
      <div className="h-px flex-1 bg-line" />
      <span className="text-[12px] uppercase tracking-[0.12em] text-muted-foreground">
        or
      </span>
      <div className="h-px flex-1 bg-line" />
    </div>
  );
}

function HeroPanel() {
  return (
    <div className="relative hidden flex-col justify-between overflow-hidden bg-[#0a0a0a] p-12 lg:flex lg:w-[58%]">
      <LoginGraphic />

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
          className="text-[48px] font-semibold leading-[1.05] tracking-tightest text-ink sm:text-[56px]"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
        >
          Your memories,
          <br />
          <span className="text-accent">quietly remembered.</span>
        </motion.h1>
        <motion.p
          className="mt-6 max-w-md text-lg leading-relaxed text-muted"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
        >
          A persistent memory layer for your AI agent. Every conversation,
          meeting, and decision stays available, connected, and useful.
        </motion.p>
      </div>

      <motion.div
        className="relative z-10 max-w-md"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE, delay: 0.3 }}
      >
        <div className="rounded-[24px] border border-white/10 bg-[#141413] p-6">
          <div className="flex items-center justify-between">
            <MonoLabel>TODAY&apos;S MEMORY BRIEF</MonoLabel>
            <span className="font-mono text-[11px] text-muted-foreground">
              {today}
            </span>
          </div>
          <div className="mt-5 space-y-3">
            <MemoryBriefItem text="Investor follow-up draft ready for review" />
            <MemoryBriefItem text="Board notes connected to calendar context" />
            <MemoryBriefItem text="Three key decisions remembered from last week" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function MobileHero() {
  return (
    <div className="relative overflow-hidden bg-[#0a0a0a] px-6 py-10 lg:hidden">
      <div className="pointer-events-none absolute inset-0">
        <LoginGraphic />
      </div>
      <div className="relative z-10">
        <div className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-[#141413]/80 px-4 py-2">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          <MonoLabel className="text-white/70">ENGRAM MEMORY JOURNAL</MonoLabel>
        </div>
        <h1 className="mt-6 text-[36px] font-semibold leading-[1.05] tracking-tightest text-ink">
          Your memories,
          <br />
          <span className="text-accent">quietly remembered.</span>
        </h1>
        <p className="mt-4 max-w-md text-[15px] leading-relaxed text-muted">
          A persistent memory layer for your AI agent. Every conversation,
          meeting, and decision stays available, connected, and useful.
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#0a0a0a] lg:flex-row">
      <MobileHero />
      <HeroPanel />

      <div className="relative flex flex-1 flex-col justify-center bg-[#0a0a0a] px-6 py-12 lg:w-[42%] lg:flex-none">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-[100px]"
            style={{
              background:
                "radial-gradient(circle, rgba(255,107,44,0.16), transparent 70%)",
            }}
            aria-hidden
          />
          <div className="absolute inset-0 opacity-[0.04]">
            <LoginGraphic gradientId="login-glow-right" />
          </div>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[460px]">
          <div className="rounded-2xl border border-line bg-[#111110] p-10 shadow-[0_20px_60px_rgba(0,0,0,0.4)] lg:p-12">
            <div className="mb-8 flex items-center justify-center lg:hidden">
              <Logo />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
            >
              <h2 className="text-[28px] font-semibold tracking-tight text-ink sm:text-[32px]">
                Welcome Back
              </h2>
              <p className="mt-2 text-[15px] text-muted">
                Sign in to your Engram AI workspace
              </p>
            </motion.div>

            <motion.div
              className="mt-8"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
            >
              <GhostButton className="w-full" href="#">
                <GoogleIcon />
                Continue with Google
              </GhostButton>

              <Divider />

              <form
                className="space-y-4"
                onSubmit={(e) => e.preventDefault()}
              >
                <Input type="email" placeholder="Email" autoComplete="email" />
                <Input
                  type="password"
                  placeholder="Password"
                  autoComplete="current-password"
                />

                <div className="flex items-center justify-between py-1">
                  <label className="flex cursor-pointer items-center gap-2.5">
                    <input
                      type="checkbox"
                      className="h-4 w-4 cursor-pointer appearance-none rounded-[5px] border border-line bg-[#0b0b0a] checked:border-accent checked:bg-accent focus:outline-none"
                    />
                    <span className="text-[13px] text-muted">Remember me</span>
                  </label>
                  <a
                    href="#"
                    className="text-[13px] text-accent transition-colors hover:text-accent-hover"
                  >
                    Forgot password?
                  </a>
                </div>

                <PrimaryButton
                  className="w-full"
                  href="/dashboard"
                  showArrow={false}
                >
                  Sign In
                </PrimaryButton>
              </form>

              <p className="mt-6 text-center text-[13px] text-muted">
                Don&apos;t have an account?{" "}
                <a
                  href="#"
                  className="text-accent transition-colors hover:text-accent-hover"
                >
                  Sign up
                </a>
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
