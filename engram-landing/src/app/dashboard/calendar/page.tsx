"use client";

import React from "react";
import CalendarWorkspace from "@/components/dashboard/CalendarWorkspace";
import type { CalendarEventAction } from "@/lib/agent-actions";
import { useTheme } from "@/app/dashboard/theme-context";

export default function CalendarPage() {
  const { isDarkMode } = useTheme();

  const calendarColors = {
    bg: isDarkMode ? "#111317" : "#F3ECE3",
    text: isDarkMode ? "#F3F4F6" : "#2D2B26",
    subText: isDarkMode ? "#9AA3AE" : "#615E56",
    cardBg: isDarkMode ? "#1E1F23" : "#FFFFFF",
    border: isDarkMode ? "#2A2F37" : "#E8DCCB",
    iconBg: isDarkMode ? "#252629" : "#EAE5DB",
  };

  const events: CalendarEventAction[] = [
    {
      summary: "Learning Session on Generative AI",
      startTime: "2026-07-08T10:00:00Z",
      endTime: "2026-07-08T11:00:00Z",
      location: "Zoom Meeting (https://zoom.us/j/engram-ai)",
      attendees: ["Hitesh Dhayal", "Sarah Jenkins", "Pratik Rivera"],
    },
    {
      summary: "Primary Calendar Sync Session",
      startTime: "2026-07-07T10:00:00Z",
      endTime: "2026-07-07T11:00:00Z",
      location: "Virtual Room (Hitesh's Desk)",
      attendees: ["Hitesh Dhayal"],
    },
  ];

  return (
    <CalendarWorkspace
      isDarkMode={isDarkMode}
      colors={calendarColors}
      calendarEvents={events}
    />
  );
}
