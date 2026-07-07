"use client";

import { useState } from "react";
import { useDashboard } from "./context";
import {
  SiGmail,
  SiGooglecalendar,
  SiHubspot,
  SiNotion,
  SiJira,
  SiAirtable,
  SiZoom,
  SiStripe,
  SiGithub,
  SiDiscord,
  SiZendesk,
  SiIntercom,
  SiLinear,
} from "react-icons/si";

// Custom SVG components for missing react-icons/si icons
const SlackLogo = ({ size = 20, style }: { size?: number; style?: React.CSSProperties }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <path
      d="M5.042 15.166a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.166a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52Zm1.271 0a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.52v-6.314Z"
      fill="#E01E5A"
    />
    <path
      d="M8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834Zm0 1.271a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312Z"
      fill="#36C5F0"
    />
    <path
      d="M18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834Zm-1.271 0a2.528 2.528 0 0 1-2.521 2.521 2.528 2.528 0 0 1-2.521-2.521V2.522A2.528 2.528 0 0 1 15.164 0a2.528 2.528 0 0 1 2.521 2.522v6.312Z"
      fill="#2EB67D"
    />
    <path
      d="M15.164 18.956a2.528 2.528 0 0 1 2.521 2.522A2.528 2.528 0 0 1 15.164 24a2.528 2.528 0 0 1-2.521-2.522v-2.522h2.521Zm0-1.271a2.528 2.528 0 0 1-2.521-2.521 2.528 2.528 0 0 1 2.521-2.521h6.313A2.528 2.528 0 0 1 24 15.164a2.528 2.528 0 0 1-2.522 2.521h-6.314Z"
      fill="#ECB22E"
    />
  </svg>
);

const AmplitudeLogo = ({ size = 20, style }: { size?: number; style?: React.CSSProperties }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={style}>
    <path d="M6 19.5h3v-7.5H6v7.5zm4.5 0h3V4.5h-3v15zm4.5 0h3v-11.2h-3v11.2z" fill="currentColor" />
  </svg>
);

const SalesforceLogo = ({ size = 20, style }: { size?: number; style?: React.CSSProperties }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={style}>
    <path d="M18.8 10.1c-.2-2.3-2.1-4.1-4.5-4.1-1.7 0-3.2.9-4 2.3-.9-1.2-2.3-2-3.9-2-2.7 0-4.9 2.2-4.9 4.9 0 .4.1.8.2 1.2C.7 13.2 0 14.5 0 16c0 2.8 2.2 5 5 5h13.8c2.8 0 5-2.2 5-5 0-2.5-1.8-4.6-4.2-4.9z" />
  </svg>
);

const OpenAILogo = ({ size = 20, style }: { size?: number; style?: React.CSSProperties }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={style}>
    <path d="M22.28 10.97C22.09 9.21 20.89 7.74 19.29 7.23c-.35-.78-.96-1.42-1.74-1.81-1.39-.7-3.04-.49-4.22.53C12.44 5.37 11.23 4.3 9.73 4.02c-.93-.17-1.89.04-2.67.6C6.18 5.26 5.56 6.37 5.42 7.6c-.79.36-1.43.98-1.81 1.76-1.2 2.45-.19 5.39 2.23 6.64.07 1.15.54 2.23 1.34 3.03.8.8 1.88 1.27 3.03 1.34 1.25 2.43 4.19 3.44 6.64 2.23.78-.38 1.4-1.02 1.76-1.81 1.23.14 2.34-.48 2.98-1.46.64-.98.74-2.22.27-3.29.39-.36.72-.79.97-1.28a5.19 5.19 0 0 0 .65-2.5c-.01-.84-.25-1.65-.67-2.36zM13.62 5.7c.65-.35 1.39-.46 2.11-.31-.5.71-.78 1.55-.83 2.42H13.6c-.03-.76-.01-1.52.02-2.11zm-5 1.7c.43-.57 1.05-.96 1.75-1.09.28.69.4 1.43.34 2.17l-1.92 1.11c-.34-.8-.44-1.48-.17-2.19zM6.9 10.66c-.14-.72-.03-1.46.31-2.11 1-.03 1.99.04 2.49.32l.02 2.22H7.3c-.15-.13-.28-.27-.4-.43zm.92 4.41c-.48-.5-.81-1.14-.94-1.84.69.29 1.44.42 2.18.37l-1.11-1.92c-.8.34-1.48.44-2.19.17zm6.75 3.23c-.65.35-1.39.46-2.11.31.5-.71.78-1.55.83-2.42h1.3c.03.76.01 1.52-.02 2.11zm5-1.7c-.43.57-1.05.96-1.75 1.09-.28-.69-.4-1.43-.34-2.17l1.92-1.11c.34.8.44 1.48.17 2.19zm1.53-2.27c-.1 1-.6 1.9-1.4 2.5-.5-.7-.8-1.5-.8-2.4h2.2zm0-2.2v-1.3h-2.2c-.05-.87-.33-1.71-.83-2.42 1 .31 1.8 1.11 2.2 2.11.53.53.81 1.25.83 2l-.03-.39z" />
  </svg>
);
import { Search, MoreHorizontal, AlertCircle, RefreshCw, Plug, Database, Check } from "lucide-react";

