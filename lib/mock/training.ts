import type { TrainingOverview } from "@/types";

export const trainingOverview: TrainingOverview = {
  weekLabel: "Pre-Season Week 3", weekRange: "Jul 20 – Jul 26",
  trainingSharpnessPct: 92, teamSharpnessPct: 92, teamFitnessPct: 88,
  injuryRisk: "Low", injuryRiskPlayers: 3, fatigueLevel: "Moderate", morale: "Very Good",
  weeklyPlan: [
    { day: "MON", date: "JUL 20", type: "Intensity High", icon: "run", sub: "Intensity High" },
    { day: "TUE", date: "JUL 21", type: "Tactical Team", icon: "tactic", sub: "Tactical Team" },
    { day: "WED", date: "JUL 22", type: "Physical Gym", icon: "gym", sub: "Physical Gym" },
    { day: "THU", date: "JUL 23", type: "Technical Ball Work", icon: "ball", sub: "Technical Ball Work" },
    { day: "FRI", date: "JUL 24", type: "Intensity High", icon: "run", sub: "Intensity High" },
    { day: "SAT", date: "JUL 25", type: "Recovery Low", icon: "shield", sub: "Recovery Low" },
    { day: "SUN", date: "JUL 26", type: "Match Prep Focus", icon: "calendar", sub: "Match Prep Focus" },
  ],
  focusTitle: "Tactical Shape", focusDescription: "Build team familiarity and tactical understanding.",
  focusImpacts: [
    { label: "Team Play", direction: "up", magnitude: "High" },
    { label: "Familiarity", direction: "up", magnitude: "High" },
    { label: "Intensity", direction: "up", magnitude: "Medium" },
  ],
  todaySession: {
    id: "sess-tue", title: "Tactical – Team", date: "Tuesday, Jul 21", time: "10:00 AM", durationMin: 90,
    description: "Positional play, build-up patterns and defensive shape.",
    objectives: [
      { label: "Improve build-up play", done: true }, { label: "Work on defensive shape", done: true },
      { label: "Increase tactical familiarity", done: false },
    ],
    intensity: "medium", intensityBars: 3, focusAreas: ["Positional Play", "Build-Up", "Defensive Shape"],
    sessionLoad: "High", recoveryHours: 24,
  },
  squadStatus: [
    { playerId: "p-fernandes", name: "Bruno Fernandes", position: "CAM", sharpnessPct: 96, fitnessPct: 93, fatigue: "Low", load: "High" },
    { playerId: "p-mainoo", name: "Kobbie Mainoo", position: "CM", sharpnessPct: 91, fitnessPct: 90, fatigue: "Low", load: "Medium" },
    { playerId: "p-martinez", name: "Lisandro Martínez", position: "CB", sharpnessPct: 88, fitnessPct: 87, fatigue: "Low", load: "Medium" },
    { playerId: "p-rashford", name: "Marcus Rashford", position: "LW", sharpnessPct: 89, fitnessPct: 86, fatigue: "Medium", load: "High" },
    { playerId: "p-hojlund", name: "Rasmus Højlund", position: "ST", sharpnessPct: 87, fitnessPct: 85, fatigue: "Medium", load: "High" },
    { playerId: "p-dalot", name: "Diogo Dalot", position: "RB", sharpnessPct: 84, fitnessPct: 82, fatigue: "Medium", load: "Medium" },
    { playerId: "p-mount", name: "Mason Mount", position: "CM", sharpnessPct: 83, fitnessPct: 80, fatigue: "High", load: "High" },
    { playerId: "p-shaw", name: "Luke Shaw", position: "LB", sharpnessPct: 78, fitnessPct: 76, fatigue: "High", load: "High" },
  ],
};
