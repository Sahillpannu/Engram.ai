"use client";

import { Search, Check, Star, LayoutGrid } from "lucide-react";
import type { ReactNode } from "react";
import type { IntegrationItem } from "./IntegrationCard";

export type OverviewFilter = "all" | "connected" | "error" | "recommended";

interface IntegrationFilterPanelProps {
  apps: IntegrationItem[];
  connectedIds: string[];
  categories: string[];
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedOverview: OverviewFilter;
  onSelectOverview: (o: OverviewFilter) => void;
  selectedCategories: string[];
  onToggleCategory: (cat: string) => void;
  isDarkMode?: boolean;
}

function OverviewRow({
  active,
  onClick,
  icon,
  label,
  count,
  badgeClass,
  isDarkMode = true,
}: {
  active: boolean;
  onClick: () => void;
  icon: ReactNode;
  label: string;
  count: number;
  badgeClass: string;
  isDarkMode?: boolean;
}) {
  const bgActive = isDarkMode ? "#252629" : "#E0DCD4";
  const bgHover = isDarkMode ? "#252629" : "#E0DCD4";
  const textPrimary = isDarkMode ? "#E2E8F0" : "#2D2B26";

  return (
    <button
      onClick={onClick}
      className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-[13px] transition-colors border-none cursor-pointer"
      style={{
        backgroundColor: active ? bgActive : "transparent",
        color: textPrimary,
      }}
      onMouseEnter={(e) => {
        if (!active) e.currentTarget.style.backgroundColor = bgHover;
      }}
      onMouseLeave={(e) => {
        if (!active) e.currentTarget.style.backgroundColor = "transparent";
      }}
    >
      <span className="flex h-4 w-4 items-center justify-center">{icon}</span>
      <span className="flex-1">{label}</span>
      <span
        className={`flex h-[18px] min-w-[20px] items-center justify-center rounded-full px-2 text-[11px] font-bold ${badgeClass}`}
      >
        {count}
      </span>
    </button>
  );
}

