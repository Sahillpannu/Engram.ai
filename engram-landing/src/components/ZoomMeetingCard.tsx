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
  const border = isDarkMode ? '#2A2F37' : '#E8DCCB';
  const labelColor = isDarkMode ? '#9AA3AE' : '#615E56';
  const textColor = isDarkMode ? '#F3F4F6' : '#2D2B26';
  const bgCard = isDarkMode ? '#1E1F23' : '#FFFFFF';

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
        <span style={{ fontSize: 16 }}>🎥</span>
        <span style={{ fontSize: 13, fontWeight: 600, color: isDarkMode ? '#F3F4F6' : '#2D2B26' }}>
          Zoom Meeting
        </span>
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
