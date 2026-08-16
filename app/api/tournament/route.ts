import { NextResponse } from "next/server";
import { getTournamentSnapshot, resetTournament, simulateNextFixture } from "@/lib/server/tournament-state";

function competitionId(request: Request) { return new URL(request.url).searchParams.get("competition") ?? "prem"; }

export function GET(request: Request) { return NextResponse.json({ snapshot: getTournamentSnapshot(competitionId(request)) }); }

export async function POST(request: Request) { const body = await request.json().catch(() => ({})) as { action?: "simulate" | "reset"; competitionId?: string }; const id = body.competitionId ?? "prem"; return NextResponse.json({ snapshot: body.action === "reset" ? resetTournament(id) : simulateNextFixture(id) }); }
