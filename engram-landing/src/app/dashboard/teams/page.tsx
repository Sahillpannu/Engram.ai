import { Users } from "lucide-react";

export default function TeamsPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 animate-fade-in">
      <div className="w-12 h-12 rounded-full border border-line bg-card flex items-center justify-center text-accent mb-4">
        <Users size={20} />
      </div>
      <h2 className="text-xl font-medium text-ink">Team Management</h2>
      <p className="text-sm text-muted mt-2 max-w-sm">
        Manage team sharing, roles, and collaborative memory permissions.
      </p>
    </div>
  );
}
