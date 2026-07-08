"use client";

import React, { useState } from "react";
import { Mail, Calendar, Brain, Quote, RefreshCw, Sparkles } from "lucide-react";

interface DailyBriefWorkspaceProps {
  isDarkMode: boolean;
  tenantId?: string;
  userName?: string;
}

export default function DailyBriefWorkspace({
  isDarkMode,
  tenantId,
  userName = "there",
}: DailyBriefWorkspaceProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [hasBrief, setHasBrief] = useState(true);

  // Styling helper based on isDarkMode
  const bgOuter = isDarkMode ? "#111317" : "#F3ECE3";
  const bgCard = isDarkMode ? "#1E1F23" : "#FFFFFF";
  const borderCard = isDarkMode ? "#2A2F37" : "#E8DCCB";
  const textPrimary = isDarkMode ? "#F3F4F6" : "#2D2B26";
  const textMuted = isDarkMode ? "#9AA3AE" : "#615E56";
  const bgQuote = isDarkMode ? "#1A1B1E" : "#F7F5F0";

  const handleRegenerate = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setHasBrief(true);
    }, 1500);
  };

  const handleGenerateNow = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setHasBrief(true);
    }, 1500);
  };

  const handleClearBrief = () => {
    setHasBrief(false);
  };

  return (
    <div
      className="min-h-full p-6 md:p-8 transition-colors duration-300"
      style={{ backgroundColor: bgOuter, color: textPrimary }}
    >
      {/* Upper header action bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#F59E0B]/10 border border-[#F59E0B]/25 text-[#F59E0B] text-xs font-semibold mb-3">
            <Sparkles size={12} />
            <span>Active Memory Engine {tenantId ? `(${tenantId})` : ""}</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">
            Good morning, <span className="capitalize">{userName}</span>
          </h1>
          <p className="mt-1 text-sm" style={{ color: textMuted }}>
            Here is your daily cognitive summary and action plan.
          </p>
        </div>

        {hasBrief && !isLoading && (
          <div className="flex items-center gap-3">
            <button
              onClick={handleClearBrief}
              className="px-3.5 py-1.5 rounded-lg text-xs font-medium border transition-colors bg-transparent border-[#E57373]/20 text-[#E57373] hover:bg-[#E57373]/10"
            >
              Clear Brief
            </button>
            <button
              onClick={handleRegenerate}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold border transition-all duration-200"
              style={{
                borderColor: borderCard,
                backgroundColor: bgCard,
                color: textMuted,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = isDarkMode ? "#252629" : "#F3ECE3";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = bgCard;
              }}
            >
              <RefreshCw size={13} className="animate-spin-slow" />
              Regenerate
            </button>
          </div>
        )}
      </div>

      {isLoading ? (
        /* SKELETON LOADER STATE */
        <div className="space-y-6 animate-pulse" style={{ opacity: 0.6 }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              className="h-32 rounded-xl border"
              style={{ backgroundColor: bgCard, borderColor: borderCard }}
            />
            <div
              className="h-32 rounded-xl border"
              style={{ backgroundColor: bgCard, borderColor: borderCard }}
            />
          </div>
          <div
            className="h-48 rounded-xl border"
            style={{ backgroundColor: bgCard, borderColor: borderCard }}
          />
          <div
            className="h-24 rounded-xl border"
            style={{ backgroundColor: bgCard, borderColor: borderCard }}
          />
        </div>
      ) : !hasBrief ? (
        /* EMPTY STATE */
        <div
          className="rounded-2xl border p-12 text-center flex flex-col items-center justify-center min-h-[45vh] shadow-lg transition-all"
          style={{ backgroundColor: bgCard, borderColor: borderCard }}
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F59E0B]/10 border border-[#F59E0B]/25 mb-5">
            <Brain size={24} style={{ color: "#F59E0B" }} />
          </div>
          <h2 className="text-xl font-bold">No Daily Brief Generated</h2>
          <p className="text-sm max-w-sm mt-2 mb-6" style={{ color: textMuted }}>
            Generate a personalized brief mapping your tasks, emails, and meetings for the day.
          </p>
          <button
            onClick={handleGenerateNow}
            className="px-6 py-3 rounded-lg text-sm font-bold shadow-md hover:opacity-95 transition-all animate-fade-in"
            style={{
              backgroundColor: "#F59E0B",
              color: "#111317",
              border: "none",
            }}
          >
            Generate Now
          </button>
        </div>
      ) : (
        /* ACTIVE BRIEF STATE */
        <div className="space-y-6">
          {/* Key Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Emails to Reply Card */}
            <div
              className="rounded-xl border p-5 flex items-start gap-4 transition-all duration-200 hover:scale-[1.01]"
              style={{ backgroundColor: bgCard, borderColor: borderCard }}
            >
              <div className="p-3 rounded-lg bg-[#F59E0B]/10 border border-[#F59E0B]/20">
                <Mail size={20} style={{ color: "#F59E0B" }} />
              </div>
              <div>
                <h3 className="text-xs uppercase tracking-wider font-semibold" style={{ color: textMuted }}>
                  Pending Follow-ups
                </h3>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-3xl font-bold tracking-tight text-[#F3F4F6]">
                    5
                  </span>
                  <span className="text-xs" style={{ color: textMuted }}>
                    emails to reply
                  </span>
                </div>
                <p className="text-[12px] mt-2" style={{ color: textMuted }}>
                  Including high-priority draft reply to Acme Corp.
                </p>
              </div>
            </div>

            {/* Meetings Today Card */}
            <div
              className="rounded-xl border p-5 flex items-start gap-4 transition-all duration-200 hover:scale-[1.01]"
              style={{ backgroundColor: bgCard, borderColor: borderCard }}
            >
              <div className="p-3 rounded-lg bg-[#F59E0B]/10 border border-[#F59E0B]/20">
                <Calendar size={20} style={{ color: "#F59E0B" }} />
              </div>
              <div>
                <h3 className="text-xs uppercase tracking-wider font-semibold" style={{ color: textMuted }}>
                  Today&apos;s Schedule
                </h3>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-3xl font-bold tracking-tight text-[#F3F4F6]">
                    3
                  </span>
                  <span className="text-xs" style={{ color: textMuted }}>
                    meetings scheduled
                  </span>
                </div>
                <p className="text-[12px] mt-2" style={{ color: textMuted }}>
                  Next event starts at 10:00 AM.
                </p>
              </div>
            </div>
          </div>

          {/* Primary Brief Content Card */}
          <div
            className="rounded-xl border p-6 space-y-4"
            style={{ backgroundColor: bgCard, borderColor: borderCard }}
          >
            <div className="flex items-center gap-2 pb-3 border-b border-[#2A2F37]/30">
              <Brain size={18} style={{ color: "#F59E0B" }} />
              <h2 className="text-sm font-semibold uppercase tracking-wider">
                Cognitive Ingestion Context
              </h2>
            </div>
            <div className="space-y-3.5 text-[13.5px] leading-relaxed">
              <p>
                Yesterday, you and Adrian aligned on hairline borders design style guides and orange accent highlights. You agreed to finalize the dashboard shell components today.
              </p>
              <p>
                We identified <strong>1 key follow-up item</strong> from your conversation yesterday with Acme Corp. Your calendar shows no conflicts for the proposed synchronization session next Tuesday.
              </p>
            </div>
          </div>

          {/* Motivational Quote Card */}
          <div
            className="rounded-xl p-5 flex gap-4 border-y border-r"
            style={{
              backgroundColor: bgQuote,
              borderColor: borderCard,
              borderLeft: "4px solid #F59E0B",
            }}
          >
            <Quote size={20} className="shrink-0 mt-1" style={{ color: "#F59E0B" }} />
            <div>
              <p className="text-[13px] italic leading-relaxed" style={{ color: textPrimary }}>
                &ldquo;Simplicity is the ultimate sophistication. When you remove what is unnecessary, what remains is pure experience.&rdquo;
              </p>
              <span className="block text-[11px] font-semibold mt-2" style={{ color: textMuted }}>
                — Leonardo da Vinci
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
