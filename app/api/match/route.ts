import { NextResponse } from "next/server";
import { advanceLiveMatch } from "@/lib/match/simulation";
import { getMatchState, getSquadState, saveMatchState } from "@/lib/server/state";
import type { LiveMatchState, MatchTacticalState } from "@/types";

export async function GET() { return NextResponse.json({ match: getMatchState() }); }

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({})) as { action?: "tick" | "reset" };
  const current = getMatchState();
  if (body.action === "reset") return NextResponse.json({ match: saveMatchState({ ...current, minute: 0, status: "upcoming", homeScore: 0, awayScore: 0, events: [], momentum: [0], lastEvent: undefined, substitutions: [], possession: 50, xg: { home: 0, away: 0 }, stats: current.stats.map((stat) => ({ ...stat, home: stat.label === "Possession" ? 50 : stat.label === "Pass Accuracy" ? "—" : 0, away: stat.label === "Possession" ? 50 : stat.label === "Pass Accuracy" ? "—" : 0 })) }) });
  return NextResponse.json({ match: saveMatchState(advanceLiveMatch(current)) });
}

export async function PATCH(request: Request) {
  const body = await request.json() as { tacticalState?: Partial<MatchTacticalState>; substitution?: { playerOffId: string; playerOnId: string } };
  const current = getMatchState();
  let next: LiveMatchState = { ...current, tacticalState: { ...current.tacticalState, ...(body.tacticalState ?? {}) } };
  next.homeFormation = next.tacticalState.formation;
  if (body.substitution) {
    const squad = getSquadState();
    const playerOff = squad.find((player) => player.id === body.substitution?.playerOffId);
    const playerOn = squad.find((player) => player.id === body.substitution?.playerOnId);
    if (!playerOff || !playerOn || playerOff.id === playerOn.id) return NextResponse.json({ error: "Both substitution players must exist and be different." }, { status: 400 });
    next = { ...next, substitutions: [...next.substitutions, { minute: next.minute, playerOffId: playerOff.id, playerOnId: playerOn.id, playerOffName: playerOff.name, playerOnName: playerOn.name }], events: [...next.events, { minute: next.minute, type: "sub", team: "home", player: playerOn.name, detail: `${playerOn.name} replaces ${playerOff.name}` }], homeLineup: next.homeLineup.map((player) => player.id === playerOff.id ? { ...player, id: playerOn.id, name: playerOn.name, number: playerOn.number, position: playerOn.position, rating: 6.5 } : player) };
  }
  return NextResponse.json({ match: saveMatchState(next) });
}
