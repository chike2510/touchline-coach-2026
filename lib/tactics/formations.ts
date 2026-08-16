import type { FormationSlot, Player, TacticPreset } from "@/types";

export type FormationSlotDefinition = Pick<FormationSlot, "positionLabel" | "x" | "y" | "role" | "duty"> & { id: string };
export type FormationDefinition = { id: string; label: string; description: string; slots: FormationSlotDefinition[] };

export const formationCatalog: FormationDefinition[] = [
  { id: "4-3-3", label: "4-3-3", description: "One holding midfielder with wide forwards and a high front line.", slots: [
    { id: "gk", positionLabel: "GK", x: 50, y: 92, role: "GK", duty: "De" }, { id: "lb", positionLabel: "LB", x: 14, y: 74, role: "FB", duty: "Su" }, { id: "lcb", positionLabel: "CB", x: 36, y: 78, role: "BPD", duty: "De" }, { id: "rcb", positionLabel: "CB", x: 64, y: 78, role: "BPD", duty: "De" }, { id: "rb", positionLabel: "RB", x: 86, y: 74, role: "FB", duty: "Su" }, { id: "dm", positionLabel: "DM", x: 50, y: 60, role: "DM", duty: "De" }, { id: "lcm", positionLabel: "CM", x: 31, y: 49, role: "CM", duty: "Su" }, { id: "rcm", positionLabel: "CM", x: 69, y: 49, role: "CM", duty: "Su" }, { id: "lw", positionLabel: "LW", x: 14, y: 27, role: "IW", duty: "At" }, { id: "st", positionLabel: "ST", x: 50, y: 19, role: "AF", duty: "At" }, { id: "rw", positionLabel: "RW", x: 86, y: 27, role: "IW", duty: "At" },
  ] },
  { id: "4-2-3-1", label: "4-2-3-1", description: "Stable double pivot with a three-player attacking midfield line.", slots: [
    { id: "gk", positionLabel: "GK", x: 50, y: 92, role: "GK", duty: "De" }, { id: "lb", positionLabel: "LB", x: 14, y: 74, role: "FB", duty: "Su" }, { id: "lcb", positionLabel: "CB", x: 36, y: 78, role: "CD", duty: "De" }, { id: "rcb", positionLabel: "CB", x: 64, y: 78, role: "CD", duty: "De" }, { id: "rb", positionLabel: "RB", x: 86, y: 74, role: "FB", duty: "Su" }, { id: "ldm", positionLabel: "DM", x: 38, y: 59, role: "DM", duty: "De" }, { id: "rdm", positionLabel: "DM", x: 62, y: 59, role: "DLP", duty: "Su" }, { id: "lam", positionLabel: "AM", x: 18, y: 39, role: "AP", duty: "Su" }, { id: "cam", positionLabel: "AM", x: 50, y: 34, role: "AP", duty: "At" }, { id: "ram", positionLabel: "AM", x: 82, y: 39, role: "AP", duty: "Su" }, { id: "st", positionLabel: "ST", x: 50, y: 18, role: "AF", duty: "At" },
  ] },
  { id: "3-4-2-1", label: "3-4-2-1", description: "Three centre-backs, aggressive wing-backs, and two creators behind the striker.", slots: [
    { id: "gk", positionLabel: "GK", x: 50, y: 92, role: "SK", duty: "De" }, { id: "lcb", positionLabel: "CB", x: 25, y: 78, role: "CD", duty: "De" }, { id: "cb", positionLabel: "CB", x: 50, y: 81, role: "BPD", duty: "De" }, { id: "rcb", positionLabel: "CB", x: 75, y: 78, role: "CD", duty: "De" }, { id: "lwb", positionLabel: "LWB", x: 12, y: 55, role: "WB", duty: "Su" }, { id: "lcm", positionLabel: "CM", x: 38, y: 56, role: "CM", duty: "Su" }, { id: "rcm", positionLabel: "CM", x: 62, y: 56, role: "CM", duty: "Su" }, { id: "rwb", positionLabel: "RWB", x: 88, y: 55, role: "WB", duty: "Su" }, { id: "lam", positionLabel: "AM", x: 35, y: 32, role: "AP", duty: "At" }, { id: "ram", positionLabel: "AM", x: 65, y: 32, role: "AP", duty: "At" }, { id: "st", positionLabel: "ST", x: 50, y: 17, role: "PF", duty: "At" },
  ] },
];

