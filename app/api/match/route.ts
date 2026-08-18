import { NextResponse } from "next/server";
import { getClub, resetMatch, saveFormation, setMentality, simulateTick, type FormationPlayer, type Mentality } from "@/lib/game";
export async function GET() { return NextResponse.json({ club: getClub() }); }
export async function POST(request: Request) { const body = await request.json().catch(() => ({})) as { action?: "tick" | "reset" | "formation"; mentality?: Mentality; formation?: FormationPlayer[] }; if (body.mentality) setMentality(body.mentality); if (body.action === "tick") simulateTick(); if (body.action === "reset") resetMatch(); if (body.action === "formation" && body.formation) saveFormation(body.formation); return NextResponse.json({ club: getClub() }); }
