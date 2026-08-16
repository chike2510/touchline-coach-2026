import { NextResponse } from "next/server";
import { getClubOverview } from "@/lib/server/state";

export function GET() {
  return NextResponse.json(getClubOverview());
}
