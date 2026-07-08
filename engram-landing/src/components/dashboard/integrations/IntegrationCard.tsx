"use client";

import { useState } from "react";
import type { ComponentType, CSSProperties, ReactNode } from "react";
import { MoreHorizontal, Plug, Star } from "lucide-react";
import IntegrationStatus from "./IntegrationStatus";
import IntegrationButton from "./IntegrationButton";

export interface IntegrationItem {
  name: string;
  desc: string;
  icon: ComponentType<{ size?: number; style?: CSSProperties }> | null;
  color: string;
  subtitle: string;
  category: string;
  recommended: boolean;
  comingSoon: boolean;
  defaultSynced?: string;
  hasError?: boolean;
  errorMsg?: string;
}

interface IntegrationCardProps {
  item: IntegrationItem;
  isConnected: boolean;
  onConnect: (id: string) => void;
  onDisconnect: (id: string) => void;
  onReauth: (id: string) => void;
  fixing?: boolean;
  isDarkMode?: boolean;
}

export default function IntegrationCard({
  item,
  isConnected,
  onConnect,
  onDisconnect,
  onReauth,
  fixing = false,
  isDarkMode = true,
}: IntegrationCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [kebabHovered, setKebabHovered] = useState(false);

  const Icon = item.icon;
  const hasError = !!item.hasError && isConnected;
  const comingSoon = item.comingSoon;

  const status: "connected" | "available" | "error" | "soon" = hasError
    ? "error"
    : isConnected
      ? "connected"
      : comingSoon
        ? "soon"
        : "available";

  // Theme-aware styles based on isDarkMode
  const bgCard = isDarkMode ? "#1A1B1E" : "#FFFFFF";
  const bgCardHover = isDarkMode ? "#1E2025" : "#F7F5F0";
  const borderCol = isDarkMode ? "#2A2F37" : "#E8DCCB";
  const borderColHover = isDarkMode ? "#3A3F47" : "#C8BCAB";
  const bgInner = isDarkMode ? "#111317" : "#F3ECE3";
  const textPrimary = isDarkMode ? "#F3F4F6" : "#2D2B26";
  const textMuted = isDarkMode ? "#9AA3AE" : "#615E56";
  const textGray = isDarkMode ? "#6B7280" : "#9A958C";

  let leftLabel: ReactNode = null;
  if (hasError) {
    leftLabel = (
      <span className="max-w-[120px] truncate text-[11px] text-[#EF4444]" title={item.errorMsg}>
        {item.errorMsg}
      </span>
    );
  } else if (isConnected) {
    leftLabel = (
      <span className="text-[11px]" style={{ color: textGray }}>Synced {item.defaultSynced || "10m ago"}</span>
    );
  } else if (item.recommended) {
    leftLabel = (
      <span className="inline-flex items-center gap-1 text-[11px] font-medium" style={{ color: isDarkMode ? "#F59E0B" : "#D97706" }}>
        <Star size={11} className="fill-[#F59E0B]" style={{ fill: isDarkMode ? "#F59E0B" : "#D97706", stroke: isDarkMode ? "#F59E0B" : "#D97706" }} />
        Recommended
      </span>
    );
  }

  let rightCta: ReactNode = null;
  if (comingSoon) {
    rightCta = <span className="text-[11px] italic" style={{ color: textGray }}>Coming soon</span>;
  } else if (hasError) {
    rightCta = (
      <IntegrationButton variant="fix" onClick={() => onReauth(item.name)} loading={fixing} />
    );
  } else if (isConnected) {
    rightCta = (
      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#10B981]">
        <span className="h-1.5 w-1.5 rounded-full bg-[#10B981]" />
        Active
      </span>
    );
  } else {
    rightCta = (
      <IntegrationButton variant="connect" onClick={() => onConnect(item.name)} />
    );
  }

  return (
    <div
      className="relative flex flex-col rounded-[14px] border p-4 transition-colors"
      style={{
        backgroundColor: hovered ? bgCardHover : bgCard,
        borderColor: hovered ? borderColHover : borderCol,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Top row: logo + status + kebab */}
      <div className="flex items-start justify-between">
        <div className="flex h-9 w-9 items-center justify-center rounded-[10px]" style={{ backgroundColor: bgInner }}>
          {Icon ? (
            <Icon size={20} style={{ color: comingSoon ? textGray : item.color }} />
          ) : (
            <Plug size={18} style={{ color: textGray }} />
          )}
        </div>

        <div className="flex items-center gap-1.5">
          <IntegrationStatus status={status} />
          {isConnected && (
            <div className="relative">
              <button
                onClick={() => setMenuOpen((v) => !v)}
                className="p-0.5 transition-colors bg-transparent border-none cursor-pointer"
                style={{ color: kebabHovered ? textPrimary : textGray }}
                onMouseEnter={() => setKebabHovered(true)}
                onMouseLeave={() => setKebabHovered(false)}
                aria-label="Manage source"
              >
                <MoreHorizontal size={16} />
              </button>
              {menuOpen && (
                <>
                  <div className="absolute right-0 top-7 z-30 w-28 rounded-lg border p-1 shadow-2xl" style={{ borderColor: borderCol, backgroundColor: isDarkMode ? "#141517" : "#EFECE6" }}>
                    <button
                      onClick={() => {
                        onDisconnect(item.name);
                        setMenuOpen(false);
                      }}
                      className="w-full rounded px-2.5 py-1.5 text-left text-[11px] font-medium text-[#EF4444] transition-colors border-none cursor-pointer bg-transparent"
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "rgba(239,68,68,0.1)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent";
                      }}
                    >
                      Disconnect
                    </button>
                  </div>
                  <div className="fixed inset-0 z-20" onClick={() => setMenuOpen(false)} />
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Name + italic subtitle */}
      <h3 className="mt-3 text-[15px] font-bold" style={{ color: textPrimary }}>{item.name}</h3>
      {item.subtitle && <p className="text-[13px] italic" style={{ color: textMuted }}>{item.subtitle}</p>}

      {/* Description */}
      <p className="mt-1.5 text-[13px] leading-[1.5] line-clamp-3" style={{ color: textGray }}>{item.desc}</p>

      {/* Footer */}
      <div className="mt-auto flex items-center justify-between pt-3">
        <div>{leftLabel}</div>
        <div>{rightCta}</div>
      </div>
    </div>
  );
}
