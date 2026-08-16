"use client";

import { useCallback, useEffect, useState } from "react";
import type { ClubOverview } from "@/types";

export function useClubState() {
  const [club, setClub] = useState<ClubOverview | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const load = useCallback(async () => { setIsLoading(true); setError(null); try { const response = await fetch("/api/club", { cache: "no-store" }); if (!response.ok) throw new Error("Club state unavailable."); setClub((await response.json() as { club: ClubOverview }).club); } catch (requestError) { setError(requestError instanceof Error ? requestError.message : "Club state unavailable."); } finally { setIsLoading(false); } }, []);
  const mutate = useCallback(async (adjustment: { balance?: number; morale?: number; board?: number }) => { const response = await fetch("/api/club", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(adjustment) }); if (!response.ok) throw new Error("Club state could not be updated."); setClub((await response.json() as { club: ClubOverview }).club); }, []);
  useEffect(() => { void load(); }, [load]);
  return { club, isLoading, error, refresh: load, mutate };
}
