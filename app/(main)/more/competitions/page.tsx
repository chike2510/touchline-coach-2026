"use client";

import { Header } from "@/components/navigation/Header";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { competitionService } from "@/services";
import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import { useState } from "react";

type BadgeVariant = "lime" | "amber" | "red" | "blue" | "purple" | "neutral" | "outline";

const statusVariant = (status: string): BadgeVariant => {
  if (status === "Won") return "lime";
  if (status === "Final") return "amber";
  if (status.includes("Semi") || status.includes("Quarter")) return "blue";
  if (status === "Not Entered") return "neutral";
  return "outline";
};

export default function CompetitionsPage() {
  const [tab, setTab] = useState("current");
  const competitions = competitionService.getCompetitions();
  const summary = competitionService.getCompetitionsSummary();
  const leagueTable = competitionService.getLeagueTable();
  const premierLeague = competitions.find((c) => c.id === "prem");

  return (
    <div>
      <Header title="COMPETITIONS" subtitle="Track your progress across all competitions" showBack />

      <div className="px-4 py-4 space-y-4">
        <SegmentedControl
          options={[{ label: "Current", value: "current" }, { label: "Summary", value: "summary" }]}
          value={tab} onChange={setTab}
        />

        {tab === "current" && (
          <>
            <Card>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-surface-300">{premierLeague?.name}</h3>
                <Badge variant="lime">{premierLeague?.status}</Badge>
              </div>
              <div className="space-y-1.5">
                {leagueTable.slice(0, 6).map((row) => (
                  <div key={row.club} className={`flex items-center justify-between py-1.5 px-2 rounded-lg ${row.highlight ? "bg-pitch-500/10 border border-pitch-500/20" : ""}`}>
                    <div className="flex items-center gap-2.5">
                      <span className={`text-2xs font-bold w-4 ${row.highlight ? "text-pitch-400" : "text-surface-500"}`}>{row.position}</span>
                      <span className={`text-xs font-medium ${row.highlight ? "text-pitch-400" : "text-surface-300"}`}>{row.club}</span>
                    </div>
                    <div className="flex items-center gap-3 text-2xs text-surface-500">
                      <span>{row.played}</span>
                      <span className="w-8 text-right">{row.gd > 0 ? "+" : ""}{row.gd}</span>
                      <span className="w-8 text-right font-bold text-surface-300">{row.points}</span>
                    </div>
                  </div>
                ))}
              </div>
              {premierLeague?.nextMatch && (
                <div className="mt-3 pt-3 border-t border-surface-200/40 flex items-center justify-between text-2xs">
                  <span className="text-surface-600">Next: {premierLeague.nextMatch.homeTeam} vs {premierLeague.nextMatch.awayTeam}</span>
                  <span className="text-surface-400 font-semibold">{premierLeague.nextMatch.date}</span>
                </div>
              )}
            </Card>

            {competitions.filter((c) => c.id !== "prem").map((comp, i) => (
              <motion.div key={comp.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <Card>
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="text-sm font-bold text-surface-300">{comp.name}</h3>
                      <p className="text-2xs text-surface-600">{comp.country}</p>
                    </div>
                    <Badge variant={statusVariant(comp.status)}>{comp.status}</Badge>
                  </div>

                  {comp.progressResult && (
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-surface-400 flex-1 truncate">{comp.progressResult.homeTeam}</span>
                      <span className="text-sm font-bold text-surface-300 px-2">
                        {comp.progressResult.homeScore} - {comp.progressResult.awayScore}
                        {comp.progressResult.aggregate && <span className="text-2xs text-surface-600 ml-1">(Agg. {comp.progressResult.aggregate})</span>}
                      </span>
                      <span className="text-xs font-semibold text-surface-400 flex-1 text-right truncate">{comp.progressResult.awayTeam}</span>
                    </div>
                  )}
                  {comp.progressResult && (
                    <p className="text-2xs text-surface-600 mb-2">{comp.progressResult.date}{comp.progressResult.venue ? ` • ${comp.progressResult.venue}` : ""}</p>
                  )}
                  {comp.qualificationNote && <p className="text-2xs text-surface-600">{comp.qualificationNote}</p>}

                  {comp.topScorers && comp.topScorers.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-surface-200/40 space-y-1">
                      {comp.topScorers.map((s) => (
                        <div key={s.name} className="flex items-center justify-between text-2xs">
                          <span className="text-surface-500">{s.name}</span>
                          <span className="font-bold text-surface-300">{s.goals}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </Card>
              </motion.div>
            ))}
          </>
        )}

        {tab === "summary" && (
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <Trophy className="w-4 h-4 text-accent-amber" />
              <h3 className="text-sm font-bold text-surface-300">Competitions Summary</h3>
            </div>
            <div className="grid grid-cols-4 gap-3 text-center">
              <div><p className="text-lg font-bold text-surface-300">{summary.competitionsEntered}</p><p className="text-2xs text-surface-600">Competitions</p></div>
              <div><p className="text-lg font-bold text-pitch-400">{summary.titlesWon}</p><p className="text-2xs text-surface-600">Titles Won</p></div>
              <div><p className="text-lg font-bold text-surface-300">{summary.matchesPlayed}</p><p className="text-2xs text-surface-600">Matches</p></div>
              <div><p className="text-lg font-bold text-surface-300">{summary.wins}</p><p className="text-2xs text-surface-600">Wins</p></div>
              <div><p className="text-lg font-bold text-surface-300">{summary.draws}</p><p className="text-2xs text-surface-600">Draws</p></div>
              <div><p className="text-lg font-bold text-surface-300">{summary.losses}</p><p className="text-2xs text-surface-600">Losses</p></div>
              <div><p className="text-lg font-bold text-pitch-400">{summary.goalsScored}</p><p className="text-2xs text-surface-600">Scored</p></div>
              <div><p className="text-lg font-bold text-accent-red">{summary.goalsConceded}</p><p className="text-2xs text-surface-600">Conceded</p></div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
