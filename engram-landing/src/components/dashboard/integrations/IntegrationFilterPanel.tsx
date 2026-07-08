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
}

function OverviewRow({
  active,
  onClick,
  icon,
  label,
  count,
  badgeClass,
}: {
  active: boolean;
  onClick: () => void;
  icon: ReactNode;
  label: string;
  count: number;
  badgeClass: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-[13px] transition-colors ${
        active ? "bg-[#252629] text-[#E2E8F0]" : "text-[#E2E8F0] hover:bg-[#252629]"
      }`}
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
}: IntegrationFilterPanelProps) {
  const countAll = apps.length;
  const countConnected = apps.filter((a) => connectedIds.includes(a.name)).length;
  const countError = apps.filter((a) => a.hasError && connectedIds.includes(a.name)).length;
  const countRecommended = apps.filter(
    (a) => a.recommended && !connectedIds.includes(a.name)
  ).length;
  const getCategoryCount = (cat: string) => apps.filter((a) => a.category === cat).length;

  return (
    <aside
      className="flex w-full shrink-0 flex-col overflow-y-auto border-b border-[#2A2F37] bg-[#1A1B1E] p-6 custom-scrollbar max-h-[45vh] md:h-full md:max-h-none md:border-b-0 md:border-r"
      style={{ width: "240px", minWidth: "240px", flexShrink: 0 }}
    >
      {/* Search */}
      <div className="relative shrink-0">
        <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#6B7280]" />
        <input
          type="text"
          placeholder="Search here"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="h-9 w-full rounded-full border border-[#2A2F37] bg-[#111317] pl-9 pr-3 text-[13px] text-[#E2E8F0] placeholder:text-[#6B7280] outline-none transition-colors focus:border-[#F59E0B]/40"
        />
      </div>

      {/* Overview */}
      <div className="mt-6">
        <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.08em] text-[#6B7280]">
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
          />
          <OverviewRow
            active={selectedOverview === "error"}
            onClick={() => onSelectOverview("error")}
            icon={<span className="h-2 w-2 rounded-full bg-[#EF4444]" />}
            label="Error"
            count={countError}
            badgeClass="bg-[#1F1010] text-[#EF4444]"
          />
          <OverviewRow
            active={selectedOverview === "recommended"}
            onClick={() => onSelectOverview("recommended")}
            icon={<Star size={14} className="fill-[#F59E0B] text-[#F59E0B]" />}
            label="Recommended"
            count={countRecommended}
            badgeClass="bg-[#1C1810] text-[#F59E0B]"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="mt-6">
        <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.08em] text-[#6B7280]">
          Categories
        </div>
        <button
          onClick={() => onSelectOverview("all")}
          className={`flex h-8 w-full items-center gap-2 rounded-lg px-2.5 text-[13px] transition-colors ${
            selectedOverview === "all"
              ? "bg-[#252629] text-[#E2E8F0]"
              : "text-[#9AA3AE] hover:bg-[#252629] hover:text-[#E2E8F0]"
          }`}
          style={{ display: "flex", alignItems: "center", width: "100%", gap: "8px" }}
        >
          <LayoutGrid size={16} className="text-[#9AA3AE]" style={{ flexShrink: 0 }} />
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
          <span
            className="text-[11px] text-[#6B7280]"
            style={{ marginLeft: "auto", flexShrink: 0 }}
          >
            {countAll}
          </span>
        </button>

        <div className="mt-1 space-y-0.5">
          {categories.map((cat) => {
            const checked = selectedCategories.includes(cat);
            return (
              <label
                key={cat}
                className="flex h-8 cursor-pointer items-center gap-2 rounded-lg px-2.5 transition-colors hover:bg-[#252629]"
                style={{ display: "flex", alignItems: "center", width: "100%", gap: "8px" }}
              >
                <span
                  className={`flex h-4 w-4 items-center justify-center rounded-[4px] border ${
                    checked
                      ? "border-[#F59E0B] bg-[#F59E0B]"
                      : "border-[#2A2F37] bg-transparent"
                  }`}
                  style={{ flexShrink: 0, width: "16px", height: "16px" }}
                >
                  {checked && <Check size={11} strokeWidth={3} className="text-white" />}
                </span>
                <span
                  className="flex-1 text-[13px] text-[#9AA3AE]"
                  style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {cat}
                </span>
                <span
                  className="text-[11px] text-[#6B7280]"
                  style={{ marginLeft: "auto", flexShrink: 0 }}
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
