"use client";

import { Header } from "@/components/navigation/Header";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { trainingService } from "@/services";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { useState } from "react";

export default function TrainingPage() {
  const overview = trainingService.getTrainingOverview();
  const [activeDay, setActiveDay] = useState(overview.weeklyPlan[0]?.day);

  return (
    <div>
      <Header title="TRAINING" subtitle={overview.weekLabel} showBack />

      <div className="px-4 py-4 space-y-4">
        <Card>
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-2xs text-surface-600">Weekly Plan</p>
              <p className="text-xs font-bold text-surface-300">{overview.weekRange}</p>
            </div>
            <div className="text-right">
              <p className="text-2xs text-surface-600">Training Sharpness</p>
              <p className="text-lg font-bold text-pitch-400">{overview.trainingSharpnessPct}%</p>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-1.5">
            {overview.weeklyPlan.map((day) => (
              <button
                key={day.day}
                onClick={() => setActiveDay(day.day)}
                className={`flex flex-col items-center gap-1 p-1.5 rounded-xl border text-center transition-colors ${
                  activeDay === day.day ? "bg-pitch-500/15 border-pitch-500/30" : "bg-surface-200 border-transparent"
                }`}
              >
                <span className="text-[9px] font-bold text-surface-500">{day.day}</span>
                <span className={`text-[8px] leading-tight ${activeDay === day.day ? "text-pitch-400" : "text-surface-600"}`}>{day.sub}</span>
              </button>
            ))}
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-bold text-surface-300">Training Focus</h3>
            <Badge variant="lime" size="sm">This Week</Badge>
          </div>
          <p className="text-sm font-bold text-pitch-400">{overview.focusTitle}</p>
          <p className="text-2xs text-surface-600 mb-3">{overview.focusDescription}</p>
          <div className="grid grid-cols-3 gap-2">
            {overview.focusImpacts.map((f) => (
              <div key={f.label} className="text-center p-2 rounded-xl bg-surface-200/60">
                <p className="text-2xs text-surface-500">{f.label}</p>
                <p className={`text-xs font-bold mt-0.5 ${f.direction === "up" ? "text-pitch-400" : "text-accent-red"}`}>
                  {f.direction === "up" ? "↑" : "↓"} {f.magnitude}
                </p>
              </div>
            ))}
          </div>
        </Card>

        <div className="grid grid-cols-4 gap-2">
          <Card padding="sm" className="text-center"><p className="text-sm font-bold text-pitch-400">{overview.teamSharpnessPct}%</p><p className="text-[9px] text-surface-600">Sharpness</p></Card>
          <Card padding="sm" className="text-center"><p className="text-sm font-bold text-pitch-400">{overview.teamFitnessPct}%</p><p className="text-[9px] text-surface-600">Fitness</p></Card>
          <Card padding="sm" className="text-center"><p className="text-sm font-bold text-surface-300">{overview.injuryRisk}</p><p className="text-[9px] text-surface-600">Injury Risk</p></Card>
          <Card padding="sm" className="text-center"><p className="text-sm font-bold text-surface-300">{overview.fatigueLevel}</p><p className="text-[9px] text-surface-600">Fatigue</p></Card>
        </div>

        <Card>
          <div className="flex items-center justify-between mb-1">
            <Badge variant="blue" size="sm">Tactical</Badge>
            <span className="text-2xs text-surface-600">{overview.todaySession.date}</span>
          </div>
          <h3 className="text-sm font-bold text-surface-300 mt-2">{overview.todaySession.title}</h3>
          <p className="text-2xs text-surface-600 mb-2">{overview.todaySession.time} · {overview.todaySession.durationMin} min</p>
          <p className="text-xs text-surface-500 mb-3">{overview.todaySession.description}</p>
          <div className="space-y-1.5 mb-3">
            {overview.todaySession.objectives.map((o) => (
              <div key={o.label} className="flex items-center gap-2 text-2xs">
                <span className={`w-3.5 h-3.5 rounded-full flex items-center justify-center border ${o.done ? "bg-pitch-500 border-pitch-500" : "border-surface-400"}`}>
                  {o.done && <span className="text-[8px] text-surface-0">✓</span>}
                </span>
                <span className={o.done ? "text-surface-500" : "text-surface-400"}>{o.label}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-1.5 mb-4">
            {overview.todaySession.focusAreas.map((f) => (
              <Badge key={f} variant="outline" size="sm">{f}</Badge>
            ))}
          </div>
          <Button fullWidth icon={<Play className="w-4 h-4" />}>Start Session</Button>
        </Card>

        <Card>
          <h3 className="text-sm font-bold text-surface-300 mb-3">Squad Status</h3>
          <div className="space-y-2">
            {overview.squadStatus.map((p, i) => (
              <motion.div key={p.playerId} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }} className="flex items-center justify-between py-1.5 border-b border-surface-200/30 last:border-0">
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-surface-300 truncate">{p.name}</p>
                  <p className="text-2xs text-surface-600">{p.position}</p>
                </div>
                <div className="text-center px-2"><p className="text-2xs font-bold text-pitch-400">{p.sharpnessPct}%</p><p className="text-[9px] text-surface-600">Sharp</p></div>
                <div className="text-center px-2"><p className="text-2xs font-bold text-pitch-400">{p.fitnessPct}%</p><p className="text-[9px] text-surface-600">Fit</p></div>
                <span className={`text-2xs font-bold w-12 text-right ${p.load === "High" ? "text-accent-red" : p.load === "Medium" ? "text-accent-amber" : "text-pitch-400"}`}>{p.load}</span>
              </motion.div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
