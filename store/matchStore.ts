"use client";

import { create } from "zustand";
import type { LiveMatchState, MatchTacticalState } from "@/types";

interface MatchStore {
  match: LiveMatchState | null;
  isLoading: boolean;
  isTicking: boolean;
  error: string | null;
  hydrate: () => Promise<void>;
  startTicking: () => void;
  stopTicking: () => void;
  advanceMinute: () => Promise<void>;
  applyTacticalChange: (change: Partial<MatchTacticalState>) => Promise<void>;
  makeSubstitution: (playerOffId: string, playerOnId: string) => Promise<void>;
  reset: () => Promise<void>;
}

let interval: ReturnType<typeof setInterval> | null = null;
async function readMatch() { const response = await fetch("/api/match", { cache: "no-store" }); if (!response.ok) throw new Error("Live match state unavailable."); return (await response.json() as { match: LiveMatchState }).match; }

export const useMatchStore = create<MatchStore>((set, get) => ({
  match: null, isLoading: true, isTicking: false, error: null,
  hydrate: async () => { set({ isLoading: true, error: null }); try { set({ match: await readMatch(), isLoading: false }); } catch (error) { set({ error: error instanceof Error ? error.message : "Live match state unavailable.", isLoading: false }); } },
  startTicking: () => { if (interval || !get().match || get().match?.status === "finished") return; set({ isTicking: true }); interval = setInterval(() => { void get().advanceMinute(); }, 3000); },
  stopTicking: () => { if (interval) { clearInterval(interval); interval = null; } set({ isTicking: false }); },
  advanceMinute: async () => { try { const response = await fetch("/api/match", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "tick" }) }); if (!response.ok) throw new Error("Could not advance the match."); const match = (await response.json() as { match: LiveMatchState }).match; set({ match }); if (match.status === "finished") get().stopTicking(); } catch (error) { set({ error: error instanceof Error ? error.message : "Could not advance the match." }); get().stopTicking(); } },
  applyTacticalChange: async (change) => { const response = await fetch("/api/match", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ tacticalState: change }) }); if (!response.ok) throw new Error("Could not apply tactical adjustment."); set({ match: (await response.json() as { match: LiveMatchState }).match }); },
  makeSubstitution: async (playerOffId, playerOnId) => { const response = await fetch("/api/match", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ substitution: { playerOffId, playerOnId } }) }); if (!response.ok) throw new Error("Could not make substitution."); set({ match: (await response.json() as { match: LiveMatchState }).match }); },
  reset: async () => { get().stopTicking(); const response = await fetch("/api/match", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "reset" }) }); if (response.ok) set({ match: (await response.json() as { match: LiveMatchState }).match }); },
}));
