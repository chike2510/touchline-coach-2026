"use client";

import { Header } from "@/components/navigation/Header";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { SearchBar } from "@/components/ui/SearchBar";
import { FilterSheet } from "@/components/ui/FilterSheet";
import { EmptyState } from "@/components/ui/EmptyState";
import { PlayerCard } from "@/features/squad/PlayerCard";
import { useSquad, useDisclosure } from "@/hooks";
import { Grid3x3, List, SlidersHorizontal, Users } from "lucide-react";
import { useMemo, useState } from "react";

const tabs = [
  { label: "First Team", value: "first" },
  { label: "Injured", value: "injured" },
];

const positionGroups = ["GK", "CB", "LB", "RB", "DM", "CM", "AM", "LW", "RW", "ST"];

export default function SquadPage() {
  const squad = useSquad();
  const [activeTab, setActiveTab] = useState("first");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [query, setQuery] = useState("");
  const [positions, setPositions] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<"overall" | "age" | "name">("overall");
  const filterSheet = useDisclosure();

  const filtered = useMemo(() => {
    let list = squad;
    if (activeTab === "injured") list = list.filter((p) => p.injuryRisk === "High" && p.fitness < 65);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q) || p.position.toLowerCase().includes(q));
    }
    if (positions.length > 0) list = list.filter((p) => positions.includes(p.position));
    return [...list].sort((a, b) => {
      if (sortBy === "overall") return b.overall - a.overall;
      if (sortBy === "age") return a.age - b.age;
      return a.name.localeCompare(b.name);
    });
  }, [squad, activeTab, query, positions, sortBy]);

  return (
    <div>
      <Header title="SQUAD" subtitle={`Manchester United • ${squad.length} Players`} />

      <div className="px-4 py-4 space-y-4">
        <SegmentedControl options={tabs} value={activeTab} onChange={setActiveTab} />

        <div className="flex items-center gap-2">
          <SearchBar value={query} onChange={setQuery} placeholder="Search players…" className="flex-1" />
          <button
            onClick={filterSheet.open}
            className="relative h-10 w-10 shrink-0 rounded-xl bg-surface-200 flex items-center justify-center"
            aria-label="Filters"
          >
            <SlidersHorizontal className="w-4 h-4 text-surface-500" />
            {positions.length > 0 && <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-pitch-500" />}
          </button>
          <div className="flex shrink-0 rounded-xl bg-surface-200 p-1">
            <button onClick={() => setView("grid")} className={`p-1.5 rounded-lg ${view === "grid" ? "bg-pitch-600" : ""}`}>
              <Grid3x3 className={`w-4 h-4 ${view === "grid" ? "text-surface-0" : "text-surface-500"}`} />
            </button>
            <button onClick={() => setView("list")} className={`p-1.5 rounded-lg ${view === "list" ? "bg-pitch-600" : ""}`}>
              <List className={`w-4 h-4 ${view === "list" ? "text-surface-0" : "text-surface-500"}`} />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-2xs text-surface-600">{filtered.length} players</span>
          <div className="flex gap-1.5">
            {(["overall", "age", "name"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setSortBy(s)}
                className={`px-2.5 py-1 rounded-lg text-2xs font-semibold capitalize ${
                  sortBy === s ? "bg-pitch-500/15 text-pitch-400" : "text-surface-600"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <EmptyState icon={<Users className="w-7 h-7" />} title="No players found" description="Try adjusting your search or filters." />
        ) : view === "grid" ? (
          <div className="grid grid-cols-2 gap-3">
            {filtered.map((p, i) => <PlayerCard key={p.id} player={p} index={i} view="grid" />)}
          </div>
        ) : (
          <div className="space-y-2">
            {filtered.map((p, i) => <PlayerCard key={p.id} player={p} index={i} view="list" />)}
          </div>
        )}
      </div>

      <FilterSheet
        isOpen={filterSheet.isOpen}
        onClose={filterSheet.close}
        groups={[
          {
            label: "Position",
            options: positionGroups,
            selected: positions,
            onToggle: (opt) => setPositions((prev) => (prev.includes(opt) ? prev.filter((p) => p !== opt) : [...prev, opt])),
          },
        ]}
        onReset={() => setPositions([])}
      />
    </div>
  );
}
