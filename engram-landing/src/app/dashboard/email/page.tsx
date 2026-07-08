"use client";

import React, { useState } from "react";
import {
  Mail,
  RefreshCw,
  Pencil,
  Bell,
  Users,
  Megaphone,
  FileText,
  Check,
  X,
  Lock,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import EmailDraftCard from "@/components/EmailDraftCard";
import EmailWorkspaceDropdown, {
  type Mailbox,
} from "@/components/dashboard/EmailWorkspaceDropdown";
import type { EmailDraftAction } from "@/lib/agent-actions";
import { useTheme } from "@/app/dashboard/theme-context";

// Mock Email structures
interface EmailItem {
  id: string;
  sender: string;
  subject: string;
  snippet: string;
  date: string;
  unread: boolean;
  category: "Updates" | "Social" | "Promotions" | "Primary";
  badge?: string;
}

type CategoryFilter = "all" | "updates" | "social" | "promotions";

const TABS: { key: CategoryFilter; label: string; icon: LucideIcon }[] = [
  { key: "all", label: "All", icon: Mail },
  { key: "updates", label: "Updates", icon: Bell },
  { key: "social", label: "Social", icon: Users },
  { key: "promotions", label: "Promotions", icon: Megaphone },
];

export default function EmailPage() {
  const { isDarkMode } = useTheme();

  const bgMain = isDarkMode ? "#111317" : "#F3ECE3";
  const bgCard = isDarkMode ? "#1E1F23" : "#FFFFFF";
  const bgInner = isDarkMode ? "#1A1B1E" : "#EAE5DB";
  const bgHover = isDarkMode ? "#252629" : "#E0DCD4";
  const borderCol = isDarkMode ? "#2A2F37" : "#E8DCCB";
  const textPrimary = isDarkMode ? "#F3F4F6" : "#2D2B26";
  const textSecondary = isDarkMode ? "#E2E8F0" : "#2D2B26";
  const textMuted = isDarkMode ? "#9AA3AE" : "#615E56";
  const textGray = isDarkMode ? "#6B7280" : "#9A958C";
  const accent = isDarkMode ? "#F59E0B" : "#D97706";
  const accentText = isDarkMode ? "#111317" : "#F3ECE3";

  // Navigation State
  const [activeMailbox, setActiveMailbox] = useState<Mailbox>("inbox");
  const [activeCategoryFilter, setActiveCategoryFilter] =
    useState<CategoryFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  // Selection states
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Draft Creation Modal States
  const [draftModalOpen, setDraftModalOpen] = useState(false);
  const [newDraftTo, setNewDraftTo] = useState("");
  const [newDraftSubject, setNewDraftSubject] = useState("");
  const [newDraftBody, setNewDraftBody] = useState("");

  // Default Email List
  const [emails, setEmails] = useState<EmailItem[]>([
    {
      id: "1",
      sender: "Adrian Rivera",
      subject: "Workspace roles and access credentials",
      snippet:
        "Hey, I set up the new workspace permissions. Admin roles now inherit full Qdrant write operations...",
      date: "10:42 AM",
      unread: true,
      category: "Primary",
    },
    {
      id: "2",
      sender: "Sarah Jenkins",
      subject: "Acme Corp contract update proposal",
      snippet:
        "Please review the attached contract proposal. They requested enterprise tier memory namespace constraints...",
      date: "9:15 AM",
      unread: true,
      category: "Primary",
    },
    {
      id: "3",
      sender: "Pratik Rivera",
      subject: "Q3 memory cluster scaling status",
      snippet:
        "We successfully scaled the Qdrant cluster to 3 shards. Ready to sync the Slack pipeline tomorrow...",
      date: "Yesterday",
      unread: false,
      category: "Updates",
    },
    {
      id: "4",
      sender: "Zoom",
      subject: "Recurring sync: Design & Engram Architecture",
      snippet:
        "Your recurring meeting sync has been updated. Agenda: review OAuth pipeline security tokens...",
      date: "Yesterday",
      unread: false,
      category: "Social",
    },
    {
      id: "5",
      sender: "HubSpot",
      subject: "New enterprise lead request: Stripe",
      snippet:
        "Stripe requested a demo for Engram team spaces and custom pricing structures. Review lead detail...",
      date: "Jun 24",
      unread: true,
      category: "Promotions",
    },
    {
      id: "6",
      sender: "Vercel",
      subject: "Deployment successful: engram-landing-prod",
      snippet:
        "Your project has been successfully built and deployed to production. Review deployment logs...",
      date: "Jun 24",
      unread: true,
      category: "Updates",
    },
    {
      id: "7",
      sender: "GitHub",
      subject: "[GitHub] Security Alert: 2 vulnerabilities found in dependencies",
      snippet:
        "We found 2 known security vulnerabilities in your dependencies. Please review dependency graph...",
      date: "Jun 24",
      unread: true,
      category: "Updates",
    },
  ]);

  // Default Drafts List
  const [drafts, setDrafts] = useState<EmailDraftAction[]>([
    {
      to: "sarah.jenkins@acmecorp.com",
      subject: "Follow up: Q3 Product Roadmap & Integration",
      body: "Hi Sarah,\n\nFollowing up on our call yesterday, I've outlined the core requirements for the Engram memory integration. We can start the synchronization pipeline next Tuesday at 10 AM EST.\n\nLet me know if that time works for your engineering team.\n\nBest,\nHitesh",
    },
    {
      to: "investors@engram.ai",
      subject: "Monthly Update - June 2026",
      body: "Dear Board,\n\nHere is our summary of key metrics and accomplishments for June:\n- Synchronized memory query latency reduced by 40%\n- Active user workspaces increased to 1,240 (+18% MoM)\n- OAuth integration completed for Zoom and HubSpot\n\nFull deck is attached for your review.\n\nWarm regards,\nThe Engram Team",
    },
    {
      to: "alex.rivera@designco.com",
      subject: "Feedback on landing page assets",
      body: "Hi Alex,\n\nThe new high-fidelity assets look amazing. The hairline borders and orange accent colors align perfectly with our updated design guide.\n\nCould you please send over the SVG assets for the dashboard shell icons by tomorrow morning?\n\nThanks,\nHitesh",
    },
  ]);

  // Compute counts
  const unreadInboxCount = emails.filter((e) => e.unread).length;
  const draftsCount = drafts.length;

  // Interactivity Actions
  const handleToggleRead = (id: string) => {
    setEmails((prev) =>
      prev.map((e) => (e.id === id ? { ...e, unread: !e.unread } : e))
    );
  };

  const handleToggleSelect = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 800);
  };

  const handleCreateDraftSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDraftTo || !newDraftSubject || !newDraftBody) return;

    const newDraft: EmailDraftAction = {
      to: newDraftTo,
      subject: newDraftSubject,
      body: newDraftBody,
    };

    setDrafts((prev) => [newDraft, ...prev]);
    setNewDraftTo("");
    setNewDraftSubject("");
    setNewDraftBody("");
    setDraftModalOpen(false);
    setActiveMailbox("drafts");
  };

  // Filter Emails
  const filteredEmails = emails.filter((email) => {
    if (
      searchQuery &&
      !email.sender.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !email.subject.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !email.snippet.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    if (activeCategoryFilter === "updates" && email.category !== "Updates")
      return false;
    if (activeCategoryFilter === "social" && email.category !== "Social")
      return false;
    if (
      activeCategoryFilter === "promotions" &&
      email.category !== "Promotions"
    )
      return false;

    return true;
  });

  return (
    <div className="flex h-full overflow-hidden">
      {/* Middle panel: email folder list */}
      <EmailWorkspaceDropdown
        activeMailbox={activeMailbox}
        onSelectMailbox={setActiveMailbox}
        unreadInboxCount={unreadInboxCount}
        draftsCount={draftsCount}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Right main area */}
      <div className="flex-1 flex flex-col min-w-0 h-full" style={{ backgroundColor: bgMain }}>
        {/* Inbox header */}
        <div className="px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <Mail size={22} style={{ color: textPrimary }} />
            <h2 className="text-[22px] font-bold capitalize leading-none" style={{ color: textPrimary }}>
              {activeMailbox}
            </h2>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="h-9 w-9 rounded-full flex items-center justify-center transition-colors"
              style={{
                border: `1px solid ${borderCol}`,
                color: textMuted,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = textPrimary;
                e.currentTarget.style.borderColor = `${accent}40`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = textMuted;
                e.currentTarget.style.borderColor = borderCol;
              }}
              title="Refresh Mailbox"
            >
              <RefreshCw
                size={16}
                className={refreshing ? "animate-spin" : ""}
              />
            </button>

            <button
              onClick={() => setDraftModalOpen(true)}
              className="flex items-center gap-1.5 h-9 px-4 rounded-full text-[13px] font-bold transition-colors"
              style={{
                backgroundColor: accent,
                color: accentText,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = "0.9";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = "1.0";
              }}
            >
              <Pencil size={14} />
              Draft
            </button>
          </div>
        </div>

        {/* Content view switch */}
        {activeMailbox === "inbox" ? (
          <>
            {/* Tab bar */}
            <div className="px-6 py-3 flex gap-2 shrink-0">
              {TABS.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeCategoryFilter === tab.key;
                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveCategoryFilter(tab.key)}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[12px] transition-colors"
                    style={{
                      backgroundColor: isActive ? accent : "transparent",
                      color: isActive ? accentText : textMuted,
                      fontWeight: isActive ? "bold" : "medium",
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) e.currentTarget.style.color = textPrimary;
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) e.currentTarget.style.color = textMuted;
                    }}
                  >
                    <Icon size={13} />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Email list */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-3">
              {filteredEmails.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center select-none">
                  <Mail className="h-10 w-10 mb-3" style={{ color: `${textGray}60` }} />
                  <p className="text-xs" style={{ color: textGray }}>
                    No emails found in this category.
                  </p>
                </div>
              ) : (
                filteredEmails.map((email) => {
                  const isSelected = selectedIds.includes(email.id);
                  return (
                    <div
                      key={email.id}
                      onClick={() => handleToggleRead(email.id)}
                      className="flex items-start gap-3 rounded-xl px-5 py-4 cursor-pointer transition-colors"
                      style={{ backgroundColor: bgCard }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = bgHover;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = bgCard;
                      }}
                    >
                      {/* Unread dot */}
                      <div className="flex w-2 shrink-0 justify-center pt-1.5">
                        {email.unread ? (
                          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: accent }} />
                        ) : (
                          <span className="h-2 w-2" />
                        )}
                      </div>

                      {/* Checkbox */}
                      <button
                        onClick={(e) => handleToggleSelect(e, email.id)}
                        className="mt-0.5 h-4 w-4 rounded-[4px] border flex items-center justify-center shrink-0 transition-colors"
                        style={{
                          borderColor: isSelected ? accent : borderCol,
                          backgroundColor: isSelected ? accent : bgInner,
                          color: isSelected ? accentText : "transparent",
                        }}
                        onMouseEnter={(e) => {
                          if (!isSelected) e.currentTarget.style.borderColor = `${accent}99`;
                        }}
                        onMouseLeave={(e) => {
                          if (!isSelected) e.currentTarget.style.borderColor = borderCol;
                        }}
                      >
                        {isSelected && <Check size={11} strokeWidth={3} />}
                      </button>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="text-[14px] font-bold truncate" style={{ color: textPrimary }}>
                              {email.sender}
                            </span>
                            {email.badge && (
                              <span className="shrink-0 bg-[#7C3AED] text-white text-[11px] font-semibold px-2 py-0.5 rounded-full leading-none">
                                {email.badge}
                              </span>
                            )}
                          </div>
                          <span className="text-[12px] shrink-0" style={{ color: textGray }}>
                            {email.date}
                          </span>
                        </div>

                        <h4 className="mt-0.5 text-[14px] font-medium truncate" style={{ color: textSecondary }}>
                          {email.subject}
                        </h4>

                        <p className="mt-1 text-[13px] truncate" style={{ color: textGray }}>
                          {email.snippet}
                        </p>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </>
        ) : activeMailbox === "drafts" ? (
          /* Drafts List View */
          <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-4 max-w-3xl">
            {draftsCount === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center select-none">
                <FileText className="h-10 w-10 mb-3" style={{ color: `${textGray}60` }} />
                <p className="text-xs" style={{ color: textGray }}>No pending email drafts.</p>
              </div>
            ) : (
              drafts.map((draft, idx) => (
                <EmailDraftCard key={idx} action={draft} isDarkMode={isDarkMode} />
              ))
            )}
          </div>
        ) : (
          /* Mock Empty States for Spam, Sent, Trash */
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center select-none">
            <Mail className="h-10 w-10 mb-3" style={{ color: `${textGray}60` }} />
            <p className="text-xs" style={{ color: textGray }}>
              No messages inside this category.
            </p>
          </div>
        )}
      </div>

      {/* New Draft Creation Modal */}
      {draftModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-xl p-6 shadow-2xl" style={{ border: `1px solid ${borderCol}`, backgroundColor: isDarkMode ? "#161719" : "#FFFFFF" }}>
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4" style={{ borderBottom: `1px solid ${borderCol}` }}>
              <div className="flex items-center gap-2">
                <Mail size={16} style={{ color: accent }} />
                <h3 className="text-sm font-semibold" style={{ color: textPrimary }}>
                  New Email Draft
                </h3>
              </div>
              <button
                onClick={() => setDraftModalOpen(false)}
                className="p-1 rounded transition-colors border"
                style={{
                  color: textMuted,
                  borderColor: borderCol,
                  backgroundColor: "transparent",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = textPrimary;
                  e.currentTarget.style.backgroundColor = isDarkMode ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = textMuted;
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                <X size={14} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleCreateDraftSubmit} className="mt-4 space-y-4">
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider mb-1.5" style={{ color: textMuted }}>
                  To
                </label>
                <input
                  type="email"
                  required
                  placeholder="receiver@example.com"
                  value={newDraftTo}
                  onChange={(e) => setNewDraftTo(e.target.value)}
                  className="w-full rounded-lg border px-3.5 py-2 text-xs outline-none transition-colors"
                  style={{
                    borderColor: borderCol,
                    backgroundColor: bgInner,
                    color: textPrimary,
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = `${accent}80`;
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = borderCol;
                  }}
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider mb-1.5" style={{ color: textMuted }}>
                  Subject
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter email subject"
                  value={newDraftSubject}
                  onChange={(e) => setNewDraftSubject(e.target.value)}
                  className="w-full rounded-lg border px-3.5 py-2 text-xs outline-none transition-colors"
                  style={{
                    borderColor: borderCol,
                    backgroundColor: bgInner,
                    color: textPrimary,
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = `${accent}80`;
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = borderCol;
                  }}
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider mb-1.5" style={{ color: textMuted }}>
                  Body
                </label>
                <textarea
                  required
                  rows={6}
                  placeholder="Write your email body here..."
                  value={newDraftBody}
                  onChange={(e) => setNewDraftBody(e.target.value)}
                  className="w-full rounded-lg border px-3.5 py-2.5 text-xs outline-none transition-colors resize-none leading-relaxed"
                  style={{
                    borderColor: borderCol,
                    backgroundColor: bgInner,
                    color: textPrimary,
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = `${accent}80`;
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = borderCol;
                  }}
                />
              </div>

              <div className="pt-2 flex items-center justify-between" style={{ borderTop: `1px solid ${borderCol}` }}>
                <span className="text-[10px] flex items-center gap-1" style={{ color: textGray }}>
                  <Lock size={10} style={{ color: `${accent}99` }} />
                  Saved locally to memory
                </span>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setDraftModalOpen(false)}
                    className="px-3.5 py-1.5 text-xs font-semibold border rounded-lg transition-colors"
                    style={{
                      borderColor: borderCol,
                      color: textPrimary,
                      backgroundColor: "transparent",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = `${accent}80`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = borderCol;
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 text-xs font-semibold rounded-lg transition-colors border-none"
                    style={{
                      backgroundColor: accent,
                      color: accentText,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.opacity = "0.9";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.opacity = "1.0";
                    }}
                  >
                    Create Draft
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
