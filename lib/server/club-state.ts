import { clubService } from "@/services";
import type { ClubOverview, Player } from "@/types";
import { getAppState } from "@/lib/server/state";

const clamp = (value: number, min = 0, max = 100) => Math.max(min, Math.min(max, Math.round(value)));
const moraleScore: Record<Player["morale"], number> = { Excellent: 95, "Very Good": 88, Good: 80, Okay: 68, Poor: 48, "Very Poor": 28 };

export function getClubState(): ClubOverview {
  const base = clubService.getClubOverview();
  const state = getAppState();
  const squad = state.squad;
  const adjustments = state.clubAdjustments;
  const wages = squad.reduce((sum, player) => sum + player.wage, 0);
  const squadValue = squad.reduce((sum, player) => sum + player.value, 0);
  const averageAge = squad.length ? Number((squad.reduce((sum, player) => sum + player.age, 0) / squad.length).toFixed(1)) : 0;
  const averageMorale = squad.length ? squad.reduce((sum, player) => sum + moraleScore[player.morale], 0) / squad.length : 0;
  const fitnessPenalty = squad.length ? squad.reduce((sum, player) => sum + Math.max(0, 70 - player.fitness), 0) / squad.length : 0;
  const squadMorale = clamp(averageMorale - fitnessPenalty * 0.2 + adjustments.morale);
  const boardConfidence = clamp(base.boardConfidence + adjustments.board + (squadMorale - 70) * 0.12);
  const balance = base.finances.balance + adjustments.balance;
  const wageBudget = base.finances.wageBudget;
  const transferBudget = Math.max(0, Math.round(balance * 0.35));
  const goalkeepers = squad.filter((player) => player.position === "GK").length;
  const defenders = squad.filter((player) => ["CB", "LB", "RB", "LWB", "RWB"].includes(player.position)).length;
  const midfielders = squad.filter((player) => ["DM", "CM", "AM", "LW", "RW"].includes(player.position)).length;
  const forwards = squad.filter((player) => player.position === "ST").length;
  const keyPlayers = [...squad].sort((a, b) => b.overall - a.overall).slice(0, 5).map((player) => ({ id: player.id, name: player.name, position: player.position, number: player.number, rating: player.overall, photoUrl: player.photoUrl }));
  const topEarner = [...squad].sort((a, b) => b.wage - a.wage)[0];
  const foreignPlayers = squad.filter((player) => player.nationality !== base.country).length;
  const finances = { ...base.finances, balance, transferBudget, wageBudgetUsed: wages, profitLoss: base.finances.profitLoss + adjustments.balance, annualRevenue: base.annualRevenue, annualExpenditure: base.annualRevenue - base.finances.profitLoss };
  return { ...base, finances, boardConfidence, squadMorale, keyPlayers, squad: { ...base.squad, totalPlayers: squad.length, goalkeepers, defenders, midfielders, forwards, averageAge, foreignPlayers, foreignPlayersPct: squad.length ? Math.round((foreignPlayers / squad.length) * 100) : 0, squadValue, topEarner: topEarner ? { name: topEarner.name, wage: topEarner.wage } : { name: "No roster data", wage: 0 } } };
}

export function applyClubAdjustment(adjustment: Partial<{ balance: number; morale: number; board: number }>) {
  const state = getAppState();
  state.clubAdjustments = { ...state.clubAdjustments, ...Object.fromEntries(Object.entries(adjustment).map(([key, value]) => [key, (state.clubAdjustments[key as keyof typeof state.clubAdjustments] ?? 0) + Number(value)])) };
  return getClubState();
}
