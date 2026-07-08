"use client";

import React, { useState, useRef, useEffect } from "react";
import { useTheme } from "@/app/dashboard/theme-context";
import {
  Bot,
  Mail,
  Calendar,
  Video,
  BookOpen,
  Send,
  Paperclip,
  Search,
  FileText,
  MessageSquare,
} from "lucide-react";
import { MonoLabel } from "@/components/ui";

interface Message {
  role: "user" | "agent";
  content: string;
  sources?: string[];
}

const SUGGESTIONS = [
  {
    text: "What did I commit to in yesterday's meetings?",
    icon: MessageSquare,
  },
  {
    text: "Summarize unread emails from this week",
    icon: Mail,
  },
  {
    text: "What's on my calendar tomorrow?",
    icon: Calendar,
  },
  {
    text: "Find the contract draft from Acme",
    icon: FileText,
  },
];

export default function AgentPage() {
  const { isDarkMode } = useTheme();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputVal, setInputVal] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const bgOuter = isDarkMode ? "#111317" : "#F3ECE3";
  const bgCard = isDarkMode ? "#1E1F23" : "#FFFFFF";
  const borderCard = isDarkMode ? "#2A2F37" : "#E8DCCB";
  const textPrimary = isDarkMode ? "#F3F4F6" : "#2D2B26";
  const textMuted = isDarkMode ? "#9AA3AE" : "#615E56";

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isThinking]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      role: "user",
      content: text.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputVal("");
    setIsThinking(true);

    setTimeout(() => {
      const q = text.toLowerCase();
      let responseContent = "";
      let responseSources: string[] = [];

      if (q.includes("commit") || q.includes("meeting") || q.includes("yesterday")) {
        responseContent = "Based on your Zoom meeting transcripts from yesterday with Adrian and the Acme Corp team, you committed to:\n\n1. Finalizing the dashboard styling guides and hairline borders design today.\n2. Sending over the integration schema definitions for review by Friday.";
        responseSources = ["Zoom · Adrian Sync", "Slack · Adrian Chat"];
      } else if (q.includes("email") || q.includes("unread") || q.includes("week")) {
        responseContent = "You have 5 unread high-priority emails from this week:\n\n1. Sarah from Acme Corp requesting a follow-up on integration pricing.\n2. GitHub alert regarding approval on the latest repository pull request.\n3. HubSpot notification about two new enterprise dashboard leads.";
        responseSources = ["Gmail · Inbound Sales", "HubSpot · Lead Alerts"];
      } else if (q.includes("calendar") || q.includes("tomorrow")) {
        responseContent = "Your calendar for tomorrow shows 2 events:\n\n1. 10:00 AM — Product Roadmap review with the design team.\n2. 2:30 PM — Acme Corp contract sync meeting with Adrian.";
        responseSources = ["Google Calendar · Personal"];
      } else if (q.includes("contract") || q.includes("acme") || q.includes("draft")) {
        responseContent = "I found a draft contract for Acme Corp in your shared Notion space. The document is under 'Draft Contracts v2' and has pending comments from Adrian regarding payment terms and API rate limits.";
        responseSources = ["Notion · Acme Contract v2"];
      } else {
        responseContent = "I have searched your connected email, calendar, and documents. I didn't find any explicit matches for that topic in your recent sync logs, but I will continue monitoring incoming files and notifications to build more context.";
        responseSources = ["Engram Engine"];
      }

      const agentMessage: Message = {
        role: "agent",
        content: responseContent,
        sources: responseSources,
      };

      setMessages((prev) => [...prev, agentMessage]);
      setIsThinking(false);
    }, 1200);
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSend(suggestion);
  };

  return (
    <div
      className="flex flex-col h-screen w-full transition-colors duration-300 relative"
      style={{ backgroundColor: bgOuter, color: textPrimary }}
    >
      {/* Header bar */}
      <div className="p-6 md:p-8 pb-5 border-b shrink-0" style={{ borderColor: borderCard }}>
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#F59E0B]/10 border border-[#F59E0B]/25 text-[#F59E0B] text-xs font-semibold mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] animate-pulse" />
          <span>Agent Online — Connected to your memory</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight">Ask Engram anything.</h1>
        <p className="mt-1 text-sm" style={{ color: textMuted }}>
          Your agent has context from every email, meeting, and document you&apos;ve connected.
        </p>
      </div>

      {/* Main chat area */}
      <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 custom-scrollbar flex flex-col">
        {messages.length === 0 ? (
          /* EMPTY STATE */
          <div className="max-w-2xl mx-auto w-full mt-4 md:mt-8 mb-auto px-4 animate-fade-in">
            <div
              className="rounded-2xl border p-8 md:p-12 text-center flex flex-col items-center shadow-lg relative overflow-hidden"
              style={{
                backgroundColor: bgCard,
                borderColor: borderCard,
              }}
            >
              {/* Soft radial glow background behind bot icon */}
              <div className="relative mb-6 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-[#F59E0B]/10 blur-xl scale-[1.8] animate-pulse" />
                <div 
                  className="absolute inset-0 rounded-full border border-[#F59E0B]/30 animate-ping opacity-75"
                  style={{ animationDuration: "3s" }}
                />
                <div
                  className="relative flex h-16 w-16 items-center justify-center rounded-2xl border bg-[#F59E0B]/10 flex-shrink-0"
                  style={{ borderColor: "#F59E0B" }}
                >
                  <Bot size={28} style={{ color: "#F59E0B" }} />
                </div>
              </div>

              {/* Eyebrow label instead of full stacked headline */}
              <div className="mb-2">
                <MonoLabel>Query Engine Context</MonoLabel>
              </div>
              <p className="text-xs max-w-sm mt-1 mb-8" style={{ color: textMuted }}>
                Select a suggestion below or write a custom message to query your knowledge base.
              </p>

              {/* Suggestions 2x2 Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                {SUGGESTIONS.map((suggestion) => {
                  const Icon = suggestion.icon;
                  return (
                    <button
                      key={suggestion.text}
                      onClick={() => handleSuggestionClick(suggestion.text)}
                      className="p-4 text-left rounded-xl border text-xs font-medium cursor-pointer transition-all duration-[250ms] flex items-start gap-3 hover:-translate-y-0.5 hover:shadow-md"
                      style={{
                        backgroundColor: isDarkMode ? "#17181C" : "#FBF9F6",
                        borderColor: borderCard,
                        color: textPrimary,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = "#F59E0B";
                        e.currentTarget.style.backgroundColor = isDarkMode ? "#252629" : "#F7F5F0";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = borderCard;
                        e.currentTarget.style.backgroundColor = isDarkMode ? "#17181C" : "#FBF9F6";
                      }}
                    >
                      <div className="p-2 rounded-lg bg-[#F59E0B]/10 text-[#F59E0B] border border-[#F59E0B]/20 shrink-0">
                        <Icon size={16} />
                      </div>
                      <div className="flex-1 mt-1 font-medium leading-relaxed">
                        {suggestion.text}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          /* CONVERSATION THREAD */
          <div className="space-y-6 max-w-4xl mx-auto w-full flex-1">
            {messages.map((message, index) => {
              if (message.role === "user") {
                return (
                  <div key={index} className="flex justify-end w-full">
                    <div
                      className="max-w-[75%] rounded-xl px-4 py-3 text-[13.5px] leading-relaxed border"
                      style={{
                        backgroundColor: isDarkMode ? "#1E1F23" : "#FFFFFF",
                        borderColor: borderCard,
                        color: textPrimary,
                      }}
                    >
                      {message.content}
                    </div>
                  </div>
                );
              } else {
                return (
                  <div key={index} className="flex items-start gap-3 w-full">
                    <div className="w-8 h-8 rounded-lg bg-[#F59E0B]/10 border border-[#F59E0B]/25 flex items-center justify-center shrink-0 text-[#F59E0B] mt-1">
                      <Bot size={16} />
                    </div>
                    <div
                      className="rounded-xl border p-5 flex-1 max-w-[85%]"
                      style={{
                        backgroundColor: bgCard,
                        borderColor: borderCard,
                      }}
                    >
                      <div className="text-[13.5px] leading-relaxed whitespace-pre-line" style={{ color: textPrimary }}>
                        {message.content}
                      </div>

                      {message.sources && message.sources.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-[#2A2F37]/30">
                          {message.sources.map((source, idx) => {
                            let Icon = BookOpen;
                            if (source.toLowerCase().includes("gmail") || source.toLowerCase().includes("email")) {
                              Icon = Mail;
                            } else if (source.toLowerCase().includes("calendar")) {
                              Icon = Calendar;
                            } else if (source.toLowerCase().includes("zoom")) {
                              Icon = Video;
                            }
                            return (
                              <div
                                key={idx}
                                className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-[#F59E0B]/5 border border-[#F59E0B]/15 text-[#F59E0B] text-[11px] font-medium"
                              >
                                <Icon size={10} />
                                <span>{source}</span>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                );
              }
            })}

            {isThinking && (
              <div className="flex items-start gap-3 w-full">
                <div className="w-8 h-8 rounded-lg bg-[#F59E0B]/10 border border-[#F59E0B]/25 flex items-center justify-center shrink-0 text-[#F59E0B] mt-1">
                  <Bot size={16} />
                </div>
                <div
                  className="rounded-xl border p-4 flex items-center gap-1.5"
                  style={{
                    backgroundColor: bgCard,
                    borderColor: borderCard,
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input bar fixed at the bottom */}
      <div className="p-6 md:p-8 pt-4 border-t shrink-0" style={{ borderColor: borderCard }}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend(inputVal);
          }}
          className="relative flex items-center w-full max-w-4xl mx-auto gap-3"
        >
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              className="p-2.5 rounded-lg border hover:bg-opacity-10 transition-colors flex items-center justify-center cursor-pointer"
              style={{
                borderColor: borderCard,
                backgroundColor: bgCard,
                color: textMuted,
              }}
              title="Attach file"
            >
              <Paperclip size={15} />
            </button>
            <button
              type="button"
              className="p-2.5 rounded-lg border hover:bg-opacity-10 transition-colors flex items-center justify-center cursor-pointer"
              style={{
                borderColor: borderCard,
                backgroundColor: bgCard,
                color: textMuted,
              }}
              title="Search memory logs"
            >
              <Search size={15} />
            </button>
          </div>

          <div className="relative flex-1">
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Ask about your emails, meetings, or memory..."
              className="w-full pl-4 pr-12 py-3 rounded-xl border text-xs focus:outline-none focus:border-[#F59E0B] transition-all"
              style={{
                backgroundColor: bgCard,
                borderColor: borderCard,
                color: textPrimary,
              }}
              disabled={isThinking}
            />
            <button
              type="submit"
              disabled={isThinking || !inputVal.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg transition-all flex items-center justify-center cursor-pointer disabled:opacity-40"
              style={{
                backgroundColor: "#F59E0B",
                color: "#111317",
              }}
            >
              <Send size={13} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
