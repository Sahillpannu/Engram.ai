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
}

export default function IntegrationCard({
  item,
  isConnected,
  onConnect,
  onDisconnect,
  onReauth,
  fixing = false,
}: IntegrationCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);
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

  let leftLabel: ReactNode = null;
  if (hasError) {
    leftLabel = (
      <span className="max-w-[120px] truncate text-[11px] text-[#EF4444]" title={item.errorMsg}>
        {item.errorMsg}
      </span>
    );
  } else if (isConnected) {
    leftLabel = (
      <span className="text-[11px] text-[#6B7280]">Synced {item.defaultSynced || "10m ago"}</span>
    );
  } else if (item.recommended) {
    leftLabel = (
      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#F59E0B]">
        <Star size={11} className="fill-[#F59E0B]" />
        Recommended
      </span>
    );
  }

  let rightCta: ReactNode = null;
  if (comingSoon) {
    rightCta = <span className="text-[11px] italic text-[#6B7280]">Coming soon</span>;
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
    <div className="relative flex flex-col rounded-[14px] border border-[#2A2F37] bg-[#1A1B1E] p-4 transition-colors hover:border-[#3A3F47] hover:bg-[#1E2025]">
      {/* Top row: logo + status + kebab */}
      <div className="flex items-start justify-between">
        <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-[#111317]">
          {Icon ? (
            <Icon size={20} style={{ color: comingSoon ? "#6B7280" : item.color }} />
          ) : (
            <Plug size={18} className="text-[#6B7280]" />
          )}
        </div>

        <div className="flex items-center gap-1.5">
          <IntegrationStatus status={status} />
          {isConnected && (
            <div className="relative">
              <button
                onClick={() => setMenuOpen((v) => !v)}
                className="text-[#6B7280] p-0.5 transition-colors hover:text-[#E2E8F0]"
                aria-label="Manage source"
              >
                <MoreHorizontal size={16} />
              </button>
              {menuOpen && (
                <>
                  <div className="absolute right-0 top-7 z-30 w-28 rounded-lg border border-[#2A2F37] bg-[#141517] p-1 shadow-2xl">
                    <button
                      onClick={() => {
                        onDisconnect(item.name);
                        setMenuOpen(false);
                      }}
                      className="w-full rounded px-2.5 py-1.5 text-left text-[11px] font-medium text-[#EF4444] transition-colors hover:bg-[#EF4444]/10"
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
      <h3 className="mt-3 text-[15px] font-bold text-[#F3F4F6]">{item.name}</h3>
      {item.subtitle && <p className="text-[13px] italic text-[#9AA3AE]">{item.subtitle}</p>}

      {/* Description */}
      <p className="mt-1.5 text-[13px] leading-[1.5] text-[#6B7280] line-clamp-3">{item.desc}</p>

      {/* Footer */}
      <div className="mt-auto flex items-center justify-between pt-3">
        <div>{leftLabel}</div>
        <div>{rightCta}</div>
      </div>
    </div>
  );
}
