import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({ ok: true, service: "touchline-26", timestamp: new Date().toISOString() });
}
