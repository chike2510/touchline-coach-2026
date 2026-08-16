import { NextResponse } from "next/server";
import { getSquadState } from "@/lib/server/state";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const query = url.searchParams.get("q")?.trim().toLowerCase() ?? "";
  const positions = new Set((url.searchParams.get("positions") ?? "").split(",").map((value) => value.trim()).filter(Boolean));
  const status = url.searchParams.get("status") ?? "all";
  const squad = getSquadState();
  const players = squad.filter((player) => {
    const matchesQuery = !query || [player.name, player.position, player.positionLabel, player.role].some((value) => value.toLowerCase().includes(query));
    const matchesPosition = positions.size === 0 || positions.has(player.position);
    const matchesStatus = status !== "injured" || (player.injuryRisk === "High" && player.fitness < 65);
    return matchesQuery && matchesPosition && matchesStatus;
  });
  return NextResponse.json({ players, total: players.length, source: "squad-state" });
}
