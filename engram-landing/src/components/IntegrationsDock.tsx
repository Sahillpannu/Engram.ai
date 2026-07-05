"use client";

import { SiGmail, SiGooglecalendar, SiZoom, SiNotion, SiHubspot } from "react-icons/si";
import { motion } from "framer-motion";
import { integrations } from "@/content/copy";
import { EASE, MonoLabel } from "./ui";

const SlackLogo = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M5.042 15.166a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.166a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52Zm1.271 0a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.52v-6.314Z"
      fill="#E01E5A"
    />
    <path
      d="M8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834Zm0 1.271a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312Z"
      fill="#36C5F0"
    />
    <path
      d="M18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834Zm-1.271 0a2.528 2.528 0 0 1-2.521 2.521 2.528 2.528 0 0 1-2.521-2.521V2.522A2.528 2.528 0 0 1 15.164 0a2.528 2.528 0 0 1 2.521 2.522v6.312Z"
      fill="#2EB67D"
    />
    <path
      d="M15.164 18.956a2.528 2.528 0 0 1 2.521 2.522A2.528 2.528 0 0 1 15.164 24a2.528 2.528 0 0 1-2.521-2.522v-2.522h2.521Zm0-1.271a2.528 2.528 0 0 1-2.521-2.521 2.528 2.528 0 0 1 2.521-2.521h6.313A2.528 2.528 0 0 1 24 15.164a2.528 2.528 0 0 1-2.522 2.521h-6.314Z"
      fill="#ECB22E"
    />
  </svg>
);

const FirefliesLogo = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M12 2c-4.42 0-8 3.58-8 8 0 3.5 2.2 6.47 5.33 7.66L11 22l1.67-4.34C15.8 16.47 18 13.5 18 10c0-4.42-3.58-8-8-8ZM9 10c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2Zm6.5-2c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2Z"
      fill="#FFAB00"
    />
  </svg>
);

const brandColor: Record<string, string> = {
  Gmail: "#EA4335",
  GoogleCalendar: "#4285F4",
  Zoom: "#2D8CFF",
  Notion: "#000000",
  HubSpot: "#FF7A59",
};

const iconMap: Record<string, React.ComponentType<{ size?: number; style?: React.CSSProperties }>> = {
  Gmail: SiGmail,
  GoogleCalendar: SiGooglecalendar,
  Slack: SlackLogo,
  Zoom: SiZoom,
  Notion: SiNotion,
  Fireflies: FirefliesLogo,
  HubSpot: SiHubspot,
};

function DockCard({ item }: { item: (typeof integrations)[number] }) {
  const Icon = iconMap[item.icon] ?? SiGmail;
  const color = brandColor[item.icon];
  const isNotion = item.icon === "Notion";
  return (
    <div className="group relative mx-3 flex min-h-[92px] w-[230px] shrink-0 flex-col overflow-hidden rounded-xl border border-line bg-card p-4 transition-transform duration-300 ease-editorial hover:-translate-y-1.5">
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-bg/60">
          {isNotion ? (
            <span className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-white/90">
              <Icon size={18} style={{ color }} />
            </span>
          ) : (
            <span className="flex h-[18px] w-[18px] items-center justify-center">
              <Icon size={18} style={{ color }} />
            </span>
          )}
        </span>
        <div className="min-w-0">
          <div className="text-sm font-normal text-ink">{item.name}</div>
          <div className="truncate font-mono text-[11px] text-muted">{item.desc}</div>
        </div>
      </div>

      {/* syncing indicator */}
      <div className="mt-auto flex items-center gap-1.5 overflow-hidden opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <span className="flex gap-1">
          {[0, 1, 2].map((d) => (
            <span
              key={d}
              className="h-1 w-1 rounded-full bg-accent"
              style={{
                animation: "syncing-blink 1.2s ease-in-out infinite",
                animationDelay: `${d * 0.18}s`,
              }}
            />
          ))}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-wide text-muted">
          Syncing
        </span>
      </div>
    </div>
  );
}

export default function IntegrationsDock() {
  const row = [...integrations, ...integrations];
  return (
    <section id="integrations" className="relative border-t border-line py-20 lg:py-24">
      <motion.div
        className="relative z-10 mb-10 text-center"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <MonoLabel className="block">INTEGRATIONS</MonoLabel>
        <p className="mx-auto mt-3 max-w-md text-sm text-muted">
          Connect the tools you already use. Engram listens and remembers.
        </p>
      </motion.div>

      <div className="relative overflow-hidden">
        <div className="flex w-max animate-marquee">
          {row.map((item, i) => (
            <DockCard key={`${item.name}-${i}`} item={item} />
          ))}
        </div>

        {/* edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-bg to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-bg to-transparent" />
      </div>
    </section>
  );
}
