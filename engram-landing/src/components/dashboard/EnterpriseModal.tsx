"use client";

import React from "react";
import { Shield, Sparkles, X } from "lucide-react";

interface EnterpriseModalProps {
  open: boolean;
  onClose: () => void;
}

export default function EnterpriseModal({ open, onClose }: EnterpriseModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-fade-in">
      <div className="w-full max-w-md rounded-xl border border-[#2A2F37] bg-[#1E1F23] p-6 shadow-2xl relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#9AA3AE] hover:text-[#F3F4F6] p-1 rounded hover:bg-white/[0.04] transition-colors border border-[#2A2F37]"
        >
          <X size={14} />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#F59E0B]/10 border border-[#F59E0B]/25 text-[#F59E0B]">
            <Shield size={20} />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#F3F4F6]">
              Upgrade to Enterprise
            </h3>
            <p className="text-xs text-[#9AA3AE]">Plan limit reached</p>
          </div>
        </div>

        {/* Modal Body */}
        <div className="space-y-3 text-xs text-[#9AA3AE] leading-relaxed">
          <p>
            You have reached the limit of 3 team members on your current plan.
            Upgrade to the **Enterprise tier** to add unlimited collaborators,
            enable organization-wide search pipelines, and access dedicated
            compliance logs.
          </p>

          <div className="rounded-lg bg-[#1A1B1E] border border-[#2A2F37] p-3 space-y-2.5">
            <div className="flex items-center gap-2 text-[#F3F4F6]">
              <Sparkles size={12} className="text-[#F59E0B]" />
              <span className="font-semibold text-[11px] uppercase tracking-wider">
                Enterprise Features Included
              </span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-[#9AA3AE] text-[11px]">
              <li>Unlimited workspace members and role assignments</li>
              <li>Dedicated vector index with Qdrant enterprise clustering</li>
              <li>SAML SSO and active directory integration</li>
              <li>Compliance audit logging and read/write permission scopes</li>
            </ul>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="mt-6 pt-4 border-t border-[#2A2F37] flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold border border-[#2A2F37] hover:border-[#9AA3AE] rounded-lg text-[#F3F4F6] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold bg-[#F59E0B] hover:bg-[#D97706] text-[#111317] rounded-lg transition-colors"
          >
            Contact Sales
          </button>
        </div>
      </div>
    </div>
  );
}
