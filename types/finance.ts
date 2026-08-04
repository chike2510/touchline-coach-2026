export interface FinanceSummary {
  balance: number;
  transferBudget: number;
  wageBudget: number;
  wageBudgetUsed: number;
  annualRevenue: number;
  annualExpenditure: number;
}

export interface RevenueStream {
  label: string;
  amount: number;
}
