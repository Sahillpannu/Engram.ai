import { Sparkles } from "lucide-react";

export default function DailyBriefPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 animate-fade-in">
      <div className="w-12 h-12 rounded-full border border-line bg-card flex items-center justify-center text-accent mb-4">
        <Sparkles size={20} />
      </div>
      <h2 className="text-xl font-medium text-ink">Daily Brief</h2>
      <p className="text-sm text-muted mt-2 max-w-sm">
        Your daily personalized summary and action items are being generated. This workspace tool will be available soon.
      </p>
    </div>
  );
}
