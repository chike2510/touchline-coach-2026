"use client";

import { useCallback, useEffect, useState } from "react";
import type { TournamentSnapshot } from "@/types";

export function useTournament(competitionId = "prem") {
  const [snapshot, setSnapshot] = useState<TournamentSnapshot | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const load = useCallback(async () => { setIsLoading(true); setError(null); try { const response = await fetch(`/api/tournament?competition=${competitionId}`, { cache: "no-store" }); if (!response.ok) throw new Error("Tournament state unavailable."); setSnapshot((await response.json() as { snapshot: TournamentSnapshot }).snapshot); } catch (requestError) { setError(requestError instanceof Error ? requestError.message : "Tournament state unavailable."); } finally { setIsLoading(false); } }, [competitionId]);
  const mutate = useCallback(async (action: "simulate" | "reset") => { const response = await fetch("/api/tournament", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action, competitionId }) }); if (!response.ok) throw new Error("Tournament state could not be updated."); setSnapshot((await response.json() as { snapshot: TournamentSnapshot }).snapshot); }, [competitionId]);
  useEffect(() => { void load(); }, [load]);
  return { snapshot, isLoading, error, refresh: load, simulateNext: () => mutate("simulate"), reset: () => mutate("reset") };
}
