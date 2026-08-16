import { NextResponse } from "next/server";
import { getTacticState, saveTacticState } from "@/lib/server/state";
import type { TacticPreset } from "@/types";

export async function GET() {
  return NextResponse.json({ tactic: getTacticState() });
}

export async function PUT(request: Request) {
  const body = await request.json() as { tactic?: TacticPreset };
  if (!body.tactic?.id || !Array.isArray(body.tactic.slots) || !Array.isArray(body.tactic.principles)) {
    return NextResponse.json({ error: "A complete tactic draft is required." }, { status: 400 });
  }
  return NextResponse.json({ tactic: saveTacticState(body.tactic) });
}
