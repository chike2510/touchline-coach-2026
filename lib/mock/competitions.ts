import type { Competition, CompetitionsSummary } from "@/types";

export const premierLeagueTable: Competition["table"] = [
  { position: 1, club: "Manchester City", played: 36, won: 25, drawn: 9, lost: 2, gf: 78, ga: 32, gd: 46, points: 84, form: ["W", "W", "D", "W", "W"] },
  { position: 2, club: "Arsenal", played: 36, won: 22, drawn: 8, lost: 6, gf: 71, ga: 39, gd: 32, points: 74, form: ["W", "W", "L", "W", "W"] },
  { position: 3, club: "Manchester United", played: 36, won: 25, drawn: 7, lost: 4, gf: 68, ga: 30, gd: 38, points: 82, form: ["W", "D", "W", "L", "W"], highlight: true },
  { position: 4, club: "Newcastle Utd", played: 36, won: 17, drawn: 8, lost: 11, gf: 58, ga: 41, gd: 17, points: 59, form: ["W", "D", "L", "W", "L"] },
  { position: 5, club: "Tottenham", played: 36, won: 15, drawn: 8, lost: 13, gf: 55, ga: 47, gd: 8, points: 53, form: ["L", "W", "D", "L", "W"] },
  { position: 6, club: "Aston Villa", played: 36, won: 16, drawn: 8, lost: 12, gf: 52, ga: 46, gd: 6, points: 56, form: ["D", "W", "D", "L", "W"] },
  { position: 7, club: "Liverpool", played: 36, won: 21, drawn: 7, lost: 8, gf: 64, ga: 37, gd: 27, points: 70, form: ["W", "D", "L", "W", "W"] },
  { position: 8, club: "Chelsea", played: 36, won: 14, drawn: 8, lost: 14, gf: 48, ga: 44, gd: 4, points: 50, form: ["D", "W", "L", "W", "L"] },
];

export const competitions: Competition[] = [
  {
    id: "prem", name: "Premier League", shortName: "Prem", country: "England", reputationStars: 5,
    status: "In Progress", table: premierLeagueTable,
    nextMatch: { homeTeam: "Manchester United", awayTeam: "West Ham United", date: "Sun 11 May 2026", time: "16:30", venue: "Old Trafford" },
    topScorers: [{ name: "Bruno Fernandes", goals: 16 }],
  },
  {
    id: "ucl", name: "UEFA Champions League", shortName: "UCL", country: "Europe", reputationStars: 5,
    status: "Semi Final", stage: "Semi Final", round: "1st Leg",
    progressResult: { homeTeam: "Manchester United", awayTeam: "FC Barcelona", homeScore: 2, awayScore: 1, date: "Wed 7 May 2026", venue: "Old Trafford" },
    topScorers: [{ name: "R. Højlund", goals: 7 }, { name: "B. Fernandes", goals: 5 }, { name: "Alejandro Garnacho", goals: 4 }],
  },
  {
    id: "facup", name: "Emirates FA Cup", shortName: "FA Cup", country: "England", reputationStars: 4,
    status: "Final", stage: "Final",
    progressResult: { homeTeam: "Manchester United", awayTeam: "Manchester City", homeScore: 3, awayScore: 0, completed: true, date: "Sat 26 Apr 2026", venue: "Wembley Stadium" },
    topScorers: [{ name: "B. Fernandes", goals: 4 }, { name: "M. Rashford", goals: 2 }, { name: "A. Garnacho", goals: 2 }],
  },
  {
    id: "carabao", name: "Carabao Cup", shortName: "Carabao", country: "England", reputationStars: 3,
    status: "Won", stage: "Won",
    progressResult: { homeTeam: "Manchester United", awayTeam: "Newcastle Utd", homeScore: 2, awayScore: 1, won: true, date: "Sun 16 Mar 2026", venue: "Wembley Stadium" },
    topScorers: [{ name: "Casemiro", goals: 2 }, { name: "A. Garnacho", goals: 2 }, { name: "B. Fernandes", goals: 1 }],
  },
  {
    id: "europa", name: "UEFA Europa League", shortName: "UEL", country: "Europe", reputationStars: 4,
    status: "Quarter Final", stage: "Quarter Final", round: "2nd Leg",
    progressResult: { homeTeam: "Olympiacos", awayTeam: "Manchester United", homeScore: 1, awayScore: 2, aggregate: "2-5", date: "Thu 17 Apr 2026", venue: "Georgios Karaiskakis Stadium" },
  },
  {
    id: "supercup", name: "UEFA Super Cup", shortName: "Super Cup", country: "Europe", reputationStars: 3,
    status: "Not Entered", qualificationNote: "Winners of UEFA Champions League automatically qualify.",
  },
  {
    id: "cwc", name: "FIFA Club World Cup", shortName: "Club World Cup", country: "World", reputationStars: 5,
    status: "Not Entered", qualificationNote: "Qualify by winning the UEFA Champions League.",
  },
];

export const competitionsSummary: CompetitionsSummary = {
  competitionsEntered: 6, titlesWon: 2, matchesPlayed: 56, wins: 33, draws: 12, losses: 11,
  goalsScored: 108, goalsConceded: 56,
};
