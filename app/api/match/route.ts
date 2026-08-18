import { NextResponse } from "next/server";
import { getClub, setMentality, simulateTick, type Mentality } from "@/lib/game";
export async function GET() { return NextResponse.json({ club: getClub() }); }
export async function POST(request: Request) { const body = await request.json().catch(() => ({})) as { action?: "tick" | "reset"; mentality?: Mentality }; if (body.mentality) setMentality(body.mentality); if (body.action === "tick") simulateTick(); if (body.action === "reset") { const club = getClub(); club.match = { minute: 0, homeGoals: 0, awayGoals: 0, phase: "idle", events: [] }; } return NextResponse.json({ club: getClub() }); }
