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
  const border = isDarkMode ? '#2A2F37' : '#E8DCCB';
  const labelColor = isDarkMode ? '#9AA3AE' : '#615E56';
  const valueColor = isDarkMode ? '#E2E8F0' : '#2D2B26';
  const bgCard = isDarkMode ? '#1E1F23' : '#FFFFFF';
  const dateRangeColor = isDarkMode ? '#9AA3AE' : '#615E56';

  return (
    <div
      style={{
        marginTop: 12,
        padding: '16px',
        borderRadius: 12,
        border: `1px solid ${border}`,
        borderLeft: '3px solid #F59E0B',
        backgroundColor: bgCard,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
        <span style={{ fontSize: 16 }}>📅</span>
        <span style={{ fontSize: 13, fontWeight: 600, color: isDarkMode ? '#F3F4F6' : '#2D2B26' }}>
          {action.summary}
        </span>
      </div>
      <div style={{ fontSize: 12, lineHeight: 1.6 }}>
        <div style={{ color: dateRangeColor, fontSize: '13px', marginBottom: 6 }}>
          {formatDateTime(action.startTime)} – {formatDateTime(action.endTime)}
        </div>
        {action.location && (
          <div>
            <span style={{ color: labelColor }}>Location: </span>
            <span style={{ color: valueColor }}>{action.location}</span>
          </div>
        )}
        {action.attendees && action.attendees.length > 0 && (
          <div style={{ marginTop: 2 }}>
            <span style={{ color: labelColor }}>Attendees: </span>
            <span style={{ color: valueColor }}>{action.attendees.join(', ')}</span>
          </div>
        )}
      </div>
    </div>
  );
}
