export interface EmailDraftAction {
  to: string;
  subject: string;
  body: string;
}

export interface CalendarEventAction {
  summary: string;
  startTime: string;
  endTime: string;
  location?: string;
  attendees?: string[];
}

export interface ZoomMeetingAction {
  topic: string;
  startTime: string;
  duration: number;
  agenda?: string;
}
