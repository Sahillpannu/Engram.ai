"use client";

import React, { useState } from "react";
import { BookOpen, Sparkles, Search, RefreshCw, Layers, Database, ShieldAlert } from "lucide-react";
import KnowledgeGraph, { Connector, Memory } from "@/components/KnowledgeGraph";

export default function KnowledgePage() {
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
            <Layers className="text-accent h-4 w-4" />
            <h4 className="text-sm font-semibold text-ink">Brain Cortex Active</h4>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            The Cortex center dynamically aggregates ingested transcripts, inbox messages, and documents. Currently, your agent is listening across <strong>{activeCount} active connections</strong>.
          </p>
          <div className="pt-2 border-t border-line/45 flex justify-between text-[11px] text-muted-foreground/60 font-mono">
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
            <h4 className="text-sm font-semibold text-ink">{conn.name}</h4>
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

          <p className="text-xs text-muted-foreground leading-relaxed">
            Configure permissions and manual sync triggers for the {conn.name} connector. When connected, new documents and thread summaries are mapped automatically.
          </p>

          <div className="pt-2 border-t border-line/45 flex items-center justify-between gap-4">
            <button
              onClick={() => handleResyncConnector(conn.id)}
              disabled={conn.status !== "connected" || isSyncing}
              className="flex items-center gap-1.5 px-3 py-1.5 border border-line bg-card rounded-lg text-[10.5px] font-semibold text-muted hover:text-ink disabled:opacity-50 transition-colors shadow-sm"
            >
              <RefreshCw size={11} className={isSyncing ? "animate-spin" : ""} />
              {isSyncing ? "Syncing..." : "Re-Sync Workspace"}
            </button>
            <span className="text-[10px] text-muted-foreground/50 font-mono italic">
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
            <h4 className="text-sm font-semibold text-ink">{mem.title}</h4>
            <span className="inline-flex items-center rounded-full bg-accent/10 px-2.5 py-0.5 text-[9.5px] font-mono font-medium text-accent border border-accent/20 uppercase">
              {mem.source}
            </span>
          </div>

          <p className="text-xs text-white/90 bg-[#111110] border border-line/55 p-3 rounded-lg leading-relaxed whitespace-pre-wrap font-sans">
            {mem.summary}
          </p>

          <div className="pt-2 border-t border-line/45 flex items-center justify-between">
            <button
              onClick={() => handleReindexMemory(mem.id)}
              disabled={isReindexing}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-accent hover:bg-accent-hover text-white rounded-lg text-[10.5px] font-semibold transition-all shadow-md"
            >
              <RefreshCw size={11} className={isReindexing ? "animate-spin" : ""} />
              {isReindexing ? "Re-indexing..." : "Re-Index Memory"}
            </button>
            <span className="text-[10.5px] font-mono text-muted-foreground/60">{mem.date}</span>
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
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-accent/15 border border-accent/25 text-accent text-xs font-semibold mb-3">
          <BookOpen size={12} />
          <span>Knowledge Context</span>
        </div>
        <h1 className="text-2xl font-semibold tracking-tight text-ink">Knowledge Base</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Index company documents, handbooks, and static wikis to feed your agent&apos;s memory graph.
        </p>
      </div>

      {/* Two Column Dashboard Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left Column: Knowledge Graph Panel */}
        <div className="md:col-span-1 space-y-5">
          <h3 className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground font-semibold">
            Neural Map View
          </h3>
          
          {/* Neural Map component */}
          <KnowledgeGraph
            memories={memories}
            connectors={connectors}
            onSelectNode={handleSelectNode}
          />

          {/* Node Inspector Box */}
          <div className="rounded-xl border border-line bg-[#111110] p-5">
            <div className="flex items-center justify-between pb-3 border-b border-line/45 mb-4">
              <h3 className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground font-semibold">
                Node Inspector
              </h3>
              {selectedNode.type !== "cortex" && (
                <button
                  onClick={() => setSelectedNode({ id: "cortex", type: "cortex" })}
                  className="text-[9px] font-semibold text-accent hover:text-accent-hover uppercase"
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
            <h3 className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground font-semibold">
              Indexed Memory Catalog
            </h3>
            
            {/* Search Input bar */}
            <div className="relative w-full sm:w-60">
              <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground/60" />
              <input
                type="text"
                placeholder="Search memories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-[8px] border border-line bg-[#111110] pl-9 pr-3 py-1.5 text-xs text-ink placeholder:text-muted-foreground/60 outline-none transition-all focus:border-accent/40 focus:bg-[#141413]"
              />
            </div>
          </div>

          {/* Catalog Grid */}
          <div className="space-y-4">
            {filteredMemories.length === 0 ? (
              <div className="rounded-xl border border-line bg-[#111110]/40 p-12 text-center text-xs text-muted-foreground/60 select-none">
                No matching indexed memories found. Try resetting the inspector filters.
              </div>
            ) : (
              filteredMemories.map((mem) => {
                const isReindexing = reindexingIds.includes(mem.id);
                return (
                  <div
                    key={mem.id}
                    className="rounded-xl border border-line bg-card p-4.5 space-y-3 transition-all hover:border-white/10 hover:bg-white/[0.01]"
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-2">
                        <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#111110] border border-line text-xs font-semibold capitalize text-accent-hover font-mono">
                          {mem.source.charAt(0)}
                        </span>
                        <h4 className="text-[13px] font-semibold text-ink truncate max-w-[200px] sm:max-w-md">
                          {mem.title}
                        </h4>
                      </div>
                      
                      <span className="font-mono text-[10.5px] text-muted-foreground/50 shrink-0">
                        {mem.date}
                      </span>
                    </div>

                    {/* Summary snippet */}
                    <p className="text-[12px] leading-relaxed text-muted-foreground">
                      {mem.summary}
                    </p>

                    {/* Action footer */}
                    <div className="pt-2 border-t border-line/35 flex items-center justify-between text-[11px]">
                      <span className="inline-flex items-center gap-1 text-[10px] text-muted-foreground/75 font-mono uppercase">
                        <Database size={10} className="text-accent/50" />
                        Memory ID: {mem.id}
                      </span>

                      <button
                        onClick={() => handleReindexMemory(mem.id)}
                        disabled={isReindexing}
                        className="flex items-center gap-1 text-accent font-semibold py-1 px-2.5 bg-accent/5 hover:bg-accent/10 border border-accent/15 rounded-lg text-[11px] transition-all"
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
