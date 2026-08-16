"use client";

import { Header } from "@/components/navigation/Header";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { SearchBar } from "@/components/ui/SearchBar";
import { FilterSheet } from "@/components/ui/FilterSheet";
import { EmptyState } from "@/components/ui/EmptyState";
import { PlayerCard } from "@/features/squad/PlayerCard";
import { useDisclosure, useSquad, type SquadStatus } from "@/hooks";
import { Activity, Grid3x3, List, RefreshCcw, SlidersHorizontal, Users } from "lucide-react";
import { useMemo, useState } from "react";

const tabs = [{ label: "First Team", value: "all" }, { label: "Injured", value: "injured" }];
const positionGroups = ["GK", "CB", "LB", "RB", "LWB", "RWB", "DM", "CM", "AM", "LW", "RW", "ST"];

export default function SquadPage() {
  const [activeTab, setActiveTab] = useState<SquadStatus>("all");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [query, setQuery] = useState("");
  const [positions, setPositions] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<"overall" | "age" | "name">("overall");
  const filterSheet = useDisclosure();
  const { players, isLoading, error, refresh } = useSquad({ query, positions, status: activeTab });

  const orderedPlayers = useMemo(() => [...players].sort((a, b) => sortBy === "overall" ? b.overall - a.overall : sortBy === "age" ? a.age - b.age : a.name.localeCompare(b.name)), [players, sortBy]);
  const averageOverall = players.length ? Math.round(players.reduce((total, player) => total + player.overall, 0) / players.length) : 0;
  const averageFitness = players.length ? Math.round(players.reduce((total, player) => total + player.fitness, 0) / players.length) : 0;

  return <div><Header title="SQUAD" subtitle={`${players.length} players in current view`} /><div className="mx-auto max-w-[1400px] px-4 py-5 sm:px-6 lg:px-8"><SegmentedControl options={tabs} value={activeTab} onChange={(value) => setActiveTab(value as SquadStatus)} /><div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3"><div className="mockup-panel p-4"><p className="text-[10px] uppercase tracking-wider text-surface-600">Players shown</p><p className="mt-2 text-2xl font-bold text-surface-950">{isLoading ? "—" : players.length}</p></div><div className="mockup-panel p-4"><p className="text-[10px] uppercase tracking-wider text-surface-600">Average overall</p><p className="mt-2 text-2xl font-bold text-accent-lime">{isLoading ? "—" : averageOverall || "—"}</p></div><div className="mockup-panel col-span-2 p-4 sm:col-span-1"><p className="text-[10px] uppercase tracking-wider text-surface-600">Average fitness</p><p className="mt-2 flex items-center gap-2 text-2xl font-bold text-accent-purple">{isLoading ? "—" : averageFitness ? `${averageFitness}%` : "—"}<Activity className="h-4 w-4" /></p></div></div><div className="mt-5 flex items-center gap-2"><SearchBar value={query} onChange={setQuery} placeholder="Search by name, position, or role…" className="flex-1" /><button onClick={filterSheet.open} className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-surface-400 bg-surface-100" aria-label="Filters"><SlidersHorizontal className="h-4 w-4 text-surface-700" />{positions.length > 0 && <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-accent-lime" />}</button><div className="flex shrink-0 rounded-xl border border-surface-400 bg-surface-100 p-1"><button onClick={() => setView("grid")} className={`rounded-lg p-1.5 ${view === "grid" ? "bg-accent-lime text-surface-0" : "text-surface-600"}`} aria-label="Grid view"><Grid3x3 className="h-4 w-4" /></button><button onClick={() => setView("list")} className={`rounded-lg p-1.5 ${view === "list" ? "bg-accent-lime text-surface-0" : "text-surface-600"}`} aria-label="List view"><List className="h-4 w-4" /></button></div></div><div className="mt-4 flex items-center justify-between"><span className="text-xs text-surface-600">{isLoading ? "Loading squad…" : `${orderedPlayers.length} results`}</span><div className="flex gap-1.5">{(["overall", "age", "name"] as const).map((sort) => <button key={sort} onClick={() => setSortBy(sort)} className={`rounded-lg px-2.5 py-1 text-2xs font-semibold capitalize ${sortBy === sort ? "bg-accent-lime/15 text-accent-lime" : "text-surface-600"}`}>{sort}</button>)}</div></div>{isLoading ? <div className={view === "grid" ? "mt-3 grid grid-cols-2 gap-3 lg:grid-cols-4" : "mt-3 space-y-2"}>{Array.from({ length: view === "grid" ? 8 : 5 }).map((_, index) => <div key={index} className={`shimmer rounded-2xl ${view === "grid" ? "h-52" : "h-20"}`} />)}</div> : error ? <EmptyState icon={<RefreshCcw className="h-7 w-7" />} title="Squad unavailable" description={error} action={<button onClick={() => void refresh()} className="rounded-xl bg-accent-lime px-4 py-2 text-xs font-bold text-surface-0">Try again</button>} /> : orderedPlayers.length === 0 ? <EmptyState icon={<Users className="h-7 w-7" />} title={activeTab === "injured" ? "No injured players" : "No players found"} description={query || positions.length ? "Try adjusting the search or filters." : "The current club has no roster data yet."} /> : view === "grid" ? <div className="mt-3 grid grid-cols-2 gap-3 lg:grid-cols-4">{orderedPlayers.map((player, index) => <PlayerCard key={player.id} player={player} index={index} view="grid" />)}</div> : <div className="mt-3 space-y-2">{orderedPlayers.map((player, index) => <PlayerCard key={player.id} player={player} index={index} view="list" />)}</div>}</div><FilterSheet isOpen={filterSheet.isOpen} onClose={filterSheet.close} groups={[{ label: "Position", options: positionGroups, selected: positions, onToggle: (option) => setPositions((current) => current.includes(option) ? current.filter((position) => position !== option) : [...current, option]) }]} onReset={() => setPositions([])} /></div>;
}
