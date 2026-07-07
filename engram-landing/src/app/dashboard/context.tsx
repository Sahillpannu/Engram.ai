"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface DashboardContextType {
  connectedIds: string[];
  connect: (id: string) => void;
  disconnect: (id: string) => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [connectedIds, setConnectedIds] = useState<string[]>(["Gmail", "Google Calendar"]);

  const connect = (id: string) => {
    setConnectedIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  const disconnect = (id: string) => {
    setConnectedIds((prev) => prev.filter((item) => item !== id));
  };

  return (
    <DashboardContext.Provider value={{ connectedIds, connect, disconnect }}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
}
