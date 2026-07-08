"use client";

import React from "react";
import DailyBriefWorkspace from "@/components/dashboard/DailyBriefWorkspace";

export default function DailyBriefPage() {
  const isDarkMode = true;
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
