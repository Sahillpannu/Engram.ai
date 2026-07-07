"use client";

import React from "react";
import { Sparkles } from "lucide-react";
import EmailDraftCard from "@/components/EmailDraftCard";
import type { EmailDraftAction } from "@/lib/agent-actions";

export default function DailyBriefPage() {
  const mockDraft: EmailDraftAction = {
    to: "sarah.jenkins@acmecorp.com",
    subject: "Follow up: Q3 Product Roadmap & Integration",
    body: "Hi Sarah,\n\nFollowing up on our call yesterday, I've outlined the core requirements for the Engram memory integration. We can start the synchronization pipeline next Tuesday at 10 AM EST.\n\nLet me know if that time works for your engineering team.\n\nBest,\nHitesh",
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-8 animate-fade-in space-y-6">
      {/* Page Heading */}
      <div>
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-accent/15 border border-accent/25 text-accent text-xs font-semibold mb-3">
          <Sparkles size={12} />
          <span>Active Memory Engine</span>
        </div>
        <h1 className="text-2xl font-semibold tracking-tight text-ink">Daily Brief</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Synthesized action items and drafts derived from your synchronized workspace context.
        </p>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column: Summary Info */}
        <div className="md:col-span-1 rounded-xl border border-line bg-[#111110] p-5 space-y-4 h-fit">
          <h3 className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground font-semibold">Today&apos;s Summary</h3>
          <div className="space-y-3.5 text-[12.5px] text-white/80 leading-relaxed">
            <p>
              We identified <strong>1 key follow-up item</strong> from your conversation yesterday with Acme Corp.
            </p>
            <p>
              Your calendar shows no conflicts for the proposed synchronization session next Tuesday.
            </p>
          </div>
          <div className="pt-3 border-t border-line/40">
            <span className="font-mono text-[9px] text-muted-foreground/50 uppercase">Last updated: 5m ago</span>
          </div>
        </div>

        {/* Right Column: Actions List */}
        <div className="md:col-span-2 space-y-4">
          <h3 className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground font-semibold">Pending Draft Actions</h3>
          
          {/* Reusable EmailDraftCard Component (Dark Mode default) */}
          <EmailDraftCard action={mockDraft} isDarkMode={true} />
          
          {/* Additional secondary placeholder card to imply future updates */}
          <div className="rounded-xl border border-line bg-[#111110]/40 p-4 border-dashed opacity-45 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2.5">
              <span className="text-muted-foreground">📅</span>
              <span className="font-medium text-muted-foreground">Schedule calendar block for Acme Demo</span>
            </div>
            <span className="italic text-muted-foreground/60">No draft needed</span>
          </div>
        </div>
      </div>
    </div>
  );
}
