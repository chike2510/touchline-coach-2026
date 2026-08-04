import type { FinanceSummary, RevenueStream } from "@/types";

export const financeSummary: FinanceSummary = {
  balance: 85_200_000, transferBudget: 96_500_000, wageBudget: 228_000_000, wageBudgetUsed: 215_000_000,
  annualRevenue: 620_000_000, annualExpenditure: 577_300_000,
};

export const revenueStreams: RevenueStream[] = [
  { label: "Matchday", amount: 132_000_000 }, { label: "Broadcasting", amount: 265_000_000 },
  { label: "Commercial", amount: 223_000_000 },
];
