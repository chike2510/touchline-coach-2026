import { clubService, tacticsService } from "@/services";
import type { TacticPreset } from "@/types";

export type CareerProfile = {
  managerName: string;
  philosophy: string;
  tacticalIdentity: string;
  difficulty: "Rookie" | "Pro" | "Master";
  clubId: string;
  leagueId: string;
  createdAt: string;
};

type AppState = {
  career: CareerProfile | null;
  tactic: TacticPreset;
};

const globalState = globalThis as typeof globalThis & { __touchlineState?: AppState };

export function getAppState(): AppState {
  if (!globalState.__touchlineState) globalState.__touchlineState = { career: null, tactic: tacticsService.getActiveTactic() };
  return globalState.__touchlineState;
}

export function getClubOverview() {
  const club = clubService.getClubOverview();
  return { club, career: getAppState().career };
}

export function saveCareer(career: CareerProfile) {
  getAppState().career = career;
  return getAppState();
}

export function getTacticState() {
  return getAppState().tactic;
}

export function saveTacticState(tactic: TacticPreset) {
  getAppState().tactic = tactic;
  return getAppState().tactic;
}
