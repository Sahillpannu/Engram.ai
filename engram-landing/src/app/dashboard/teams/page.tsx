"use client";

import React, { useState } from "react";
import { Users, Plus, X, Lock, Check, Send, Shield, User } from "lucide-react";

interface TeamMember {
  initials: string;
  name: string;
  email: string;
  role: "Admin" | "Member" | "Viewer";
  status: "Active" | "Pending";
  color: string;
}

export default function TeamsPage() {
  const [members, setMembers] = useState<TeamMember[]>([
    {
      initials: "AD",
      name: "Adrian Rivera",
      email: "adrian@jsmastery.com",
      role: "Admin",
      status: "Active",
      color: "bg-indigo-600",
    },
    {
      initials: "SK",
      name: "Sarah Jenkins",
      email: "sarah.jenkins@acmecorp.com",
      role: "Member",
      status: "Active",
      color: "bg-blue-600",
    },
    {
      initials: "PR",
      name: "Pratik Rivera",
      email: "pratik@earn.com",
      role: "Member",
      status: "Active",
      color: "bg-teal-600",
    },
  ]);

  // Invite Modal States
  const [modalOpen, setDraftModalOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<"Admin" | "Member" | "Viewer">("Member");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleInviteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail) return;

    // Extract initials from email
    const prefix = inviteEmail.split("@")[0] || "";
    const initials = (prefix.slice(0, 2) || "TM").toUpperCase();

    // Assign a random background color class
    const colors = [
      "bg-amber-600",
      "bg-emerald-600",
      "bg-purple-600",
      "bg-pink-600",
      "bg-rose-600",
      "bg-cyan-600",
    ];
    const color = colors[members.length % colors.length] || "bg-accent";

    const newMember: TeamMember = {
      initials,
      name: prefix.charAt(0).toUpperCase() + prefix.slice(1),
      email: inviteEmail,
      role: inviteRole,
      status: "Pending",
      color,
    };

    setMembers((prev) => [...prev, newMember]);
    setInviteEmail("");
    setInviteRole("Member");
    setDraftModalOpen(false);

    // Show toast notification
    setToastMessage(`Invitation sent to ${inviteEmail}`);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  return (
    <div className="min-h-full bg-bg select-none">
      {/* Toast alert banner */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 flex items-center gap-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 px-4.5 py-3 text-xs text-emerald-400 font-semibold shadow-2xl animate-fade-in">
          <Check size={14} />
          {toastMessage}
        </div>
      )}

      {/* Main Container */}
      <div className="max-w-4xl mx-auto px-6 py-12 flex flex-col items-center justify-center text-center space-y-8 min-h-[75vh]">
        {/* Large circular users icon matching mockup */}
        <div className="flex h-20 w-20 items-center justify-center rounded-full border border-accent/25 bg-accent/5 text-accent shadow-[0_4px_20px_rgba(255,107,44,0.1)]">
          <Users size={32} />
        </div>

        {/* Avatars Stack */}
        <div className="flex items-center justify-center -space-x-2.5">
          {members.map((member, idx) => (
            <div
              key={idx}
              className={`h-9 w-9 rounded-full ${member.color} text-white text-[11px] font-bold border-2 border-bg flex items-center justify-center uppercase shadow-md`}
              title={`${member.name} (${member.role})`}
            >
              {member.initials}
            </div>
          ))}
          {/* Action plus icon */}
          <button
            onClick={() => setDraftModalOpen(true)}
            className="h-9 w-9 rounded-full border border-dashed border-accent/70 hover:border-accent text-accent bg-transparent flex items-center justify-center transition-colors hover:bg-accent/5 cursor-pointer shadow-md"
            title="Invite new member"
          >
            <Plus size={14} strokeWidth={2.5} />
          </button>
        </div>

        {/* Title & description matching mockup */}
        <div className="space-y-4 max-w-2xl">
          <h1 className="text-[32px] sm:text-[38px] font-semibold text-ink leading-[1.1] tracking-tight">
            Connect your team - stay in sync, always
          </h1>
          <p className="text-[13px] sm:text-[14px] leading-relaxed text-muted-foreground/80 max-w-xl mx-auto">
            Engram&apos;s shared memory layer keeps everyone on the same page. Meetings, emails, and decisions flow into one brain your whole team can access and act on.
          </p>
        </div>

        {/* Capsule category badges */}
        <div className="flex flex-col items-center gap-2">
          {/* Row 1 */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="px-4 py-2 rounded-full border border-line bg-card/35 text-[11.5px] font-semibold text-white/80 shadow-sm">
              Shared memory
            </span>
            <span className="px-4 py-2 rounded-full border border-line bg-card/35 text-[11.5px] font-semibold text-white/80 shadow-sm">
              Unified inbox
            </span>
            <span className="px-4 py-2 rounded-full border border-line bg-card/35 text-[11.5px] font-semibold text-white/80 shadow-sm">
              Meeting sync
            </span>
          </div>
          {/* Row 2 */}
          <div className="flex justify-center">
            <span className="px-4 py-2 rounded-full border border-line bg-card/35 text-[11.5px] font-semibold text-white/80 shadow-sm">
              Role-based access
            </span>
          </div>
        </div>

        {/* Invite CTA Button */}
        <button
          onClick={() => setDraftModalOpen(true)}
          className="inline-flex items-center gap-2.5 rounded-lg border border-accent bg-transparent px-8 py-3.5 text-xs font-semibold text-accent transition-all duration-200 hover:bg-accent hover:text-white shadow-lg hover:shadow-accent/15"
        >
          <Plus size={14} strokeWidth={2.5} />
          Invite your team
        </button>
      </div>

      {/* Active Team Members List Table (Optional extension below mockup) */}
      <div className="max-w-4xl mx-auto px-6 pb-16">
        <div className="rounded-xl border border-line bg-[#111110] p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-line/45">
            <h3 className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground font-semibold">Active Team Members</h3>
            <span className="text-[10px] text-muted-foreground">{members.length} members connected</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-muted-foreground border-collapse">
              <thead>
                <tr className="border-b border-line/30 text-white/50 text-[10px] font-mono uppercase">
                  <th className="py-2.5 font-semibold">Name</th>
                  <th className="py-2.5 font-semibold">Email</th>
                  <th className="py-2.5 font-semibold">Role</th>
                  <th className="py-2.5 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line/25">
                {members.map((member, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.01] transition-colors">
                    <td className="py-3 font-medium text-white flex items-center gap-2">
                      <span className={`h-6 w-6 rounded-full ${member.color} text-white text-[9px] font-bold flex items-center justify-center uppercase`}>
                        {member.initials}
                      </span>
                      {member.name}
                    </td>
                    <td className="py-3 font-mono text-[11px]">{member.email}</td>
                    <td className="py-3">
                      <span className="inline-flex items-center gap-1">
                        <Shield size={11} className="text-accent/70" />
                        {member.role}
                      </span>
                    </td>
                    <td className="py-3">
                      <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                        member.status === "Active"
                          ? "bg-emerald-500/10 text-emerald-400"
                          : "bg-amber-500/10 text-amber-400 animate-pulse"
                      }`}>
                        {member.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Invite Member Popup Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-xl border border-line bg-[#111110] p-6 shadow-2xl animate-scale-up">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-line">
              <div className="flex items-center gap-2">
                <Users size={16} className="text-accent" />
                <h3 className="text-sm font-semibold text-ink">Invite Team Member</h3>
              </div>
              <button
                onClick={() => setDraftModalOpen(false)}
                className="text-muted hover:text-ink p-1 rounded hover:bg-white/[0.04] transition-colors border border-line/50"
              >
                <X size={14} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleInviteSubmit} className="mt-4 space-y-4">
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-muted mb-1.5">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  className="w-full rounded-lg border border-line bg-[#0b0b0a] px-3.5 py-2 text-xs text-ink placeholder:text-muted-foreground/50 outline-none focus:border-accent/40"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-muted mb-1.5">Workspace Role</label>
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value as any)}
                  className="w-full rounded-lg border border-line bg-[#0b0b0a] px-3.5 py-2 text-xs text-ink outline-none focus:border-accent/40 cursor-pointer"
                >
                  <option value="Member">Member (Read & Write)</option>
                  <option value="Admin">Admin (Full Control)</option>
                  <option value="Viewer">Viewer (Read Only)</option>
                </select>
              </div>

              <div className="pt-3 border-t border-line flex items-center justify-between">
                <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                  <Lock size={10} className="text-accent/60" />
                  Secure OAuth token invite
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
                    Send Invite
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
