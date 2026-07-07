"use client";

import React, { useState } from "react";
import { Video, Sparkles, Check, X, RefreshCw, Sun, Moon, Info } from "lucide-react";
import ZoomMeetingCard from "@/components/ZoomMeetingCard";
import type { ZoomMeetingAction } from "@/lib/agent-actions";

export default function MeetingsPage() {
  const [zoomConnected, setZoomConnected] = useState(false);
  const [firefliesConnected, setFirefliesConnected] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [connectingZoom, setConnectingZoom] = useState(false);
  const [connectingFireflies, setConnectingFireflies] = useState(false);

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
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-accent/15 border border-accent/25 text-accent text-xs font-semibold mb-3">
            <Video size={12} />
            <span>Meetings Recorder Context</span>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-ink">Meetings</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Schedule recorded Zoom calls and automatically extract transcript memories.
          </p>
        </div>

        {/* Theme Toggle (Visible when connected) */}
        {zoomConnected && (
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="flex items-center gap-2 px-3 py-1.5 border border-line bg-card hover:bg-white/[0.02] rounded-lg text-xs font-medium text-ink transition-colors self-start sm:self-auto shrink-0 shadow-sm"
          >
            {isDarkMode ? (
              <>
                <Sun size={13} className="text-amber-400" />
                <span>Light Cards</span>
              </>
            ) : (
              <>
                <Moon size={13} className="text-muted-foreground" />
                <span>Dark Cards</span>
              </>
            )}
          </button>
        )}
      </div>

      {/* Main Content Area */}
      {!zoomConnected && !firefliesConnected ? (
        /* Disconnected State - Matches Mockup Screenshot Exactly */
        <div className="rounded-2xl border border-line bg-[#141210] p-12 shadow-2xl flex flex-col items-center justify-center text-center min-h-[50vh] transition-all relative overflow-hidden">
          {/* Faint overlay grid details */}
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none" />

          {/* Large camera icon container */}
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.02] shadow-inner mb-6 text-accent-hover/80">
            <Video size={28} />
          </div>

          <h2 className="text-[19px] font-semibold text-ink">Zoom & Fireflies Disconnected</h2>
          <p className="text-[13px] text-muted max-w-md mt-2.5 leading-relaxed">
            Connect Zoom and Fireflies to schedule recorded meetings and automatically ingest transcripts into your AI memory.
          </p>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <button
              onClick={handleConnectZoom}
              disabled={connectingZoom}
              className="flex items-center justify-center gap-2 rounded-lg bg-accent px-6 py-2.5 text-xs font-semibold text-white transition-all hover:bg-accent-hover disabled:opacity-80"
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
              className="flex items-center justify-center gap-2 rounded-lg border border-line bg-white/[0.02] px-6 py-2.5 text-xs font-semibold text-ink transition-all hover:border-white/10 disabled:opacity-80"
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
            <div className="rounded-xl border border-line bg-[#111110] p-5 space-y-4">
              <h3 className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground font-semibold">Connections Monitor</h3>
              
              <div className="space-y-3.5 text-xs">
                {/* Zoom Status */}
                <div className="flex items-center justify-between py-1 border-b border-line/30">
                  <div className="flex items-center gap-2">
                    <span className={`h-2 w-2 rounded-full ${zoomConnected ? "bg-emerald-500" : "bg-red-500"}`} />
                    <span className="text-white/80 font-medium">Zoom Meetings</span>
                  </div>
                  {zoomConnected ? (
                    <button
                      onClick={() => handleDisconnect("zoom")}
                      className="text-[10px] text-red-400 hover:text-red-300 font-semibold px-2 py-0.5 border border-red-500/20 bg-red-500/5 rounded hover:bg-red-500/10 transition-all"
                    >
                      Disconnect
                    </button>
                  ) : (
                    <button
                      onClick={handleConnectZoom}
                      className="text-[10px] text-accent hover:text-accent-hover font-semibold px-2 py-0.5 border border-accent/20 bg-accent/5 rounded hover:bg-accent/10 transition-all"
                    >
                      Connect
                    </button>
                  )}
                </div>

                {/* Fireflies Status */}
                <div className="flex items-center justify-between py-1">
                  <div className="flex items-center gap-2">
                    <span className={`h-2 w-2 rounded-full ${firefliesConnected ? "bg-emerald-500" : "bg-red-500"}`} />
                    <span className="text-white/80 font-medium">Fireflies Transcripts</span>
                  </div>
                  {firefliesConnected ? (
                    <button
                      onClick={() => handleDisconnect("fireflies")}
                      className="text-[10px] text-red-400 hover:text-red-300 font-semibold px-2 py-0.5 border border-red-500/20 bg-red-500/5 rounded hover:bg-red-500/10 transition-all"
                    >
                      Disconnect
                    </button>
                  ) : (
                    <button
                      onClick={handleConnectFireflies}
                      className="text-[10px] text-accent hover:text-accent-hover font-semibold px-2 py-0.5 border border-accent/20 bg-accent/5 rounded hover:bg-accent/10 transition-all"
                    >
                      Connect
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Ingestion Info Box */}
            <div className="rounded-xl border border-line bg-card/20 p-4.5 flex gap-3 text-xs leading-relaxed text-muted-foreground/90">
              <Info size={16} className="text-accent shrink-0 mt-0.5" />
              <p>
                Transcripts are ingested after calls finish. Engram structures speakers, timelines, and summaries into long-term memories.
              </p>
            </div>
          </div>

          {/* Right Column: Suggested Draft Actions / Meetings Grid */}
          <div className="md:col-span-2 space-y-4">
            <h3 className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground font-semibold">Actionable Meeting Drafts</h3>
            
            <div className="space-y-4">
              {zoomConnected ? (
                mockMeetings.map((meeting, idx) => (
                  <div key={idx} className="relative group">
                    <ZoomMeetingCard action={meeting} isDarkMode={isDarkMode} />
                  </div>
                ))
              ) : (
                <div className="rounded-xl border border-line border-dashed bg-card/10 p-8 text-center text-xs text-muted-foreground/60 select-none">
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
