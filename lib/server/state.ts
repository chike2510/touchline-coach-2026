import { clubService, playerService } from "@/services";
import { createTacticDraft } from "@/lib/tactics/formations";
import type { Player, TacticPreset } from "@/types";

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
  squad: Player[];
};

const globalState = globalThis as typeof globalThis & { __touchlineState?: AppState };

export function getAppState(): AppState {
  if (!globalState.__touchlineState) { const squad = playerService.getSquad(); globalState.__touchlineState = { career: null, tactic: createTacticDraft(squad), squad }; }
  if (!Array.isArray(globalState.__touchlineState.squad)) globalState.__touchlineState.squad = playerService.getSquad();
  if (!globalState.__touchlineState.tactic || globalState.__touchlineState.tactic.id !== "career-tactic") globalState.__touchlineState.tactic = createTacticDraft(globalState.__touchlineState.squad);
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

export function getSquadState() {
  return getAppState().squad;
}
