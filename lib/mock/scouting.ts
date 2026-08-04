import type { ScoutAssignment, ScoutedPlayer, ScoutingRegion } from "@/types";

export const scoutAssignments: ScoutAssignment[] = [
  { id: "sa1", scoutName: "Billy Mercer", region: "South America", focus: "Attacking Talent", status: "Active", playersFound: 6 },
  { id: "sa2", scoutName: "Steve Brown", region: "Western Europe", focus: "Ball-Playing Defenders", status: "Active", playersFound: 4 },
  { id: "sa3", scoutName: "Marco Silva", region: "Portugal & Spain", focus: "Wonderkids", status: "Active", playersFound: 8 },
];

export const scoutedPlayers: ScoutedPlayer[] = [
  { id: "sp1", name: "Arda Güler", age: 21, position: "AM", club: "Real Madrid", nationality: "Türkiye", potential: 90, currentAbility: 79, wonderkid: true },
  { id: "sp2", name: "Warren Zaïre-Emery", age: 20, position: "CM", club: "PSG", nationality: "France", potential: 91, currentAbility: 81, wonderkid: true },
  { id: "sp3", name: "Endrick", age: 19, position: "ST", club: "Real Madrid", nationality: "Brazil", potential: 89, currentAbility: 77, wonderkid: true },
  { id: "sp4", name: "Lucas Bergvall", age: 20, position: "CM", club: "Tottenham", nationality: "Sweden", potential: 86, currentAbility: 78 },
];

export const scoutingRegions: ScoutingRegion[] = [
  { name: "England", scoutsAssigned: 2, knowledge: 92 },
  { name: "Spain", scoutsAssigned: 1, knowledge: 76 },
  { name: "Portugal", scoutsAssigned: 1, knowledge: 81 },
  { name: "South America", scoutsAssigned: 2, knowledge: 68 },
  { name: "Germany", scoutsAssigned: 1, knowledge: 64 },
];
