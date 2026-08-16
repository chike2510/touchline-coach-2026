import { NextResponse } from "next/server";
import { saveCareer, type CareerProfile } from "@/lib/server/state";

const values = ["Rookie", "Pro", "Master"] as const;

export async function POST(request: Request) {
  const body = (await request.json()) as Partial<CareerProfile>;
  if (!body.managerName || !body.philosophy || !body.tacticalIdentity || !body.clubId || !body.leagueId || !values.includes(body.difficulty as (typeof values)[number])) {
    return NextResponse.json({ error: "Complete every career field before continuing." }, { status: 400 });
  }
  const career: CareerProfile = {
    managerName: body.managerName.trim(),
    philosophy: body.philosophy,
    tacticalIdentity: body.tacticalIdentity,
    difficulty: body.difficulty as CareerProfile["difficulty"],
    clubId: body.clubId,
    leagueId: body.leagueId,
    createdAt: new Date().toISOString(),
  };
  return NextResponse.json({ career: saveCareer(career).career }, { status: 201 });
}
