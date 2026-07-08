"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Bot,
  Sparkles,
  Mail,
  Calendar,
  Video,
  Users,
  Zap,
  BookOpen,
  Workflow,
  LogOut,
  Moon,
  Sun,
} from "lucide-react";
import { useTheme } from "@/app/dashboard/theme-context";

const workspaceLinks = [
  { label: "Agent", href: "/dashboard/agent", icon: Bot },
  { label: "Daily Brief", href: "/dashboard/brief", icon: Sparkles },
  { label: "Email", href: "/dashboard/email", icon: Mail },
  { label: "Calendar", href: "/dashboard/calendar", icon: Calendar },
  { label: "Zoom", href: "/dashboard/zoom", icon: Video },
];

const manageLinks = [
  { label: "Teams", href: "/dashboard/teams", icon: Users },
  { label: "Integrations", href: "/dashboard", icon: Zap },
  { label: "Knowledge", href: "/dashboard/knowledge", icon: BookOpen },
  { label: "Automations", href: "/dashboard/automations", icon: Workflow },
];

interface SidebarProps {
  isMobile?: boolean;
  activeNav?: string;
  setActiveNav?: (nav: string) => void;
  onLogout?: () => void;
  userName?: string;
  userInitials?: string;
  userEmail?: string;
}

export default function Sidebar({
  isMobile,
  activeNav,
  setActiveNav,
  onLogout,
  userName = "Hitesh Dhayal",
  userInitials = "HD",
  userEmail = "hitesh@engram.ai",
}: SidebarProps) {
  const pathname = usePathname();
  const { isDarkMode, toggleTheme } = useTheme();
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [themeHovered, setThemeHovered] = useState(false);
  const [logoutHovered, setLogoutHovered] = useState(false);

  // Theme-aware styles based on isDarkMode
  const bgOuter = isDarkMode ? "#111317" : "#F3ECE3";
  const borderCol = isDarkMode ? "#2A2F37" : "#E8DCCB";
  const bgInner = isDarkMode ? "#1A1B1E" : "#EAE5DB";
  const textPrimary = isDarkMode ? "#F3F4F6" : "#2D2B26";
  const textMuted = isDarkMode ? "#9AA3AE" : "#615E56";
  const textSection = isDarkMode ? "#6B7280" : "#615E56";
  const bgActive = isDarkMode ? "rgba(245,158,11,0.15)" : "rgba(217,119,6,0.12)";
  const bgHover = isDarkMode ? "rgba(245,158,11,0.08)" : "rgba(217,119,6,0.08)";
  const colorActive = isDarkMode ? "#FDBA4A" : "#B45309";
  const iconActiveColor = isDarkMode ? "#F59E0B" : "#B45309";
  const colorInactive = isDarkMode ? "#B6BEC8" : "#6B5B4B";
  const iconInactiveColor = isDarkMode ? "#9AA3AE" : "#615E56";
  const topGradient = isDarkMode
    ? "linear-gradient(180deg, rgba(245,158,11,0.06), transparent 42%)"
    : "linear-gradient(180deg, rgba(255,255,255,0.5), transparent 42%)";

  const isLinkActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard";
    }
    return pathname.startsWith(href);
  };

  const handleLinkClick = (label: string) => {
    if (setActiveNav) {
      const key = label.toLowerCase().replace(" ", "-");
      setActiveNav(key);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "220px",
        backgroundColor: bgOuter,
        position: "relative",
        borderRight: `1px solid ${borderCol}`,
      }}
    >
      {/* Top gradient overlay */}
      <div
        style={{
          pointerEvents: "none",
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          height: "180px",
          background: topGradient,
        }}
      />

      {/* Brand header (64px) */}
      <div
        style={{
          height: "64px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          padding: "0 16px",
          borderBottom: `1px solid ${borderCol}`,
          zIndex: 1,
        }}
      >
        <Link
          href="/dashboard"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            textDecoration: "none",
          }}
        >
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "10px",
              backgroundColor: "rgba(245, 158, 11, 0.2)",
              color: "#F59E0B",
              fontSize: "13px",
              fontWeight: 800,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              userSelect: "none",
            }}
          >
            E
          </div>
          <span
            style={{
              fontSize: "15px",
              fontWeight: 700,
              color: textPrimary,
              userSelect: "none",
            }}
          >
            Engram Journal
          </span>
        </Link>
      </div>

      {/* Nav scroll area */}
      <nav
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "16px 8px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          zIndex: 1,
        }}
      >
        {/* Workspace section */}
        <div>
          <div
            style={{
              fontSize: "10px",
              fontWeight: 700,
              color: textSection,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              padding: "0 8px",
              marginBottom: "4px",
            }}
          >
            Workspace
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            {workspaceLinks.map((link) => {
              const Icon = link.icon;
              const isActive = isLinkActive(link.href);
              const isHovered = hoveredNav === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => handleLinkClick(link.label)}
                  onMouseEnter={() => setHoveredNav(link.href)}
                  onMouseLeave={() => setHoveredNav(null)}
                  style={{
                    height: "38px",
                    borderRadius: "999px",
                    display: "flex",
                    alignItems: "center",
                    gap: "9px",
                    padding: "0 12px",
                    width: "100%",
                    cursor: "pointer",
                    border: "none",
                    backgroundColor: isActive
                      ? bgActive
                      : isHovered
                      ? bgHover
                      : "transparent",
                    textDecoration: "none",
                    transition: "background-color 0.15s ease",
                  }}
                >
                  <Icon
                    size={16}
                    color={isActive ? iconActiveColor : iconInactiveColor}
                    style={{ flexShrink: 0 }}
                  />
                  <span
                    style={{
                      fontSize: "13px",
                      fontWeight: isActive ? 600 : 500,
                      color: isActive ? colorActive : colorInactive,
                    }}
                  >
                    {link.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Manage section */}
        <div>
          <div
            style={{
              fontSize: "10px",
              fontWeight: 700,
              color: textSection,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              padding: "0 8px",
              marginBottom: "4px",
            }}
          >
            Manage
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            {manageLinks.map((link) => {
              const Icon = link.icon;
              const isActive = isLinkActive(link.href);
              const isHovered = hoveredNav === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => handleLinkClick(link.label)}
                  onMouseEnter={() => setHoveredNav(link.href)}
                  onMouseLeave={() => setHoveredNav(null)}
                  style={{
                    height: "38px",
                    borderRadius: "999px",
                    display: "flex",
                    alignItems: "center",
                    gap: "9px",
                    padding: "0 12px",
                    width: "100%",
                    cursor: "pointer",
                    border: "none",
                    backgroundColor: isActive
                      ? bgActive
                      : isHovered
                      ? bgHover
                      : "transparent",
                    textDecoration: "none",
                    transition: "background-color 0.15s ease",
                  }}
                >
                  <Icon
                    size={16}
                    color={isActive ? iconActiveColor : iconInactiveColor}
                    style={{ flexShrink: 0 }}
                  />
                  <span
                    style={{
                      fontSize: "13px",
                      fontWeight: isActive ? 600 : 500,
                      color: isActive ? colorActive : colorInactive,
                    }}
                  >
                    {link.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Bottom user panel */}
      <div
        style={{
          padding: "12px 8px",
          borderTop: `1px solid ${borderCol}`,
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          zIndex: 1,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {/* Avatar */}
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #F59E0B, #D97706)",
              color: "white",
              fontSize: "11px",
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            {userInitials}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              minWidth: 0,
              flex: 1,
            }}
          >
            <span
              style={{
                fontSize: "12px",
                fontWeight: 600,
                color: textPrimary,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {userName}
            </span>
            <span
              style={{
                fontSize: "10px",
                color: textMuted,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {userEmail}
            </span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "10px",
          }}
        >
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            onMouseEnter={() => setThemeHovered(true)}
            onMouseLeave={() => setThemeHovered(false)}
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              border: `1px solid ${themeHovered ? (isDarkMode ? "#F59E0B" : "#D97706") : borderCol}`,
              backgroundColor: "transparent",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: themeHovered ? textPrimary : textMuted,
              transition: "all 0.2s ease",
            }}
            title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDarkMode ? <Moon size={14} /> : <Sun size={14} />}
          </button>

          {/* Logout Button */}
          <button
            onClick={onLogout || (() => {})}
            onMouseEnter={() => setLogoutHovered(true)}
            onMouseLeave={() => setLogoutHovered(false)}
            style={{
              height: "32px",
              borderRadius: "999px",
              border: logoutHovered ? "1px solid #EF4444" : `1px solid ${borderCol}`,
              backgroundColor: logoutHovered
                ? "rgba(239,68,68,0.12)"
                : "transparent",
              color: logoutHovered ? "#EF4444" : textMuted,
              fontSize: "12px",
              fontWeight: 600,
              padding: "0 16px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
              transition: "all 0.2s ease",
            }}
          >
            <LogOut size={13} />
            Log out
          </button>
        </div>
      </div>
    </div>
  );
}
