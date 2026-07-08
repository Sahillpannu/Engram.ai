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

  const items: { key: Mailbox; label: string; icon: LucideIcon; badge?: number }[] = [
    { key: "inbox", label: "Inbox", icon: Mail, badge: unreadInboxCount },
    { key: "drafts", label: "Drafts", icon: FileText, badge: draftsCount },
    { key: "sent", label: "Sent", icon: Send },
    { key: "spam", label: "Spam", icon: AlertOctagon },
    { key: "trash", label: "Trash", icon: Trash2 },
  ];

  return (
    <div className="hidden md:flex flex-col w-[280px] shrink-0 h-full bg-[#161719] border-r border-[#1E1F23] select-none">
      {/* Search */}
      <div className="p-4 shrink-0">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#6B7280]" />
          <input
            type="text"
            placeholder="Search here"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full rounded-full border border-[#2A2F37] bg-[#1A1B1E] pl-9 pr-3 h-9 text-[13px] text-[#F3F4F6] placeholder:text-[#6B7280] outline-none transition-colors focus:border-[#F59E0B]/40"
          />
        </div>
      </div>

      {/* Email toggle */}
      <div className="px-2 shrink-0">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between px-3 h-[38px] rounded-[8px] text-[13px] font-semibold text-[#F3F4F6] hover:bg-white/[0.03] transition-colors"
        >
          <span className="flex items-center gap-2.5">
            <Mail size={16} className="text-[#F59E0B]" />
            Email
          </span>
          <ChevronDown
            size={16}
            className={`text-[#9AA3AE] transition-transform ${isExpanded ? "" : "-rotate-90"}`}
          />
        </button>
      </div>

      {/* Workspace sub-items */}
      {isExpanded && (
        <div className="flex-1 overflow-y-auto custom-scrollbar px-2 pt-2">
          <div className="px-3 mb-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#9AA3AE]">
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
