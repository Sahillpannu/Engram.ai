"use client";

import React from "react";
import { Bot } from "lucide-react";
import { useTheme } from "@/app/dashboard/theme-context";

export default function AICenterPage() {
  const { isDarkMode } = useTheme();

  return (
    <div
      className="flex flex-col items-center justify-center min-h-[75vh] w-full text-center px-4 animate-fade-in"
      style={{ backgroundColor: isDarkMode ? "#111317" : "#F3ECE3" }}
    >
      <div
        className="opacity-40 mb-4 flex items-center justify-center"
        style={{ color: isDarkMode ? "#9AA3AE" : "#615E56" }}
      >
        <Bot size={40} />
      </div>
      <p
        className="text-[14px] font-medium tracking-wide"
        style={{ color: isDarkMode ? "#9AA3AE" : "#615E56" }}
      >
        Coming soon
      </p>
    </div>
  );
}
