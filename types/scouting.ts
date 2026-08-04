export interface ScoutAssignment {
  id: string;
  scoutName: string;
  region: string;
  focus: string;
  status: "Active" | "Completed";
  playersFound: number;
}

export interface ScoutedPlayer {
  id: string;
  name: string;
  age: number;
  position: string;
  club: string;
  nationality: string;
  potential: number;
  currentAbility: number;
  wonderkid?: boolean;
  photoUrl?: string;
}

export interface ScoutingRegion {
  name: string;
  scoutsAssigned: number;
  knowledge: number;
}
