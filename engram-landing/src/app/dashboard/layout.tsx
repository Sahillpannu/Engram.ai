"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { DashboardProvider } from "./context";
import Sidebar from "@/components/dashboard/Sidebar";
import { ThemeProvider, useTheme } from "./theme-context";

function DashboardLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { isDarkMode, toggleTheme } = useTheme();
  const [isMobile, setIsMobile] = useState(false);

  // Extract activeNav from pathname (e.g. /dashboard/brief -> brief)
  const getActiveNav = () => {
    if (pathname === "/dashboard") return "integrations";
    return pathname.split("/").pop() || "brief";
  };

  const activeNav = getActiveNav();

  const setActiveNav = (nav: string) => {
    if (nav === "integrations") {
      router.push("/dashboard");
    } else {
      router.push(`/dashboard/${nav}`);
    }
  };

  const handleLogout = () => {
    router.push("/login");
  };

  const userName = "Hitesh Dhayal";
  const userInitials = "HD";
  const userEmail = "hitesh@engram.ai";

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        backgroundColor: isDarkMode ? "#111317" : "#F3ECE3",
      }}
    >
      <Sidebar
        isMobile={isMobile}
        activeNav={activeNav}
        setActiveNav={setActiveNav}
        onLogout={handleLogout}
        userName={userName}
        userInitials={userInitials}
        userEmail={userEmail}
      />
      <main
        style={{
          flex: 1,
          minWidth: 0,
          overflowY: "auto",
          backgroundColor: isDarkMode ? "#111317" : "#F3ECE3",
        }}
      >
        {children}
      </main>
    </div>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <DashboardProvider>
        <DashboardLayoutContent>{children}</DashboardLayoutContent>
      </DashboardProvider>
    </ThemeProvider>
  );
}
