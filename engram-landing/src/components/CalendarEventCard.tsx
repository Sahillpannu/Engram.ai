'use client';

import React from 'react';
import type { CalendarEventAction } from '@/lib/agent-actions';

interface CalendarEventCardProps {
  action: CalendarEventAction;
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

export default function CalendarEventCard({ action, isDarkMode }: CalendarEventCardProps) {
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
        <span style={{ fontSize: 16 }}>📅</span>
        <span style={{ fontSize: 13, fontWeight: 600, color: textColor }}>{action.summary}</span>
      </div>
      <div style={{ fontSize: 12, lineHeight: 1.6, color: textColor }}>
        <div>{formatDateTime(action.startTime)} – {formatDateTime(action.endTime)}</div>
        {action.location && (
          <div><span style={{ color: labelColor }}>Location:</span> {action.location}</div>
        )}
        {action.attendees && action.attendees.length > 0 && (
          <div><span style={{ color: labelColor }}>Attendees:</span> {action.attendees.join(', ')}</div>
        )}
      </div>
    </div>
  );
}
