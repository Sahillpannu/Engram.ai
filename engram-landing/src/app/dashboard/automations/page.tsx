import React from "react";
import { Workflow } from "lucide-react";

export default function AutomationsPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[75vh] w-full bg-[#111317] text-center px-4 animate-fade-in">
      <div className="text-[#9AA3AE] opacity-40 mb-4 flex items-center justify-center">
        <Workflow size={40} />
      </div>
      <p className="text-[14px] text-[#9AA3AE] font-medium tracking-wide">
        Coming soon
      </p>
    </div>
  );
}
