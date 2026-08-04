import type { TacticPreset, SimulationOpponent, SimulationResult, RecentSimulation } from "@/types";

const primarySlots = [
  { id: "s-lw", positionLabel: "LW", role: "IW", duty: "At" as const, x: 20, y: 22, playerId: "p-rashford" },
  { id: "s-st", positionLabel: "ST", role: "AF", duty: "At" as const, x: 50, y: 12, playerId: "p-hojlund" },
  { id: "s-rw", positionLabel: "RW", role: "IW", duty: "Su" as const, x: 80, y: 22, playerId: "p-diallo" },
  { id: "s-am", positionLabel: "AM", role: "AP", duty: "At" as const, x: 50, y: 38, playerId: "p-fernandes" },
  { id: "s-cm", positionLabel: "CM", role: "CM", duty: "Su" as const, x: 72, y: 50, playerId: "p-mainoo" },
  { id: "s-dm", positionLabel: "DM", role: "DM", duty: "De" as const, x: 50, y: 58, playerId: "p-ugarte" },
  { id: "s-lb", positionLabel: "LB", role: "FB", duty: "Su" as const, x: 14, y: 70, playerId: "p-shaw" },
  { id: "s-cb1", positionLabel: "CB", role: "BPD", duty: "De" as const, x: 38, y: 76, playerId: "p-yoro" },
  { id: "s-cb2", positionLabel: "CB", role: "BPD", duty: "De" as const, x: 62, y: 76, playerId: "p-deligt" },
  { id: "s-rb", positionLabel: "RB", role: "FB", duty: "Su" as const, x: 86, y: 70, playerId: "p-dalot" },
  { id: "s-gk", positionLabel: "GK", role: "SK", duty: "Su" as const, x: 50, y: 91, playerId: "p-onana" },
];

export const tacticPresets: TacticPreset[] = [
  {
    id: "preset-carrick-433",
    name: "Carrick Control",
    formation: "4-3-3",
    mentality: "Balanced",
    isActive: true,
    familiarity: 94,
    chemistry: 87,
    slots: primarySlots,
    settings: [
      { key: "buildUp", icon: "waypoints", label: "Build-Up", value: "Patient Build-Up", sub: "3-2 Structure" },
      { key: "restDefence", icon: "shield", label: "Rest Defence", value: "Balanced Rest Defence", sub: "3+2 Structure" },
      { key: "progression", icon: "arrow-right-circle", label: "Progression", value: "Progress Through Center", sub: "Direct Passing" },
      { key: "pressing", icon: "target", label: "Pressing", value: "Hybrid Press", sub: "Mid Block" },
      { key: "tempo", icon: "gauge", label: "Tempo", value: "Controlled Tempo", sub: "Normal Speed" },
      { key: "finalThird", icon: "flag", label: "Final Third", value: "Work Ball Into Box", sub: "Mixed Crosses" },
      { key: "transition", icon: "refresh-cw", label: "Transition", value: "Counter-Press", sub: "On Loss" },
      { key: "risk", icon: "activity", label: "Risk Level", value: "Balanced", sub: "3/5 Risk" },
      { key: "freedom", icon: "shuffle", label: "Freedom", value: "Balanced", sub: "Flexible Player Freedom" },
    ],
    principles: [
      { key: "buildUp", label: "Build-Up", value: "Patient Build-up", scale: 4 },
      { key: "chanceCreation", label: "Chance Creation", value: "Look For Overlap", scale: 3 },
      { key: "width", label: "Width", value: "Fairly Wide", scale: 3 },
      { key: "attackingFocus", label: "Attacking Focus", value: "Play Through The Middle", scale: 3 },
      { key: "defending", label: "Defending", value: "Hybrid Press", scale: 3 },
      { key: "lineHeight", label: "Line Height", value: "Higher", scale: 4 },
    ],
    instructions: {
      inPossession: ["Play Out Of Defence", "Work Ball Into Box", "Higher Tempo", "Fairly Wide"],
      inTransition: ["Distribute To CB", "Counter", "Counter-Press"],
      outOfPossession: ["Higher Defensive Line", "Hybrid Press", "More Often", "Prevent Short GK"],
    },
    riskLevel: 3, freedom: "Balanced", teamFluidity: "Fluid",
  },
  {
    id: "preset-press-4231",
    name: "High Press 4-2-3-1",
    formation: "4-2-3-1",
    mentality: "Attacking",
    isActive: false,
    familiarity: 61,
    chemistry: 74,
    slots: primarySlots,
    settings: [
      { key: "buildUp", icon: "waypoints", label: "Build-Up", value: "Direct Build-Up", sub: "Long Balls" },
      { key: "pressing", icon: "target", label: "Pressing", value: "Full Press", sub: "High Block" },
      { key: "tempo", icon: "gauge", label: "Tempo", value: "High Tempo", sub: "Fast Speed" },
    ],
    principles: [
      { key: "buildUp", label: "Build-Up", value: "Direct", scale: 2 },
      { key: "chanceCreation", label: "Chance Creation", value: "Hit Early Crosses", scale: 4 },
      { key: "width", label: "Width", value: "Very Wide", scale: 5 },
      { key: "attackingFocus", label: "Attacking Focus", value: "Play Down Both Flanks", scale: 4 },
      { key: "defending", label: "Defending", value: "Full Press", scale: 5 },
      { key: "lineHeight", label: "Line Height", value: "Much Higher", scale: 5 },
    ],
    instructions: {
      inPossession: ["Hit Early Crosses", "Higher Tempo", "Very Wide"],
      inTransition: ["Counter", "Counter-Press"],
      outOfPossession: ["Much Higher Defensive Line", "Full Press", "Prevent Short GK"],
    },
    riskLevel: 4, freedom: "Flexible", teamFluidity: "Fluid",
  },
];

