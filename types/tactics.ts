export interface FormationSlot {
  id: string;
  positionLabel: string; // e.g. "ST", "CB"
  role: string; // e.g. "AF"
  duty: "At" | "Su" | "De"; // Attack / Support / Defend
  x: number; // 0-100 pitch %
  y: number; // 0-100 pitch %
  playerId: string;
}

export interface TacticalPrinciple {
  key: "buildUp" | "chanceCreation" | "width" | "attackingFocus" | "defending" | "lineHeight";
  label: string;
  value: string;
  scale: number; // 0-5 slider position
}

export interface TeamInstructionGroup {
  inPossession: string[];
  inTransition: string[];
  outOfPossession: string[];
}

export interface TacticSetting {
  key: string;
  icon: string;
  label: string;
  value: string;
  sub: string;
}

export interface TacticPreset {
  id: string;
  name: string;
  formation: string;
  mentality: string;
  isActive: boolean;
  familiarity: number;
  chemistry: number;
  slots: FormationSlot[];
  settings: TacticSetting[];
  principles: TacticalPrinciple[];
  instructions: TeamInstructionGroup;
  riskLevel: number; // 1-5
  freedom: "Restricted" | "Balanced" | "Flexible";
  teamFluidity: "Rigid" | "Balanced" | "Fluid";
}

export interface SimulationOpponent {
  id: string;
  name: string;
  formation: string;
}

export interface SimulationResult {
  winPct: number;
  drawPct: number;
  lossPct: number;
  expectedGoalsFor: number;
  expectedGoalsAgainst: number;
  strengths: string[];
  weaknesses: string[];
  radar: { axis: string; value: number }[];
  comparison: { label: string; value: string }[];
}

export interface RecentSimulation {
  id: string;
  opponent: string;
  opponentFormation: string;
  result: "WIN" | "DRAW" | "LOSS";
  score: string;
  xg: string;
  timeAgo: string;
}

export const ROLE_DUTY_OPTIONS = ["At", "Su", "De"] as const;

export const AVAILABLE_ROLES: Record<string, string[]> = {
  GK: ["SK", "GK"],
  CB: ["CD", "BPD", "SW", "L"],
  LB: ["FB", "WB", "IWB", "CWB", "NNB"],
  RB: ["FB", "WB", "IWB", "CWB", "NNB"],
  DM: ["DM", "DLP", "A", "RGA", "HB", "SV"],
  CM: ["CM", "BBM", "DLP", "MEZ", "CAR"],
  AM: ["AP", "AM", "SS", "T"],
  LW: ["W", "IW", "IF", "WT", "DW"],
  RW: ["W", "IW", "IF", "WT", "DW"],
  ST: ["AF", "P", "DLF", "TM", "F9", "PF"],
};
