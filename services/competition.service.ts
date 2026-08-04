import { competitions, competitionsSummary, premierLeagueTable } from "@/lib/mock";
import type { Competition, CompetitionsSummary, LeagueTableEntry } from "@/types";

export function getCompetitions(): Competition[] {
  return competitions;
}

export function getCompetitionById(id: string): Competition | undefined {
  return competitions.find((c) => c.id === id);
}

export function getLeagueTable(): LeagueTableEntry[] {
  return premierLeagueTable ?? [];
}

export function getCompetitionsSummary(): CompetitionsSummary {
  return competitionsSummary;
}
