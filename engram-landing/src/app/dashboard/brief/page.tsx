"use client";

import React from "react";
import DailyBriefWorkspace from "@/components/dashboard/DailyBriefWorkspace";
import { useTheme } from "@/app/dashboard/theme-context";

export default function DailyBriefPage() {
  const { isDarkMode } = useTheme();
  const tenantId = "engram-main";
  const userName = "Hitesh";

  return (
    <DailyBriefWorkspace
      isDarkMode={isDarkMode}
      tenantId={tenantId}
      userName={userName}
    />
  );
}
