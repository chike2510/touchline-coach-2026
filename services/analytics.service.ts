import { players } from "@/lib/mock";

export interface TeamAnalyticsOverview {
  winPct: number; goalsFor: number; goalsAgainst: number; xgFor: number; xgAgainst: number; pointsPerGame: number;
  wins: number; draws: number; losses: number; matches: number;
  performanceOverTime: { month: string; points: number; xg: number }[];
  attacking: { goalsPer90: number; shotsPer90: number; shotsOnTargetPct: number; conversionRate: number; bigChancesPer90: number; touchesInBoxPer90: number; crossCompletionPct: number };
  defending: { concededPer90: number; shotsAgainstPer90: number; shotsOnTargetAgainstPct: number; cleanSheetPct: number; tacklesPer90: number; interceptionsPer90: number };
  possessionPct: number; passAccuracyPct: number; passesPer90: number; progressivePassesPer90: number;
  attackingZones: { left: number; centre: number; right: number };
  goalTimes: { band: string; goals: number }[];
  playerImpact: { playerId: string; name: string; position: string; score: number }[];
  trends: { label: string; value: string; changePct: number; positive: boolean }[];
}

export function getTeamAnalytics(): TeamAnalyticsOverview {
  return {
    winPct: 68, goalsFor: 61, goalsAgainst: 29, xgFor: 2.31, xgAgainst: 0.89, pointsPerGame: 2.11,
    wins: 22, draws: 7, losses: 3, matches: 32,
    performanceOverTime: [
      { month: "Jul", points: 3, xg: 2.1 }, { month: "Aug", points: 12, xg: 2.0 }, { month: "Sep", points: 22, xg: 2.2 },
      { month: "Oct", points: 31, xg: 2.3 }, { month: "Nov", points: 40, xg: 2.1 }, { month: "Dec", points: 49, xg: 2.4 },
      { month: "Jan", points: 55, xg: 2.2 }, { month: "Feb", points: 61, xg: 2.3 }, { month: "Mar", points: 66, xg: 2.5 },
      { month: "Apr", points: 71, xg: 2.3 }, { month: "May", points: 73, xg: 2.35 },
    ],
    attacking: { goalsPer90: 2.04, shotsPer90: 14.2, shotsOnTargetPct: 41, conversionRate: 14.3, bigChancesPer90: 2.81, touchesInBoxPer90: 28.7, crossCompletionPct: 27 },
    defending: { concededPer90: 0.96, shotsAgainstPer90: 9.1, shotsOnTargetAgainstPct: 31, cleanSheetPct: 44, tacklesPer90: 16.7, interceptionsPer90: 9.3 },
    possessionPct: 58, passAccuracyPct: 86, passesPer90: 542, progressivePassesPer90: 64.3,
    attackingZones: { left: 24, centre: 46, right: 30 },
    goalTimes: [
      { band: "0-15", goals: 4 }, { band: "16-30", goals: 12 }, { band: "31-45+", goals: 9 },
      { band: "46-60", goals: 8 }, { band: "61-75", goals: 7 }, { band: "76-90+", goals: 13 },
    ],
    playerImpact: [
      { playerId: "p-fernandes", name: "Bruno Fernandes", position: "AM", score: 86 },
      { playerId: "p-hojlund", name: "Rasmus Højlund", position: "ST", score: 78 },
      { playerId: "p-mainoo", name: "Kobbie Mainoo", position: "CM", score: 75 },
      { playerId: "p-martinez", name: "Lisandro Martínez", position: "CB", score: 72 },
      { playerId: "p-dalot", name: "Diogo Dalot", position: "RB", score: 70 },
    ],
    trends: [
      { label: "Goals Scored", value: "2.2", changePct: 15, positive: true },
      { label: "xG", value: "2.35", changePct: 8, positive: true },
      { label: "Goals Conceded", value: "0.8", changePct: -33, positive: true },
      { label: "xGA", value: "0.92", changePct: -21, positive: true },
      { label: "Possession", value: "59%", changePct: 5, positive: true },
      { label: "Pass Accuracy", value: "87%", changePct: 3, positive: true },
    ],
  };
}

export function getPlayerCount() {
  return players.length;
}
