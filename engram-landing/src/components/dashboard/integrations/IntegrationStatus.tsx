"use client";

import { Check, AlertCircle } from "lucide-react";

type Status = "connected" | "available" | "error" | "soon";

export default function IntegrationStatus({ status }: { status: Status }) {
  if (status === "connected") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full border border-[rgba(245,158,11,0.25)] bg-[rgba(245,158,11,0.12)] px-2 py-[3px] text-[10px] font-semibold text-[#F59E0B]">
        <Check size={10} strokeWidth={3} />
        Connected
      </span>
    );
  }
  if (status === "error") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full border border-[rgba(239,68,68,0.25)] bg-[rgba(239,68,68,0.12)] px-2 py-[3px] text-[10px] font-semibold text-[#EF4444]">
        <AlertCircle size={10} />
        Error
      </span>
    );
  }
  if (status === "soon") {
    return (
      <span className="inline-flex items-center rounded-full border border-[#2A2F37] bg-[#1E2025] px-2 py-[3px] text-[10px] font-medium text-[#6B7280]">
        Coming soon
      </span>
    );
  }
  return (
    <span className="inline-flex items-center rounded-full border border-[#2A2F37] bg-[#1E2025] px-2 py-[3px] text-[10px] font-medium text-[#6B7280]">
      Available
    </span>
  );
}