interface IntegrationItem {
  name: string;
  desc: string;
  icon: React.ComponentType<{ size?: number; style?: React.CSSProperties }> | null;
  color: string;
  subtitle: string;
  category: string;
  recommended: boolean;
  comingSoon: boolean;
  defaultSynced?: string;
  hasError?: boolean;
  errorMsg?: string;
}

// Categorized Integrations list
const allIntegrationsList: IntegrationItem[] = [
  {
    name: "Gmail",
    desc: "Sync inbox threads, drafts, and receipts to long-term memory.",
    icon: SiGmail,
    color: "#EA4335",
    subtitle: "Your letters",
    category: "Messaging & Support",
    recommended: true,
    comingSoon: false,
    defaultSynced: "12m ago",
  },
  {
    name: "Google Calendar",
    desc: "Expose schedule context, meetings, and invite attendee information.",
    icon: SiGooglecalendar,
    color: "#4285F4",
    subtitle: "Shared calendar",
    category: "Collaboration & Docs",
    recommended: true,
    comingSoon: false,
    defaultSynced: "4m ago",
  },
  {
    name: "Slack",
    desc: "Index channels, chats, and files for real-time team context.",
    icon: SlackLogo,
    color: "#E01E5A",
    subtitle: "Team chat",
    category: "Messaging & Support",
    recommended: true,
    comingSoon: false,
  },
  {
    name: "HubSpot",
    desc: "Sync customer deals, notes, emails, and timeline context.",
    icon: SiHubspot,
    color: "#FF7A59",
    subtitle: "Customer records",
    category: "CRM & Sales",
    recommended: true,
    comingSoon: false,
  },
  {
    name: "Jira",
    desc: "Track projects, sprint goals, issues, and board tickets.",
    icon: SiJira,
    color: "#0052CC",
    subtitle: "Task management",
    category: "Project & Workflow",
    recommended: true,
    comingSoon: false,
  },
  {
    name: "Notion",
    desc: "Index wikis, meeting notes, database logs, and workspace documents.",
    icon: SiNotion,
    color: "#FFFFFF",
    subtitle: "Company wiki",
    category: "Collaboration & Docs",
    recommended: true,
    comingSoon: false,
  },
  {
    name: "Airtable",
    desc: "Query relational database spreadsheets, records, and forms.",
    icon: SiAirtable,
    color: "#186FFF",
    subtitle: "Relational databases",
    category: "Collaboration & Docs",
    recommended: false,
    comingSoon: false,
  },
  {
    name: "Amplitude",
    desc: "Feed product analytics, user charts, and event trends to agent memory.",
    icon: AmplitudeLogo,
    color: "#FF6B2C",
    subtitle: "Product analytics",
    category: "Analytics & Monitoring",
    recommended: false,
    comingSoon: false,
  },
  {
    name: "Zoom",
    desc: "Record, transcribe, and index transcript logs from video sessions.",
    icon: SiZoom,
    color: "#2D8CFF",
    subtitle: "Video sessions",
    category: "Collaboration & Docs",
    recommended: true,
    comingSoon: false,
  },
  {
    name: "GitHub",
    desc: "Track commits, pull requests, issue threads, and markdown wikis.",
    icon: SiGithub,
    color: "#FFFFFF",
    subtitle: "Code repositories",
    category: "Project & Workflow",
    recommended: false,
    comingSoon: false,
  },
  {
    name: "Linear",
    desc: "Index software tickets, issue trackers, product roadmaps, and cycle logs.",
    icon: SiLinear,
    color: "#5E6AD2",
    subtitle: "Software planning",
    category: "Project & Workflow",
    recommended: false,
    comingSoon: false,
  },
  {
    name: "Stripe",
    desc: "Analyze subscription plans, payouts, receipts, and customer billing.",
    icon: SiStripe,
    color: "#635BFF",
    subtitle: "Billing engine",
    category: "E-commerce & Payments",
    recommended: false,
    comingSoon: false,
  },
  {
    name: "Salesforce",
    desc: "Sync enterprise accounts, leads, opportunities, and pipeline contacts.",
    icon: SalesforceLogo,
    color: "#00A1E0",
    subtitle: "Enterprise CRM",
    category: "CRM & Sales",
    recommended: false,
    comingSoon: false,
    hasError: true,
    errorMsg: "Re-auth required",
  },
  {
    name: "Discord",
    desc: "Index community chat groups, developer forums, and direct chats.",
    icon: SiDiscord,
    color: "#5865F2",
    subtitle: "Community chat",
    category: "Messaging & Support",
    recommended: false,
    comingSoon: false,
  },
  {
    name: "Zendesk",
    desc: "Connect support tickets, customer conversations, and FAQ articles.",
    icon: SiZendesk,
    color: "#00E0A1",
    subtitle: "Support queue",
    category: "Messaging & Support",
    recommended: false,
    comingSoon: false,
  },
  {
    name: "Intercom",
    desc: "Sync real-time support widgets, messaging flows, and user profiles.",
    icon: SiIntercom,
    color: "#0057FF",
    subtitle: "User chat widget",
    category: "Messaging & Support",
    recommended: false,
    comingSoon: false,
  },
  {
    name: "OpenAI",
    desc: "Sync assistant memories, run logs, and fine-tuning prompts.",
    icon: OpenAILogo,
    color: "#74AA9C",
    subtitle: "AI Assistants",
    category: "AI & Automation",
    recommended: false,
    comingSoon: true,
  },
];

