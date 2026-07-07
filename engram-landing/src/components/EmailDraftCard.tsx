'use client';

import React from 'react';
import type { EmailDraftAction } from '@/lib/agent-actions';

interface EmailDraftCardProps {
  action: EmailDraftAction;
  isDarkMode: boolean;
}

const theme = {
  dark: {
    border: '#2A2B2E',
    bg: '#202124',
    innerBg: '#1A1B1E',
    label: '#94A3B8',
    text: '#E2E8F0',
    title: '#A7F3D0',
  },
  light: {
    border: '#DDD9D0',
    bg: '#FFFFFF',
    innerBg: '#EAE5DB',
    label: '#615E56',
    text: '#2D2B26',
    title: '#212E26',
  },
} as const;

export default function EmailDraftCard({ action, isDarkMode }: EmailDraftCardProps) {
  const t = isDarkMode ? theme.dark : theme.light;

  return (
    <div
      style={{
        marginTop: 12,
        padding: '12px 14px',
        borderRadius: 8,
        border: `1px solid ${t.border}`,
        backgroundColor: t.bg,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
        <span style={{ fontSize: 16 }}>📧</span>
        <span style={{ fontSize: 13, fontWeight: 600, color: t.title }}>Draft Email</span>
      </div>
      <div style={{ fontSize: 12, lineHeight: 1.6, color: t.text }}>
        <div><span style={{ color: t.label }}>To:</span> {action.to}</div>
        <div><span style={{ color: t.label }}>Subject:</span> {action.subject}</div>
        <div
          style={{
            marginTop: 8,
            padding: '8px 10px',
            borderRadius: 6,
            backgroundColor: t.innerBg,
            border: `1px solid ${t.border}`,
            whiteSpace: 'pre-wrap',
          }}
        >
          {action.body}
        </div>
      </div>
    </div>
  );
}
