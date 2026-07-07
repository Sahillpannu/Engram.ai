"use client";

import { SiGmail, SiGooglecalendar, SiZoom, SiNotion, SiHubspot } from "react-icons/si";
import { motion } from "framer-motion";
import { integrations } from "@/content/copy";
import { EASE, MonoLabel } from "./ui";

const SlackLogo = ({ size = 20, style }: { size?: number; style?: React.CSSProperties }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
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

const FirefliesLogo = ({ size = 20, style }: { size?: number; style?: React.CSSProperties }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
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

const iconMap: Record<
  string,
  React.ComponentType<{ size?: number; style?: React.CSSProperties }>
> = {
  Gmail: SiGmail,
  GoogleCalendar: SiGooglecalendar,
  Slack: SlackLogo,
  Zoom: SiZoom,
  Notion: SiNotion,
  Fireflies: FirefliesLogo,
  HubSpot: SiHubspot,
};

function IntegrationIcon({ item }: { item: (typeof integrations)[number] }) {
  const Icon = iconMap[item.icon] ?? SiGmail;
  const color = brandColor[item.icon];
  const isNotion = item.icon === "Notion";

  return (
    <motion.div
      className="group relative mx-12 flex h-24 w-24 shrink-0 items-center justify-center transition-all duration-300"
      whileHover={{ y: -6, scale: 1.1 }}
    >
      {/* Subtle brand color glow behind the icon on hover */}
      <div
        className="pointer-events-none absolute -inset-4 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-15"
        style={{
          background: `radial-gradient(circle, ${color || "#ffffff"} 0%, transparent 70%)`,
        }}
      />

      <span className="flex items-center justify-center">
        {isNotion ? (
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/95 shadow-sm">
            <Icon size={33} style={{ color }} />
          </span>
        ) : (
          <Icon size={54} style={{ color }} />
        )}
      </span>
    </motion.div>
  );
}

export default function IntegrationsDock() {
  // Multiply array to guarantee seamless looping without gaps
  const row = [...integrations, ...integrations, ...integrations, ...integrations];

  return (
    <section id="integrations" className="relative border-t border-line py-16 lg:py-20">
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

      <div className="relative overflow-hidden py-2">
        <div className="flex w-max animate-marquee">
          {row.map((item, i) => (
            <IntegrationIcon key={`${item.name}-${i}`} item={item} />
          ))}
        </div>

        {/* edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-bg to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-bg to-transparent" />
      </div>
    </section>
  );
}
