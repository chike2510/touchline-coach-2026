"use client";

import { Header } from "@/components/navigation/Header";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { motion } from "framer-motion";
import { Calendar, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { clubService, competitionService, fixtureService, notificationService, trainingService } from "@/services";

export default function HomePage() {
  const router = useRouter();
  const club = clubService.getClubOverview();
  const nextFixture = fixtureService.getNextFixture();
  const table = competitionService.getLeagueTable().slice(0, 5);
  const unread = notificationService.getUnreadCount();
  const training = trainingService.getTrainingOverview();

  return (
    <div>
      <Header
        title="TOUCHLINE 26"
        subtitle="Good Morning, AURACLE"
        showNotifications
        notificationCount={unread}
        rightAction={
          <div className="w-8 h-8 rounded-full bg-surface-200 flex items-center justify-center text-xs font-bold text-pitch-400">
            AU
          </div>
        }
      />

      <div className="px-4 py-4 space-y-4">
        {/* Auracle AI Assistant */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="flex items-start gap-3 bg-gradient-to-br from-surface-100 to-surface-200/60">
            <div className="w-9 h-9 rounded-xl bg-pitch-500/15 flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4 text-pitch-400" />
            </div>
            <div>
              <p className="text-xs font-bold text-pitch-400 mb-0.5">Auracle AI</p>
              <p className="text-xs text-surface-400 leading-relaxed">
                {training.focusTitle} is this week's training focus. Your squad's overall fitness sits at {training.teamFitnessPct}% —
                consider rotating {training.squadStatus.filter((s) => s.fatigue === "High").length} fatigued players before {nextFixture?.opponent ?? "the next match"}.
              </p>
            </div>
          </Card>
        </motion.div>

        {/* Next Match */}
        {nextFixture && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card glow className="relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-pitch-500/10 to-transparent" />
              <div className="relative">
                <div className="flex items-center gap-2 mb-3">
                  <Calendar className="w-4 h-4 text-pitch-400" />
                  <span className="text-xs font-semibold text-pitch-400 uppercase tracking-wider">Next Match</span>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-center">
                    <div className="w-12 h-12 rounded-xl bg-pitch-500/20 mx-auto mb-2 flex items-center justify-center text-lg font-bold text-pitch-400">MUN</div>
                    <span className="text-xs text-surface-400">Man Utd</span>
                  </div>
                  <div className="text-center px-4">
                    <div className="text-xs text-surface-500 mb-1">{nextFixture.date}, {nextFixture.time}</div>
                    <div className="text-xl font-bold text-surface-300">VS</div>
                    <div className="text-xs text-surface-600 mt-1">{nextFixture.isHome ? "Old Trafford" : "Away"}</div>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 rounded-xl bg-surface-200 mx-auto mb-2 flex items-center justify-center text-lg font-bold">
                      {nextFixture.opponent.split(" ").map((w) => w[0]).join("").slice(0, 3).toUpperCase()}
                    </div>
                    <span className="text-xs text-surface-400">{nextFixture.opponent}</span>
                  </div>
                </div>
                <Button fullWidth onClick={() => router.push("/match/prep")}>Prepare Match</Button>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Club Status */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <div className="grid grid-cols-3 gap-3">
            <Card padding="sm" interactive className="text-center" onClick={() => router.push("/more/club")}>
              <div className="text-2xl font-bold text-pitch-400">{club.boardConfidence}</div>
              <div className="text-2xs text-surface-600 uppercase tracking-wider mt-1">Board</div>
            </Card>
            <Card padding="sm" className="text-center">
              <div className="text-2xl font-bold text-pitch-400">{club.squadMorale}</div>
              <div className="text-2xs text-surface-600 uppercase tracking-wider mt-1">Morale</div>
            </Card>
            <Card padding="sm" className="text-center">
              <div className="text-2xl font-bold text-pitch-400">£{(club.finances.balance / 1_000_000).toFixed(0)}M</div>
              <div className="text-2xs text-surface-600 uppercase tracking-wider mt-1">Balance</div>
            </Card>
          </div>
        </motion.div>

        {/* League Table */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card interactive onClick={() => router.push("/more/competitions")}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-surface-300">Premier League</h3>
              <Badge variant="lime">Top 5</Badge>
            </div>
            <div className="space-y-2">
              {table.map((row) => (
                <div
                  key={row.club}
                  className={`flex items-center justify-between py-2 px-3 rounded-xl ${
                    row.highlight ? "bg-pitch-500/10 border border-pitch-500/20" : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-bold w-4 ${row.highlight ? "text-pitch-400" : "text-surface-500"}`}>
                      {row.position}
                    </span>
                    <span className={`text-sm font-medium ${row.highlight ? "text-pitch-400" : "text-surface-300"}`}>
                      {row.club}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-surface-500">
                    <span>{row.played}</span>
                    <span className="w-8 text-right">{row.gd > 0 ? "+" : ""}{row.gd}</span>
                    <span className="w-8 text-right font-bold text-surface-300">{row.points}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Recent Form */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
          <Card>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-surface-300">Recent Form</h3>
              <div className="flex gap-1">
                {club.recentForm.map((r, i) => (
                  <div
                    key={i}
                    className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${
                      r.result === "W" ? "bg-pitch-500/20 text-pitch-400" : r.result === "D" ? "bg-surface-200 text-surface-500" : "bg-accent-red/20 text-accent-red"
                    }`}
                  >
                    {r.result}
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
