import { NextResponse } from "next/server";
export function GET() { return NextResponse.json({ ok: true, service: "touchline-26", version: "2.0.0" }); }
