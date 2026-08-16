import type { Competition, LeagueTableEntry } from "@/types";

export type TournamentFixtureStatus = "upcoming" | "played";

export interface TournamentFixture {
  id: string;
  competitionId: string;
  date: string;
  time: string;
  venue?: string;
  homeTeam: string;
  awayTeam: string;
  status: TournamentFixtureStatus;
  homeScore?: number;
  awayScore?: number;
}

export interface TournamentState {
  competitionId: string;
  competition: Competition;
  teams: string[];
  baseTable: LeagueTableEntry[];
  fixtures: TournamentFixture[];
  lastUpdated: string;
}

export interface TournamentSnapshot {
  competition: Competition;
  standings: LeagueTableEntry[];
  fixtures: TournamentFixture[];
  upcoming: TournamentFixture[];
  played: TournamentFixture[];
  summary: { matchesPlayed: number; wins: number; draws: number; losses: number; goalsScored: number; goalsConceded: number };
  lastUpdated: string;
}
