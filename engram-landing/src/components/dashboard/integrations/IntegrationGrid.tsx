"use client";

import { Check, Database } from "lucide-react";
import type { IntegrationItem } from "./IntegrationCard";
import IntegrationCard from "./IntegrationCard";

interface IntegrationGridProps {
  apps: IntegrationItem[];
  connectedIds: string[];
  totalCount: number;
  connectedCount: number;
  onConnect: (id: string) => void;
  onDisconnect: (id: string) => void;
  onReauth: (id: string) => void;
  fixingId: string | null;
  onClearFilters: () => void;
  isDarkMode?: boolean;
}

export default function IntegrationGrid({
  apps,
  connectedIds,
  totalCount,
  connectedCount,
  onConnect,
  onDisconnect,
  onReauth,
  fixingId,
  onClearFilters,
  isDarkMode = true,
}: IntegrationGridProps) {
  // Theme-aware styles based on isDarkMode
  const bgMain = isDarkMode ? "#111317" : "#F3ECE3";
  const bgHeader = isDarkMode ? "#141517" : "#EFECE6";
  const borderCol = isDarkMode ? "#2A2F37" : "#E8DCCB";
  const textPrimary = isDarkMode ? "#F3F4F6" : "#2D2B26";
  const textSecondary = isDarkMode ? "#E2E8F0" : "#2D2B26";
  const textMuted = isDarkMode ? "#9AA3AE" : "#615E56";
  const textGray = isDarkMode ? "#6B7280" : "#9A958C";
  const accent = isDarkMode ? "#F59E0B" : "#D97706";

  return (
    <div className="flex h-full min-h-0 min-w-0 flex-1 flex-col" style={{ backgroundColor: bgMain }}>
      {/* Top header bar */}
      <header
        className="flex h-[52px] shrink-0 items-center justify-between border-b px-7"
        style={{ backgroundColor: bgHeader, borderColor: borderCol }}
      >
        <div className="flex items-center gap-2.5">
          <span className="text-[14px] font-semibold" style={{ color: textPrimary }}>Integrations</span>
          <span className="inline-flex items-center gap-1 rounded-full border border-[rgba(16,185,129,0.2)] bg-[rgba(16,185,129,0.12)] px-2 py-0.5 text-[11px] font-semibold text-[#10B981]">
            <Check size={10} strokeWidth={3} />
            {connectedCount} connected
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex h-[26px] w-[26px] items-center justify-center rounded-full bg-gradient-to-br from-[#F59E0B] to-[#D97706] text-[11px] font-bold text-[#111317]">
            HD
          </div>
          <span className="text-[12px] font-medium" style={{ color: textSecondary }}>Hitesh</span>
        </div>
      </header>

      {/* Scroll area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {/* Hero */}
        <div className="px-7 pt-7">
          <h1 className="text-[22px] font-bold" style={{ color: textPrimary }}>Connect your workspace</h1>
          <p className="mt-1 text-[13px]" style={{ color: textMuted }}>
            {totalCount} sources available · {connectedCount} connected
          </p>
        </div>

        {apps.length === 0 ? (
          <div className="flex flex-col items-center justify-center px-7 py-20 text-center">
            <Database className="mb-3 h-10 w-10" style={{ color: `${textGray}50` }} />
            <h3 className="text-sm font-semibold" style={{ color: textPrimary }}>No memory sources found</h3>
            <p className="mt-1 max-w-xs text-xs" style={{ color: textGray }}>
              We couldn&apos;t find any integrations matching your active search or filters.
            </p>
            <button
              onClick={onClearFilters}
              className="mt-4 inline-flex items-center rounded-full border px-3.5 py-1.5 text-xs font-semibold cursor-pointer bg-transparent"
              style={{ borderColor: borderCol, color: accent }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `${accent}40`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = borderCol;
              }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div
            className="grid gap-3 px-7 pb-7 pt-5"
            style={{ gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))" }}
          >
            {apps.map((item) => (
              <IntegrationCard
                key={item.name}
                item={item}
                isConnected={connectedIds.includes(item.name)}
                onConnect={onConnect}
                onDisconnect={onDisconnect}
                onReauth={onReauth}
                fixing={fixingId === item.name}
                isDarkMode={isDarkMode}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
