import { Workflow } from "lucide-react";

export default function AutomationsPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 animate-fade-in">
      <div className="w-12 h-12 rounded-full border border-line bg-card flex items-center justify-center text-accent mb-4">
        <Workflow size={20} />
      </div>
      <h2 className="text-xl font-medium text-ink">Automations</h2>
      <p className="text-sm text-muted mt-2 max-w-sm">
        Set up rule-based actions, memory alerts, and integrations sync workflows.
      </p>
    </div>
  );
}
