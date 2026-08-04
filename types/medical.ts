export interface InjuredPlayer {
  playerId: string;
  name: string;
  position: string;
  age: number;
  injury: string;
  severity: "Minor" | "Moderate" | "Severe";
  expectedReturnLabel: string;
  expectedReturnRange: string;
}

export interface FitnessDistributionBand {
  label: string;
  range: string;
  count: number;
}

export interface SquadMedicalStatus {
  playerId: string;
  name: string;
  position: string;
  age: number;
  fitnessPct: number;
  fitnessLabel: string;
  matchSharpnessPct: number;
  injuryRisk: "Low" | "Medium" | "High";
  last7DaysLoad: number;
  trend: number[];
}

export interface MedicalOverview {
  fitCount: number;
  fatiguedCount: number;
  injuredCount: number;
  squadFitnessPct: number;
  injuredPlayers: InjuredPlayer[];
  fitnessDistribution: FitnessDistributionBand[];
  breakdown: { label: string; pct: number; color: "green" | "amber" | "orange" | "red" | "purple" }[];
  squadStatus: SquadMedicalStatus[];
  recommendations: { label: string; description: string; progress?: number; cta?: string }[];
}
