"use client";

import React, { useState } from "react";
import { BookOpen, Sparkles, Search, RefreshCw, Layers, Database, ShieldAlert } from "lucide-react";
import KnowledgeGraph, { Connector, Memory } from "@/components/KnowledgeGraph";
import { useTheme } from "@/app/dashboard/theme-context";

export default function KnowledgePage() {
  const { isDarkMode } = useTheme();

  const bgMain = isDarkMode ? "#111317" : "#F3ECE3";
  const bgCard = isDarkMode ? "#1E1F23" : "#FFFFFF";
  const bgInner = isDarkMode ? "#1A1B1E" : "#EAE5DB";
  const borderCol = isDarkMode ? "#2A2F37" : "#E8DCCB";
  const textPrimary = isDarkMode ? "#F3F4F6" : "#2D2B26";
  const textMuted = isDarkMode ? "#9AA3AE" : "#615E56";
  const textGray = isDarkMode ? "#6B7280" : "#9A958C";
  const accent = isDarkMode ? "#F59E0B" : "#D97706";

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedNode, setSelectedNode] = useState<{
    id: string;
    type: "cortex" | "connector" | "memory";
  }>({ id: "cortex", type: "cortex" });

  const [reindexingIds, setReindexingIds] = useState<string[]>([]);
  const [resyncingConnectorId, setResyncingConnectorId] = useState<string | null>(null);

  // Initial Mock Connectors matching the graph indexes
  const connectors: Connector[] = [
    { id: "conn-1", name: "Gmail", icon: "gmail", status: "connected" },
    { id: "conn-2", name: "Google Calendar", icon: "calendar", status: "connected" },
    { id: "conn-3", name: "Zoom Meetings", icon: "zoom", status: "connected" },
    { id: "conn-4", name: "Notion wiki", icon: "notion", status: "disconnected" },
    { id: "conn-5", name: "Google Drive", icon: "drive", status: "connecting" },
    { id: "conn-6", name: "Slack", icon: "slack", status: "connected" },
  ];

  // Initial Mock Memories
  const [memories, setMemories] = useState<Memory[]>([
    {
      id: "mem-1",
      title: "Roadmap Alignment Call",
      source: "zoom",
      summary: "Discussed memory API synchronization pipeline timelines and OAuth credentials for Zoom and HubSpot.",
      date: "July 7, 2026",
    },
    {
      id: "mem-2",
      title: "Q3 Strategy Document",
      source: "drive",
      summary: "Reviewed high-level roadmap including user metrics, query latency improvements, and dashboard stub links.",
      date: "July 6, 2026",
    },
    {
      id: "mem-3",
      title: "Sprint Kickoff Notes",
      source: "slack",
      summary: "Hitesh and Adrian aligned on hairline borders design style guides and orange accent highlights.",
      date: "July 5, 2026",
    },
    {
      id: "mem-4",
      title: "Acme Corp Proposal Deck",
      source: "gmail",
      summary: "Proposal sent to Acme Corp detailing enterprise memory workspaces, compliance rules, and key timelines.",
      date: "July 4, 2026",
    },
  ]);

  // Handle graph click selections
  const handleSelectNode = (nodeId: string, nodeType: "cortex" | "connector" | "memory") => {
    setSelectedNode({ id: nodeId, type: nodeType });
  };

  // Re-index memory simulator
  const handleReindexMemory = (id: string) => {
    setReindexingIds((prev) => [...prev, id]);
    setTimeout(() => {
      setReindexingIds((prev) => prev.filter((item) => item !== id));
    }, 1200);
  };

  // Re-sync connector simulator
  const handleResyncConnector = (id: string) => {
    setResyncingConnectorId(id);
    setTimeout(() => {
      setResyncingConnectorId(null);
    }, 1500);
  };

  // Filter memories list on search & node selection
  const filteredMemories = memories.filter((mem) => {
    // 1. Graph node filter constraint
    if (selectedNode.type === "memory" && selectedNode.id !== mem.id) {
      return false;
    }
    if (selectedNode.type === "connector") {
      const conn = connectors.find((c) => c.id === selectedNode.id);
      if (conn && conn.icon !== mem.source) {
        return false;
      }
    }

    // 2. Search query filter constraint
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        mem.title.toLowerCase().includes(q) ||
        mem.summary.toLowerCase().includes(q) ||
        mem.source.toLowerCase().includes(q)
      );
    }

    return true;
  });

  // Dynamic Inspector Content
  const renderInspector = () => {
    if (selectedNode.type === "cortex") {
      const activeCount = connectors.filter((c) => c.status === "connected").length;
      return (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Layers className="h-4 w-4" style={{ color: accent }} />
            <h4 className="text-sm font-semibold" style={{ color: textPrimary }}>Brain Cortex Active</h4>
          </div>
          <p className="text-xs leading-relaxed" style={{ color: textMuted }}>
            The Cortex center dynamically aggregates ingested transcripts, inbox messages, and documents. Currently, your agent is listening across <strong>{activeCount} active connections</strong>.
          </p>
          <div className="pt-2 flex justify-between text-[11px] font-mono" style={{ borderTop: `1px solid ${borderCol}`, color: textMuted }}>
            <span>Indexed associations: ~812</span>
            <span>Sync: Healthy</span>
          </div>
        </div>
      );
    }

    if (selectedNode.type === "connector") {
      const conn = connectors.find((c) => c.id === selectedNode.id);
      if (!conn) return null;
      const isSyncing = resyncingConnectorId === conn.id;

      return (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold" style={{ color: textPrimary }}>{conn.name}</h4>
            <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[9px] font-semibold uppercase ${
              conn.status === "connected"
                ? "bg-emerald-500/10 text-emerald-400"
                : conn.status === "connecting"
                ? "bg-yellow-500/10 text-yellow-400"
                : "bg-zinc-500/10 text-zinc-400"
            }`}>
              {conn.status}
            </span>
          </div>

          <p className="text-xs leading-relaxed" style={{ color: textMuted }}>
            Configure permissions and manual sync triggers for the {conn.name} connector. When connected, new documents and thread summaries are mapped automatically.
          </p>

          <div className="pt-2 flex items-center justify-between gap-4" style={{ borderTop: `1px solid ${borderCol}` }}>
            <button
              onClick={() => handleResyncConnector(conn.id)}
              disabled={conn.status !== "connected" || isSyncing}
              className="flex items-center gap-1.5 px-3 py-1.5 border rounded-lg text-[10.5px] font-semibold disabled:opacity-50 transition-colors shadow-sm cursor-pointer"
              style={{ borderColor: borderCol, backgroundColor: bgCard, color: textMuted }}
              onMouseEnter={(e) => {
                if (conn.status === "connected" && !isSyncing) e.currentTarget.style.color = textPrimary;
              }}
              onMouseLeave={(e) => {
                if (conn.status === "connected" && !isSyncing) e.currentTarget.style.color = textMuted;
              }}
            >
              <RefreshCw size={11} className={isSyncing ? "animate-spin" : ""} />
              {isSyncing ? "Syncing..." : "Re-Sync Workspace"}
            </button>
            <span className="text-[10px] font-mono italic" style={{ color: textMuted }}>
              Source: OAuth2
            </span>
          </div>
        </div>
      );
    }

    if (selectedNode.type === "memory") {
      const mem = memories.find((m) => m.id === selectedNode.id);
      if (!mem) return null;
      const isReindexing = reindexingIds.includes(mem.id);

      return (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold" style={{ color: textPrimary }}>{mem.title}</h4>
            <span className="inline-flex items-center rounded-full bg-accent/10 px-2.5 py-0.5 text-[9.5px] font-mono font-medium border uppercase" style={{ color: accent, borderColor: `${accent}40` }}>
              {mem.source}
            </span>
          </div>

          <p className="text-xs p-3 rounded-lg leading-relaxed whitespace-pre-wrap font-sans border" style={{ backgroundColor: bgInner, borderColor: borderCol, color: textPrimary }}>
            {mem.summary}
          </p>

          <div className="pt-2 flex items-center justify-between" style={{ borderTop: `1px solid ${borderCol}` }}>
            <button
              onClick={() => handleReindexMemory(mem.id)}
              disabled={isReindexing}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10.5px] font-semibold transition-all shadow-md cursor-pointer border-none"
              style={{ backgroundColor: accent, color: "#111317" }}
            >
              <RefreshCw size={11} className={isReindexing ? "animate-spin" : ""} />
              {isReindexing ? "Re-indexing..." : "Re-Index Memory"}
            </button>
            <span className="text-[10.5px] font-mono" style={{ color: textMuted }}>{mem.date}</span>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-8 animate-fade-in space-y-6 select-none">
      {/* Page Heading */}
      <div>
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full border text-xs font-semibold mb-3" style={{ backgroundColor: `${accent}15`, borderColor: `${accent}25`, color: accent }}>
          <BookOpen size={12} />
          <span>Knowledge Context</span>
        </div>
        <h1 className="text-2xl font-semibold tracking-tight" style={{ color: textPrimary }}>Knowledge Base</h1>
        <p className="mt-1 text-sm" style={{ color: textMuted }}>
          Index company documents, handbooks, and static wikis to feed your agent&apos;s memory graph.
        </p>
      </div>

      {/* Two Column Dashboard Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left Column: Knowledge Graph Panel */}
        <div className="md:col-span-1 space-y-5">
          <h3 className="font-mono text-[9px] uppercase tracking-[0.2em] font-semibold" style={{ color: textMuted }}>
            Neural Map View
          </h3>
          
          {/* Neural Map component */}
          <KnowledgeGraph
            memories={memories}
            connectors={connectors}
            onSelectNode={handleSelectNode}
          />

          {/* Node Inspector Box */}
          <div className="rounded-xl border p-5" style={{ borderColor: borderCol, backgroundColor: bgCard }}>
            <div className="flex items-center justify-between pb-3 mb-4" style={{ borderBottom: `1px solid ${borderCol}` }}>
              <h3 className="font-mono text-[9px] uppercase tracking-[0.2em] font-semibold" style={{ color: textMuted }}>
                Node Inspector
              </h3>
              {selectedNode.type !== "cortex" && (
                <button
                  onClick={() => setSelectedNode({ id: "cortex", type: "cortex" })}
                  className="text-[9px] font-semibold uppercase bg-transparent border-none cursor-pointer"
                  style={{ color: accent }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = isDarkMode ? "#FDBA4A" : "#B45309";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = accent;
                  }}
                >
                  Reset to Core
                </button>
              )}
            </div>
            {renderInspector()}
          </div>
        </div>

        {/* Right Column: Search & Memory Catalog */}
        <div className="md:col-span-2 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h3 className="font-mono text-[9px] uppercase tracking-[0.2em] font-semibold" style={{ color: textMuted }}>
              Indexed Memory Catalog
            </h3>
            
            {/* Search Input bar */}
            <div className="relative w-full sm:w-60">
              <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2" style={{ color: textMuted }} />
              <input
                type="text"
                placeholder="Search memories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-[8px] border pl-9 pr-3 py-1.5 text-xs outline-none transition-all"
                style={{ borderColor: borderCol, backgroundColor: bgCard, color: textPrimary }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = `${accent}60`;
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = borderCol;
                }}
              />
            </div>
          </div>

          {/* Catalog Grid */}
          <div className="space-y-4">
            {filteredMemories.length === 0 ? (
              <div className="rounded-xl border p-12 text-center text-xs select-none" style={{ borderColor: borderCol, backgroundColor: `${bgCard}80`, color: textMuted }}>
                No matching indexed memories found. Try resetting the inspector filters.
              </div>
            ) : (
              filteredMemories.map((mem) => {
                const isReindexing = reindexingIds.includes(mem.id);
                return (
                  <div
                    key={mem.id}
                    className="rounded-xl border p-4.5 space-y-3 transition-all"
                    style={{ borderColor: borderCol, backgroundColor: bgCard }}
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-2">
                        <span className="flex h-6 w-6 items-center justify-center rounded-md border text-xs font-semibold capitalize font-mono" style={{ backgroundColor: bgInner, borderColor: borderCol, color: accent }}>
                          {mem.source.charAt(0)}
                        </span>
                        <h4 className="text-[13px] font-semibold truncate max-w-[200px] sm:max-w-md" style={{ color: textPrimary }}>
                          {mem.title}
                        </h4>
                      </div>
                      
                      <span className="font-mono text-[10.5px] shrink-0" style={{ color: textMuted }}>
                        {mem.date}
                      </span>
                    </div>

                    {/* Summary snippet */}
                    <p className="text-[12px] leading-relaxed" style={{ color: textMuted }}>
                      {mem.summary}
                    </p>

                    {/* Action footer */}
                    <div className="pt-2 flex items-center justify-between text-[11px]" style={{ borderTop: `1px solid ${borderCol}` }}>
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono uppercase" style={{ color: textMuted }}>
                        <Database size={10} style={{ color: `${accent}80` }} />
                        Memory ID: {mem.id}
                      </span>

                      <button
                        onClick={() => handleReindexMemory(mem.id)}
                        disabled={isReindexing}
                        className="flex items-center gap-1 font-semibold py-1 px-2.5 border rounded-lg text-[11px] transition-all cursor-pointer bg-transparent"
                        style={{ borderColor: `${accent}40`, color: accent }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = `${accent}15`;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "transparent";
                        }}
                      >
                        <RefreshCw size={11} className={isReindexing ? "animate-spin animate-duration-1000" : ""} />
                        {isReindexing ? "Re-indexing..." : "Re-Index"}
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
