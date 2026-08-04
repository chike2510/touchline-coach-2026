import type { MedicalOverview } from "@/types";

export const medicalOverview: MedicalOverview = {
  fitCount: 2, fatiguedCount: 5, injuredCount: 1, squadFitnessPct: 68,
  injuredPlayers: [
    { playerId: "p-shaw", name: "Luke Shaw", position: "LB", age: 26, injury: "Medial Collateral Ligament (Knee)", severity: "Moderate", expectedReturnLabel: "2 – 3 weeks", expectedReturnRange: "May 7 – May 21" },
  ],
  fitnessDistribution: [
    { label: "Poor", range: "0 – 59%", count: 3 }, { label: "Fair", range: "60 – 69%", count: 6 },
    { label: "Good", range: "70 – 79%", count: 9 }, { label: "Excellent", range: "80 – 100%", count: 7 },
  ],
  breakdown: [
    { label: "Fit", pct: 15, color: "green" }, { label: "Fatigued", pct: 38, color: "amber" },
    { label: "Increased Risk", pct: 31, color: "orange" }, { label: "Injured", pct: 8, color: "red" }, { label: "Unavailable", pct: 8, color: "purple" },
  ],
  squadStatus: [
    { playerId: "p-fernandes", name: "Bruno Fernandes", position: "AM (C)", age: 31, fitnessPct: 82, fitnessLabel: "Good", matchSharpnessPct: 78, injuryRisk: "Low", last7DaysLoad: 825, trend: [3, 5, 4, 6, 5, 7, 5] },
    { playerId: "p-casemiro", name: "Casemiro", position: "DM", age: 33, fitnessPct: 64, fitnessLabel: "Fatigued", matchSharpnessPct: 61, injuryRisk: "Medium", last7DaysLoad: 798, trend: [6, 5, 6, 4, 5, 3, 4] },
    { playerId: "p-rashford", name: "Marcus Rashford", position: "LW", age: 27, fitnessPct: 88, fitnessLabel: "Excellent", matchSharpnessPct: 85, injuryRisk: "Low", last7DaysLoad: 612, trend: [4, 5, 5, 6, 6, 7, 7] },
    { playerId: "p-mainoo", name: "Kobbie Mainoo", position: "CM", age: 19, fitnessPct: 74, fitnessLabel: "Good", matchSharpnessPct: 70, injuryRisk: "Low", last7DaysLoad: 538, trend: [4, 4, 5, 5, 6, 6, 6] },
    { playerId: "p-maguire", name: "Harry Maguire", position: "CB", age: 31, fitnessPct: 57, fitnessLabel: "Fair", matchSharpnessPct: 56, injuryRisk: "High", last7DaysLoad: 952, trend: [7, 6, 7, 6, 5, 6, 4] },
  ],
  recommendations: [
    { label: "Sleep", description: "8+ hours of quality sleep recommended", progress: 91 },
    { label: "Hydration", description: "Increase fluid intake to optimal levels", progress: 72 },
    { label: "Recovery", description: "Active recovery session recommended today", cta: "Schedule" },
    { label: "Therapy", description: "2 players would benefit from physiotherapy", cta: "View Players" },
  ],
};
