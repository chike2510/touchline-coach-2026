import { NextResponse } from "next/server";
import { getClub, scoutPlayer, submitBid } from "@/lib/game";
export async function GET() { return NextResponse.json({ club: getClub() }); }
export async function POST(request: Request) { const body = await request.json().catch(() => ({})) as { action?: "scout" | "bid"; targetId?: string; amount?: number }; try { if (body.action === "scout" && body.targetId) scoutPlayer(body.targetId); if (body.action === "bid" && body.targetId && body.amount) submitBid(body.targetId, body.amount); return NextResponse.json({ club: getClub() }); } catch (error) { return NextResponse.json({ club: getClub(), error: error instanceof Error ? error.message : "Market action failed." }, { status: 400 }); } }
