"use client";

import React, { useState } from "react";
import {
  Mail,
  Search,
  RefreshCw,
  Plus,
  Bell,
  Users,
  Megaphone,
  ChevronDown,
  FileText,
  Send,
  AlertOctagon,
  Trash2,
  Check,
  X,
  Lock,
} from "lucide-react";
import EmailDraftCard from "@/components/EmailDraftCard";
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

export default function EmailPage() {
  // Navigation State
  const [activeMailbox, setActiveMailbox] = useState<"inbox" | "drafts" | "sent" | "spam" | "trash">("inbox");
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<"all" | "updates" | "social" | "promotions">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isAccordionExpanded, setIsAccordionExpanded] = useState(true);
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
      snippet: "Hi Learner, The Claude and AI Mastermind kicks off this Saturday (27th June) at 10 AM IST. T...",
      date: "Jun 25",
      unread: true,
      category: "Updates",
    },
    {
      id: "2",
      sender: "Neha",
      subject: "Good news!! Your access to the AI Transformation is here",
      snippet: "Go from using AI to building with it — the Crio AI Transformation Scholarship. Hi, You pro...",
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
      snippet: "TxODDs World Cup Hackathon on Superteam Earn Hey Hitesh, The World Cup is live. So is a ...",
      date: "Jun 25",
      unread: true,
      category: "Promotions",
    },
    {
      id: "5",
      sender: "Adrian | JS Mastery",
      subject: "WE ARE HIRING!",
      snippet: "AI Applications Engineer, Software Engineer, AI Workflows, Model Behavior Engineer, Applica...",
      date: "Jun 25",
      unread: true,
      category: "Promotions",
    },
    {
      id: "6",
      sender: "Vercel",
      subject: "Deployment successful: engram-landing-prod",
      snippet: "Your project has been successfully built and deployed to production. Review deployment logs...",
      date: "Jun 24",
      unread: true,
      category: "Updates",
    },
    {
      id: "7",
      sender: "GitHub",
      subject: "[GitHub] Security Alert: 2 vulnerabilities found in dependencies",
      snippet: "We found 2 known security vulnerabilities in your dependencies. Please review dependency graph...",
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
    e.stopPropagation(); // Avoid triggering read toggle on checkbox click
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
    setActiveMailbox("drafts"); // Navigate to drafts to see it
  };

  // Filter Emails
  const filteredEmails = emails.filter((email) => {
    // 1. Search Query
    if (
      searchQuery &&
      !email.sender.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !email.subject.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !email.snippet.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    // 2. Category Filter
    if (activeCategoryFilter === "updates" && email.category !== "Updates") return false;
    if (activeCategoryFilter === "social" && email.category !== "Social") return false;
    if (activeCategoryFilter === "promotions" && email.category !== "Promotions") return false;

    return true;
  });

  return (
    <div className="flex flex-1 h-full overflow-hidden">
      {/* Sidebar 2: Email Sub-sidebar */}
      <div className="hidden md:flex flex-col w-56 border-r border-line bg-bg-secondary shrink-0 h-full select-none">
        {/* Search inside email client */}
        <div className="px-4 py-4 shrink-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground/60" />
            <input
              type="text"
              placeholder="Search here"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-[8px] border border-line bg-[#0b0b0a] pl-9 pr-3 py-1.5 text-xs text-ink placeholder:text-muted-foreground/60 outline-none transition-all duration-200 focus:border-accent/40 focus:bg-[#0d0d0c]"
            />
          </div>
        </div>

        {/* Accordion List */}
        <div className="flex-1 overflow-y-auto px-2 space-y-1">
          {/* Header */}
          <button
            onClick={() => setIsAccordionExpanded(!isAccordionExpanded)}
            className="w-full flex items-center justify-between px-3 py-2 text-muted hover:text-ink text-[12px] font-semibold transition-colors uppercase tracking-wider"
          >
            <div className="flex items-center gap-2">
              <Mail size={13} className="text-muted-foreground" />
              <span>Email</span>
            </div>
            <ChevronDown
              size={13}
              className={`transform transition-transform ${isAccordionExpanded ? "" : "-rotate-90"}`}
            />
          </button>

          {isAccordionExpanded && (
            <div className="space-y-0.5 pl-1.5">
              {/* Inbox */}
              <button
                onClick={() => setActiveMailbox("inbox")}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                  activeMailbox === "inbox"
                    ? "bg-[#ff6b2c]/10 text-accent font-semibold border border-[#ff6b2c]/10"
                    : "text-muted hover:text-ink hover:bg-white/[0.02]"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Mail size={13} />
                  <span>Inbox</span>
                </div>
                {unreadInboxCount > 0 && (
                  <span className="font-mono text-[9px] font-bold text-accent bg-[#ff6b2c]/15 px-1.5 py-0.5 rounded-full">
                    {unreadInboxCount}
                  </span>
                )}
              </button>

              {/* Drafts */}
              <button
                onClick={() => setActiveMailbox("drafts")}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                  activeMailbox === "drafts"
                    ? "bg-[#ff6b2c]/10 text-accent font-semibold border border-[#ff6b2c]/10"
                    : "text-muted hover:text-ink hover:bg-white/[0.02]"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <FileText size={13} />
                  <span>Drafts</span>
                </div>
                {draftsCount > 0 && (
                  <span className="font-mono text-[9px] text-muted-foreground/70 bg-[#1b1b1a] border border-line px-1.5 py-0.5 rounded-full">
                    {draftsCount}
                  </span>
                )}
              </button>

              {/* Sent */}
              <button
                onClick={() => setActiveMailbox("sent")}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-all text-muted hover:text-ink hover:bg-white/[0.02] ${
                  activeMailbox === "sent" ? "bg-[#ff6b2c]/10 text-accent" : ""
                }`}
              >
                <Send size={13} />
                <span>Sent</span>
              </button>

              {/* Spam */}
              <button
                onClick={() => setActiveMailbox("spam")}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-all text-muted hover:text-ink hover:bg-white/[0.02] ${
                  activeMailbox === "spam" ? "bg-[#ff6b2c]/10 text-accent" : ""
                }`}
              >
                <AlertOctagon size={13} />
                <span>Spam</span>
              </button>

              {/* Trash */}
              <button
                onClick={() => setActiveMailbox("trash")}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-all text-muted hover:text-ink hover:bg-white/[0.02] ${
                  activeMailbox === "trash" ? "bg-[#ff6b2c]/10 text-accent" : ""
                }`}
              >
                <Trash2 size={13} />
                <span>Trash</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Inbox Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full bg-bg">
        {/* Email Header */}
        <div className="px-6 py-4.5 border-b border-line flex items-center justify-between shrink-0 select-none">
          <div className="flex items-center gap-2">
            <Mail size={18} className="text-white/80" />
            <h2 className="text-lg font-semibold text-ink leading-none capitalize">
              {activeMailbox}
            </h2>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Refresh */}
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="p-2 border border-line bg-card rounded-lg text-muted hover:text-ink hover:border-white/10 transition-colors shadow-sm"
              title="Refresh Mailbox"
            >
              <RefreshCw size={13} className={refreshing ? "animate-spin" : ""} />
            </button>

            {/* New Draft Action */}
            <button
              onClick={() => setDraftModalOpen(true)}
              className="flex items-center gap-1.5 rounded-lg bg-accent px-3 py-1.5 text-xs font-semibold text-white transition-all hover:bg-accent-hover shadow-md"
            >
              <Plus size={13} strokeWidth={2.5} />
              Draft
            </button>
          </div>
        </div>

        {/* Content view switch */}
        {activeMailbox === "inbox" ? (
          <>
            {/* Filter pills row */}
            <div className="px-6 py-3.5 flex gap-2 overflow-x-auto shrink-0 select-none border-b border-line/30 scrollbar-none">
              <button
                onClick={() => setActiveCategoryFilter("all")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium border transition-all ${
                  activeCategoryFilter === "all"
                    ? "bg-[#ff6b2c]/10 text-accent border-[#ff6b2c]/20"
                    : "bg-transparent text-muted hover:text-ink border-line"
                }`}
              >
                <Mail size={11} />
                All
              </button>
              <button
                onClick={() => setActiveCategoryFilter("updates")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium border transition-all ${
                  activeCategoryFilter === "updates"
                    ? "bg-[#ff6b2c]/10 text-accent border-[#ff6b2c]/20"
                    : "bg-transparent text-muted hover:text-ink border-line"
                }`}
              >
                <Bell size={11} />
                Updates
              </button>
              <button
                onClick={() => setActiveCategoryFilter("social")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium border transition-all ${
                  activeCategoryFilter === "social"
                    ? "bg-[#ff6b2c]/10 text-accent border-[#ff6b2c]/20"
                    : "bg-transparent text-muted hover:text-ink border-line"
                }`}
              >
                <Users size={11} />
                Social
              </button>
              <button
                onClick={() => setActiveCategoryFilter("promotions")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium border transition-all ${
                  activeCategoryFilter === "promotions"
                    ? "bg-[#ff6b2c]/10 text-accent border-[#ff6b2c]/20"
                    : "bg-transparent text-muted hover:text-ink border-line"
                }`}
              >
                <Megaphone size={11} />
                Promotions
              </button>
            </div>

            {/* Inbox scrollable lists */}
            <div className="flex-1 overflow-y-auto p-6 space-y-3">
              {filteredEmails.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center select-none">
                  <Mail className="h-10 w-10 text-muted-foreground/35 mb-3" />
                  <p className="text-xs text-muted-foreground">No emails found in this category.</p>
                </div>
              ) : (
                filteredEmails.map((email) => {
                  const isSelected = selectedIds.includes(email.id);
                  return (
                    <div
                      key={email.id}
                      onClick={() => handleToggleRead(email.id)}
                      className={`flex items-start gap-4 rounded-xl border border-line/90 bg-[#141210] p-4.5 cursor-pointer transition-all duration-150 hover:border-white/10 hover:bg-white/[0.01] ${
                        email.unread ? "shadow-[inset_2px_0_0_var(--accent)]" : "opacity-85"
                      }`}
                    >
                      {/* Checkbox square */}
                      <button
                        onClick={(e) => handleToggleSelect(e, email.id)}
                        className={`h-4.5 w-4.5 rounded border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                          isSelected
                            ? "border-accent bg-accent text-white"
                            : "border-muted-foreground/35 bg-[#0b0b0a] hover:border-accent"
                        }`}
                      >
                        {isSelected && <Check size={11} strokeWidth={3} />}
                      </button>

                      {/* Right Container */}
                      <div className="flex-1 min-w-0">
                        {/* Row 1: Sender & Date */}
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-1.5 min-w-0">
                            {email.unread && (
                              <span className="h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                            )}
                            <span className={`text-[13px] truncate ${email.unread ? "font-semibold text-white" : "text-white/80"}`}>
                              {email.sender}
                            </span>
                          </div>
                          <span className="font-mono text-[10.5px] text-muted-foreground/50 shrink-0">
                            {email.date}
                          </span>
                        </div>

                        {/* Row 2: Subject & Badges */}
                        <div className="mt-1 flex items-center gap-2">
                          <h4 className={`text-[12.5px] truncate ${email.unread ? "font-medium text-ink" : "text-ink/80"}`}>
                            {email.subject}
                          </h4>
                          {email.badge && (
                            <span className="bg-indigo-500/10 border border-indigo-500/25 text-indigo-400 text-[9px] font-semibold px-2 py-0.5 rounded-md leading-none select-none">
                              {email.badge}
                            </span>
                          )}
                        </div>

                        {/* Row 3: Snippet text */}
                        <p className="mt-1 text-[11.5px] leading-relaxed text-muted-foreground truncate">
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
          <div className="flex-1 overflow-y-auto p-6 space-y-4 max-w-3xl">
            {draftsCount === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center select-none">
                <FileText className="h-10 w-10 text-muted-foreground/35 mb-3" />
                <p className="text-xs text-muted-foreground">No pending email drafts.</p>
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
            <Mail className="h-10 w-10 text-muted-foreground/30 mb-3" />
            <p className="text-xs text-muted-foreground">No messages inside this category.</p>
          </div>
        )}
      </div>

      {/* New Draft Creation Modal */}
      {draftModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-xl border border-line bg-[#111110] p-6 shadow-2xl animate-scale-up">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-line">
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-accent" />
                <h3 className="text-sm font-semibold text-ink">New Email Draft</h3>
              </div>
              <button
                onClick={() => setDraftModalOpen(false)}
                className="text-muted hover:text-ink p-1 rounded hover:bg-white/[0.04] transition-colors border border-line/50"
              >
                <X size={14} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleCreateDraftSubmit} className="mt-4 space-y-4">
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-muted mb-1.5">To</label>
                <input
                  type="email"
                  required
                  placeholder="receiver@example.com"
                  value={newDraftTo}
                  onChange={(e) => setNewDraftTo(e.target.value)}
                  className="w-full rounded-lg border border-line bg-[#0b0b0a] px-3.5 py-2 text-xs text-ink placeholder:text-muted-foreground/50 outline-none focus:border-accent/40"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-muted mb-1.5">Subject</label>
                <input
                  type="text"
                  required
                  placeholder="Enter email subject"
                  value={newDraftSubject}
                  onChange={(e) => setNewDraftSubject(e.target.value)}
                  className="w-full rounded-lg border border-line bg-[#0b0b0a] px-3.5 py-2 text-xs text-ink placeholder:text-muted-foreground/50 outline-none focus:border-accent/40"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-muted mb-1.5">Body</label>
                <textarea
                  required
                  rows={6}
                  placeholder="Write your email body here..."
                  value={newDraftBody}
                  onChange={(e) => setNewDraftBody(e.target.value)}
                  className="w-full rounded-lg border border-line bg-[#0b0b0a] px-3.5 py-2.5 text-xs text-ink placeholder:text-muted-foreground/50 outline-none focus:border-accent/40 resize-none leading-relaxed"
                />
              </div>

              <div className="pt-2 border-t border-line flex items-center justify-between">
                <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                  <Lock size={10} className="text-accent/60" />
                  Saved locally to memory
                </span>
                
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setDraftModalOpen(false)}
                    className="px-3.5 py-1.5 text-xs font-semibold border border-line hover:border-white/10 rounded-lg text-ink transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 text-xs font-semibold bg-accent hover:bg-accent-hover text-white rounded-lg transition-all shadow-md"
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
