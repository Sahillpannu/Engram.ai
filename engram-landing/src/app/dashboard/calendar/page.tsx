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
  Check,
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

export default function CalendarPage() {
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
    // Configure dynamic action time for that specific day
    const eventAction: CalendarEventAction = {
      summary: "Learning Session on Generative AI",
      startTime: `2026-07-${dayNumber < 10 ? "0" + dayNumber : dayNumber}T10:00:00Z`,
      endTime: `2026-07-${dayNumber < 10 ? "0" + dayNumber : dayNumber}T11:00:00Z`,
      location: "Zoom Meeting (https://zoom.us/j/engram-ai)",
      attendees: ["Hitesh Dhayal", "Sarah Jenkins", "Pratik Rivera"],
    };
    setSelectedEvent(eventAction);
  };

  const handleGoToToday = () => {
    // Reset selections and trigger a brief notification
    setSelectedEvent({
      summary: "Primary Calendar Sync Session",
      startTime: "2026-07-07T10:00:00Z",
      endTime: "2026-07-07T11:00:00Z",
      location: "Virtual Room (Hitesh's Desk)",
      attendees: ["Hitesh Dhayal"],
    });
  };

  return (
    <div className="flex flex-1 h-full overflow-hidden select-none">
      {/* Sidebar 2: Calendar Sub-sidebar */}
      <div className="hidden lg:flex flex-col w-60 border-r border-line bg-bg-secondary shrink-0 h-full p-4 justify-between">
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h2 className="text-[14px] font-semibold text-ink">Calendar</h2>
          </div>

          {/* Search box */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground/60" />
            <input
              type="text"
              placeholder="Search event..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-[8px] border border-line bg-[#0b0b0a] pl-9 pr-3 py-1.5 text-xs text-ink placeholder:text-muted-foreground/60 outline-none transition-all focus:border-accent/40"
            />
          </div>

          {/* Mini Calendar */}
          <div className="rounded-lg border border-line/40 bg-[#0b0b0a]/30 p-3">
            <div className="flex justify-between items-center text-xs font-semibold text-ink px-1 mb-2">
              <span>July</span>
              <span className="text-muted-foreground/60">2026</span>
            </div>
            {/* Week Headers */}
            <div className="grid grid-cols-7 text-center text-[9px] font-bold text-muted-foreground/60 mb-1 font-mono">
              <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
            </div>
            {/* Days grid representing mini-view */}
            <div className="grid grid-cols-7 text-center gap-y-1 text-[10.5px]">
              {days.slice(0, 35).map((day, idx) => (
                <div key={idx} className="flex items-center justify-center h-5 w-5 mx-auto">
                  {day.isToday ? (
                    <span className="h-5 w-5 rounded-full bg-accent text-white flex items-center justify-center font-bold text-[10px]">
                      {day.dayNumber}
                    </span>
                  ) : (
                    <span className={day.month === "current" ? "text-white/80" : "text-muted-foreground/30"}>
                      {day.dayNumber}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* My Calendars Checkboxes */}
          <div className="pt-2 border-t border-line/45 space-y-3">
            <h3 className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground font-semibold">My Calendars</h3>
            <div className="space-y-2">
              <label className="flex items-center gap-2.5 cursor-pointer text-xs text-muted hover:text-ink">
                <input
                  type="checkbox"
                  checked={showPrimaryCalendar}
                  onChange={() => setShowPrimaryCalendar(!showPrimaryCalendar)}
                  className="h-3.5 w-3.5 cursor-pointer appearance-none rounded-[4px] border border-line bg-[#0b0b0a] checked:border-accent checked:bg-accent focus:outline-none"
                />
                <span>Primary Calendar</span>
              </label>
              <label className="flex items-center gap-2.5 cursor-pointer text-xs text-muted hover:text-ink">
                <input
                  type="checkbox"
                  checked={showBirthdays}
                  onChange={() => setShowBirthdays(!showBirthdays)}
                  className="h-3.5 w-3.5 cursor-pointer appearance-none rounded-[4px] border border-line bg-[#0b0b0a] checked:border-accent checked:bg-accent focus:outline-none"
                />
                <span>Birthdays</span>
              </label>
              <label className="flex items-center gap-2.5 cursor-pointer text-xs text-muted hover:text-ink">
                <input
                  type="checkbox"
                  checked={showHolidays}
                  onChange={() => setShowHolidays(!showHolidays)}
                  className="h-3.5 w-3.5 cursor-pointer appearance-none rounded-[4px] border border-line bg-[#0b0b0a] checked:border-accent checked:bg-accent focus:outline-none"
                />
                <span>Holidays</span>
              </label>
            </div>
          </div>
        </div>

        {/* Go to Today Button */}
        <button
          onClick={handleGoToToday}
          className="w-full text-center py-2.5 border border-line hover:border-white/10 rounded-lg text-xs font-semibold text-muted hover:text-ink bg-card/20 transition-all shadow-sm"
        >
          Go to Today
        </button>
      </div>

      {/* Main Month Grid area */}
      <div className="flex-1 flex flex-col min-w-0 h-full bg-bg">
        {/* Calendar Header toolbar */}
        <header className="px-6 py-4.5 border-b border-line flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-bold text-ink leading-none">July 2026</h2>
            <div className="flex gap-1">
              <button className="p-1 border border-line hover:border-white/10 text-muted hover:text-ink rounded transition-colors bg-card/40">
                <ChevronLeft size={13} />
              </button>
              <button className="p-1 border border-line hover:border-white/10 text-muted hover:text-ink rounded transition-colors bg-card/40">
                <ChevronRight size={13} />
              </button>
            </div>
          </div>

          {/* View mode Capsule */}
          <div className="flex rounded-lg border border-line bg-card/30 p-0.5 text-[11px] font-semibold text-muted">
            <button className="px-2.5 py-1 rounded hover:text-ink">Day</button>
            <button className="px-2.5 py-1 rounded hover:text-ink">Week</button>
            <button className="px-3.5 py-1 bg-white/[0.04] text-white border border-line/60 rounded">Month</button>
          </div>
        </header>

        {/* Calendar Grid Table */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-bg">
          {/* Weekday columns headers */}
          <div className="grid grid-cols-7 border-b border-line bg-bg-secondary/40 font-mono text-[10px] text-muted-foreground/60 font-bold text-center py-2">
            <span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>
          </div>

          {/* Days month grid cells */}
          <div className="flex-1 grid grid-cols-7 grid-rows-6 border-l border-t border-line/75">
            {days.map((day, idx) => {
              const isCurrentMonth = day.month === "current";
              const showEventBlock = showPrimaryCalendar && day.hasEvent;
              return (
                <div
                  key={idx}
                  className={`border-r border-b border-line flex flex-col p-2 min-h-0 justify-between ${
                    day.isToday ? "bg-accent/[0.02]" : ""
                  }`}
                >
                  {/* Day number cell top row */}
                  <div className="flex justify-start">
                    {day.isToday ? (
                      <span className="h-6 w-6 rounded-full bg-accent text-white flex items-center justify-center font-bold text-xs shadow-sm">
                        {day.dayNumber}
                      </span>
                    ) : (
                      <span
                        className={`text-xs font-semibold ${
                          isCurrentMonth ? "text-white/70" : "text-muted-foreground/20"
                        }`}
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
                        className="w-full flex items-center justify-between text-left text-[10.5px] px-2 py-1 rounded bg-[#1c1410] border-l-2 border-accent text-accent hover:bg-[#241a14] transition-all"
                      >
                        <span className="font-semibold truncate max-w-[55px]">Learni...</span>
                        <span className="text-[9.5px] text-muted-foreground font-mono shrink-0">10:00</span>
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-fade-in">
          <div className="w-full max-w-sm rounded-xl border border-line bg-[#111110] p-5 shadow-2xl relative animate-scale-up">
            {/* Modal Close button */}
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-4 right-4 text-muted hover:text-ink p-1 rounded border border-line/60 hover:bg-white/[0.04] transition-colors"
            >
              <X size={13} />
            </button>

            <h3 className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground font-semibold mb-2">Event Inspector</h3>

            {/* Custom CalendarEventCard Component */}
            <CalendarEventCard action={selectedEvent} isDarkMode={true} />
            
            {/* Optional popup footer details */}
            <div className="mt-4 pt-3 border-t border-line/45 flex items-center justify-between text-[10px] text-muted-foreground/60">
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
