"use client";

import React, { useState } from "react";
import { Network, ExternalLink, Info } from "lucide-react";

export interface Connector {
  id: string;
  name: string;
  icon: "gmail" | "calendar" | "zoom" | "notion" | "drive" | "slack";
  status: "connected" | "connecting" | "disconnected";
}

export interface Memory {
  id: string;
  title: string;
  source: string;
  summary: string;
  date: string;
}

interface Node {
  id: string;
  label: string;
  x: number;
  y: number;
  color: string;
  glow: string;
  status?: "connected" | "connecting" | "disconnected";
  isMemory?: boolean;
  meta?: string;
}

interface Connection {
  from: string;
  to: string;
  status?: "connected" | "connecting" | "disconnected";
  isMemory?: boolean;
}

interface KnowledgeGraphProps {
  memories: Memory[];
  connectors: Connector[];
  onSelectNode?: (nodeId: string, nodeType: "cortex" | "connector" | "memory") => void;
}

const connectorColors = {
  gmail: "#ea4335",
  calendar: "#4285f4",
  zoom: "#ff6b2c",
  notion: "#a78bfa",
  drive: "#34a853",
  slack: "#2eb67d",
};

const connectorGlows = {
  gmail: "rgba(234, 67, 53, 0.15)",
  calendar: "rgba(66, 133, 244, 0.15)",
  zoom: "rgba(255, 107, 44, 0.15)",
  notion: "rgba(167, 139, 250, 0.15)",
  drive: "rgba(52, 168, 83, 0.15)",
  slack: "rgba(46, 182, 125, 0.15)",
};

