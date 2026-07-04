import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

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
    <html lang="en">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} bg-bg text-ink font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
