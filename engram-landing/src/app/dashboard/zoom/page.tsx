"use client";

import React, { useState } from "react";
import { Video, Sparkles, Check, X, RefreshCw, Sun, Moon, Info } from "lucide-react";
import ZoomMeetingCard from "@/components/ZoomMeetingCard";
import type { ZoomMeetingAction } from "@/lib/agent-actions";
import { useTheme } from "@/app/dashboard/theme-context";

export default function MeetingsPage() {
  const [zoomConnected, setZoomConnected] = useState(false);
  const [firefliesConnected, setFirefliesConnected] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();
  const [connectingZoom, setConnectingZoom] = useState(false);
  const [connectingFireflies, setConnectingFireflies] = useState(false);

  // Theme-aware styles based on isDarkMode
  const bgMain = isDarkMode ? "#111317" : "#F3ECE3";
  const bgCard = isDarkMode ? "#1E1F23" : "#FFFFFF";
  const bgInner = isDarkMode ? "#1A1B1E" : "#EAE5DB";
  const borderCol = isDarkMode ? "#2A2F37" : "#E8DCCB";
  const textPrimary = isDarkMode ? "#F3F4F6" : "#2D2B26";
  const textMuted = isDarkMode ? "#9AA3AE" : "#615E56";
  const textGray = isDarkMode ? "#6B7280" : "#9A958C";
  const accent = isDarkMode ? "#F59E0B" : "#D97706";
  const accentText = isDarkMode ? "#111317" : "#F3ECE3";

  // Mock Meetings List (visible when connected)
  const mockMeetings: ZoomMeetingAction[] = [
    {
      topic: "Engram Sprint Planning & Sync",
      startTime: "2026-07-08T10:00:00Z",
      duration: 45,
      agenda: "1. Review sprint goals and memory API pipeline latencies.\n2. Align on OAuth credentials for Slack and Jira.\n3. Discuss design mockups for upcoming sub-pages.",
    },
    {
      topic: "Acme Corp Customer Discovery Session",
      startTime: "2026-07-09T14:30:00Z",
      duration: 30,
      agenda: "Gather requirements for Enterprise memory namespaces and compliance logging settings with Sarah Jenkins.",
    },
    {
      topic: "Monthly Board Meeting - Investor Q&A",
      startTime: "2026-07-10T16:00:00Z",
      duration: 60,
      agenda: "Present Q2 metrics, memory synchronization status, and roadmaps.",
    },
  ];

  const handleConnectZoom = () => {
    setConnectingZoom(true);
    setTimeout(() => {
      setConnectingZoom(false);
      setZoomConnected(true);
    }, 1000);
  };

  const handleConnectFireflies = () => {
    setConnectingFireflies(true);
    setTimeout(() => {
      setConnectingFireflies(false);
      setFirefliesConnected(true);
    }, 1000);
  };

  const handleDisconnect = (service: "zoom" | "fireflies") => {
    if (service === "zoom") setZoomConnected(false);
    if (service === "fireflies") setFirefliesConnected(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-8 animate-fade-in space-y-6 select-none">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full border text-xs font-semibold mb-3" style={{ backgroundColor: `${accent}15`, borderColor: `${accent}25`, color: accent }}>
            <Video size={12} />
            <span>Meetings Recorder Context</span>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight" style={{ color: textPrimary }}>Meetings</h1>
          <p className="mt-1 text-sm" style={{ color: textMuted }}>
            Schedule recorded Zoom calls and automatically extract transcript memories.
          </p>
        </div>

        {/* Global theme controls sync indicator */}
        {zoomConnected && (
          <button
            onClick={toggleTheme}
            className="flex items-center gap-2 px-3 py-1.5 border hover:bg-white/[0.02] rounded-lg text-xs font-medium transition-colors self-start sm:self-auto shrink-0 shadow-sm cursor-pointer bg-transparent"
            style={{ borderColor: borderCol, color: textPrimary }}
          >
            {isDarkMode ? (
              <>
                <Sun size={13} className="text-amber-400" />
                <span>Light Theme</span>
              </>
            ) : (
              <>
                <Moon size={13} style={{ color: textMuted }} />
                <span>Dark Theme</span>
              </>
            )}
          </button>
        )}
      </div>

      {/* Main Content Area */}
      {!zoomConnected && !firefliesConnected ? (
        /* Disconnected State */
        <div className="rounded-2xl border p-12 shadow-2xl flex flex-col items-center justify-center text-center min-h-[50vh] transition-all relative overflow-hidden" style={{ borderColor: borderCol, backgroundColor: bgCard }}>
          {/* Faint overlay grid details */}
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none" />

          {/* Large camera icon container */}
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border shadow-inner mb-6" style={{ borderColor: borderCol, backgroundColor: bgInner, color: accent }}>
            <Video size={28} />
          </div>

          <h2 className="text-[19px] font-semibold" style={{ color: textPrimary }}>Zoom & Fireflies Disconnected</h2>
          <p className="text-[13px] max-w-md mt-2.5 leading-relaxed" style={{ color: textMuted }}>
            Connect Zoom and Fireflies to schedule recorded meetings and automatically ingest transcripts into your AI memory.
          </p>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <button
              onClick={handleConnectZoom}
              disabled={connectingZoom}
              className="flex items-center justify-center gap-2 rounded-lg px-6 py-2.5 text-xs font-semibold transition-all disabled:opacity-80 border-none cursor-pointer"
              style={{ backgroundColor: accent, color: accentText }}
            >
              {connectingZoom ? (
                <>
                  <RefreshCw size={13} className="animate-spin" />
                  Connecting Zoom...
                </>
              ) : (
                "Connect Zoom"
              )}
            </button>
            <button
              onClick={handleConnectFireflies}
              disabled={connectingFireflies}
              className="flex items-center justify-center gap-2 rounded-lg border px-6 py-2.5 text-xs font-semibold transition-all disabled:opacity-80 cursor-pointer bg-transparent"
              style={{ borderColor: borderCol, color: textPrimary }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = isDarkMode ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              {connectingFireflies ? (
                <>
                  <RefreshCw size={13} className="animate-spin" />
                  Connecting Fireflies...
                </>
              ) : (
                "Connect Fireflies"
              )}
            </button>
          </div>
        </div>
      ) : (
        /* Connected Dashboard State - Displays ZoomMeetingCards feed */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column: Integration Status monitor */}
          <div className="md:col-span-1 space-y-4">
            <div className="rounded-xl border p-5 space-y-4" style={{ borderColor: borderCol, backgroundColor: bgCard }}>
              <h3 className="font-mono text-[9px] uppercase tracking-[0.2em] font-semibold" style={{ color: textMuted }}>Connections Monitor</h3>
              
              <div className="space-y-3.5 text-xs">
                {/* Zoom Status */}
                <div className="flex items-center justify-between py-1" style={{ borderBottom: `1px solid ${borderCol}` }}>
                  <div className="flex items-center gap-2">
                    <span className={`h-2 w-2 rounded-full ${zoomConnected ? "bg-emerald-500" : "bg-red-500"}`} />
                    <span className="font-medium" style={{ color: textPrimary }}>Zoom Meetings</span>
                  </div>
                  {zoomConnected ? (
                    <button
                      onClick={() => handleDisconnect("zoom")}
                      className="text-[10px] font-semibold px-2 py-0.5 border rounded hover:bg-red-500/10 transition-all cursor-pointer bg-transparent"
                      style={{ color: "#EF4444", borderColor: "rgba(239,68,68,0.2)" }}
                    >
                      Disconnect
                    </button>
                  ) : (
                    <button
                      onClick={handleConnectZoom}
                      className="text-[10px] font-semibold px-2 py-0.5 border rounded hover:bg-accent/10 transition-all cursor-pointer bg-transparent"
                      style={{ color: accent, borderColor: `${accent}20` }}
                    >
                      Connect
                    </button>
                  )}
                </div>

                {/* Fireflies Status */}
                <div className="flex items-center justify-between py-1">
                  <div className="flex items-center gap-2">
                    <span className={`h-2 w-2 rounded-full ${firefliesConnected ? "bg-emerald-500" : "bg-red-500"}`} />
                    <span className="font-medium" style={{ color: textPrimary }}>Fireflies Transcripts</span>
                  </div>
                  {firefliesConnected ? (
                    <button
                      onClick={() => handleDisconnect("fireflies")}
                      className="text-[10px] font-semibold px-2 py-0.5 border rounded hover:bg-red-500/10 transition-all cursor-pointer bg-transparent"
                      style={{ color: "#EF4444", borderColor: "rgba(239,68,68,0.2)" }}
                    >
                      Disconnect
                    </button>
                  ) : (
                    <button
                      onClick={handleConnectFireflies}
                      className="text-[10px] font-semibold px-2 py-0.5 border rounded hover:bg-accent/10 transition-all cursor-pointer bg-transparent"
                      style={{ color: accent, borderColor: `${accent}20` }}
                    >
                      Connect
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Ingestion Info Box */}
            <div className="rounded-xl border p-4.5 flex gap-3 text-xs leading-relaxed" style={{ borderColor: borderCol, backgroundColor: `${bgCard}66`, color: textMuted }}>
              <Info size={16} className="shrink-0 mt-0.5" style={{ color: accent }} />
              <p>
                Transcripts are ingested after calls finish. Engram structures speakers, timelines, and summaries into long-term memories.
              </p>
            </div>
          </div>

          {/* Right Column: Suggested Draft Actions / Meetings Grid */}
          <div className="md:col-span-2 space-y-4">
            <h3 className="font-mono text-[9px] uppercase tracking-[0.2em] font-semibold" style={{ color: textMuted }}>Actionable Meeting Drafts</h3>
            
            <div className="space-y-4">
              {zoomConnected ? (
                mockMeetings.map((meeting, idx) => (
                  <div key={idx} className="relative group">
                    <ZoomMeetingCard action={meeting} isDarkMode={isDarkMode} />
                  </div>
                ))
              ) : (
                <div className="rounded-xl border border-dashed p-8 text-center text-xs select-none" style={{ borderColor: borderCol, backgroundColor: `${bgCard}40`, color: textMuted }}>
                  Connect Zoom to view actionable drafts and meetings.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
