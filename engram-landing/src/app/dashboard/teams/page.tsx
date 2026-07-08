"use client";

import React, { useState } from "react";
import { Users, Plus, X, Lock, Check, Send, Shield, User } from "lucide-react";
import EnterpriseModal from "@/components/dashboard/EnterpriseModal";

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
  const [enterpriseModalOpen, setEnterpriseModalOpen] = useState(false);
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
    <div className="min-h-full bg-[#111317] select-none flex flex-col justify-between" style={{ minHeight: "calc(100vh - 64px)" }}>
      {/* Toast alert banner */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 flex items-center gap-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 px-4.5 py-3 text-xs text-emerald-400 font-semibold shadow-2xl animate-fade-in">
          <Check size={14} />
          {toastMessage}
        </div>
      )}

      {/* Main Container */}
      <div 
        className="max-w-4xl mx-auto px-6 flex flex-col items-center justify-center text-center w-full"
        style={{ gap: "24px", padding: "40px 24px" }}
      >
        {/* Hero icon circle */}
        <div 
          className="flex items-center justify-center border-2"
          style={{
            width: "96px",
            height: "96px",
            borderRadius: "50%",
            backgroundColor: "rgba(245, 158, 11, 0.12)",
            borderColor: "rgba(245, 158, 11, 0.35)",
          }}
        >
          <Users size={40} className="text-[#F59E0B]" />
        </div>

        {/* Avatar cluster */}
        <div className="flex items-center justify-center">
          {/* AD Avatar */}
          <div
            className="flex items-center justify-center text-white border-2 border-[#111317]"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              backgroundColor: "#6366F1",
              fontSize: "13px",
              fontWeight: 700,
              marginRight: "-8px",
              zIndex: 3,
            }}
            title="Adrian Rivera (Admin)"
          >
            AD
          </div>
          {/* SK Avatar */}
          <div
            className="flex items-center justify-center text-white border-2 border-[#111317]"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              backgroundColor: "#14B8A6",
              fontSize: "13px",
              fontWeight: 700,
              marginRight: "-8px",
              zIndex: 2,
            }}
            title="Sarah Jenkins (Member)"
          >
            SK
          </div>
          {/* PR Avatar */}
          <div
            className="flex items-center justify-center text-white border-2 border-[#111317]"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              backgroundColor: "#10B981",
              fontSize: "13px",
              fontWeight: 700,
              marginRight: "-8px",
              zIndex: 1,
            }}
            title="Pratik Rivera (Member)"
          >
            PR
          </div>
          {/* Plus Button Avatar */}
          <button
            onClick={() => setDraftModalOpen(true)}
            className="flex items-center justify-center transition-colors"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              backgroundColor: "transparent",
              border: "2px dashed rgba(245, 158, 11, 0.6)",
              color: "#F59E0B",
              fontSize: "20px",
              fontWeight: 500,
              zIndex: 0,
            }}
            title="Invite new member"
          >
            +
          </button>
        </div>

        {/* Heading */}
        <h1 
          className="text-[#F3F4F6] leading-[1.1] tracking-tight text-center"
          style={{
            fontSize: "36px",
            fontWeight: 800,
            maxWidth: "560px",
          }}
        >
          Connect your team - stay in sync, always
        </h1>

        {/* Subtext */}
        <p 
          className="text-center"
          style={{
            fontSize: "15px",
            color: "#9AA3AE",
            lineHeight: "1.6",
            maxWidth: "500px",
          }}
        >
          Engram&apos;s shared memory layer keeps everyone on the same page. Meetings, emails, and decisions flow into one brain your whole team can access and act on.
        </p>

        {/* Feature pills row */}
        <div className="flex flex-col items-center" style={{ gap: "12px" }}>
          {/* Row 1 */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {["Shared memory", "Unified inbox", "Meeting sync"].map((pill) => (
              <span
                key={pill}
                className="px-4 py-2 border font-medium text-[13px] tracking-wide"
                style={{
                  borderRadius: "999px",
                  borderColor: "rgba(245, 158, 11, 0.3)",
                  backgroundColor: "rgba(245, 158, 11, 0.06)",
                  color: "#D4A843",
                }}
              >
                {pill}
              </span>
            ))}
          </div>
          {/* Row 2 */}
          <div className="flex justify-center">
            <span
              className="px-4 py-2 border font-medium text-[13px] tracking-wide"
              style={{
                borderRadius: "999px",
                borderColor: "rgba(245, 158, 11, 0.3)",
                backgroundColor: "rgba(245, 158, 11, 0.06)",
                color: "#D4A843",
              }}
            >
              Role-based access
            </span>
          </div>
        </div>

        {/* Invite CTA Button */}
        <button
          onClick={() => setEnterpriseModalOpen(true)}
          className="rounded-full shadow-lg transition-colors flex items-center justify-center"
          style={{
            backgroundColor: "#F59E0B",
            color: "#111317",
            border: "none",
            borderRadius: "999px",
            padding: "14px 32px",
            fontSize: "15px",
            fontWeight: 700,
            width: "fit-content",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#D97706";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#F59E0B";
          }}
        >
          + Invite your team
        </button>
      </div>

      {/* Active Team Members List Table (Optional extension below mockup) */}
      <div className="max-w-4xl w-full mx-auto px-6 pb-16 mt-8">
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
                  onChange={(e) => setInviteRole(e.target.value as "Admin" | "Member" | "Viewer")}
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

      {/* EnterpriseModal */}
      <EnterpriseModal
        open={enterpriseModalOpen}
        onClose={() => setEnterpriseModalOpen(false)}
      />
    </div>
  );
}
