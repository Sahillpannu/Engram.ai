import { Settings } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 animate-fade-in">
      <div className="w-12 h-12 rounded-full border border-line bg-card flex items-center justify-center text-accent mb-4">
        <Settings size={20} />
      </div>
      <h2 className="text-xl font-medium text-ink">Settings</h2>
      <p className="text-sm text-muted mt-2 max-w-sm">
        Configure billing settings, manage API tokens, and control global workspace configurations.
      </p>
    </div>
  );
}