export const simulationOpponents: SimulationOpponent[] = [
  { id: "opp-city", name: "Pep's City", formation: "4-3-3" },
  { id: "opp-arsenal", name: "Arteta's Arsenal", formation: "4-3-3" },
  { id: "opp-leverkusen", name: "Xabi's Leverkusen", formation: "3-4-2-1" },
];

export const simulationResult: SimulationResult = {
  winPct: 62, drawPct: 21, lossPct: 17, expectedGoalsFor: 2.14, expectedGoalsAgainst: 0.98,
  strengths: ["High press effectiveness", "Central overload in attack", "Good chance generation"],
  weaknesses: ["Vulnerable to wide counters", "Space behind full-backs", "Set-piece defending"],
  radar: [
    { axis: "Control", value: 8.0 }, { axis: "Build-up", value: 7.8 }, { axis: "Attack", value: 8.1 },
    { axis: "Transition", value: 7.6 }, { axis: "Defence", value: 6.9 }, { axis: "Chance Creation", value: 8.2 },
  ],
  comparison: [
    { label: "Possession", value: "62%" }, { label: "Pass Accuracy", value: "88%" }, { label: "Press Success", value: "78%" },
    { label: "Shots Per Game", value: "15.4" }, { label: "Conceded Per Game", value: "0.9" },
  ],
};

export const recentSimulations: RecentSimulation[] = [
  { id: "rs1", opponent: "Pep's City", opponentFormation: "4-3-3", result: "WIN", score: "2 - 1", xg: "2.02 - 0.94", timeAgo: "Today" },
  { id: "rs2", opponent: "Arteta's Arsenal", opponentFormation: "4-3-3", result: "DRAW", score: "1 - 1", xg: "1.38 - 1.21", timeAgo: "Yesterday" },
  { id: "rs3", opponent: "Xabi's Leverkusen", opponentFormation: "3-4-2-1", result: "WIN", score: "2 - 0", xg: "2.14 - 0.98", timeAgo: "2 days ago" },
];
