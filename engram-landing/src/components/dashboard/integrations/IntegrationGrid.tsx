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
}: IntegrationGridProps) {
  return (
    <div className="flex h-full min-h-0 min-w-0 flex-1 flex-col bg-[#111317]">
      {/* Top header bar */}
      <header className="flex h-[52px] shrink-0 items-center justify-between border-b border-[#2A2F37] bg-[#141517] px-7">
        <div className="flex items-center gap-2.5">
          <span className="text-[14px] font-semibold text-[#F3F4F6]">Integrations</span>
          <span className="inline-flex items-center gap-1 rounded-full border border-[rgba(16,185,129,0.2)] bg-[rgba(16,185,129,0.12)] px-2 py-0.5 text-[11px] font-semibold text-[#10B981]">
            <Check size={10} strokeWidth={3} />
            {connectedCount} connected
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex h-[26px] w-[26px] items-center justify-center rounded-full bg-gradient-to-br from-[#F59E0B] to-[#D97706] text-[11px] font-bold text-[#111317]">
            HD
          </div>
          <span className="text-[12px] font-medium text-[#E2E8F0]">Hitesh</span>
        </div>
      </header>

      {/* Scroll area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {/* Hero */}
        <div className="px-7 pt-7">
          <h1 className="text-[22px] font-bold text-[#F3F4F6]">Connect your workspace</h1>
          <p className="mt-1 text-[13px] text-[#9AA3AE]">
            {totalCount} sources available · {connectedCount} connected
          </p>
        </div>

        {apps.length === 0 ? (
          <div className="flex flex-col items-center justify-center px-7 py-20 text-center">
            <Database className="mb-3 h-10 w-10 text-[#6B7280]/50" />
            <h3 className="text-sm font-semibold text-[#F3F4F6]">No memory sources found</h3>
            <p className="mt-1 max-w-xs text-xs text-[#6B7280]">
              We couldn&apos;t find any integrations matching your active search or filters.
            </p>
            <button
              onClick={onClearFilters}
              className="mt-4 inline-flex items-center rounded-full border border-[#2A2F37] px-3.5 py-1.5 text-xs font-semibold text-[#F59E0B] transition-colors hover:border-[#F59E0B]/40"
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
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
