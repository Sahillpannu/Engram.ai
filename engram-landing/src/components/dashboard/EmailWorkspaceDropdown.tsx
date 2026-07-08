"use client";

import { useState } from "react";
import {
  Search,
  Mail,
  ChevronDown,
  FileText,
  Send,
  AlertOctagon,
  Trash2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import WorkspaceItem from "./WorkspaceItem";
import { useTheme } from "@/app/dashboard/theme-context";

export type Mailbox = "inbox" | "drafts" | "sent" | "spam" | "trash";

interface EmailWorkspaceDropdownProps {
  activeMailbox: Mailbox;
  onSelectMailbox: (mailbox: Mailbox) => void;
  unreadInboxCount: number;
  draftsCount: number;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function EmailWorkspaceDropdown({
  activeMailbox,
  onSelectMailbox,
  unreadInboxCount,
  draftsCount,
  searchQuery,
  onSearchChange,
}: EmailWorkspaceDropdownProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const { isDarkMode } = useTheme();

  // Theme-aware styles based on isDarkMode
  const bgOuter = isDarkMode ? "#161719" : "#EFECE6";
  const borderCol = isDarkMode ? "#1E1F23" : "#E8DCCB";
  const bgInner = isDarkMode ? "#1A1B1E" : "#EAE5DB";
  const borderInput = isDarkMode ? "#2A2F37" : "#E8DCCB";
  const textPrimary = isDarkMode ? "#F3F4F6" : "#2D2B26";
  const textMuted = isDarkMode ? "#9AA3AE" : "#615E56";
  const textGray = isDarkMode ? "#6B7280" : "#9A958C";
  const bgHover = isDarkMode ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)";

  const items: { key: Mailbox; label: string; icon: LucideIcon; badge?: number }[] = [
    { key: "inbox", label: "Inbox", icon: Mail, badge: unreadInboxCount },
    { key: "drafts", label: "Drafts", icon: FileText, badge: draftsCount },
    { key: "sent", label: "Sent", icon: Send },
    { key: "spam", label: "Spam", icon: AlertOctagon },
    { key: "trash", label: "Trash", icon: Trash2 },
  ];

  return (
    <div
      className="hidden md:flex flex-col w-[280px] shrink-0 h-full select-none"
      style={{
        backgroundColor: bgOuter,
        borderRight: `1px solid ${borderCol}`,
      }}
    >
      {/* Search */}
      <div className="p-4 shrink-0">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#6B7280]" style={{ color: textGray }} />
          <input
            type="text"
            placeholder="Search here"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full rounded-full border pl-9 pr-3 h-9 text-[13px] outline-none transition-colors"
            style={{
              borderColor: borderInput,
              backgroundColor: bgInner,
              color: textPrimary,
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = isDarkMode ? "#F59E0B/40" : "#D97706/40";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = borderInput;
            }}
          />
        </div>
      </div>

      {/* Email toggle */}
      <div className="px-2 shrink-0">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between px-3 h-[38px] rounded-[8px] text-[13px] font-semibold transition-colors bg-transparent border-none cursor-pointer"
          style={{ color: textPrimary }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = bgHover;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
          }}
        >
          <span className="flex items-center gap-2.5">
            <Mail size={16} style={{ color: isDarkMode ? "#F59E0B" : "#D97706" }} />
            Email
          </span>
          <ChevronDown
            size={16}
            className={`transition-transform ${isExpanded ? "" : "-rotate-90"}`}
            style={{ color: textMuted }}
          />
        </button>
      </div>

      {/* Workspace sub-items */}
      {isExpanded && (
        <div className="flex-1 overflow-y-auto custom-scrollbar px-2 pt-2">
          <div
            className="px-3 mb-1.5 text-[10px] font-semibold uppercase tracking-[0.15em]"
            style={{ color: textMuted }}
          >
            Workspace
          </div>
          <div className="space-y-1">
            {items.map((item) => (
              <WorkspaceItem
                key={item.key}
                icon={item.icon}
                label={item.label}
                active={activeMailbox === item.key}
                badge={item.badge}
                onClick={() => onSelectMailbox(item.key)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
