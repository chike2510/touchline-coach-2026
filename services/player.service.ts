// Player domain repository. Currently reads from mock data; swapping the
// function bodies for `fetch("/api/players/...")` calls is the only change
// needed to go live — every consumer already depends on this interface.

import { players } from "@/lib/mock";
import type { Player } from "@/types";

export function getSquad(): Player[] {
  return players;
}

export function getPlayerById(id: string): Player | undefined {
  return players.find((p) => p.id === id);
}

export function getPlayersByPosition(position: Player["position"]): Player[] {
  return players.filter((p) => p.position === position);
}

export function searchPlayers(query: string): Player[] {
  const q = query.trim().toLowerCase();
  if (!q) return players;
  return players.filter(
    (p) => p.name.toLowerCase().includes(q) || p.position.toLowerCase().includes(q) || p.role.toLowerCase().includes(q)
  );
}

export function getInjuredPlayers(): Player[] {
  return players.filter((p) => p.injuryRisk === "High" && p.fitness < 65);
}

export function getSquadAverageOverall(): number {
  if (players.length === 0) return 0;
  return Math.round(players.reduce((sum, p) => sum + p.overall, 0) / players.length);
}
