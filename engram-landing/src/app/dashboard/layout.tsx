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
  Menu,
  X,
  Search,
  ChevronRight,
} from "lucide-react";
import { DashboardProvider, useDashboard } from "./context";

function DashboardLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { connectedIds } = useDashboard();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);

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

  const getPageHeading = () => {
    if (pathname === "/dashboard") {
      return {
        section: "Manage",
        title: "Integrations",
        badge: `✓ ${connectedIds.length} connected`,
      };
    }
    const wLink = workspaceLinks.find((l) => l.href === pathname);
    if (wLink) {
      return { section: "Workspace", title: wLink.label, badge: null };
    }
    const mLink = manageLinks.find((l) => l.href === pathname);
    if (mLink) {
      return { section: "Manage", title: mLink.label, badge: null };
    }
    return { section: "Dashboard", title: "Overview", badge: null };
  };

  const headingInfo = getPageHeading();

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-[#0b0b0a]">
      {/* Top Logo */}
      <div className="flex h-16 items-center px-6 border-b border-line shrink-0">
        <Link href="/dashboard" className="flex items-center gap-2.5" onClick={() => setMobileOpen(false)}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
            <line x1="6" y1="7" x2="17" y2="12" stroke="var(--ink)" strokeWidth="1.4" opacity="0.2" />
            <line x1="6" y1="17" x2="17" y2="12" stroke="var(--ink)" strokeWidth="1.4" opacity="0.2" />
            <circle cx="6" cy="7" r="2.6" fill="var(--ink)" />
            <circle cx="6" cy="17" r="2.6" fill="var(--ink)" />
            <circle cx="17" cy="12" r="3.4" fill="var(--accent)" />
          </svg>
          <span className="text-[17px] font-semibold tracking-tight text-ink flex items-baseline gap-1">
            Engram
            <span className="text-[10px] font-mono text-accent uppercase tracking-wider font-semibold px-1 rounded bg-accent-soft border border-accent/20">
              Journal
            </span>
          </span>
        </Link>
      </div>

      {/* Search Input */}
      <div className="px-4 py-3 shrink-0 border-b border-line/30">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground/60" />
          <input
            type="text"
            placeholder="Search here"
            className="w-full rounded-[10px] border border-line bg-[#0e0e0d] pl-9 pr-3 py-2 text-[13px] text-ink placeholder:text-muted-foreground/60 outline-none transition-all duration-200 focus:border-accent/40 focus:bg-[#111110]"
          />
        </div>
      </div>

      {/* Navigation Sections */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {/* Workspace List */}
        <div>
          <div className="px-3 mb-2 flex items-center justify-between">
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">Workspace</span>
          </div>
          <div className="space-y-0.5">
            {workspaceLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2 text-[13.5px] rounded-lg transition-all duration-150 font-medium border-l-2 ${
                    isActive
                      ? "bg-accent-soft text-accent border-accent"
                      : "text-muted hover:text-ink hover:bg-white/[0.02] border-transparent"
                  }`}
                >
                  <Icon size={15} className={isActive ? "text-accent" : "text-muted-foreground"} />
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Manage List */}
        <div>
          <div className="px-3 mb-2 flex items-center justify-between">
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">Manage</span>
          </div>
          <div className="space-y-0.5">
            {manageLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2 text-[13.5px] rounded-lg transition-all duration-150 font-medium border-l-2 ${
                    isActive
                      ? "bg-accent-soft text-accent border-accent"
                      : "text-muted hover:text-ink hover:bg-white/[0.02] border-transparent"
                  }`}
                >
                  <Icon size={15} className={isActive ? "text-accent" : "text-muted-foreground"} />
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Profile Section */}
      <div className="mt-auto border-t border-line p-4 space-y-3 bg-[#0a0a0a]/50 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8.5 h-8.5 rounded-full bg-accent-soft border border-accent/25 flex items-center justify-center text-[12px] font-semibold text-accent shrink-0 select-none p-1.5">
            HD
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[12.5px] font-medium text-ink truncate leading-normal">Hitesh Dhayal</p>
            <p className="text-[10.5px] text-muted-foreground truncate leading-normal">hitesh@engram.ai</p>
          </div>
        </div>
        <div className="flex items-center justify-between pt-2.5 border-t border-line/40">
          <button
            onClick={() => setIsDark(!isDark)}
            className="text-muted hover:text-ink transition-colors p-1 rounded hover:bg-white/[0.04]"
            title={isDark ? "Switch to light mode (mock)" : "Switch to dark mode (mock)"}
          >
            {isDark ? <Moon size={14} /> : <Sun size={14} />}
          </button>
          <Link
            href="/login"
            className="text-[11px] font-semibold text-muted-foreground hover:text-accent flex items-center gap-1.5 transition-colors py-1 px-2.5 rounded hover:bg-white/[0.02] border border-line/30"
          >
            <LogOut size={12} />
            Log out
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-bg text-ink font-sans">
      {/* Sidebar 1: Global Navigation (Desktop) */}
      <aside className="hidden md:flex flex-col w-64 border-r border-line shrink-0 h-full">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden bg-black/75 backdrop-blur-sm transition-opacity duration-300">
          <div className="w-64 border-r border-line bg-bg h-full flex flex-col relative animate-[slide-in-right_0.2s_ease-out]">
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-4 right-4 text-muted hover:text-ink p-1 rounded border border-line/50"
            >
              <X size={15} />
            </button>
            <div className="h-full">
              <SidebarContent />
            </div>
          </div>
          {/* Backdrop click to close */}
          <div className="flex-1" onClick={() => setMobileOpen(false)} />
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* Top Bar (Desktop Heading and Breadcrumbs) */}
        <header className="h-16 border-b border-line flex items-center justify-between px-6 bg-[#0b0b0a]/70 backdrop-blur-sm shrink-0">
          <div className="flex items-center gap-2">
            {/* Mobile Hamburger menu */}
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden text-muted hover:text-ink p-1.5 border border-line rounded mr-2"
              aria-label="Open sidebar"
            >
              <Menu size={16} />
            </button>

            {/* Breadcrumb Heading */}
            <div className="flex items-center gap-2 text-[12.5px] text-muted font-mono uppercase tracking-wider">
              <span>{headingInfo.section}</span>
              <ChevronRight size={12} className="text-muted-foreground/50" />
              <span className="text-ink font-semibold">{headingInfo.title}</span>
              {headingInfo.badge && (
                <span className="ml-2.5 inline-flex items-center gap-1 rounded-full bg-accent/10 px-2 py-0.5 text-[10.5px] font-mono font-medium text-accent border border-accent/25">
                  {headingInfo.badge}
                </span>
              )}
            </div>
          </div>

          {/* User Name Chip */}
          <div className="flex items-center gap-2 rounded-full border border-line bg-[#111110] py-1.5 pl-1.5 pr-3.5 shadow-sm hover:border-white/10 transition-colors cursor-pointer select-none">
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-accent text-white text-[9.5px] font-bold">
              HD
            </div>
            <span className="text-[11px] font-semibold text-ink">Hitesh Dhayal</span>
          </div>
        </header>

        {/* Scrollable Page Content */}
        <main className="flex-1 overflow-y-auto bg-bg relative">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardProvider>
      <DashboardLayoutContent>{children}</DashboardLayoutContent>
    </DashboardProvider>
  );
}
