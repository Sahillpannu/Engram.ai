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
      sender: "Outskill",
      subject: "Pre-reads for the Generative AI Mastermind.",
      snippet:
        "Hi Learner, The Claude and AI Mastermind kicks off this Saturday (27th June) at 10 AM IST. T...",
      date: "Jun 25",
      unread: true,
      category: "Updates",
    },
    {
      id: "2",
      sender: "Neha",
      subject: "Good news!! Your access to the AI Transformation is here",
      snippet:
        "Go from using AI to building with it — the Crio AI Transformation Scholarship. Hi, You pro...",
      date: "Jun 25",
      unread: true,
      category: "Updates",
    },
    {
      id: "3",
      sender: "LinkedIn Job Alerts",
      subject: "Agentic AI Engineer at BayOne Solutions: up to $45/hour",
      snippet: "$40-$45 / hour salary",
      date: "Jun 25",
      unread: true,
      badge: "Newsletter",
      category: "Social",
    },
    {
      id: "4",
      sender: "Pratik from Earn",
      subject: "Settle the Ronaldo vs. Messi Debate for $50k",
      snippet:
        "TxODDs World Cup Hackathon on Superteam Earn Hey Hitesh, The World Cup is live. So is a ...",
      date: "Jun 25",
      unread: true,
      category: "Promotions",
    },
    {
      id: "5",
      sender: "Adrian | JS Mastery",
      subject: "WE ARE HIRING!",
      snippet:
        "AI Applications Engineer, Software Engineer, AI Workflows, Model Behavior Engineer, Applica...",
      date: "Jun 25",
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
      <div className="flex-1 flex flex-col min-w-0 h-full bg-[#111317]">
        {/* Inbox header */}
        <div className="px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <Mail size={22} className="text-[#F3F4F6]" />
            <h2 className="text-[22px] font-bold text-[#F3F4F6] capitalize leading-none">
              {activeMailbox}
            </h2>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="h-9 w-9 rounded-full border border-[#2A2F37] flex items-center justify-center text-[#9AA3AE] hover:text-[#F3F4F6] hover:border-[#F59E0B]/40 transition-colors"
              title="Refresh Mailbox"
            >
              <RefreshCw
                size={16}
                className={refreshing ? "animate-spin" : ""}
              />
            </button>

            <button
              onClick={() => setDraftModalOpen(true)}
              className="flex items-center gap-1.5 h-9 px-4 rounded-full bg-[#F59E0B] text-[#111317] text-[13px] font-bold hover:bg-[#F59E0B]/90 transition-colors"
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
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[12px] transition-colors ${
                      isActive
                        ? "bg-[#F59E0B] text-[#111317] font-bold"
                        : "bg-transparent text-[#9AA3AE] hover:text-[#F3F4F6] font-medium"
                    }`}
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
                  <Mail className="h-10 w-10 text-[#6B7280]/40 mb-3" />
                  <p className="text-xs text-[#6B7280]">
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
                      className="flex items-start gap-3 rounded-xl bg-[#1E1F23] px-5 py-4 cursor-pointer transition-colors hover:bg-[#252629]"
                    >
                      {/* Unread dot */}
                      <div className="flex w-2 shrink-0 justify-center pt-1.5">
                        {email.unread ? (
                          <span className="h-2 w-2 rounded-full bg-[#F59E0B]" />
                        ) : (
                          <span className="h-2 w-2" />
                        )}
                      </div>

                      {/* Checkbox */}
                      <button
                        onClick={(e) => handleToggleSelect(e, email.id)}
                        className={`mt-0.5 h-4 w-4 rounded-[4px] border flex items-center justify-center shrink-0 transition-colors ${
                          isSelected
                            ? "border-[#F59E0B] bg-[#F59E0B] text-[#111317]"
                            : "border-[#2A2F37] bg-[#1A1B1E] hover:border-[#F59E0B]/60"
                        }`}
                      >
                        {isSelected && <Check size={11} strokeWidth={3} />}
                      </button>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="text-[14px] font-bold text-[#F3F4F6] truncate">
                              {email.sender}
                            </span>
                            {email.badge && (
                              <span className="shrink-0 bg-[#7C3AED] text-white text-[11px] font-semibold px-2 py-0.5 rounded-full leading-none">
                                {email.badge}
                              </span>
                            )}
                          </div>
                          <span className="text-[12px] text-[#6B7280] shrink-0">
                            {email.date}
                          </span>
                        </div>

                        <h4 className="mt-0.5 text-[14px] font-medium text-[#E2E8F0] truncate">
                          {email.subject}
                        </h4>

                        <p className="mt-1 text-[13px] text-[#6B7280] truncate">
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
                <FileText className="h-10 w-10 text-[#6B7280]/40 mb-3" />
                <p className="text-xs text-[#6B7280]">No pending email drafts.</p>
              </div>
            ) : (
              drafts.map((draft, idx) => (
                <EmailDraftCard key={idx} action={draft} isDarkMode={true} />
              ))
            )}
          </div>
        ) : (
          /* Mock Empty States for Spam, Sent, Trash */
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center select-none">
            <Mail className="h-10 w-10 text-[#6B7280]/40 mb-3" />
            <p className="text-xs text-[#6B7280]">
              No messages inside this category.
            </p>
          </div>
        )}
      </div>

      {/* New Draft Creation Modal */}
      {draftModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-xl border border-[#1E1F23] bg-[#161719] p-6 shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#1E1F23]">
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-[#F59E0B]" />
                <h3 className="text-sm font-semibold text-[#F3F4F6]">
                  New Email Draft
                </h3>
              </div>
              <button
                onClick={() => setDraftModalOpen(false)}
                className="text-[#9AA3AE] hover:text-[#F3F4F6] p-1 rounded hover:bg-white/[0.04] transition-colors border border-[#2A2F37]"
              >
                <X size={14} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleCreateDraftSubmit} className="mt-4 space-y-4">
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#9AA3AE] mb-1.5">
                  To
                </label>
                <input
                  type="email"
                  required
                  placeholder="receiver@example.com"
                  value={newDraftTo}
                  onChange={(e) => setNewDraftTo(e.target.value)}
                  className="w-full rounded-lg border border-[#2A2F37] bg-[#1A1B1E] px-3.5 py-2 text-xs text-[#F3F4F6] placeholder:text-[#6B7280] outline-none focus:border-[#F59E0B]/40"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#9AA3AE] mb-1.5">
                  Subject
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter email subject"
                  value={newDraftSubject}
                  onChange={(e) => setNewDraftSubject(e.target.value)}
                  className="w-full rounded-lg border border-[#2A2F37] bg-[#1A1B1E] px-3.5 py-2 text-xs text-[#F3F4F6] placeholder:text-[#6B7280] outline-none focus:border-[#F59E0B]/40"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#9AA3AE] mb-1.5">
                  Body
                </label>
                <textarea
                  required
                  rows={6}
                  placeholder="Write your email body here..."
                  value={newDraftBody}
                  onChange={(e) => setNewDraftBody(e.target.value)}
                  className="w-full rounded-lg border border-[#2A2F37] bg-[#1A1B1E] px-3.5 py-2.5 text-xs text-[#F3F4F6] placeholder:text-[#6B7280] outline-none focus:border-[#F59E0B]/40 resize-none leading-relaxed"
                />
              </div>

              <div className="pt-2 border-t border-[#1E1F23] flex items-center justify-between">
                <span className="text-[10px] text-[#6B7280] flex items-center gap-1">
                  <Lock size={10} className="text-[#F59E0B]/60" />
                  Saved locally to memory
                </span>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setDraftModalOpen(false)}
                    className="px-3.5 py-1.5 text-xs font-semibold border border-[#2A2F37] hover:border-[#F59E0B]/40 rounded-lg text-[#F3F4F6] transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 text-xs font-semibold bg-[#F59E0B] hover:bg-[#F59E0B]/90 text-[#111317] rounded-lg transition-colors"
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
