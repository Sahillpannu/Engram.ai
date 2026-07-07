import { Video } from "lucide-react";

export default function ZoomPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 animate-fade-in">
      <div className="w-12 h-12 rounded-full border border-line bg-card flex items-center justify-center text-accent mb-4">
        <Video size={20} />
      </div>
      <h2 className="text-xl font-medium text-ink">Zoom Meetings</h2>
      <p className="text-sm text-muted mt-2 max-w-sm">
        Review recorded meetings and auto-transcribe conversation context into memories.
      </p>
    </div>
  );
}
