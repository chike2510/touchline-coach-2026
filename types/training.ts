import type { Intensity } from "./common";

export interface TrainingDay {
  day: string;
  date: string;
  type: string;
  icon: string;
  sub: string;
}

export interface TrainingFocusImpact {
  label: string;
  direction: "up" | "down";
  magnitude: "Low" | "Medium" | "High";
}

export interface TrainingSession {
  id: string;
  title: string;
  date: string;
  time: string;
  durationMin: number;
  description: string;
  objectives: { label: string; done: boolean }[];
  intensity: Intensity;
  intensityBars: number;
  focusAreas: string[];
  sessionLoad: string;
  recoveryHours: number;
}

export interface SquadTrainingStatus {
  playerId: string;
  name: string;
  position: string;
  sharpnessPct: number;
  fitnessPct: number;
  fatigue: "Low" | "Medium" | "High";
  load: "Low" | "Medium" | "High";
}

export interface TrainingOverview {
  weekLabel: string;
  weekRange: string;
  trainingSharpnessPct: number;
  teamSharpnessPct: number;
  teamFitnessPct: number;
  injuryRisk: "Low" | "Medium" | "High";
  injuryRiskPlayers: number;
  fatigueLevel: "Low" | "Moderate" | "High";
  morale: string;
  weeklyPlan: TrainingDay[];
  focusTitle: string;
  focusDescription: string;
  focusImpacts: TrainingFocusImpact[];
  todaySession: TrainingSession;
  squadStatus: SquadTrainingStatus[];
}
