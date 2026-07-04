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
  title: "Engram — Persistent memory for AI agents",
  description:
    "Engram gives your AI agent a brain. Connect Gmail, Calendar, and Meetings to build long-term memory your agent can reason over.",
  openGraph: {
    title: "Engram — Persistent memory for AI agents",
    description:
      "Engram gives your AI agent a brain. Connect Gmail, Calendar, and Meetings to build long-term memory your agent can reason over.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} bg-background text-foreground font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