const roleFallback: Record<string, { role: string; duty: FormationSlot["duty"] }> = { GK: { role: "GK", duty: "De" }, CB: { role: "CD", duty: "De" }, LB: { role: "FB", duty: "Su" }, RB: { role: "FB", duty: "Su" }, LWB: { role: "WB", duty: "Su" }, RWB: { role: "WB", duty: "Su" }, DM: { role: "DM", duty: "De" }, CM: { role: "CM", duty: "Su" }, AM: { role: "AP", duty: "Su" }, LW: { role: "W", duty: "At" }, RW: { role: "W", duty: "At" }, ST: { role: "AF", duty: "At" } };

export function getFormation(id: string) { return formationCatalog.find((formation) => formation.id === id) ?? formationCatalog[0]; }

export function buildSlots(formationId: string, squad: Player[], previousSlots: FormationSlot[] = []): FormationSlot[] {
  const formation = getFormation(formationId);
  const used = new Set<string>();
  return formation.slots.map((definition) => {
    const previous = previousSlots.find((slot) => slot.id === definition.id);
    const candidates = squad.filter((player) => player.position === definition.positionLabel && !used.has(player.id));
    const player = previous?.playerId ? squad.find((candidate) => candidate.id === previous.playerId) : undefined;
    const assigned = player ?? candidates[0];
    if (assigned) used.add(assigned.id);
    const fallback = roleFallback[definition.positionLabel] ?? { role: definition.role, duty: definition.duty };
    return { ...definition, role: previous?.role ?? definition.role ?? fallback.role, duty: previous?.duty ?? definition.duty ?? fallback.duty, playerId: assigned?.id ?? "" };
  });
}

export function createTacticDraft(squad: Player[], formationId = formationCatalog[0].id): TacticPreset {
  const formation = getFormation(formationId);
  return { id: "career-tactic", name: "Current tactic", formation: formation.id, mentality: "Balanced", isActive: true, familiarity: 0, chemistry: 0, slots: buildSlots(formation.id, squad), settings: [
    { key: "buildUp", icon: "layers", label: "Build-Up", value: "Patient Build-Up", sub: "Choose approach" }, { key: "restDefence", icon: "shield", label: "Rest Defence", value: "Balanced Rest Defence", sub: "Choose structure" }, { key: "progression", icon: "route", label: "Progression", value: "Progress Through Center", sub: "Choose passing" }, { key: "pressing", icon: "activity", label: "Pressing", value: "Hybrid Press", sub: "Choose block" }, { key: "tempo", icon: "gauge", label: "Tempo", value: "Controlled Tempo", sub: "Choose speed" }, { key: "finalThird", icon: "target", label: "Final Third", value: "Work Ball Into Box", sub: "Choose chance creation" }, { key: "transition", icon: "shuffle", label: "Transition", value: "Counter-Press", sub: "On Loss" }, { key: "risk", icon: "alert", label: "Risk Level", value: "Balanced", sub: "3/5 Risk" }, { key: "freedom", icon: "users", label: "Freedom", value: "Balanced", sub: "Flexible Player Freedom" },
  ], principles: ["buildUp", "chanceCreation", "width", "attackingFocus", "defending", "lineHeight"].map((key) => ({ key: key as TacticPreset["principles"][number]["key"], label: key === "buildUp" ? "Build-Up" : key === "chanceCreation" ? "Chance Creation" : key === "attackingFocus" ? "Attacking Focus" : key === "lineHeight" ? "Line Height" : key[0].toUpperCase() + key.slice(1), value: "Balanced", scale: 3 })), instructions: { inPossession: [], inTransition: [], outOfPossession: [] }, riskLevel: 3, freedom: "Balanced", teamFluidity: "Balanced" };
}
