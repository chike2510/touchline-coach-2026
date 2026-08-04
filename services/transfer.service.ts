import {
  transferTargets, squadNeeds, transferStrategy, transferDealsSummary,
  activeNegotiations, recentTransferActivity, contractNegotiation,
} from "@/lib/mock";
import type {
  TransferTarget, SquadNeed, TransferStrategy, TransferDealsSummary,
  ActiveNegotiation, TransferActivity, ContractNegotiation,
} from "@/types";

export function getTransferTargets(): TransferTarget[] {
  return transferTargets;
}

export function getSquadNeeds(): SquadNeed[] {
  return squadNeeds;
}

export function getTransferStrategy(): TransferStrategy {
  return transferStrategy;
}

export function getTransferDealsSummary(): TransferDealsSummary {
  return transferDealsSummary;
}

export function getActiveNegotiations(): ActiveNegotiation[] {
  return activeNegotiations;
}

export function getRecentTransferActivity(): TransferActivity[] {
  return recentTransferActivity;
}

export function getContractNegotiation(): ContractNegotiation {
  return contractNegotiation;
}
