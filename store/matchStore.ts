"use client";

import { create } from "zustand";
import { matchService } from "@/services";
import type { LiveMatchState, MatchEvent } from "@/types";

interface MatchStore {
  match: LiveMatchState;
  isTicking: boolean;
  startTicking: () => void;
  stopTicking: () => void;
  advanceMinute: () => void;
  reset: () => void;
}

const base = matchService.getLiveMatch();
let interval: ReturnType<typeof setInterval> | null = null;

export const useMatchStore = create<MatchStore>((set, get) => ({
  match: base,
  isTicking: false,

  startTicking: () => {
    if (interval) return;
    set({ isTicking: true });
    interval = setInterval(() => get().advanceMinute(), 3000);
  },

  stopTicking: () => {
    if (interval) {
      clearInterval(interval);
      interval = null;
    }
    set({ isTicking: false });
  },

  advanceMinute: () =>
    set((state) => {
      if (state.match.minute >= 93) {
        if (interval) {
          clearInterval(interval);
          interval = null;
        }
        return { isTicking: false };
      }
      const nextMinute = state.match.minute + 1;
      const swing = Math.round((Math.random() - 0.45) * 18);
      const lastMomentum = state.match.momentum[state.match.momentum.length - 1] ?? 0;
      const nextMomentum = Math.max(-100, Math.min(100, lastMomentum + swing));
      const newEvents: MatchEvent[] = [...state.match.events];
      let lastEvent = state.match.lastEvent;

      if (nextMinute % 11 === 0) {
        const team: "home" | "away" = Math.random() > 0.5 ? "home" : "away";
        const event: MatchEvent = { minute: nextMinute, type: "chance", team, player: "Bruno Fernandes", detail: "Shot attempt" };
        newEvents.push(event);
        lastEvent = event;
      }

      return {
        match: {
          ...state.match,
          minute: nextMinute,
          momentum: [...state.match.momentum, nextMomentum],
          events: newEvents,
          lastEvent,
        },
      };
    }),

  reset: () => {
    if (interval) {
      clearInterval(interval);
      interval = null;
    }
    set({ match: matchService.getLiveMatch(), isTicking: false });
  },
}));