export default function IntegrationFilterPanel({
  apps,
  connectedIds,
  categories,
  searchQuery,
  onSearchChange,
  selectedOverview,
  onSelectOverview,
  selectedCategories,
  onToggleCategory,
  isDarkMode = true,
}: IntegrationFilterPanelProps) {
  const countAll = apps.length;
  const countConnected = apps.filter((a) => connectedIds.includes(a.name)).length;
  const countError = apps.filter((a) => a.hasError && connectedIds.includes(a.name)).length;
  const countRecommended = apps.filter(
    (a) => a.recommended && !connectedIds.includes(a.name)
  ).length;
  const getCategoryCount = (cat: string) => apps.filter((a) => a.category === cat).length;

  const bgPanel = isDarkMode ? "#1A1B1E" : "#EAE5DB";
  const borderCol = isDarkMode ? "#2A2F37" : "#E8DCCB";
  const bgInner = isDarkMode ? "#111317" : "#F3ECE3";
  const textPrimary = isDarkMode ? "#E2E8F0" : "#2D2B26";
  const textMuted = isDarkMode ? "#9AA3AE" : "#615E56";
  const textGray = isDarkMode ? "#6B7280" : "#9A958C";
  const bgActive = isDarkMode ? "#252629" : "#E0DCD4";

  return (
    <aside
      className="flex w-full shrink-0 flex-col overflow-y-auto border-b p-6 custom-scrollbar max-h-[45vh] md:h-full md:max-h-none md:border-b-0 md:border-r"
      style={{
        width: "240px",
        minWidth: "240px",
        flexShrink: 0,
        backgroundColor: bgPanel,
        borderColor: borderCol,
      }}
    >
      {/* Search */}
      <div className="relative shrink-0">
        <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2" style={{ color: textGray }} />
        <input
          type="text"
          placeholder="Search here"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="h-9 w-full rounded-full border pl-9 pr-3 text-[13px] outline-none transition-colors"
          style={{
            borderColor: borderCol,
            backgroundColor: bgInner,
            color: textPrimary,
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = isDarkMode ? "#F59E0B/40" : "#D97706/40";
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = borderCol;
          }}
        />
      </div>

      {/* Overview */}
      <div className="mt-6">
        <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.08em]" style={{ color: textGray }}>
          Overview
        </div>
        <div className="space-y-1">
          <OverviewRow
            active={selectedOverview === "connected"}
            onClick={() => onSelectOverview("connected")}
            icon={<Check size={14} className="text-[#10B981]" />}
            label="Connected"
            count={countConnected}
            badgeClass="bg-[#1E293B] text-[#10B981]"
            isDarkMode={isDarkMode}
          />
          <OverviewRow
            active={selectedOverview === "error"}
            onClick={() => onSelectOverview("error")}
            icon={<span className="h-2 w-2 rounded-full bg-[#EF4444]" />}
            label="Error"
            count={countError}
            badgeClass="bg-[#1F1010] text-[#EF4444]"
            isDarkMode={isDarkMode}
          />
          <OverviewRow
            active={selectedOverview === "recommended"}
            onClick={() => onSelectOverview("recommended")}
            icon={<Star size={14} className="fill-[#F59E0B] text-[#F59E0B]" />}
            label="Recommended"
            count={countRecommended}
            badgeClass="bg-[#1C1810] text-[#F59E0B]"
            isDarkMode={isDarkMode}
          />
        </div>
      </div>

      {/* Categories */}
      <div className="mt-6">
        <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.08em]" style={{ color: textGray }}>
          Categories
        </div>
        <button
          onClick={() => onSelectOverview("all")}
          className="flex h-8 w-full items-center gap-2 rounded-lg px-2.5 text-[13px] transition-colors border-none cursor-pointer"
          style={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            gap: "8px",
            backgroundColor: selectedOverview === "all" ? bgActive : "transparent",
            color: selectedOverview === "all" ? textPrimary : textMuted,
          }}
          onMouseEnter={(e) => {
            if (selectedOverview !== "all") e.currentTarget.style.backgroundColor = bgActive;
          }}
          onMouseLeave={(e) => {
            if (selectedOverview !== "all") e.currentTarget.style.backgroundColor = "transparent";
          }}
        >
          <LayoutGrid size={16} style={{ color: textMuted, flexShrink: 0 }} />
          <span
            className="flex-1 text-left"
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            All sources
          </span>
          <span className="text-[11px]" style={{ marginLeft: "auto", flexShrink: 0, color: textGray }}>{countAll}</span>
        </button>

        <div className="mt-1 space-y-0.5">
          {categories.map((cat) => {
            const checked = selectedCategories.includes(cat);
            return (
              <label
                key={cat}
                className="flex h-8 cursor-pointer items-center gap-2 rounded-lg px-2.5 transition-colors"
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  gap: "8px",
                  color: textMuted,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = bgActive;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                <span
                  className="flex h-4 w-4 items-center justify-center rounded-[4px] border"
                  style={{
                    flexShrink: 0,
                    width: "16px",
                    height: "16px",
                    borderColor: checked ? (isDarkMode ? "#F59E0B" : "#D97706") : borderCol,
                    backgroundColor: checked ? (isDarkMode ? "#F59E0B" : "#D97706") : "transparent",
                  }}
                >
                  {checked && <Check size={11} strokeWidth={3} className="text-white" />}
                </span>
                <span
                  className="flex-1 text-[13px]"
                  style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    color: textMuted,
                  }}
                >
                  {cat}
                </span>
                <span
                  className="text-[11px]"
                  style={{ marginLeft: "auto", flexShrink: 0, color: textGray }}
                >
                  {getCategoryCount(cat)}
                </span>
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => onToggleCategory(cat)}
                  className="sr-only"
                />
              </label>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
