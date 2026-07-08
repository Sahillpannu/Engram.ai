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
import IntegrationFilterPanel, {
  type OverviewFilter,
} from "@/components/dashboard/integrations/IntegrationFilterPanel";
import IntegrationGrid from "@/components/dashboard/integrations/IntegrationGrid";
import type { IntegrationItem } from "@/components/dashboard/integrations/IntegrationCard";

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
  const [selectedOverview, setSelectedOverview] = useState<OverviewFilter>("all");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [fixingId, setFixingId] = useState<string | null>(null);

  const handleConnect = (id: string) => connect(id);
  const handleDisconnect = (id: string) => disconnect(id);

  const handleReauth = (id: string) => {
    setFixingId(id);
    setTimeout(() => {
      const item = integrations.find((i) => i.name === id);
      if (item) {
        item.hasError = false;
      }
      setFixingId(null);
    }, 1200);
  };

  const toggleCategory = (categoryName: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryName)
        ? prev.filter((c) => c !== categoryName)
        : [...prev, categoryName]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedOverview("all");
    setSearchQuery("");
  };

  const filteredIntegrations = integrations.filter((item) => {
    if (
      searchQuery &&
      !item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !item.desc.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    const isConnected = connectedIds.includes(item.name);
    if (selectedOverview === "connected") {
      if (!isConnected) return false;
    } else if (selectedOverview === "error") {
      if (!item.hasError || !isConnected) return false;
    } else if (selectedOverview === "recommended") {
      if (!item.recommended || isConnected) return false;
    }

    if (selectedCategories.length > 0 && !selectedCategories.includes(item.category)) {
      return false;
    }

    return true;
  });

  const countAll = integrations.length;
  const countConnected = integrations.filter((item) =>
    connectedIds.includes(item.name)
  ).length;

  return (
    <div className="flex h-full overflow-hidden">
      <IntegrationFilterPanel
        apps={integrations}
        connectedIds={connectedIds}
        categories={categories}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedOverview={selectedOverview}
        onSelectOverview={setSelectedOverview}
        selectedCategories={selectedCategories}
        onToggleCategory={toggleCategory}
      />
      <IntegrationGrid
        apps={filteredIntegrations}
        connectedIds={connectedIds}
        totalCount={countAll}
        connectedCount={countConnected}
        onConnect={handleConnect}
        onDisconnect={handleDisconnect}
        onReauth={handleReauth}
        fixingId={fixingId}
        onClearFilters={clearFilters}
      />
    </div>
  );
}
