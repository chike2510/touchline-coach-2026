"use client";

import { Header } from "@/components/navigation/Header";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { StatCard } from "@/components/ui/StatCard";
import { useClubState } from "@/hooks";
import { EmptyState } from "@/components/ui/EmptyState";
import { RefreshCcw } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { motion } from "framer-motion";
import { CheckCircle2, Circle, Trophy, Users2 } from "lucide-react";

export default function ClubOverviewPage() {
  const { club, isLoading, error, refresh, mutate } = useClubState();
  if (isLoading) return <div><Header title="CLUB OVERVIEW" subtitle="Loading club state" showBack /><div className="space-y-4 px-4 py-4"><div className="shimmer h-44 rounded-2xl" /><div className="shimmer h-36 rounded-2xl" /><div className="shimmer h-56 rounded-2xl" /></div></div>;
  if (error || !club) return <div><Header title="CLUB OVERVIEW" subtitle="Club state unavailable" showBack /><EmptyState icon={<RefreshCcw className="h-7 w-7" />} title="Club overview unavailable" description={error ?? "No club state exists yet."} action={<button onClick={() => void refresh()} className="rounded-xl bg-accent-lime px-4 py-2 text-xs font-bold text-surface-0">Try again</button>} /></div>;

  return (
    <div>
      <Header title="CLUB OVERVIEW" subtitle="Everything about your club at a glance" showBack />

      <div className="px-4 py-4 space-y-4">
        <Card>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-surface-200 text-xl font-bold text-surface-500">{club.name.split(" ").map((word) => word[0]).join("").slice(0, 3).toUpperCase()}</div>
            <div className="flex-1">
              <h2 className="text-base font-bold text-surface-950">{club.name}</h2>
              <p className="text-2xs text-surface-600">{club.country} • {club.status}</p>
              <p className="text-2xs text-surface-600">Founded {club.founded}</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center">
              <p className="text-sm font-bold text-surface-300">{club.league}</p>
              <p className="text-2xs text-surface-600">Position {club.leaguePosition}</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-bold text-surface-300">{(club.seasonTicketHolders / 1000).toFixed(0)}K</p>
              <p className="text-2xs text-surface-600">Season Tickets</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-bold text-pitch-400">{formatCurrency(club.clubValue)}</p>
              <p className="text-2xs text-surface-600">Club Value</p>
            </div>
          </div>
        </Card>

        <Card padding="none" className="overflow-hidden">
          <div className="h-28 bg-gradient-to-br from-surface-200 to-surface-300" />
          <div className="p-4">
            <h3 className="text-sm font-bold text-surface-300 mb-2">{club.stadium.name}</h3>
            <div className="grid grid-cols-2 gap-2 text-2xs">
              <div><span className="text-surface-600">Capacity</span><p className="font-bold text-surface-300">{club.stadium.capacity.toLocaleString()}</p></div>
              <div><span className="text-surface-600">Condition</span><p className="font-bold text-pitch-400">{club.stadium.condition}</p></div>
              <div><span className="text-surface-600">Year Built</span><p className="font-bold text-surface-300">{club.stadium.yearBuilt}</p></div>
              <div><span className="text-surface-600">Expansion</span><p className="font-bold text-surface-300">{club.stadium.expansionPlanned ? "Planned" : "No"}</p></div>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-3 gap-3">
          <StatCard label="Board" value={club.boardConfidence} color="lime" />
          <StatCard label="Morale" value={club.squadMorale} color="lime" />
          <StatCard label="Balance" value={formatCurrency(club.finances.balance)} color="lime" />
        </div>

        <Card>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-surface-300">Financial Summary</h3>
          </div>
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div><p className="text-2xs text-surface-600">Profit / Loss</p><p className="text-sm font-bold text-pitch-400">+{formatCurrency(club.finances.profitLoss)}</p></div>
            <div><p className="text-2xs text-surface-600">Transfer Budget</p><p className="text-sm font-bold text-surface-300">{formatCurrency(club.finances.transferBudget)}</p></div>
          </div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-2xs text-surface-600">Wage Budget</span>
            <span className="text-2xs font-bold text-surface-400">{formatCurrency(club.finances.wageBudgetUsed)} / {formatCurrency(club.finances.wageBudget)}</span>
          </div>
          <ProgressBar value={club.finances.wageBudgetUsed} max={club.finances.wageBudget} size="sm" />
          <div className="mt-4 flex flex-wrap gap-2 border-t border-surface-200/40 pt-3"><button onClick={() => void mutate({ morale: 2 })} className="rounded-lg border border-surface-400 bg-surface-100 px-3 py-2 text-2xs font-semibold text-surface-700">Record morale boost</button><button onClick={() => void mutate({ balance: 250000 })} className="rounded-lg border border-surface-400 bg-surface-100 px-3 py-2 text-2xs font-semibold text-surface-700">Record revenue</button></div>
        </Card>

        <Card>
          <div className="flex items-center gap-2 mb-3">
            <Users2 className="w-4 h-4 text-surface-500" />
            <h3 className="text-sm font-bold text-surface-300">Squad Overview</h3>
          </div>
          <div className="grid grid-cols-4 gap-2 text-center mb-3">
            <div><p className="text-lg font-bold text-surface-300">{club.squad.goalkeepers}</p><p className="text-[10px] text-surface-600">GK</p></div>
            <div><p className="text-lg font-bold text-surface-300">{club.squad.defenders}</p><p className="text-[10px] text-surface-600">DEF</p></div>
            <div><p className="text-lg font-bold text-surface-300">{club.squad.midfielders}</p><p className="text-[10px] text-surface-600">MID</p></div>
            <div><p className="text-lg font-bold text-surface-300">{club.squad.forwards}</p><p className="text-[10px] text-surface-600">FWD</p></div>
          </div>
          <div className="grid grid-cols-2 gap-2 text-2xs pt-3 border-t border-surface-200/40">
            <div><span className="text-surface-600">Average Age</span><p className="font-bold text-surface-300">{club.squad.averageAge}</p></div>
            <div><span className="text-surface-600">Squad Value</span><p className="font-bold text-pitch-400">{formatCurrency(club.squad.squadValue)}</p></div>
            <div><span className="text-surface-600">Foreign Players</span><p className="font-bold text-surface-300">{club.squad.foreignPlayers} ({club.squad.foreignPlayersPct}%)</p></div>
            <div><span className="text-surface-600">Top Earner</span><p className="font-bold text-surface-300 truncate">{club.squad.topEarner.name}</p></div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-2 mb-3">
            <Trophy className="w-4 h-4 text-accent-amber" />
            <h3 className="text-sm font-bold text-surface-300">Club Honours</h3>
          </div>
          <div className="grid grid-cols-4 gap-2 text-center mb-3">
            {club.honors.map((h) => (
              <div key={h.label}>
                <p className="text-lg font-bold text-surface-300">{h.count}</p>
                <p className="text-[9px] text-surface-600 leading-tight">{h.label}</p>
              </div>
            ))}
          </div>
          <div className="pt-3 border-t border-surface-200/40 space-y-1">
            {club.otherHonors.map((h) => (
              <div key={h.label} className="flex items-center justify-between text-2xs">
                <span className="text-surface-500">{h.label}</span>
                <span className="font-semibold text-surface-300">{h.count}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h3 className="text-sm font-bold text-surface-300 mb-3">Club Vision</h3>
          <div className="space-y-3">
            {club.vision.map((v) => (
              <div key={v.term} className="flex items-start gap-2.5">
                {v.status === "On Track" ? (
                  <CheckCircle2 className="w-4 h-4 text-pitch-400 mt-0.5 shrink-0" />
                ) : (
                  <Circle className="w-4 h-4 text-accent-amber mt-0.5 shrink-0" />
                )}
                <div className="flex-1">
                  <p className="text-2xs font-bold text-surface-500 uppercase tracking-wide">{v.term}</p>
                  <p className="text-xs text-surface-300">{v.goal}</p>
                </div>
                <Badge variant={v.status === "On Track" ? "lime" : "amber"} size="sm">{v.status}</Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h3 className="text-sm font-bold text-surface-300 mb-3">Key Players</h3>
          <div className="space-y-2">
            {club.keyPlayers.map((p) => (
              <div key={p.id} className="flex items-center justify-between py-1.5 border-b border-surface-200/30 last:border-0">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-surface-200 flex items-center justify-center text-2xs font-bold text-surface-500">{p.number}</div>
                  <div>
                    <p className="text-xs font-semibold text-surface-300">{p.name}</p>
                    <p className="text-2xs text-surface-600">{p.position}</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-pitch-400">{p.rating}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h3 className="text-sm font-bold text-surface-300 mb-3">Latest News</h3>
          <div className="space-y-3">
            {club.news.map((n, i) => (
              <motion.div key={n.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="flex gap-3">
                <div className="w-12 h-12 rounded-xl bg-surface-200 shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-surface-300">{n.title}</p>
                  <p className="text-2xs text-surface-600">{n.timeAgo}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>

        <Card>
          <h3 className="text-sm font-bold text-surface-300 mb-3">Club Partners</h3>
          <div className="grid grid-cols-2 gap-2">
            {club.partners.map((p) => (
              <div key={p.name} className="p-2.5 rounded-xl bg-surface-200/60">
                <p className="text-xs font-bold text-surface-300">{p.name}</p>
                <p className="text-[10px] text-surface-600">{p.tier}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
