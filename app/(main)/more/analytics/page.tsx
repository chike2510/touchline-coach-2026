"use client";

import { Header } from "@/components/navigation/Header";
import { Card } from "@/components/ui/Card";
import { StatCard } from "@/components/ui/StatCard";
import { HeatMapPlaceholder } from "@/components/ui/HeatMapPlaceholder";
import { analyticsService } from "@/services";
import { LineChart, Line, ResponsiveContainer, XAxis, Tooltip } from "recharts";
import { motion } from "framer-motion";

export default function AnalyticsPage() {
  const a = analyticsService.getTeamAnalytics();

  return (
    <div>
      <Header title="ANALYTICS" subtitle="This Season · Jul 2025 – May 2026" showBack />

      <div className="px-4 py-4 space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <StatCard label="Win %" value={`${a.winPct}%`} color="lime" />
          <StatCard label="Goals For" value={a.goalsFor} color="lime" />
          <StatCard label="Goals Against" value={a.goalsAgainst} color="red" />
          <StatCard label="xG For" value={a.xgFor} color="lime" />
          <StatCard label="xG Against" value={a.xgAgainst} color="red" />
          <StatCard label="Points/Game" value={a.pointsPerGame} />
        </div>

        <Card>
          <h3 className="text-sm font-bold text-surface-300 mb-1">Performance Over Time</h3>
          <p className="text-2xs text-surface-600 mb-3">Cumulative points vs cumulative xG</p>
          <div style={{ width: "100%", height: 160 }}>
            <ResponsiveContainer>
              <LineChart data={a.performanceOverTime}>
                <XAxis dataKey="month" tick={{ fill: "#737373", fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "#171717", border: "1px solid #262626", borderRadius: 8, fontSize: 11 }} />
                <Line type="monotone" dataKey="points" stroke="#a3e635" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="xg" stroke="#525252" strokeWidth={1.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <h3 className="text-sm font-bold text-surface-300 mb-2">Results Breakdown</h3>
          <div className="flex items-center gap-4">
            <div className="relative w-20 h-20 rounded-full shrink-0" style={{
              background: `conic-gradient(#a3e635 0% ${(a.wins / a.matches) * 100}%, #525252 ${(a.wins / a.matches) * 100}% ${((a.wins + a.draws) / a.matches) * 100}%, #ef4444 ${((a.wins + a.draws) / a.matches) * 100}% 100%)`,
            }}>
              <div className="absolute inset-2 rounded-full bg-surface-100 flex items-center justify-center text-sm font-bold text-surface-300">{a.matches}</div>
            </div>
            <div className="space-y-1 text-2xs flex-1">
              <div className="flex justify-between"><span className="text-pitch-400">● Wins</span><span className="font-bold text-surface-300">{a.wins}</span></div>
              <div className="flex justify-between"><span className="text-surface-500">● Draws</span><span className="font-bold text-surface-300">{a.draws}</span></div>
              <div className="flex justify-between"><span className="text-accent-red">● Losses</span><span className="font-bold text-surface-300">{a.losses}</span></div>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-2 gap-3">
          <Card>
            <h4 className="text-2xs font-bold text-surface-500 uppercase tracking-wide mb-2">Attacking</h4>
            <div className="space-y-1.5 text-2xs">
              <div className="flex justify-between"><span className="text-surface-600">Goals/90</span><span className="font-bold text-surface-300">{a.attacking.goalsPer90}</span></div>
              <div className="flex justify-between"><span className="text-surface-600">Shots/90</span><span className="font-bold text-surface-300">{a.attacking.shotsPer90}</span></div>
              <div className="flex justify-between"><span className="text-surface-600">On Target %</span><span className="font-bold text-surface-300">{a.attacking.shotsOnTargetPct}%</span></div>
              <div className="flex justify-between"><span className="text-surface-600">Conversion</span><span className="font-bold text-surface-300">{a.attacking.conversionRate}%</span></div>
              <div className="flex justify-between"><span className="text-surface-600">Big Chances/90</span><span className="font-bold text-surface-300">{a.attacking.bigChancesPer90}</span></div>
            </div>
          </Card>
          <Card>
            <h4 className="text-2xs font-bold text-surface-500 uppercase tracking-wide mb-2">Defending</h4>
            <div className="space-y-1.5 text-2xs">
              <div className="flex justify-between"><span className="text-surface-600">Conceded/90</span><span className="font-bold text-surface-300">{a.defending.concededPer90}</span></div>
              <div className="flex justify-between"><span className="text-surface-600">Shots Against/90</span><span className="font-bold text-surface-300">{a.defending.shotsAgainstPer90}</span></div>
              <div className="flex justify-between"><span className="text-surface-600">Clean Sheet %</span><span className="font-bold text-surface-300">{a.defending.cleanSheetPct}%</span></div>
              <div className="flex justify-between"><span className="text-surface-600">Tackles/90</span><span className="font-bold text-surface-300">{a.defending.tacklesPer90}</span></div>
              <div className="flex justify-between"><span className="text-surface-600">Interceptions/90</span><span className="font-bold text-surface-300">{a.defending.interceptionsPer90}</span></div>
            </div>
          </Card>
        </div>

        <Card>
          <h3 className="text-sm font-bold text-surface-300 mb-3">Possession</h3>
          <div className="flex items-center gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-pitch-400">{a.possessionPct}%</p>
              <p className="text-2xs text-surface-600">Avg Possession</p>
            </div>
            <div className="flex-1 space-y-1.5 text-2xs">
              <div className="flex justify-between"><span className="text-surface-600">Pass Accuracy</span><span className="font-bold text-surface-300">{a.passAccuracyPct}%</span></div>
              <div className="flex justify-between"><span className="text-surface-600">Passes/90</span><span className="font-bold text-surface-300">{a.passesPer90}</span></div>
              <div className="flex justify-between"><span className="text-surface-600">Progressive Passes/90</span><span className="font-bold text-surface-300">{a.progressivePassesPer90}</span></div>
            </div>
          </div>
        </Card>

        <Card>
          <h3 className="text-sm font-bold text-surface-300 mb-2">Attacking Zones</h3>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-3 rounded-xl bg-surface-200/60"><p className="text-lg font-bold text-surface-300">{a.attackingZones.left}%</p><p className="text-2xs text-surface-600">Left</p></div>
            <div className="p-3 rounded-xl bg-pitch-500/10 border border-pitch-500/20"><p className="text-lg font-bold text-pitch-400">{a.attackingZones.centre}%</p><p className="text-2xs text-surface-600">Centre</p></div>
            <div className="p-3 rounded-xl bg-surface-200/60"><p className="text-lg font-bold text-surface-300">{a.attackingZones.right}%</p><p className="text-2xs text-surface-600">Right</p></div>
          </div>
        </Card>

        <Card>
          <h3 className="text-sm font-bold text-surface-300 mb-3">Attacking Heat Map</h3>
          <HeatMapPlaceholder />
        </Card>

        <Card>
          <h3 className="text-sm font-bold text-surface-300 mb-3">Player Impact Ranking</h3>
          <div className="space-y-2">
            {a.playerImpact.map((p, i) => (
              <motion.div key={p.playerId} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} className="flex items-center gap-3">
                <span className="text-2xs font-bold text-surface-600 w-4">{i + 1}</span>
                <div className="w-8 h-8 rounded-lg bg-surface-200 flex items-center justify-center text-2xs font-bold text-surface-500">{p.name[0]}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-surface-300 truncate">{p.name}</p>
                  <p className="text-2xs text-surface-600">{p.position}</p>
                </div>
                <div className="w-24 h-1.5 rounded-full bg-surface-300 overflow-hidden">
                  <div className="h-full bg-pitch-500" style={{ width: `${p.score}%` }} />
                </div>
                <span className="text-xs font-bold text-pitch-400 w-8 text-right">{p.score}</span>
              </motion.div>
            ))}
          </div>
        </Card>

        <Card>
          <h3 className="text-sm font-bold text-surface-300 mb-3">Team Trends (Last 10)</h3>
          <div className="grid grid-cols-2 gap-y-2">
            {a.trends.map((t) => (
              <div key={t.label} className="flex items-center justify-between pr-3">
                <span className="text-2xs text-surface-600">{t.label}</span>
                <div className="flex items-center gap-1">
                  <span className="text-xs font-bold text-surface-300">{t.value}</span>
                  <span className={`text-[10px] font-bold ${t.positive ? "text-pitch-400" : "text-accent-red"}`}>
                    {t.changePct > 0 ? "↑" : "↓"}{Math.abs(t.changePct)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
