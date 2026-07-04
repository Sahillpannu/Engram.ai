import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

const geistSans = GeistSans;
const geistMono = GeistMono;

export const metadata: Metadata = {
  title: "Engram — Your AI agent remembers.",
  description:
    "Engram is a persistent memory infrastructure layer for AI agents. It turns emails, meetings, calendars and conversations into long-term memory agents can reason over.",
  openGraph: {
    title: "Engram — Your AI agent remembers.",
    description:
      "Persistent memory infrastructure for AI agents. Turn emails, meetings, and calendars into long-term memory your agents can reason over.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="bg-bg text-ink font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