// Generate generic placeholders to show 34 sources scale
const extraCategories = [
  "Collaboration & Docs",
  "AI & Automation",
  "CRM & Sales",
  "Messaging & Support",
  "E-commerce & Payments",
  "Project & Workflow",
  "Analytics & Monitoring",
];

const genericSources: IntegrationItem[] = Array.from({ length: 17 }, (_, i) => {
  const num = i + 18;
  const name = `Source #${num}`;
  const cat = extraCategories[i % extraCategories.length];
  return {
    name,
    desc: `Seamlessly index records and synchronize workspace memory from ${name}.`,
    icon: null,
    color: "#71717a",
    subtitle: "Memory connector",
    category: cat,
    recommended: false,
    comingSoon: true,
    hasError: false,
    errorMsg: "",
  };
});

const integrations: IntegrationItem[] = [...allIntegrationsList, ...genericSources];

const categories = [
  "Messaging & Support",
  "E-commerce & Payments",
  "CRM & Sales",
  "Project & Workflow",
  "AI & Automation",
  "Analytics & Monitoring",
  "Collaboration & Docs",
];

export default function IntegrationsPage() {
  const { connectedIds, connect, disconnect } = useDashboard();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOverview, setSelectedOverview] = useState<"all" | "connected" | "error" | "recommended">("all");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [activeKebabCard, setActiveKebabCard] = useState<string | null>(null);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [fixingId, setFixingId] = useState<string | null>(null);

  // Connection handlers
  const handleConnect = (id: string) => {
    connect(id);
  };

  const handleDisconnect = (id: string) => {
    disconnect(id);
  };

  const handleReauth = (id: string) => {
    setFixingId(id);
    setTimeout(() => {
      // Simulate fixing the error by resetting it
      const item = integrations.find((i) => i.name === id);
      if (item) {
        item.hasError = false;
      }
      setFixingId(null);
    }, 1200);
  };

  // Filter calculations
  const countAll = integrations.length;
  const countConnected = integrations.filter((item) => connectedIds.includes(item.name)).length;
  const countError = integrations.filter((item) => item.hasError && connectedIds.includes(item.name)).length;
  const countRecommended = integrations.filter((item) => item.recommended && !connectedIds.includes(item.name)).length;

  const getCategoryCount = (categoryName: string) => {
    return integrations.filter((item) => item.category === categoryName).length;
  };

  const toggleCategory = (categoryName: string) => {
    if (selectedCategories.includes(categoryName)) {
      setSelectedCategories((prev) => prev.filter((c) => c !== categoryName));
    } else {
      setSelectedCategories((prev) => [...prev, categoryName]);
    }
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedOverview("all");
    setSearchQuery("");
  };

  const filteredIntegrations = integrations.filter((item) => {
    // 1. Search Query
    if (
      searchQuery &&
      !item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !item.desc.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    // 2. Overview Filter
    const isConnected = connectedIds.includes(item.name);
    if (selectedOverview === "connected") {
      if (!isConnected) return false;
    } else if (selectedOverview === "error") {
      if (!item.hasError || !isConnected) return false;
    } else if (selectedOverview === "recommended") {
      if (!item.recommended || isConnected) return false;
    }

    // 3. Category Checkbox Filters
    if (selectedCategories.length > 0) {
      if (!selectedCategories.includes(item.category)) {
        return false;
      }
    }

    return true;
  });

  const CategoryFilters = () => (
    <div className="space-y-6">
      {/* Overview Filters */}
      <div>
        <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/70 mb-3 font-semibold">Overview</h3>
        <div className="space-y-1">
          <button
            onClick={() => setSelectedOverview("all")}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors border ${
              selectedOverview === "all"
                ? "bg-white/[0.04] text-ink border-line"
                : "text-muted hover:text-ink hover:bg-white/[0.01] border-transparent"
            }`}
          >
            <span>All sources</span>
            <span className="font-mono text-[10px] text-muted-foreground bg-[#141413] px-1.5 py-0.5 rounded border border-line">{countAll}</span>
          </button>
          <button
            onClick={() => setSelectedOverview("connected")}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors border ${
              selectedOverview === "connected"
                ? "bg-white/[0.04] text-ink border-line"
                : "text-muted hover:text-ink hover:bg-white/[0.01] border-transparent"
            }`}
          >
            <span>Connected</span>
            <span className="font-mono text-[10px] text-muted-foreground bg-[#141413] px-1.5 py-0.5 rounded border border-line">{countConnected}</span>
          </button>
          <button
            onClick={() => setSelectedOverview("error")}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors border ${
              selectedOverview === "error"
                ? "bg-white/[0.04] text-ink border-line"
                : "text-muted hover:text-ink hover:bg-white/[0.01] border-transparent"
            }`}
          >
            <span>Errors</span>
            <span className="font-mono text-[10px] text-muted-foreground bg-[#141413] px-1.5 py-0.5 rounded border border-line">{countError}</span>
          </button>
          <button
            onClick={() => setSelectedOverview("recommended")}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors border ${
              selectedOverview === "recommended"
                ? "bg-white/[0.04] text-ink border-line"
                : "text-muted hover:text-ink hover:bg-white/[0.01] border-transparent"
            }`}
          >
            <span>Recommended</span>
            <span className="font-mono text-[10px] text-muted-foreground bg-[#141413] px-1.5 py-0.5 rounded border border-line">{countRecommended}</span>
          </button>
        </div>
      </div>

      {/* Category Checkboxes */}
      <div className="pt-2 border-t border-line/40">
        <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/70 mb-3 font-semibold">Categories</h3>
        <div className="space-y-2">
          {categories.map((cat) => {
            const isChecked = selectedCategories.includes(cat);
            const count = getCategoryCount(cat);
            return (
              <label
                key={cat}
                className="flex items-center justify-between cursor-pointer group py-0.5"
              >
                <div className="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleCategory(cat)}
                    className="h-3.5 w-3.5 cursor-pointer appearance-none rounded-[4px] border border-line bg-[#0b0b0a] checked:border-accent checked:bg-accent focus:outline-none transition-all"
                  />
                  <span className="text-[12px] text-muted group-hover:text-ink transition-colors font-medium">
                    {cat}
                  </span>
                </div>
                <span className="font-mono text-[9px] text-muted-foreground/50">
                  ({count})
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Clear Filters Button */}
      {(selectedCategories.length > 0 || selectedOverview !== "all" || searchQuery !== "") && (
        <button
          onClick={clearFilters}
          className="w-full text-center py-2 border border-dashed border-line hover:border-accent/40 rounded-lg text-[11px] font-semibold text-muted hover:text-accent transition-colors"
        >
          Clear all filters
        </button>
      )}
    </div>
  );

  return (
    <div className="flex flex-col min-h-full">
      {/* Intro Sub-header area */}
      <div className="px-6 py-8 border-b border-line/50 bg-[#0a0a0a]/30 shrink-0">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-ink">Connect your workspace</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {countAll} sources available · {countConnected} connected
            </p>
          </div>
          {/* Search bar */}
          <div className="w-full md:max-w-md">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/60" />
              <input
                type="text"
                placeholder="Search memory sources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-[10px] border border-line bg-[#0b0b0a] pl-10 pr-4 py-2.5 text-[14px] text-ink placeholder:text-muted-foreground/60 outline-none transition-all duration-200 focus:border-accent/40 focus:bg-[#0d0d0c]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Two-Sidebar View Area */}
      <div className="flex-1 max-w-7xl w-full mx-auto flex overflow-hidden">
        {/* Left Filter Rail (Sidebar 2) - Desktop Only */}
        <aside className="hidden md:block w-64 border-r border-line p-6 shrink-0 h-full overflow-y-auto">
          <CategoryFilters />
        </aside>

        {/* Mobile Inline Category Filter Drawer Toggle */}
        <div className="md:hidden px-6 py-3 border-b border-line flex items-center justify-between w-full bg-[#0a0a0a]/20">
          <span className="text-xs text-muted-foreground">
            Filters: <span className="text-ink font-semibold">{selectedOverview === "all" ? "All" : selectedOverview}</span>
            {selectedCategories.length > 0 && ` + ${selectedCategories.length} categories`}
          </span>
          <button
            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            className="text-[11px] font-semibold border border-line bg-card hover:bg-white/[0.02] px-3 py-1.5 rounded-lg text-ink"
          >
            {mobileFiltersOpen ? "Hide Filters" : "Show Filters"}
          </button>
        </div>

        {/* Mobile Filters Slide-down */}
        {mobileFiltersOpen && (
          <div className="md:hidden w-full bg-[#0b0b0a] border-b border-line p-6 animate-fade-in z-20">
            <CategoryFilters />
          </div>
        )}

        {/* Main Grid View */}
        <div className="flex-1 p-6 md:p-8 overflow-y-auto h-full min-w-0">
          {filteredIntegrations.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <Database className="h-10 w-10 text-muted-foreground/45 mb-4" />
              <h3 className="text-sm font-semibold text-ink">No memory sources found</h3>
              <p className="text-xs text-muted-foreground mt-1 max-w-xs">
                We couldn&apos;t find any integrations matching your active search or filters.
              </p>
              <button
                onClick={clearFilters}
                className="mt-4 inline-flex items-center justify-center rounded-[8px] bg-accent px-3 py-1.5 text-xs font-semibold text-white transition-all hover:bg-accent-hover"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredIntegrations.map((item) => {
                const Icon = item.icon;
                const isConnected = connectedIds.includes(item.name);
                const hasError = item.hasError && isConnected;
                const isComingSoon = item.comingSoon;

                return (
                  <div
                    key={item.name}
                    className={`relative flex flex-col justify-between rounded-xl border border-line bg-[#111110] p-4.5 transition-all duration-200 hover:border-white/10 hover:bg-white/[0.01] ${
                      isComingSoon ? "opacity-60 grayscale-[40%]" : ""
                    }`}
                  >
                    {/* Top Row: Icon and Status Badge */}
                    <div className="flex items-start justify-between">
                      <div
                        className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0b0b0a] border border-line"
                        style={{
                          boxShadow: !isComingSoon && Icon ? `inset 0 0 8px ${item.color}15` : "none",
                        }}
                      >
                        {Icon ? (
                          <Icon
                            size={20}
                            style={{ color: isComingSoon ? "#71717a" : item.color }}
                          />
                        ) : (
                          <Plug size={18} className="text-muted-foreground" />
                        )}
                      </div>

                      {/* Status and Action Dropdowns */}
                      <div className="flex items-center gap-1.5 relative">
                        {isConnected && !hasError && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-2 py-0.5 text-[9.5px] font-medium text-accent border border-accent/25">
                            <span className="h-1 w-1 rounded-full bg-accent animate-pulse" />
                            Connected
                          </span>
                        )}
                        {hasError && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-red-500/10 px-2 py-0.5 text-[9.5px] font-medium text-red-400 border border-red-500/25">
                            <AlertCircle size={9} />
                            Error
                          </span>
                        )}
                        {!isConnected && !isComingSoon && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-white/[0.02] px-2 py-0.5 text-[9.5px] font-medium text-muted-foreground border border-line">
                            Available
                          </span>
                        )}
                        {isComingSoon && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-transparent px-2 py-0.5 text-[9.5px] font-medium text-muted-foreground/50 border border-line/40 border-dashed">
                            Soon
                          </span>
                        )}

                        {/* Kebab Dropdown button for connected items */}
                        {isConnected && (
                          <div className="relative">
                            <button
                              onClick={() =>
                                setActiveKebabCard(activeKebabCard === item.name ? null : item.name)
                              }
                              className="text-muted-foreground hover:text-ink p-1 rounded transition-colors hover:bg-white/[0.04]"
                              aria-label="Manage source"
                            >
                              <MoreHorizontal size={14} />
                            </button>

                            {/* Dropdown menu */}
                            {activeKebabCard === item.name && (
                              <>
                                <div className="absolute right-0 top-7 z-30 w-28 rounded-lg border border-line bg-[#181818] p-1 shadow-2xl">
                                  <button
                                    onClick={() => {
                                      handleDisconnect(item.name);
                                      setActiveKebabCard(null);
                                    }}
                                    className="w-full text-left rounded px-2.5 py-1.5 text-[11px] font-medium text-red-400 hover:bg-red-500/10 transition-colors"
                                  >
                                    Disconnect
                                  </button>
                                </div>
                                {/* Backdrop close clicker */}
                                <div
                                  className="fixed inset-0 z-20"
                                  onClick={() => setActiveKebabCard(null)}
                                />
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Title and short italic subtitle line */}
                    <div className="mt-4">
                      <h3 className="text-sm font-semibold text-ink leading-tight flex items-center gap-1.5">
                        {item.name}
                      </h3>
                      {item.subtitle && (
                        <p className="text-[10.5px] italic text-muted-foreground/80 mt-0.5">
                          {item.subtitle}
                        </p>
                      )}
                    </div>

                    {/* Description text */}
                    <p className="mt-2 text-[12px] leading-relaxed text-muted-foreground/80 line-clamp-2 min-h-[36px]">
                      {item.desc}
                    </p>

                    {/* Bottom Row */}
                    <div className="mt-4.5 pt-3 border-t border-line/45 flex items-center justify-between text-[10.5px]">
                      {/* Status/Synctime text */}
                      <div>
                        {item.recommended && !isConnected && (
                          <span className="text-accent/90 font-medium">★ Recommended</span>
                        )}
                        {isConnected && !hasError && (
                          <span className="text-muted-foreground/70">
                            Synced {item.defaultSynced || "10m ago"}
                          </span>
                        )}
                        {hasError && (
                          <span
                            className="text-red-400/90 font-medium truncate max-w-[110px] block"
                            title={item.errorMsg}
                          >
                            {item.errorMsg}
                          </span>
                        )}
                      </div>

                      {/* CTA Button */}
                      <div>
                        {isComingSoon ? (
                          <span className="italic text-muted-foreground/50 select-none">Coming soon</span>
                        ) : isConnected ? (
                          hasError ? (
                            <button
                              onClick={() => handleReauth(item.name)}
                              disabled={fixingId === item.name}
                              className="inline-flex items-center gap-1 rounded-[6px] border border-red-500/30 hover:border-red-500/50 bg-red-500/5 px-2 py-0.5 text-[10px] font-semibold text-red-400 transition-colors"
                            >
                              {fixingId === item.name ? (
                                <>
                                  <RefreshCw size={10} className="animate-spin" />
                                  fixing
                                </>
                              ) : (
                                "Fix"
                              )}
                            </button>
                          ) : (
                            <span className="text-emerald-500 font-semibold flex items-center gap-0.5">
                              <Check size={11} />
                              Active
                            </span>
                          )
                        ) : (
                          <button
                            onClick={() => handleConnect(item.name)}
                            className="inline-flex items-center justify-center rounded-[6px] border border-accent bg-transparent px-2.5 py-0.5 font-semibold text-accent transition-all duration-200 hover:bg-accent hover:text-white"
                          >
                            Connect
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
