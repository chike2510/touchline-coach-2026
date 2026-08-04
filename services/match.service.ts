import { liveMatch, matchPreparation, postMatchReview } from "@/lib/mock";
import type { LiveMatchState, MatchPreparation, PostMatchReview } from "@/types";

export function getLiveMatch(): LiveMatchState {
  return liveMatch;
}

export function getMatchPreparation(): MatchPreparation {
  return matchPreparation;
}

export function getPostMatchReview(): PostMatchReview {
  return postMatchReview;
}
