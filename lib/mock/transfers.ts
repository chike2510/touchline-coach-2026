import type { TransferTarget, SquadNeed, TransferStrategy, TransferDealsSummary, ActiveNegotiation, TransferActivity, ContractNegotiation } from "@/types";

export const transferTargets: TransferTarget[] = [
  { id: "t1", name: "João Neves", age: 19, position: "CM", role: "Box-to-Box Midfielder", overall: 87, club: "Benfica", clubLeague: "Liga Portugal", value: 68_000_000, valueRange: { low: 58_000_000, high: 78_000_000 }, interest: "very-high" },
  { id: "t2", name: "Michael Olise", age: 22, position: "RW", role: "Inside Forward", overall: 85, club: "Crystal Palace", clubLeague: "Premier League", value: 45_000_000, valueRange: { low: 38_000_000, high: 52_000_000 }, interest: "high" },
  { id: "t3", name: "Jarrad Branthwaite", age: 22, position: "CB", role: "Ball Playing Defender", overall: 83, club: "Everton", clubLeague: "Premier League", value: 35_000_000, valueRange: { low: 28_000_000, high: 40_000_000 }, interest: "medium" },
  { id: "t4", name: "Rúben Neves", age: 27, position: "DM", role: "Deep Lying Playmaker", overall: 84, club: "Al Hilal", clubLeague: "Saudi Pro League", value: 28_000_000, valueRange: { low: 20_000_000, high: 32_000_000 }, interest: "medium" },
  { id: "t5", name: "Giorgi Mamardashvili", age: 24, position: "GK", role: "Sweeper Keeper", overall: 82, club: "Valencia", clubLeague: "LaLiga", value: 22_000_000, valueRange: { low: 18_000_000, high: 26_000_000 }, interest: "low" },
];

export const squadNeeds: SquadNeed[] = [
  { position: "CM", role: "Ball-Winning Midfielder", priority: "High" },
  { position: "RW", role: "Wide Playmaker", priority: "Medium" },
  { position: "CB", role: "Ball-Playing Defender", priority: "Medium" },
];

export const transferStrategy: TransferStrategy = {
  approach: "Balanced",
  description: "We will look for opportunities that improve the squad quality while maintaining financial stability.",
  focus: ["Young Talent", "Resale Value", "Squad Depth"],
};

export const transferDealsSummary: TransferDealsSummary = {
  playersIn: 2, playersOut: 1, spent: 62_500_000, received: 18_700_000,
};

export const activeNegotiations: ActiveNegotiation[] = [
  { id: "n1", playerId: "t1", playerName: "João Neves", club: "Benfica", status: "Negotiation", fee: 58_000_000 },
  { id: "n2", playerId: "p-ugarte", playerName: "Manuel Ugarte", club: "PSG", status: "Offer Made", fee: 42_000_000 },
  { id: "n3", playerId: "n-cunha", playerName: "Matheus Cunha", club: "Wolves", status: "Contract Talks", fee: 0 },
];

export const recentTransferActivity: TransferActivity[] = [
  { id: "a1", playerName: "Leny Yoro", club: "Joined from LOSC Lille", fee: 52_000_000, type: "in", date: "18 Jul" },
  { id: "a2", playerName: "Mason Greenwood", club: "Sold to Marseille", fee: 18_700_000, type: "out", date: "17 Jul" },
  { id: "a3", playerName: "Arda Güler", club: "Shortlist Added", type: "shortlist", date: "16 Jul" },
];

export const contractNegotiation: ContractNegotiation = {
  playerId: "p-mainoo", playerName: "Kobbie Mainoo", age: 19, position: "CM", nationalityFlag: "🏴",
  status: "Important Player", agent: "Paul Mitchell",
  currentWage: 45_000, currentWageAnnual: 2_340_000, value: 62_000_000, valueRange: { low: 55_000_000, high: 70_000_000 },
  interestedClubs: ["Manchester City", "Real Madrid", "Bayern Munich"],
  contractExpiry: "30 Jun 2027",
  proposedWage: 120_000, wageRange: { low: 110_000, high: 130_000 },
  signingOnFee: 5_500_000, signingOnFeeRange: { low: 3_500_000, high: 6_000_000 },
  contractLengthYears: 3, squadStatus: "Star Player", transferStatus: "No Transfer Listed",
  wageAfterPotential: 150_000, loyaltyBonus: 4_000_000, agentPositivityPct: 82,
  agentWants: ["Higher wage", "Loyalty bonus", "Important role in the team"],
  playerDemands: [
    { label: "Wage", importance: "Very Important" }, { label: "Squad Status", importance: "Very Important" },
    { label: "Playing Time", importance: "Important" }, { label: "Contract Length", importance: "Important" },
    { label: "Release Clause", importance: "Not Important" },
  ],
  negotiationHistory: [
    { date: "18 Apr 2026", label: "You proposed £100K p/w wage", status: "Accepted" },
    { date: "17 Apr 2026", label: "Agent requested £120K p/w wage", status: "Countered" },
    { date: "16 Apr 2026", label: "Initial offer made", status: "Pending" },
  ],
  boardConfidencePct: 75, estimatedCost: 18_200_000, wageBudgetImpact: 45_000, wageBudgetImpactPct: 12,
};
