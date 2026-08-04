"use client";

import { create } from "zustand";
import { tacticsService } from "@/services";
import type { FormationSlot, TacticPreset } from "@/types";

interface TacticsStore {
  presets: TacticPreset[];
  activePresetId: string;
  slots: FormationSlot[];
  selectedSlotId: string | null;
  isDragging: boolean;
  setActivePreset: (id: string) => void;
  selectSlot: (id: string | null) => void;
  moveSlot: (id: string, x: number, y: number) => void;
  setSlotRole: (id: string, role: string) => void;
  setSlotDuty: (id: string, duty: FormationSlot["duty"]) => void;
  setDragging: (dragging: boolean) => void;
  resetActivePreset: () => void;
  saveActivePreset: () => void;
}

const presets = tacticsService.getTacticPresets();
const initialActive = presets.find((p) => p.isActive) ?? presets[0];

export const useTacticsStore = create<TacticsStore>((set, get) => ({
  presets,
  activePresetId: initialActive.id,
  slots: initialActive.slots.map((s) => ({ ...s })),
  selectedSlotId: null,
  isDragging: false,

  setActivePreset: (id) => {
    const preset = get().presets.find((p) => p.id === id);
    if (!preset) return;
    set({ activePresetId: id, slots: preset.slots.map((s) => ({ ...s })), selectedSlotId: null });
  },

  selectSlot: (id) => set({ selectedSlotId: id }),

  moveSlot: (id, x, y) =>
    set((state) => ({
      slots: state.slots.map((s) =>
        s.id === id
          ? { ...s, x: Math.min(96, Math.max(4, x)), y: Math.min(94, Math.max(4, y)) }
          : s
      ),
    })),

  setSlotRole: (id, role) =>
    set((state) => ({ slots: state.slots.map((s) => (s.id === id ? { ...s, role } : s)) })),

  setSlotDuty: (id, duty) =>
    set((state) => ({ slots: state.slots.map((s) => (s.id === id ? { ...s, duty } : s)) })),

  setDragging: (dragging) => set({ isDragging: dragging }),

  resetActivePreset: () => {
    const preset = get().presets.find((p) => p.id === get().activePresetId);
    if (!preset) return;
    set({ slots: preset.slots.map((s) => ({ ...s })) });
  },

  saveActivePreset: () => {
    const { activePresetId, slots } = get();
    set((state) => ({
      presets: state.presets.map((p) =>
        p.id === activePresetId ? { ...p, slots: slots.map((s) => ({ ...s })) } : p
      ),
    }));
  },
}));
