import { upcomingFixtures, importantDates, calendarEvents } from "@/lib/mock";
import type { UpcomingFixture, ImportantDate, CalendarEvent } from "@/types";

export function getUpcomingFixtures(): UpcomingFixture[] {
  return upcomingFixtures;
}

export function getNextFixture(): UpcomingFixture | undefined {
  return upcomingFixtures[0];
}

export function getImportantDates(): ImportantDate[] {
  return importantDates;
}

export function getCalendarEvents(date?: string): CalendarEvent[] {
  if (!date) return calendarEvents;
  return calendarEvents.filter((e) => e.date === date);
}
