import type { Chemistry, Morale, Trend } from "./common";

export type PlayerPosition =
  | "GK" | "CB" | "LB" | "RB" | "LWB" | "RWB"
  | "DM" | "CM" | "AM" | "LW" | "RW" | "ST";

export interface PlayerAttributeGroup {
  technical: Record<string, number>;
  mental: Record<string, number>;
  physical: Record<string, number>;
}

export interface PlayerStats {
  appearances: number;
  goals: number;
  assists: number;
  rating: number;
  cleanSheets?: number;
  minutesPlayed?: number;
}

export interface PlayerTrait {
  id: string;
  label: string;
}

export interface PlayerDevelopment {
  currentAbility: number;
  potentialAbility: number;
  progressHistory: { month: string; value: number }[];
  primaryFocus: { attribute: string; description: string; targetDate: string; progress: number };
  secondaryFocus: { attribute: string; description: string; targetDate: string; progress: number };
  roleFamiliarity: { role: string; percentage: number }[];
  systemFamiliarity: { system: string; rating: number };
  coachFeedback: { coach: string; role: string; quote: string; strengths: string[]; improve: string[] };
}

export interface Player {
  id: string;
  name: string;
  number: number;
  age: number;
  nationality: string;
  nationalityFlag: string;
  position: PlayerPosition;
  positionLabel: string;
  role: string;
  overall: number;
  potential: number;
  sharpness: number;
  fitness: number;
  morale: Morale;
  chemistry: Chemistry;
  isCaptain?: boolean;
  photoUrl?: string;
  club: string;
  heightCm: number;
  weightKg: number;
  preferredFoot: "Left" | "Right" | "Both";
  value: number;
  wage: number;
  contractExpiry: string;
  transferStatus: "Not for Sale" | "Available" | "Listed" | "Star Player" | "Squad Player";
  attributes: PlayerAttributeGroup;
  keyAttributes: { label: string; value: number }[];
  stats: PlayerStats;
  traits: PlayerTrait[];
  injuryRisk: RiskLevelLike;
  trend: Trend;
  bestPositions: PlayerPosition[];
  development?: PlayerDevelopment;
}

type RiskLevelLike = "Low" | "Medium" | "High";
