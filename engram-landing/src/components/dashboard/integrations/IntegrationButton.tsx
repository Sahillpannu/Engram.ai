"use client";

import { Zap, RefreshCw } from "lucide-react";

interface IntegrationButtonProps {
  variant: "connect" | "fix";
  onClick?: () => void;
  loading?: boolean;
}

export default function IntegrationButton({
  variant,
  onClick,
  loading = false,
}: IntegrationButtonProps) {
  if (variant === "fix") {
    return (
      <button
        onClick={onClick}
        disabled={loading}
        className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#EF4444] transition-colors hover:text-[#DC2626] disabled:opacity-60"
      >
        {loading ? (
          <>
            <RefreshCw size={11} className="animate-spin" />
            Fixing…
          </>
        ) : (
          "Fix"
        )}
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#F59E0B] transition-colors hover:text-[#D97706]"
    >
      <Zap size={11} />
      Connect
    </button>
  );
}
