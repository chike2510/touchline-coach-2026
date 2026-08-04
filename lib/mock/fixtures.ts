import type { UpcomingFixture, ImportantDate, CalendarEvent } from "@/types";

export const upcomingFixtures: UpcomingFixture[] = [
  { opponent: "West Ham United", competition: "Premier League", date: "11 May", time: "15:00", isHome: true },
  { opponent: "Aston Villa", competition: "Premier League", date: "3 May", time: "16:30", isHome: false },
  { opponent: "Athletic Club", competition: "Europa League SF", date: "7 May", time: "20:00", isHome: false },
];

export const importantDates: ImportantDate[] = [
  { label: "Transfer Window Opens", date: "1 Jun 2026", icon: "transfer-open" },
  { label: "Transfer Deadline", date: "1 Sep 2026", icon: "transfer-close" },
  { label: "Season Ends", date: "24 May 2026", icon: "season-end" },
];

export const calendarEvents: CalendarEvent[] = [
  { id: "e1", date: "2026-04-24", time: "20:00", title: "Manchester United vs Tottenham Hotspur", subtitle: "Premier League", location: "Old Trafford", type: "Match", isHome: true },
  { id: "e2", date: "2026-04-24", time: "10:30", title: "Team Training", subtitle: "Tactical: Attacking Movement", location: "Carrington Training Ground", type: "Training" },
  { id: "e3", date: "2026-04-24", time: "15:00", title: "Press Conference", subtitle: "Pre-match press conference", location: "Media Room", type: "Event" },
  { id: "e4", date: "2026-04-25", time: "11:00", title: "Recovery Session", subtitle: "Recovery", location: "Carrington Training Ground", type: "Training" },
  { id: "e5", date: "2026-04-25", time: "14:00", title: "Board Meeting", subtitle: "Monthly Board Update", location: "Board Room", type: "Other" },
  { id: "e6", date: "2026-04-26", time: "10:30", title: "Set Piece Practice", subtitle: "Defending Set Pieces", location: "Carrington Training Ground", type: "Training" },
  { id: "e7", date: "2026-04-27", time: "10:30", title: "Team Training", subtitle: "Possession", location: "Carrington Training Ground", type: "Training" },
  { id: "e8", date: "2026-04-27", time: "18:00", title: "Premier League Awards", subtitle: "Monthly Awards Ceremony", location: "London", type: "Event" },
];
