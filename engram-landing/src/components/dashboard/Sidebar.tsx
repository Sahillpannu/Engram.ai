"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Sparkles,
  Mail,
  Calendar,
  Video,
  Users,
  Zap,
  BookOpen,
  Bot,
  Workflow,
  Settings,
  LogOut,
  Moon,
  Sun,
} from "lucide-react";

const workspaceLinks = [
  { label: "Daily Brief", href: "/dashboard/brief", icon: Sparkles },
  { label: "Email", href: "/dashboard/email", icon: Mail },
  { label: "Calendar", href: "/dashboard/calendar", icon: Calendar },
  { label: "Zoom", href: "/dashboard/zoom", icon: Video },
];

const manageLinks = [
  { label: "Teams", href: "/dashboard/teams", icon: Users },
  { label: "Integrations", href: "/dashboard", icon: Zap },
  { label: "Knowledge", href: "/dashboard/knowledge", icon: BookOpen },
  { label: "AI Center", href: "/dashboard/ai", icon: Bot },
  { label: "Automations", href: "/dashboard/automations", icon: Workflow },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

interface SidebarProps {
  isMobile?: boolean;
  isDarkMode?: boolean;
  activeNav?: string;
  setActiveNav?: (nav: string) => void;
  onToggleTheme?: () => void;
  onLogout?: () => void;
  userName?: string;
  userInitials?: string;
  userEmail?: string;
}

export default function Sidebar({
  isMobile,
  isDarkMode,
  activeNav,
  setActiveNav,
  onToggleTheme,
  onLogout,
  userName = "Hitesh Dhayal",
  userInitials = "HD",
  userEmail = "hitesh@engram.ai",
}: SidebarProps) {
  const pathname = usePathname();
  const [localIsDark, setLocalIsDark] = useState(true);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [themeHovered, setThemeHovered] = useState(false);
  const [logoutHovered, setLogoutHovered] = useState(false);

  const isDarkCurrent = isDarkMode !== undefined ? isDarkMode : localIsDark;

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
        backgroundColor: "#111317",
        position: "relative",
        borderRight: "1px solid #1E1F23",
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
          background:
            "linear-gradient(180deg, rgba(245,158,11,0.06), transparent 42%)",
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
          borderBottom: "1px solid #2A2F37",
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
              color: "#F3F4F6",
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
              color: "#6B7280",
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
                      ? "rgba(245, 158, 11, 0.15)"
                      : isHovered
                      ? "rgba(245, 158, 11, 0.08)"
                      : "transparent",
                    textDecoration: "none",
                    transition: "background-color 0.15s ease",
                  }}
                >
                  <Icon
                    size={16}
                    color={isActive ? "#F59E0B" : "#9AA3AE"}
                    style={{ flexShrink: 0 }}
                  />
                  <span
                    style={{
                      fontSize: "13px",
                      fontWeight: isActive ? 600 : 500,
                      color: isActive ? "#FDBA4A" : "#B6BEC8",
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
              color: "#6B7280",
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
                      ? "rgba(245, 158, 11, 0.15)"
                      : isHovered
                      ? "rgba(245, 158, 11, 0.08)"
                      : "transparent",
                    textDecoration: "none",
                    transition: "background-color 0.15s ease",
                  }}
                >
                  <Icon
                    size={16}
                    color={isActive ? "#F59E0B" : "#9AA3AE"}
                    style={{ flexShrink: 0 }}
                  />
                  <span
                    style={{
                      fontSize: "13px",
                      fontWeight: isActive ? 600 : 500,
                      color: isActive ? "#FDBA4A" : "#B6BEC8",
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
          borderTop: "1px solid #2A2F37",
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
                color: "#F3F4F6",
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
                color: "#9AA3AE",
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
            onClick={onToggleTheme || (() => setLocalIsDark(!localIsDark))}
            onMouseEnter={() => setThemeHovered(true)}
            onMouseLeave={() => setThemeHovered(false)}
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              border: `1px solid ${themeHovered ? "#F59E0B" : "#2A2F37"}`,
              backgroundColor: "transparent",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: themeHovered ? "#F3F4F6" : "#9AA3AE",
              transition: "all 0.2s ease",
            }}
            title={isDarkCurrent ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDarkCurrent ? <Moon size={14} /> : <Sun size={14} />}
          </button>

          {/* Logout Button */}
          <button
            onClick={onLogout || (() => {})}
            onMouseEnter={() => setLogoutHovered(true)}
            onMouseLeave={() => setLogoutHovered(false)}
            style={{
              height: "32px",
              borderRadius: "999px",
              border: logoutHovered ? "1px solid #EF4444" : "1px solid #2A2F37",
              backgroundColor: logoutHovered
                ? "rgba(239,68,68,0.12)"
                : "transparent",
              color: logoutHovered ? "#EF4444" : "#9AA3AE",
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
