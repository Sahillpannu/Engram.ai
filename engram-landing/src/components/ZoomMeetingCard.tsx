'use client';

import React from 'react';
import type { ZoomMeetingAction } from '@/lib/agent-actions';

interface ZoomMeetingCardProps {
  action: ZoomMeetingAction;
  isDarkMode: boolean;
}

function formatDateTime(iso: string): string {
  try {
    return new Date(iso).toLocaleString(undefined, {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  } catch {
    return iso;
  }
}

export default function ZoomMeetingCard({ action, isDarkMode }: ZoomMeetingCardProps) {
  const border = isDarkMode ? '#334155' : '#E5E7EB';
  const labelColor = isDarkMode ? '#94A3B8' : '#6B7280';
  const textColor = isDarkMode ? '#E2E8F0' : '#1F2937';

  return (
    <div
      style={{
        marginTop: 12,
        padding: '12px 14px',
        borderRadius: 8,
        border: `1px solid ${border}`,
        backgroundColor: isDarkMode ? '#0F172A' : '#FFFFFF',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
        <span style={{ fontSize: 16 }}>🎥</span>
        <span style={{ fontSize: 13, fontWeight: 600, color: textColor }}>Zoom Meeting</span>
      </div>
      <div style={{ fontSize: 12, lineHeight: 1.6, color: textColor }}>
        <div><span style={{ color: labelColor }}>Topic:</span> {action.topic}</div>
        <div><span style={{ color: labelColor }}>When:</span> {formatDateTime(action.startTime)}</div>
        <div><span style={{ color: labelColor }}>Duration:</span> {action.duration} min</div>
        {action.agenda && (
          <div style={{ marginTop: 6, whiteSpace: 'pre-wrap' }}>{action.agenda}</div>
        )}
      </div>
    </div>
  );
}
