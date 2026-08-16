import { competitionService } from "@/services";
import { clubService, fixtureService } from "@/services";
import type { Competition, LeagueTableEntry, TournamentFixture, TournamentSnapshot, TournamentState } from "@/types";

const globalTournament = globalThis as typeof globalThis & { __touchlineTournament?: Record<string, TournamentState> };
const dateTime = () => new Date().toISOString();

function makeState(competitionId: string): TournamentState {
  const competition = competitionService.getCompetitionById(competitionId);
  const club = clubService.getClubOverview();
  if (!competition) throw new Error("Competition not found.");
  const next = competition.nextMatch ?? (competitionId === "prem" ? (() => { const fixture = fixtureService.getNextFixture(); return fixture ? { homeTeam: fixture.isHome ? club.name : fixture.opponent, awayTeam: fixture.isHome ? fixture.opponent : club.name, date: fixture.date, time: fixture.time, venue: club.stadium.name } : undefined; })() : undefined);
  const fixtures: TournamentFixture[] = next ? [{ id: `${competitionId}-${next.date}-${next.homeTeam}-${next.awayTeam}`, competitionId, date: next.date, time: next.time, venue: next.venue, homeTeam: next.homeTeam, awayTeam: next.awayTeam, status: "upcoming" }] : [];
  const baseTable = competition.table ?? [];
  return { competitionId, competition, teams: baseTable.map((row) => row.club), baseTable, fixtures, lastUpdated: dateTime() };
}

function getState(competitionId: string) { if (!globalTournament.__touchlineTournament) globalTournament.__touchlineTournament = {}; if (!globalTournament.__touchlineTournament[competitionId]) globalTournament.__touchlineTournament[competitionId] = makeState(competitionId); return globalTournament.__touchlineTournament[competitionId]; }

function calculateStandings(state: TournamentState): LeagueTableEntry[] {
  const table = new Map<string, LeagueTableEntry>();
  for (const row of state.baseTable) table.set(row.club, { ...row, form: [...row.form] });
  for (const fixture of state.fixtures.filter((item) => item.status === "played")) {
    const home = table.get(fixture.homeTeam) ?? { position: 0, club: fixture.homeTeam, played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, gd: 0, points: 0, form: [] };
    const away = table.get(fixture.awayTeam) ?? { position: 0, club: fixture.awayTeam, played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, gd: 0, points: 0, form: [] };
    const homeScore = fixture.homeScore ?? 0; const awayScore = fixture.awayScore ?? 0;
    home.played += 1; away.played += 1; home.gf += homeScore; home.ga += awayScore; away.gf += awayScore; away.ga += homeScore;
    if (homeScore > awayScore) { home.won += 1; away.lost += 1; home.points += 3; home.form = ["W", ...home.form].slice(0, 5) as LeagueTableEntry["form"]; away.form = ["L", ...away.form].slice(0, 5) as LeagueTableEntry["form"]; }
    else if (homeScore < awayScore) { away.won += 1; home.lost += 1; away.points += 3; away.form = ["W", ...away.form].slice(0, 5) as LeagueTableEntry["form"]; home.form = ["L", ...home.form].slice(0, 5) as LeagueTableEntry["form"]; }
    else { home.drawn += 1; away.drawn += 1; home.points += 1; away.points += 1; home.form = ["D", ...home.form].slice(0, 5) as LeagueTableEntry["form"]; away.form = ["D", ...away.form].slice(0, 5) as LeagueTableEntry["form"]; }
    home.gd = home.gf - home.ga; away.gd = away.gf - away.ga; table.set(home.club, home); table.set(away.club, away);
  }
  const clubName = clubService.getClubOverview().name;
  return Array.from(table.values()).sort((a, b) => b.points - a.points || b.gd - a.gd || b.gf - a.gf || a.club.localeCompare(b.club)).map((row, index) => ({ ...row, position: index + 1, highlight: row.club === clubName }));
}

export function getTournamentSnapshot(competitionId = "prem"): TournamentSnapshot {
  const state = getState(competitionId);
  const standings = calculateStandings(state);
  const clubName = clubService.getClubOverview().name;
  const clubFixtures = state.fixtures.filter((fixture) => (fixture.homeTeam === clubName || fixture.awayTeam === clubName) && fixture.status === "played");
  const summary = clubFixtures.reduce((acc, fixture) => { const home = fixture.homeTeam === clubName; const gf = home ? fixture.homeScore ?? 0 : fixture.awayScore ?? 0; const ga = home ? fixture.awayScore ?? 0 : fixture.homeScore ?? 0; acc.matchesPlayed += 1; acc.goalsScored += gf; acc.goalsConceded += ga; if (gf > ga) acc.wins += 1; else if (gf === ga) acc.draws += 1; else acc.losses += 1; return acc; }, { matchesPlayed: 0, wins: 0, draws: 0, losses: 0, goalsScored: 0, goalsConceded: 0 });
  return { competition: state.competition, standings, fixtures: state.fixtures, upcoming: state.fixtures.filter((fixture) => fixture.status === "upcoming"), played: state.fixtures.filter((fixture) => fixture.status === "played"), summary, lastUpdated: state.lastUpdated };
}

export function simulateNextFixture(competitionId = "prem") {
  const state = getState(competitionId); const next = state.fixtures.find((fixture) => fixture.status === "upcoming"); if (!next) return getTournamentSnapshot(competitionId);
  const club = clubService.getClubOverview(); const home = next.homeTeam === club.name; const confidence = club.boardConfidence + club.squadMorale; const homeScore = home ? (confidence >= 160 ? 2 : confidence >= 130 ? 1 : 0) : (confidence >= 170 ? 1 : 0); const awayScore = home ? (confidence >= 170 ? 0 : 1) : (confidence >= 160 ? 1 : 0);
  next.status = "played"; next.homeScore = homeScore; next.awayScore = awayScore; state.lastUpdated = dateTime(); return getTournamentSnapshot(competitionId);
}

export function resetTournament(competitionId = "prem") { globalTournament.__touchlineTournament = { ...(globalTournament.__touchlineTournament ?? {}), [competitionId]: makeState(competitionId) }; return getTournamentSnapshot(competitionId); }
