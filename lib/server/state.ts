import { clubService, fixtureService, playerService } from "@/services";
import { createTacticDraft } from "@/lib/tactics/formations";
import { createLiveMatchState } from "@/lib/match/simulation";
import type { LiveMatchState, Player, TacticPreset } from "@/types";

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
  match: LiveMatchState;
  clubAdjustments: { balance: number; morale: number; board: number };
};

const globalState = globalThis as typeof globalThis & { __touchlineState?: AppState };

export function getAppState(): AppState {
  if (!globalState.__touchlineState) { const squad = playerService.getSquad(); const tactic = createTacticDraft(squad); globalState.__touchlineState = { career: null, tactic, squad, match: createLiveMatchState(clubService.getClubOverview(), fixtureService.getNextFixture(), tactic, squad), clubAdjustments: { balance: 0, morale: 0, board: 0 } }; }
  if (!Array.isArray(globalState.__touchlineState.squad)) globalState.__touchlineState.squad = playerService.getSquad();
  if (!globalState.__touchlineState.tactic || globalState.__touchlineState.tactic.id !== "career-tactic") globalState.__touchlineState.tactic = createTacticDraft(globalState.__touchlineState.squad);
  if (!globalState.__touchlineState.match) globalState.__touchlineState.match = createLiveMatchState(clubService.getClubOverview(), fixtureService.getNextFixture(), globalState.__touchlineState.tactic, globalState.__touchlineState.squad);
  if (!globalState.__touchlineState.clubAdjustments) globalState.__touchlineState.clubAdjustments = { balance: 0, morale: 0, board: 0 };
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

export function getMatchState() {
  return getAppState().match;
}

export function saveMatchState(match: LiveMatchState) {
  getAppState().match = match;
  return match;
}
