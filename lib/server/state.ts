import { clubService } from "@/services";

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
};

const globalState = globalThis as typeof globalThis & { __touchlineState?: AppState };

export function getAppState(): AppState {
  if (!globalState.__touchlineState) globalState.__touchlineState = { career: null };
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
