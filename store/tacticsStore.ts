"use client";

import { create } from "zustand";
import type { FormationSlot, Player, TacticPreset } from "@/types";
import { buildSlots, createTacticDraft } from "@/lib/tactics/formations";

interface TacticsStore {
  presets: TacticPreset[];
  squad: Player[];
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
  setPrincipleScale: (key: TacticPreset["principles"][number]["key"], scale: number) => void;
  updateSetting: (key: string, value: string, sub?: string) => void;
  setMentality: (mentality: string) => void;
  setTeamFluidity: (fluidity: TacticPreset["teamFluidity"]) => void;
  setFreedom: (freedom: TacticPreset["freedom"]) => void;
  updateInstruction: (group: keyof TacticPreset["instructions"], index: number, value: string) => void;
  setFormation: (formation: string) => void;
  hydrateTactic: (tactic: TacticPreset, squad?: Player[]) => void;
}

const initialActive = createTacticDraft([]);
const presets = [initialActive];

export const useTacticsStore = create<TacticsStore>((set, get) => ({
  presets,
  squad: [],
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
    set((state) => ({ presets: state.presets.map((p) => p.id === activePresetId ? { ...p, slots: slots.map((s) => ({ ...s })) } : p) }));
  },

  setPrincipleScale: (key, scale) => set((state) => ({ presets: state.presets.map((p) => p.id !== state.activePresetId ? p : { ...p, principles: p.principles.map((principle) => principle.key === key ? { ...principle, scale, value: ["Low", "Measured", "Balanced", "Assertive", "High", "Maximum"][scale] } : principle) }) })),

  updateSetting: (key, value, sub) => set((state) => ({ presets: state.presets.map((p) => p.id !== state.activePresetId ? p : { ...p, settings: p.settings.map((setting) => setting.key === key ? { ...setting, value, sub: sub ?? value } : setting) }) })),

  setMentality: (mentality) => set((state) => ({ presets: state.presets.map((p) => p.id === state.activePresetId ? { ...p, mentality } : p) })),
  setTeamFluidity: (teamFluidity) => set((state) => ({ presets: state.presets.map((p) => p.id === state.activePresetId ? { ...p, teamFluidity } : p) })),
  setFreedom: (freedom) => set((state) => ({ presets: state.presets.map((p) => p.id === state.activePresetId ? { ...p, freedom } : p) })),
  updateInstruction: (group, index, value) => set((state) => ({ presets: state.presets.map((p) => p.id !== state.activePresetId ? p : { ...p, instructions: { ...p.instructions, [group]: p.instructions[group].map((instruction, instructionIndex) => instructionIndex === index ? value : instruction) } }) })),
  setFormation: (formation) => set((state) => { const slots = buildSlots(formation, state.squad, state.slots); return { presets: state.presets.map((p) => p.id === state.activePresetId ? { ...p, formation, slots } : p), slots }; }),
  hydrateTactic: (tactic, squad = []) => set({ presets: [tactic], squad, activePresetId: tactic.id, slots: tactic.slots.map((slot) => ({ ...slot })) }),
}));
