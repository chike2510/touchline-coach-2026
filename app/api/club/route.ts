import { NextResponse } from "next/server";
import { applyClubAdjustment, getClubState } from "@/lib/server/club-state";

export function GET() { return NextResponse.json({ club: getClubState() }); }

export async function PATCH(request: Request) {
  const body = await request.json() as { balance?: number; morale?: number; board?: number };
  const allowed = Object.fromEntries(Object.entries(body).filter(([key, value]) => ["balance", "morale", "board"].includes(key) && typeof value === "number"));
  return NextResponse.json({ club: applyClubAdjustment(allowed) });
}
