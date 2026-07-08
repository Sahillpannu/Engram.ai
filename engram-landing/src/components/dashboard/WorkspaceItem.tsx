"use client";

import Link from "next/link";
import type { LucideIcon } from "lucide-react";

interface WorkspaceItemProps {
  icon: LucideIcon;
  label: string;
  active?: boolean;
  badge?: number;
  href?: string;
  onClick?: () => void;
  pill?: boolean;
}

export default function WorkspaceItem({
  icon: Icon,
  label,
  active = false,
  badge,
  href,
  onClick,
  pill = false,
}: WorkspaceItemProps) {
  const base =
    "flex items-center gap-2.5 h-[38px] px-3 justify-center md:justify-start text-[13px] font-medium transition-colors";
  const radius = pill ? "rounded-full" : "rounded-[8px]";
  const state = active
    ? "bg-[rgba(245,158,11,0.15)] text-[#F59E0B]"
    : "bg-transparent text-[#9AA3AE] hover:text-[#F3F4F6] hover:bg-white/[0.03]";
  const iconColor = active ? "text-[#F59E0B]" : "text-[#9AA3AE]";

  const inner = (
    <>
      <Icon size={16} className={iconColor} />
      <span className="hidden md:block md:flex-1 truncate text-left">
        {label}
      </span>
      {badge !== undefined && badge > 0 && (
        <span className="hidden md:flex min-w-[18px] h-[18px] items-center justify-center rounded-full bg-[#F59E0B] text-[#111317] text-[11px] font-bold px-1">
          {badge}
        </span>
      )}
    </>
  );

  const className = `${base} ${radius} ${state}`;

  if (href) {
    return (
      <Link href={href} className={className}>
        {inner}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={`${className} w-full`}>
      {inner}
    </button>
  );
}
