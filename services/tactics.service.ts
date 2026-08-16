import { tacticPresets, simulationOpponents, simulationResult, recentSimulations } from "@/lib/mock";
import type { TacticPreset, SimulationOpponent, SimulationResult, RecentSimulation } from "@/types";
import * as playerService from "./player.service";

function resolveSquadSlots(preset: TacticPreset): TacticPreset {
  const players = playerService.getSquad();
  const used = new Set<string>();
  return { ...preset, slots: preset.slots.map((slot) => {
    const player = players.find((candidate) => candidate.position === slot.positionLabel && !used.has(candidate.id));
    if (player) used.add(player.id);
    return { ...slot, playerId: player?.id ?? "" };
  }) };
}

export function getTacticPresets(): TacticPreset[] {
  return tacticPresets.map(resolveSquadSlots);
}

export function getActiveTactic(): TacticPreset {
  return getTacticPresets().find((t) => t.isActive) ?? getTacticPresets()[0];
}

export function getSimulationOpponents(): SimulationOpponent[] {
  return simulationOpponents;
}

export function getSimulationResult(_opponentId?: string): SimulationResult {
  return simulationResult;
}

export function getRecentSimulations(): RecentSimulation[] {
  return recentSimulations;
}