export default function KnowledgeGraph({ memories, connectors, onSelectNode }: KnowledgeGraphProps) {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  // Center node representing the Cortex brain center
  const coreNode: Node = {
    id: "cortex",
    label: "Brain Cortex",
    x: 150,
    y: 110,
    color: "#ff6b2c",
    glow: "rgba(255, 107, 44, 0.25)",
    meta: "Core intelligence and memory hub",
  };

  const dynamicNodes: Node[] = [coreNode];
  const dynamicConnections: Connection[] = [];

  const radius = 60;
  const cx = 150;
  const cy = 110;

  // Hexagon positioning logic for connectors
  connectors.forEach((conn, index) => {
    const angleRad = (index * 60 * Math.PI) / 180;
    const x = cx + radius * Math.cos(angleRad);
    const y = cy + radius * Math.sin(angleRad);

    const isConnected = conn.status === "connected";
    const isConnecting = conn.status === "connecting";

    let color = "#3f3f46"; // Dark zinc for disconnected
    let glow = "rgba(63, 63, 70, 0.05)";

    if (isConnected) {
      color = connectorColors[conn.icon] || "#ff6b2c";
      glow = connectorGlows[conn.icon] || "rgba(255, 107, 44, 0.15)";
    } else if (isConnecting) {
      color = "#eab308"; // connecting yellow
      glow = "rgba(234, 179, 8, 0.15)";
    }

    dynamicNodes.push({
      id: conn.id,
      label: conn.name,
      x,
      y,
      color,
      glow,
      status: conn.status,
      meta: `${conn.name} - ${conn.status}`,
    });

    dynamicConnections.push({
      from: "cortex",
      to: conn.id,
      status: conn.status,
    });
  });

  // Recent memories: add them as small nodes connected to cortex
  const recentMemories = memories.slice(0, 3);
  recentMemories.forEach((mem, index) => {
    const angles = [30, 150, 270];
    const angleRad = (angles[index] * Math.PI) / 180;
    const x = cx + 85 * Math.cos(angleRad);
    const y = cy + 85 * Math.sin(angleRad);

    dynamicNodes.push({
      id: mem.id,
      label: mem.title,
      x,
      y,
      color: "#10b981", // Green memory nodes
      glow: "rgba(16, 185, 129, 0.2)",
      isMemory: true,
      meta: `Memory from ${mem.source}`,
    });

    dynamicConnections.push({
      from: "cortex",
      to: mem.id,
      isMemory: true,
    });
  });

  const isLineHighlighted = (conn: Connection) => {
    if (!hoveredNode) return false;
    return conn.from === hoveredNode || conn.to === hoveredNode;
  };

  const handleNodeClick = (node: Node) => {
    if (onSelectNode) {
      let type: "cortex" | "connector" | "memory" = "connector";
      if (node.id === "cortex") type = "cortex";
      else if (node.isMemory) type = "memory";
      onSelectNode(node.id, type);
    }
  };

  const handleOpenBrainMap = () => {
    const totalAssoc = (connectors.filter(c => c.status === "connected").length * 200) + (memories.length * 3);
    alert(`🌌 Opening complete Brain Map... Indexing ${totalAssoc} memory associations.`);
  };

  return (
    <div className="flex flex-col gap-3 w-full select-none">
      {/* Neural Network SVG Canvas Container */}
      <div className="relative w-full h-[240px] bg-[#111110] rounded-xl border border-line overflow-hidden flex items-center justify-center shadow-lg shadow-black/40 group">
        
        {/* Style block for data flow animations */}
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes flow-animation {
            to {
              stroke-dashoffset: -20;
            }
          }
          .sync-flow-line {
            stroke-dasharray: 4, 3;
            animation: flow-animation 0.8s linear infinite;
          }
          .pulse-halo {
            animation: pulse-halo-animation 2s infinite ease-in-out;
          }
          @keyframes pulse-halo-animation {
            0%, 100% { transform: scale(1); opacity: 0.7; }
            50% { transform: scale(1.1); opacity: 0.9; }
          }
        `}} />

        {/* Neural Network SVG */}
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 300 220"
          className="pointer-events-auto"
        >
          {/* Connection Lines */}
          {dynamicConnections.map((conn, i) => {
            const fromNode = dynamicNodes.find(n => n.id === conn.from);
            const toNode = dynamicNodes.find(n => n.id === conn.to);
            if (!fromNode || !toNode) return null;

            const highlighted = isLineHighlighted(conn);

            // Connection line styling
            let strokeColor = "rgba(255, 255, 255, 0.05)";
            let strokeWidth = 1.25;
            let isAnimated = false;

            if (conn.isMemory) {
              strokeColor = "rgba(16, 185, 129, 0.15)";
              strokeWidth = 1.25;
            } else if (conn.status === "connected") {
              strokeColor = "rgba(255, 255, 255, 0.12)";
              strokeWidth = 1.5;
              isAnimated = true;
            } else if (conn.status === "connecting") {
              strokeColor = "rgba(234, 179, 8, 0.2)";
              strokeWidth = 1.5;
              isAnimated = true;
            }

            if (highlighted) {
              strokeColor = toNode.color;
              strokeWidth = 2;
              isAnimated = true;
            }

            return (
              <line
                key={i}
                x1={fromNode.x}
                y1={fromNode.y}
                x2={toNode.x}
                y2={toNode.y}
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                className={isAnimated ? "sync-flow-line" : ""}
                style={{
                  transition: "stroke 0.2s ease, stroke-width 0.2s ease",
                }}
              />
            );
          })}

          {/* Node Elements */}
          {dynamicNodes.map((node) => {
            const isHovered = hoveredNode === node.id;
            const isAnyHovered = hoveredNode !== null;
            const opacity = !isAnyHovered || isHovered ? 1 : 0.45;

            // Size configurations
            let r = 7;
            if (node.id === "cortex") {
              r = isHovered ? 11 : 9;
            } else if (node.isMemory) {
              r = isHovered ? 5.5 : 4.2;
            } else {
              r = isHovered ? 8 : 6.2;
            }

            const outerHaloRadius = node.id === "cortex" ? r + 7 : r + 5.5;
            const isDisconnected = node.status === "disconnected";

            return (
              <g
                key={node.id}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
                onClick={() => handleNodeClick(node)}
                className="cursor-pointer"
              >
                {/* Outer halo */}
                {(isHovered || node.status === "connecting" || node.id === "cortex") && (
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={outerHaloRadius}
                    fill={node.glow}
                    className={node.status === "connecting" || node.id === "cortex" ? "pulse-halo" : ""}
                    style={{
                      transformOrigin: `${node.x}px ${node.y}px`,
                      transition: "all 0.2s ease",
                    }}
                  />
                )}

                {/* Inner Center Rim */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={r}
                  fill={node.id === "cortex" ? node.color : "#111110"}
                  stroke={node.color}
                  strokeWidth={isHovered ? 3 : 2}
                  style={{
                    transition: "all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1)",
                    opacity: isDisconnected && !isHovered ? 0.35 : opacity,
                  }}
                />

                {/* Node Label Text */}
                <text
                  x={node.x}
                  y={node.y + (node.id === "cortex" ? -15 : 15)}
                  textAnchor="middle"
                  fill={isHovered ? "#ffffff" : isDisconnected ? "#52525b" : "#a1a1aa"}
                  fontSize={node.id === "cortex" ? "10px" : "8px"}
                  fontWeight={node.id === "cortex" || isHovered ? 700 : 500}
                  style={{
                    transition: "all 0.2s ease",
                    userSelect: "none",
                    opacity: isDisconnected && !isHovered ? 0.4 : opacity,
                  }}
                >
                  {node.label.length > 13 ? node.label.substring(0, 10) + "..." : node.label}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Overlay hover details */}
        {hoveredNode && (
          <div className="absolute bottom-3 left-3 bg-[#18181b]/95 border border-line px-2.5 py-1.5 rounded-md text-[10.5px] text-white flex items-center gap-1.5 animate-fade-in pointer-events-none select-none">
            <Info size={11} className="text-accent" />
            <span>
              {dynamicNodes.find(n => n.id === hoveredNode)?.meta}
            </span>
          </div>
        )}
      </div>

      {/* Action link button */}
      <button
        onClick={handleOpenBrainMap}
        className="w-full flex items-center justify-center gap-1.5 py-2.5 border border-line bg-card hover:bg-white/[0.02] text-xs font-semibold text-ink rounded-lg transition-all shadow-sm"
      >
        <Network size={13} />
        Open Brain Map
        <ExternalLink size={11} className="opacity-70" />
      </button>
    </div>
  );
}
