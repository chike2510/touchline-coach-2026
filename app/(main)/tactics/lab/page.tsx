"use client";

import { Header } from "@/components/navigation/Header";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { RadarChart } from "@/components/ui/RadarChart";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { Avatar } from "@/components/ui/Avatar";
import { tacticsService } from "@/services";
import { motion } from "framer-motion";
import { Play, Share2 } from "lucide-react";
import { useState } from "react";

const tabs = [
  { label: "Builder", value: "builder" },
  { label: "Simulator", value: "simulator" },
];

export default function TacticalLabPage() {
  const [tab, setTab] = useState("simulator");
  const [opponentId, setOpponentId] = useState(tacticsService.getSimulationOpponents()[2].id);
  const [hasRun, setHasRun] = useState(true);

  const activeTactic = tacticsService.getActiveTactic();
  const opponents = tacticsService.getSimulationOpponents();
  const result = tacticsService.getSimulationResult(opponentId);
  const recent = tacticsService.getRecentSimulations();

  return (
    <div>
      <Header
        title="TACTICAL LAB"
        subtitle="Design. Simulate. Dominate."
        showBack
        rightAction={
          <button className="p-2 rounded-xl hover:bg-surface-100 transition-colors">
            <Share2 className="w-5 h-5 text-surface-400" />
          </button>
        }
      />

      <div className="px-4 py-4 space-y-4">
        <SegmentedControl options={tabs} value={tab} onChange={setTab} />

        {tab === "builder" && (
          <Card>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-bold text-surface-300">{activeTactic.name} {activeTactic.formation}</h3>
              <Badge variant="lime">Active</Badge>
            </div>
            <p className="text-xs text-surface-600 mb-4">Open the Tactics tab to edit formation, roles and instructions directly on the pitch.</p>
            <div className="space-y-1.5">
              {activeTactic.settings.slice(0, 5).map((s) => (
                <div key={s.key} className="flex items-center justify-between py-1.5 border-b border-surface-200/30 last:border-0">
                  <span className="text-xs text-surface-500">{s.label}</span>
                  <span className="text-xs font-semibold text-surface-300">{s.value}</span>
                </div>
              ))}
            </div>
          </Card>
        )}

        {tab === "simulator" && (
          <>
            <Card>
              <h3 className="text-sm font-bold text-surface-300 mb-1">Simulate</h3>
              <p className="text-2xs text-surface-600 mb-3">Test your tactic against different styles</p>
              <div className="grid grid-cols-3 gap-2 mb-4">
                {opponents.map((opp) => (
                  <button
                    key={opp.id}
                    onClick={() => { setOpponentId(opp.id); setHasRun(false); }}
                    className={`p-2.5 rounded-xl border text-left transition-colors ${
                      opponentId === opp.id ? "bg-pitch-500/15 border-pitch-500/30" : "bg-surface-200 border-transparent"
                    }`}
                  >
                    <p className={`text-2xs font-bold truncate ${opponentId === opp.id ? "text-pitch-400" : "text-surface-400"}`}>{opp.name}</p>
                    <p className="text-[10px] text-surface-600">{opp.formation}</p>
                  </button>
                ))}
              </div>
              <Button fullWidth icon={<Play className="w-4 h-4" />} onClick={() => setHasRun(true)}>
                Run Simulation
              </Button>
            </Card>

            {hasRun && (
              <>
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                  <Card>
                    <h3 className="text-sm font-bold text-surface-300 mb-3">Predicted Outcome</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col items-center justify-center">
                        <div className="relative w-24 h-24 rounded-full flex items-center justify-center" style={{
                          background: `conic-gradient(#a3e635 0% ${result.winPct}%, #f59e0b ${result.winPct}% ${result.winPct + result.drawPct}%, #ef4444 ${result.winPct + result.drawPct}% 100%)`,
                        }}>
                          <div className="w-16 h-16 rounded-full bg-surface-100 flex items-center justify-center">
                            <span className="text-lg font-bold text-pitch-400">{result.winPct}%</span>
                          </div>
                        </div>
                        <div className="flex gap-2 mt-2 text-[10px]">
                          <span className="text-pitch-400">● Win {result.winPct}%</span>
                        </div>
                        <div className="flex gap-2 text-[10px]">
                          <span className="text-accent-amber">● Draw {result.drawPct}%</span>
                          <span className="text-accent-red">● Loss {result.lossPct}%</span>
                        </div>
                      </div>
                      <div className="flex flex-col justify-center">
                        <span className="text-2xs text-surface-600">Expected Score</span>
                        <span className="text-2xl font-bold text-surface-300">{result.expectedGoalsFor} - {result.expectedGoalsAgainst}</span>
                        <span className="text-2xs text-surface-600 mt-1">xG For - xG Against</span>
                      </div>
                    </div>
                  </Card>
                </motion.div>

                <div className="grid grid-cols-2 gap-3">
                  <Card padding="sm">
                    <h4 className="text-2xs font-bold text-surface-500 uppercase tracking-wide mb-2">Key Strengths</h4>
                    <ul className="space-y-1">{result.strengths.map((s) => <li key={s} className="text-2xs text-pitch-400">• {s}</li>)}</ul>
                  </Card>
                  <Card padding="sm">
                    <h4 className="text-2xs font-bold text-surface-500 uppercase tracking-wide mb-2">Potential Weaknesses</h4>
                    <ul className="space-y-1">{result.weaknesses.map((s) => <li key={s} className="text-2xs text-accent-red">• {s}</li>)}</ul>
                  </Card>
                </div>

                <Card>
                  <h3 className="text-sm font-bold text-surface-300 mb-2">Tactical Analysis</h3>
                  <RadarChart data={result.radar} max={10} />
                </Card>

                <Card>
                  <h3 className="text-sm font-bold text-surface-300 mb-3">Compared to {opponents.find((o) => o.id === opponentId)?.name}</h3>
                  <div className="space-y-2">
                    {result.comparison.map((c) => (
                      <div key={c.label} className="flex items-center justify-between py-1 border-b border-surface-200/30 last:border-0">
                        <span className="text-xs text-surface-500">{c.label}</span>
                        <span className="text-xs font-bold text-surface-300">{c.value}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </>
            )}

            <Card>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-surface-300">Recent Simulations</h3>
              </div>
              <div className="space-y-2">
                {recent.map((sim) => (
                  <div key={sim.id} className="flex items-center justify-between py-2 border-b border-surface-200/30 last:border-0">
                    <div className="flex items-center gap-2.5">
                      <Avatar name={sim.opponent} size="xs" />
                      <div>
                        <p className="text-xs font-semibold text-surface-300">vs {sim.opponent}</p>
                        <p className="text-2xs text-surface-600">{sim.opponentFormation}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={sim.result === "WIN" ? "lime" : sim.result === "DRAW" ? "outline" : "red"} size="sm">
                        {sim.result} {sim.score}
                      </Badge>
                      <p className="text-[10px] text-surface-600 mt-1">{sim.timeAgo}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}
