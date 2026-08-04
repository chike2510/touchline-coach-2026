import { scoutAssignments, scoutedPlayers, scoutingRegions } from "@/lib/mock";
import type { ScoutAssignment, ScoutedPlayer, ScoutingRegion } from "@/types";

export function getScoutAssignments(): ScoutAssignment[] {
  return scoutAssignments;
}

export function getScoutedPlayers(): ScoutedPlayer[] {
  return scoutedPlayers;
}

export function getScoutingRegions(): ScoutingRegion[] {
  return scoutingRegions;
}
