"use client";

import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Search,
  X,
  MapPin,
  Users,
  Calendar as CalendarIcon,
} from "lucide-react";
import CalendarEventCard from "@/components/CalendarEventCard";
import type { CalendarEventAction } from "@/lib/agent-actions";

// Mock Grid Days representing July 2026 (Sun-Sat, starting June 28, ending Aug 8)
interface DayItem {
  dayNumber: number;
  month: "prev" | "current" | "next";
  isToday?: boolean;
  hasEvent?: boolean;
}

interface CalendarWorkspaceProps {
  isDarkMode: boolean;
  colors: {
    bg: string;
    text: string;
    subText: string;
    cardBg: string;
    border: string;
    iconBg: string;
  };
  calendarEvents?: CalendarEventAction[];
}

export default function CalendarWorkspace({
  isDarkMode,
  colors,
  calendarEvents = [],
}: CalendarWorkspaceProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEvent, setSelectedEvent] = useState<CalendarEventAction | null>(null);

  // Calendar Checkbox States
  const [showPrimaryCalendar, setShowPrimaryCalendar] = useState(true);
  const [showBirthdays, setShowBirthdays] = useState(true);
  const [showHolidays, setShowHolidays] = useState(true);

  // Month grid structure for July 2026 (42 slots: June 28 - Aug 8)
  const days: DayItem[] = [
    // Row 1
    { dayNumber: 28, month: "prev" },
    { dayNumber: 29, month: "prev" },
    { dayNumber: 30, month: "prev" },
    { dayNumber: 1, month: "current" },
    { dayNumber: 2, month: "current" },
    { dayNumber: 3, month: "current" },
    { dayNumber: 4, month: "current" },
    // Row 2
    { dayNumber: 5, month: "current" },
    { dayNumber: 6, month: "current" },
    { dayNumber: 7, month: "current", isToday: true }, // Today
    { dayNumber: 8, month: "current", hasEvent: true },
    { dayNumber: 9, month: "current", hasEvent: true },
    { dayNumber: 10, month: "current", hasEvent: true },
    { dayNumber: 11, month: "current", hasEvent: true },
    // Row 3
    { dayNumber: 12, month: "current", hasEvent: true },
    { dayNumber: 13, month: "current", hasEvent: true },
    { dayNumber: 14, month: "current", hasEvent: true },
    { dayNumber: 15, month: "current", hasEvent: true },
    { dayNumber: 16, month: "current", hasEvent: true },
    { dayNumber: 17, month: "current", hasEvent: true },
    { dayNumber: 18, month: "current", hasEvent: true },
    // Row 4
    { dayNumber: 19, month: "current", hasEvent: true },
    { dayNumber: 20, month: "current", hasEvent: true },
    { dayNumber: 21, month: "current", hasEvent: true },
    { dayNumber: 22, month: "current", hasEvent: true },
    { dayNumber: 23, month: "current", hasEvent: true },
    { dayNumber: 24, month: "current", hasEvent: true },
    { dayNumber: 25, month: "current", hasEvent: true },
    // Row 5
    { dayNumber: 26, month: "current", hasEvent: true },
    { dayNumber: 27, month: "current", hasEvent: true },
    { dayNumber: 28, month: "current", hasEvent: true },
    { dayNumber: 29, month: "current", hasEvent: true },
    { dayNumber: 30, month: "current", hasEvent: true },
    { dayNumber: 31, month: "current", hasEvent: true },
    { dayNumber: 1, month: "next" },
    // Row 6
    { dayNumber: 2, month: "next" },
    { dayNumber: 3, month: "next" },
    { dayNumber: 4, month: "next" },
    { dayNumber: 5, month: "next" },
    { dayNumber: 6, month: "next" },
    { dayNumber: 7, month: "next" },
    { dayNumber: 8, month: "next" },
  ];

  // Helper to trigger active event modal details
  const handleEventClick = (e: React.MouseEvent, dayNumber: number) => {
    e.stopPropagation();
    // Use passed events if available, or fall back to mock session
    const matchedEvent = calendarEvents.find((evt) => {
      const dayStr = `-${dayNumber < 10 ? "0" + dayNumber : dayNumber}T`;
      return evt.startTime.includes(dayStr);
    });

    const eventAction: CalendarEventAction = matchedEvent || {
      summary: "Learning Session on Generative AI",
      startTime: `2026-07-${dayNumber < 10 ? "0" + dayNumber : dayNumber}T10:00:00Z`,
      endTime: `2026-07-${dayNumber < 10 ? "0" + dayNumber : dayNumber}T11:00:00Z`,
      location: "Zoom Meeting (https://zoom.us/j/engram-ai)",
      attendees: ["Hitesh Dhayal", "Sarah Jenkins", "Pratik Rivera"],
    };
    setSelectedEvent(eventAction);
  };

  const handleGoToToday = () => {
    const todayEvent = calendarEvents.find((evt) => evt.startTime.includes("-07T")) || {
      summary: "Primary Calendar Sync Session",
      startTime: "2026-07-07T10:00:00Z",
      endTime: "2026-07-07T11:00:00Z",
      location: "Virtual Room (Hitesh's Desk)",
      attendees: ["Hitesh Dhayal"],
    };
    setSelectedEvent(todayEvent);
  };

  // Active theme color style definitions
  const borderStyle = `1px solid ${colors.border}`;

  return (
    <div
      className="flex flex-1 h-full overflow-hidden transition-colors duration-300"
      style={{ backgroundColor: colors.bg, color: colors.text }}
    >
      {/* Sidebar 2: Calendar Sub-sidebar */}
      <div
        className="hidden lg:flex flex-col w-60 shrink-0 h-full p-4 justify-between border-r"
        style={{ backgroundColor: colors.bg, borderColor: colors.border }}
      >
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h2 className="text-[14px] font-bold" style={{ color: colors.text }}>
              Calendar
            </h2>
          </div>

          {/* Search box */}
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2"
              style={{ color: colors.subText }}
            />
            <input
              type="text"
              placeholder="Search event..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-[8px] border pl-9 pr-3 py-1.5 text-xs outline-none transition-all"
              style={{
                backgroundColor: colors.iconBg,
                borderColor: colors.border,
                color: colors.text,
              }}
            />
          </div>

          {/* Mini Calendar */}
          <div
            className="rounded-lg border p-3"
            style={{
              backgroundColor: `${colors.iconBg}50`,
              borderColor: colors.border,
            }}
          >
            <div className="flex justify-between items-center text-xs font-semibold px-1 mb-2">
              <span>July</span>
              <span style={{ color: colors.subText }}>2026</span>
            </div>
            {/* Week Headers */}
            <div
              className="grid grid-cols-7 text-center text-[9px] font-bold mb-1 font-mono"
              style={{ color: colors.subText }}
            >
              <span>S</span>
              <span>M</span>
              <span>T</span>
              <span>W</span>
              <span>T</span>
              <span>F</span>
              <span>S</span>
            </div>
            {/* Days grid representing mini-view */}
            <div className="grid grid-cols-7 text-center gap-y-1 text-[10.5px]">
              {days.slice(0, 35).map((day, idx) => (
                <div key={idx} className="flex items-center justify-center h-5 w-5 mx-auto">
                  {day.isToday ? (
                    <span className="h-5 w-5 rounded-full bg-[#F59E0B] text-[#111317] flex items-center justify-center font-bold text-[10px]">
                      {day.dayNumber}
                    </span>
                  ) : (
                    <span
                      style={{
                        color:
                          day.month === "current"
                            ? colors.text
                            : `${colors.subText}40`,
                      }}
                    >
                      {day.dayNumber}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* My Calendars Checkboxes */}
          <div className="pt-2 border-t space-y-3" style={{ borderColor: colors.border }}>
            <h3
              className="font-mono text-[9px] uppercase tracking-[0.2em] font-semibold"
              style={{ color: colors.subText }}
            >
              My Calendars
            </h3>
            <div className="space-y-2">
              <label
                className="flex items-center gap-2.5 cursor-pointer text-xs transition-colors"
                style={{ color: colors.subText }}
                onMouseEnter={(e) => (e.currentTarget.style.color = colors.text)}
                onMouseLeave={(e) => (e.currentTarget.style.color = colors.subText)}
              >
                <input
                  type="checkbox"
                  checked={showPrimaryCalendar}
                  onChange={() => setShowPrimaryCalendar(!showPrimaryCalendar)}
                  className="h-3.5 w-3.5 cursor-pointer appearance-none rounded-[4px] border checked:bg-[#F59E0B] checked:border-[#F59E0B] focus:outline-none"
                  style={{
                    backgroundColor: colors.iconBg,
                    borderColor: colors.border,
                  }}
                />
                <span>Primary Calendar</span>
              </label>
              <label
                className="flex items-center gap-2.5 cursor-pointer text-xs transition-colors"
                style={{ color: colors.subText }}
                onMouseEnter={(e) => (e.currentTarget.style.color = colors.text)}
                onMouseLeave={(e) => (e.currentTarget.style.color = colors.subText)}
              >
                <input
                  type="checkbox"
                  checked={showBirthdays}
                  onChange={() => setShowBirthdays(!showBirthdays)}
                  className="h-3.5 w-3.5 cursor-pointer appearance-none rounded-[4px] border checked:bg-[#F59E0B] checked:border-[#F59E0B] focus:outline-none"
                  style={{
                    backgroundColor: colors.iconBg,
                    borderColor: colors.border,
                  }}
                />
                <span>Birthdays</span>
              </label>
              <label
                className="flex items-center gap-2.5 cursor-pointer text-xs transition-colors"
                style={{ color: colors.subText }}
                onMouseEnter={(e) => (e.currentTarget.style.color = colors.text)}
                onMouseLeave={(e) => (e.currentTarget.style.color = colors.subText)}
              >
                <input
                  type="checkbox"
                  checked={showHolidays}
                  onChange={() => setShowHolidays(!showHolidays)}
                  className="h-3.5 w-3.5 cursor-pointer appearance-none rounded-[4px] border checked:bg-[#F59E0B] checked:border-[#F59E0B] focus:outline-none"
                  style={{
                    backgroundColor: colors.iconBg,
                    borderColor: colors.border,
                  }}
                />
                <span>Holidays</span>
              </label>
            </div>
          </div>
        </div>

        {/* Go to Today Button */}
        <button
          onClick={handleGoToToday}
          className="w-full text-center py-2.5 border rounded-lg text-xs font-semibold shadow-sm transition-all"
          style={{
            backgroundColor: `${colors.cardBg}40`,
            borderColor: colors.border,
            color: colors.subText,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = colors.text;
            e.currentTarget.style.borderColor = colors.text;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = colors.subText;
            e.currentTarget.style.borderColor = colors.border;
          }}
        >
          Go to Today
        </button>
      </div>

      {/* Main Month Grid area */}
      <div className="flex-1 flex flex-col min-w-0 h-full" style={{ backgroundColor: colors.bg }}>
        {/* Calendar Header toolbar */}
        <header
          className="px-6 py-4.5 border-b flex items-center justify-between shrink-0"
          style={{ borderColor: colors.border }}
        >
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-bold leading-none">July 2026</h2>
            <div className="flex gap-1">
              <button
                className="p-1 border rounded transition-colors"
                style={{
                  borderColor: colors.border,
                  backgroundColor: `${colors.cardBg}40`,
                  color: colors.subText,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = colors.text)}
                onMouseLeave={(e) => (e.currentTarget.style.color = colors.subText)}
              >
                <ChevronLeft size={13} />
              </button>
              <button
                className="p-1 border rounded transition-colors"
                style={{
                  borderColor: colors.border,
                  backgroundColor: `${colors.cardBg}40`,
                  color: colors.subText,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = colors.text)}
                onMouseLeave={(e) => (e.currentTarget.style.color = colors.subText)}
              >
                <ChevronRight size={13} />
              </button>
            </div>
          </div>

          {/* View mode Capsule */}
          <div
            className="flex rounded-lg border p-0.5 text-[11px] font-semibold"
            style={{
              borderColor: colors.border,
              backgroundColor: `${colors.cardBg}30`,
              color: colors.subText,
            }}
          >
            <button className="px-2.5 py-1 rounded hover:text-white transition-colors">Day</button>
            <button className="px-2.5 py-1 rounded hover:text-white transition-colors">Week</button>
            <button
              className="px-3.5 py-1 rounded border"
              style={{
                backgroundColor: colors.iconBg,
                borderColor: `${colors.subText}40`,
                color: colors.text,
              }}
            >
              Month
            </button>
          </div>
        </header>

        {/* Calendar Grid Table */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden" style={{ backgroundColor: colors.bg }}>
          {/* Weekday columns headers */}
          <div
            className="grid grid-cols-7 border-b font-mono text-[10px] font-bold text-center py-2"
            style={{
              borderColor: colors.border,
              backgroundColor: `${colors.iconBg}20`,
              color: colors.subText,
            }}
          >
            <span>Sun</span>
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
          </div>

          {/* Days month grid cells */}
          <div
            className="flex-1 grid grid-cols-7 grid-rows-6 border-l border-t"
            style={{ borderColor: colors.border }}
          >
            {days.map((day, idx) => {
              const isCurrentMonth = day.month === "current";
              const showEventBlock = showPrimaryCalendar && day.hasEvent;
              return (
                <div
                  key={idx}
                  className="border-r border-b flex flex-col p-2 min-h-0 justify-between transition-colors"
                  style={{
                    borderColor: colors.border,
                    backgroundColor: day.isToday
                      ? "rgba(245, 158, 11, 0.03)"
                      : "transparent",
                  }}
                >
                  {/* Day number cell top row */}
                  <div className="flex justify-start">
                    {day.isToday ? (
                      <span className="h-6 w-6 rounded-full bg-[#F59E0B] text-[#111317] flex items-center justify-center font-bold text-xs shadow-sm">
                        {day.dayNumber}
                      </span>
                    ) : (
                      <span
                        className="text-xs font-semibold"
                        style={{
                          color: isCurrentMonth
                            ? colors.text
                            : `${colors.subText}20`,
                        }}
                      >
                        {day.dayNumber}
                      </span>
                    )}
                  </div>

                  {/* Day content bottom row */}
                  <div className="mt-auto">
                    {showEventBlock && (
                      <button
                        onClick={(e) => handleEventClick(e, day.dayNumber)}
                        className="w-full flex items-center justify-between text-left text-[10.5px] px-2 py-1 rounded border-l-2 transition-all"
                        style={{
                          backgroundColor: isDarkMode ? "#1C1410" : "#FFF7ED",
                          borderLeftColor: "#F59E0B",
                          color: "#F59E0B",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = isDarkMode ? "#241A14" : "#FFEDD5";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = isDarkMode ? "#1C1410" : "#FFF7ED";
                        }}
                      >
                        <span className="font-semibold truncate max-w-[55px]">
                          Learni...
                        </span>
                        <span
                          className="text-[9.5px] font-mono shrink-0"
                          style={{ color: colors.subText }}
                        >
                          10:00
                        </span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Floating Detailed Event Card Modal overlay */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div
            className="w-full max-w-sm rounded-xl border p-5 shadow-2xl relative"
            style={{ backgroundColor: colors.cardBg, borderColor: colors.border }}
          >
            {/* Modal Close button */}
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-4 right-4 p-1 rounded border transition-colors"
              style={{
                borderColor: colors.border,
                color: colors.subText,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = colors.text;
                e.currentTarget.style.backgroundColor = colors.iconBg;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = colors.subText;
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              <X size={13} />
            </button>

            <h3
              className="font-mono text-[9px] uppercase tracking-[0.2em] font-semibold mb-2"
              style={{ color: colors.subText }}
            >
              Event Inspector
            </h3>

            {/* Custom CalendarEventCard Component */}
            <CalendarEventCard action={selectedEvent} isDarkMode={isDarkMode} />

            {/* Optional popup footer details */}
            <div
              className="mt-4 pt-3 border-t flex items-center justify-between text-[10px]"
              style={{ borderColor: colors.border, color: colors.subText }}
            >
              <span className="flex items-center gap-1 font-mono">
                <Users size={10} />
                Attendees: {selectedEvent.attendees?.length || 0}
              </span>
              <span className="flex items-center gap-1 font-mono">
                <MapPin size={10} />
                Zoom synced
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
