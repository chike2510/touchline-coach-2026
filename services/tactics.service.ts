import { tacticPresets, simulationOpponents, simulationResult, recentSimulations } from "@/lib/mock";
import type { TacticPreset, SimulationOpponent, SimulationResult, RecentSimulation } from "@/types";

export function getTacticPresets(): TacticPreset[] {
  return tacticPresets;
}

export function getActiveTactic(): TacticPreset {
  return tacticPresets.find((t) => t.isActive) ?? tacticPresets[0];
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
