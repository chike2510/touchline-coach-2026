"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { Player } from "@/types";
import { playerService } from "@/services";

export type SquadStatus = "all" | "injured";

export function useSquad(options: { query?: string; positions?: string[]; status?: SquadStatus } = {}) {
  const [players, setPlayers] = useState<Player[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const query = options.query ?? "";
  const positions = options.positions ?? [];
  const status = options.status ?? "all";

  const load = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (query.trim()) params.set("q", query.trim());
      if (positions.length) params.set("positions", positions.join(","));
      if (status !== "all") params.set("status", status);
      const response = await fetch(`/api/squad?${params.toString()}`, { cache: "no-store" });
      if (!response.ok) throw new Error("The squad could not be loaded.");
      const payload = await response.json() as { players?: Player[] };
      setPlayers(payload.players ?? []);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "The squad could not be loaded.");
      setPlayers([]);
    } finally {
      setIsLoading(false);
    }
  }, [positions, query, status]);

  useEffect(() => { void load(); }, [load]);
  return { players, isLoading, error, refresh: load };
}

export function usePlayer(id: string | undefined) {
  return useMemo(() => (id ? playerService.getPlayerById(id) : undefined), [id]);
}
