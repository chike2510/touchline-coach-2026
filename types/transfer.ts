import type { Interest } from "./common";

export interface TransferTarget {
  id: string;
  name: string;
  age: number;
  position: string;
  role: string;
  overall: number;
  club: string;
  clubLeague: string;
  value: number;
  valueRange: { low: number; high: number };
  interest: Interest;
  photoUrl?: string;
}

export interface SquadNeed {
  position: string;
  role: string;
  priority: "High" | "Medium" | "Low";
}

export interface TransferStrategy {
  approach: string;
  description: string;
  focus: string[];
}

export interface TransferDealsSummary {
  playersIn: number;
  playersOut: number;
  spent: number;
  received: number;
}

export interface ActiveNegotiation {
  id: string;
  playerId: string;
  playerName: string;
  club: string;
  status: "Negotiation" | "Offer Made" | "Contract Talks";
  fee: number;
}

export interface TransferActivity {
  id: string;
  playerName: string;
  club: string;
  fee?: number;
  type: "in" | "out" | "shortlist";
  date: string;
}

export interface ContractNegotiation {
  playerId: string;
  playerName: string;
  age: number;
  position: string;
  nationalityFlag: string;
  status: string;
  agent: string;
  currentWage: number;
  currentWageAnnual: number;
  value: number;
  valueRange: { low: number; high: number };
  interestedClubs: string[];
  contractExpiry: string;
  proposedWage: number;
  wageRange: { low: number; high: number };
  signingOnFee: number;
  signingOnFeeRange: { low: number; high: number };
  contractLengthYears: number;
  squadStatus: string;
  transferStatus: string;
  wageAfterPotential: number;
  loyaltyBonus: number;
  agentPositivityPct: number;
  agentWants: string[];
  playerDemands: { label: string; importance: "Very Important" | "Important" | "Not Important" }[];
  negotiationHistory: { date: string; label: string; status: "Accepted" | "Countered" | "Pending" }[];
  boardConfidencePct: number;
  estimatedCost: number;
  wageBudgetImpact: number;
  wageBudgetImpactPct: number;
}
