import type { ClubOverview, LiveMatchState, MatchEvent, MatchStatLine, MatchTacticalState, UpcomingFixture, Player, TacticPreset } from "@/types";

function lineupFromTactic(tactic: TacticPreset, squad: Player[]) {
  return tactic.slots.filter((slot) => slot.playerId).map((slot) => { const player = squad.find((candidate) => candidate.id === slot.playerId); return player ? { id: player.id, name: player.name, number: player.number, position: player.position, rating: 6.5, x: slot.x, y: slot.y } : null; }).filter(Boolean) as LiveMatchState["homeLineup"];
}

function initialStats(): MatchStatLine[] { return ["Possession", "Shots", "Shots on Target", "xG", "Corners", "Fouls", "Passes", "Pass Accuracy"].map((label) => ({ label, home: label === "Possession" ? 50 : label === "Pass Accuracy" ? "—" : 0, away: label === "Possession" ? 50 : label === "Pass Accuracy" ? "—" : 0 })); }

export function createLiveMatchState(club: ClubOverview, fixture: UpcomingFixture | undefined, tactic: TacticPreset, squad: Player[]): LiveMatchState {
  const homeTeam = fixture?.isHome === false ? fixture.opponent : club.name;
  const awayTeam = fixture?.isHome === false ? club.name : fixture?.opponent ?? "Opponent pending";
  const formation = tactic.formation || "Unassigned";
  const tacticalState: MatchTacticalState = { formation, mentality: tactic.mentality as MatchTacticalState["mentality"], tempo: "Normal", pressing: "Mid Block", width: "Balanced", attackingFocus: "Mixed" };
  return { id: `match-${fixture?.date ?? "pending"}-${homeTeam}-${awayTeam}`, competition: fixture?.competition ?? club.league, venue: club.stadium.name, attendance: 0, homeTeam, awayTeam, homeScore: 0, awayScore: 0, minute: 0, status: "upcoming", homeFormation: formation, awayFormation: "Unassigned", stats: initialStats(), events: [], momentum: [0], homeLineup: lineupFromTactic(tactic, squad), awayLineup: [], tacticalState, substitutions: [], possession: 50, xg: { home: 0, away: 0 } };
}

function updateStat(stats: MatchStatLine[], label: string, home: number | string, away: number | string) { return stats.map((stat) => stat.label === label ? { ...stat, home, away } : stat); }

export function advanceLiveMatch(match: LiveMatchState): LiveMatchState {
  if (match.status === "finished") return match;
  const minute = Math.min(90, match.minute + 1);
  const isHalftime = minute === 45;
  const isFulltime = minute >= 90;
  const tacticalBias = match.tacticalState.mentality === "Attacking" || match.tacticalState.mentality === "Very Attacking" ? 8 : match.tacticalState.mentality === "Defensive" || match.tacticalState.mentality === "Very Defensive" ? -8 : 0;
  const pressureBias = match.tacticalState.pressing === "High Press" || match.tacticalState.pressing === "Counter-Press" ? 5 : 0;
  const nextPossession = Math.max(35, Math.min(65, Math.round(match.possession + ((tacticalBias + pressureBias) * 0.04))));
  const momentumValue = Math.max(-100, Math.min(100, Math.round((nextPossession - 50) * 2 + (tacticalBias + pressureBias))));
  const events = [...match.events];
  let lastEvent: MatchEvent | undefined = match.lastEvent;
  const xgHome = Number((match.xg.home + (nextPossession >= 50 ? 0.015 : 0)).toFixed(2));
  const xgAway = Number((match.xg.away + (nextPossession < 50 ? 0.015 : 0)).toFixed(2));
  const attackingTeam: "home" | "away" = nextPossession >= 50 ? "home" : "away";
  const attackingPlayer = attackingTeam === "home" ? match.homeLineup.find((player) => ["ST", "LW", "RW", "AM"].includes(player.position)) : undefined;
  if (minute > 0 && minute % 12 === 0) { lastEvent = { minute, type: "chance", team: attackingTeam, player: attackingPlayer?.name, detail: `${attackingTeam === "home" ? "Home" : "Away"} attack creates a chance` }; events.push(lastEvent); }
  let homeScore = match.homeScore;
  let awayScore = match.awayScore;
  if (minute > 0 && minute % 30 === 0 && (attackingTeam === "home" ? xgHome : xgAway) >= 0.03) { const goalEvent: MatchEvent = { minute, type: "goal", team: attackingTeam, player: attackingPlayer?.name, detail: "Goal from a sustained attack" }; events.push(goalEvent); lastEvent = goalEvent; if (attackingTeam === "home") homeScore += 1; else awayScore += 1; }
  if (isHalftime) { lastEvent = { minute, type: "halftime", team: "home", detail: "Half-time" }; events.push(lastEvent); }
  if (isFulltime) { lastEvent = { minute, type: "fulltime", team: "home", detail: "Full-time" }; events.push(lastEvent); }
  const shotsHome = Number(match.stats.find((stat) => stat.label === "Shots")?.home ?? 0) + (nextPossession >= 50 ? 1 : 0);
  const shotsAway = Number(match.stats.find((stat) => stat.label === "Shots")?.away ?? 0) + (nextPossession < 50 ? 1 : 0);
  return { ...match, minute, status: isFulltime ? "finished" : minute > 0 ? "live" : "upcoming", lastEvent, events, momentum: [...match.momentum, momentumValue], possession: nextPossession, xg: { home: xgHome, away: xgAway }, homeScore, awayScore, stats: updateStat(updateStat(updateStat(match.stats, "Possession", `${nextPossession}%`, `${100 - nextPossession}%`), "Shots", shotsHome, shotsAway), "xG", xgHome, xgAway) };
}
