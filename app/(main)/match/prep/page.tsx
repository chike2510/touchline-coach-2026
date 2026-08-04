"use client";

import { Header } from "@/components/navigation/Header";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { LiveTacticalMap } from "@/features/match/LiveTacticalMap";
import { matchService } from "@/services";
import { motion } from "framer-motion";
import { CloudSun, Droplets, Wind } from "lucide-react";
import { useRouter } from "next/navigation";

function FormPills({ form }: { form: ("W" | "D" | "L")[] }) {
  return (
    <div className="flex gap-1">
      {form.map((r, i) => (
        <span
          key={i}
          className={`w-5 h-5 rounded flex items-center justify-center text-[9px] font-bold ${
            r === "W" ? "bg-pitch-500/20 text-pitch-400" : r === "D" ? "bg-surface-300 text-surface-500" : "bg-accent-red/20 text-accent-red"
          }`}
        >
          {r}
        </span>
      ))}
    </div>
  );
}

export default function MatchPrepPage() {
  const router = useRouter();
  const prep = matchService.getMatchPreparation();

  return (
    <div>
      <Header title="MATCH PREPARATION" subtitle={`${prep.competition} · Matchday ${prep.matchday}`} showBack />

      <div className="px-4 py-4 space-y-4">
        <Card>
          <div className="flex items-center justify-between">
            <div className="text-center flex-1">
              <p className="text-sm font-bold text-surface-300">{prep.homeTeam}</p>
              <FormPills form={prep.homeForm} />
            </div>
            <div className="text-center px-3">
              <p className="text-2xs text-surface-600">{prep.kickoff} · {prep.venue}</p>
              <p className="text-base font-bold text-surface-300 mt-1">VS</p>
            </div>
            <div className="text-center flex-1">
              <p className="text-sm font-bold text-surface-300">{prep.awayTeam}</p>
              <FormPills form={prep.awayForm} />
            </div>
          </div>
        </Card>

        <Card>
          <h3 className="text-sm font-bold text-surface-300 mb-2">Opponent Overview</h3>
          <p className="text-xs text-surface-500 mb-3">{prep.opponent.name} play a {prep.opponent.style.toLowerCase()} style with formation {prep.opponent.formation}.</p>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-2xs font-bold text-pitch-400 uppercase tracking-wide mb-1.5">Strengths</p>
              <ul className="space-y-1">{prep.opponent.strengths.map((s) => <li key={s} className="text-2xs text-surface-500">• {s}</li>)}</ul>
            </div>
            <div>
              <p className="text-2xs font-bold text-accent-red uppercase tracking-wide mb-1.5">Weaknesses</p>
              <ul className="space-y-1">{prep.opponent.weaknesses.map((s) => <li key={s} className="text-2xs text-surface-500">• {s}</li>)}</ul>
            </div>
          </div>
        </Card>

        <Card padding="none">
          <div className="p-4 pb-2 flex items-center justify-between">
            <h3 className="text-sm font-bold text-surface-300">Predicted Lineup</h3>
            <Badge variant="outline" size="sm">{prep.teamFluidity}</Badge>
          </div>
          <div className="px-4 pb-4">
            <LiveTacticalMap lineup={prep.predictedLineup} />
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-bold text-surface-300">Key Opponent Player</h3>
            <Badge variant="red" size="sm">High Danger</Badge>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-xl bg-surface-200 flex items-center justify-center font-bold text-surface-500">
              {prep.keyPlayer.name.split(" ").map((n) => n[0]).join("")}
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-surface-300">{prep.keyPlayer.name}</p>
              <p className="text-2xs text-surface-600">{prep.keyPlayer.position} · Overall {prep.keyPlayer.overall}</p>
            </div>
            <div className="text-right text-2xs text-surface-500">
              <p>{prep.keyPlayer.goals}G · {prep.keyPlayer.assists}A</p>
              <p>xG {prep.keyPlayer.xg}</p>
            </div>
          </div>
        </Card>

        <Card>
          <h3 className="text-sm font-bold text-surface-300 mb-2">Player Focus</h3>
          <p className="text-xs text-surface-500"><span className="font-semibold text-surface-300">{prep.focusPlayer.name}</span> ({prep.focusPlayer.position}) — {prep.focusPlayer.instruction}</p>
        </Card>

        <div className="grid grid-cols-4 gap-2">
          <Card padding="sm" className="text-center"><CloudSun className="w-4 h-4 mx-auto mb-1 text-accent-amber" /><p className="text-xs font-bold text-surface-300">{prep.conditions.tempC}°</p><p className="text-2xs text-surface-600">{prep.conditions.weatherLabel}</p></Card>
          <Card padding="sm" className="text-center"><p className="text-xs font-bold text-surface-300">Pitch</p><p className="text-2xs text-pitch-400 mt-1">{prep.conditions.pitch}</p></Card>
          <Card padding="sm" className="text-center"><Wind className="w-4 h-4 mx-auto mb-1 text-accent-blue" /><p className="text-xs font-bold text-surface-300">{prep.conditions.windKmh} km/h</p></Card>
          <Card padding="sm" className="text-center"><Droplets className="w-4 h-4 mx-auto mb-1 text-accent-blue" /><p className="text-xs font-bold text-surface-300">{prep.conditions.humidityPct}%</p></Card>
        </div>

        <Card>
          <h3 className="text-sm font-bold text-surface-300 mb-2">Tactical Approach</h3>
          <p className="text-2xs text-surface-600 mb-2">Mentality: <span className="text-pitch-400 font-semibold">{prep.tacticalApproach.mentality}</span></p>
          <div className="grid grid-cols-3 gap-3 text-2xs">
            <div><p className="font-bold text-surface-500 uppercase mb-1">In Possession</p><ul className="text-surface-500 space-y-0.5">{prep.tacticalApproach.inPossession.map((i) => <li key={i}>{i}</li>)}</ul></div>
            <div><p className="font-bold text-surface-500 uppercase mb-1">In Transition</p><ul className="text-surface-500 space-y-0.5">{prep.tacticalApproach.inTransition.map((i) => <li key={i}>{i}</li>)}</ul></div>
            <div><p className="font-bold text-surface-500 uppercase mb-1">Out of Possession</p><ul className="text-surface-500 space-y-0.5">{prep.tacticalApproach.outOfPossession.map((i) => <li key={i}>{i}</li>)}</ul></div>
          </div>
        </Card>

        <Card className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-surface-200 shrink-0" />
          <div>
            <p className="text-2xs font-bold text-surface-500 uppercase tracking-wide mb-1">Assistant Advice</p>
            <p className="text-xs text-surface-400">{prep.assistantAdvice}</p>
          </div>
        </Card>

        <Button fullWidth onClick={() => router.push("/match")}>Start Match</Button>
      </div>
    </div>
  );
}
