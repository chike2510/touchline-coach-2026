export type CalendarEventType = "Match" | "Training" | "Event" | "Other" | "Travel" | "DayOff";

export interface CalendarEvent {
  id: string;
  date: string;
  time: string;
  title: string;
  subtitle?: string;
  location?: string;
  type: CalendarEventType;
  isHome?: boolean;
  opponentCrest?: string;
}

export interface UpcomingFixture {
  opponent: string;
  competition: string;
  date: string;
  time: string;
  isHome: boolean;
}

export interface ImportantDate {
  label: string;
  date: string;
  icon: "transfer-open" | "transfer-close" | "season-end";
}
