import { financeSummary, revenueStreams } from "@/lib/mock";
import type { FinanceSummary, RevenueStream } from "@/types";

export function getFinanceSummary(): FinanceSummary {
  return financeSummary;
}

export function getRevenueStreams(): RevenueStream[] {
  return revenueStreams;
}
