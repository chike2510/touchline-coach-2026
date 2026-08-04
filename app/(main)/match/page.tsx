"use client";

import { Header } from "@/components/navigation/Header";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Tabs } from "@/components/ui/Tabs";
import { Timeline } from "@/components/ui/Timeline";
import { MomentumChart } from "@/components/ui/MomentumChart";
import { HeatMapPlaceholder } from "@/components/ui/HeatMapPlaceholder";
import { LiveTacticalMap } from "@/features/match/LiveTacticalMap";
import { MatchStatRow } from "@/features/match/MatchStatRow";
import { useMatchStore } from "@/store";
import { motion } from "framer-motion";
import { BarChart3, Pause, Play } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function ScoreHeader() {
  const { match } = useMatchStore();
  return (
    <div className="px-4 py-3 border-b border-surface-200/30">
      <div className="flex items-center justify-center gap-1 text-2xs text-surface-600 mb-2">
        <span>{match.competition}</span><span>•</span><span>{match.venue}</span>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex-1 text-center">
          <div className="w-12 h-12 rounded-xl bg-surface-200 mx-auto mb-1 flex items-center justify-center text-sm font-bold">MUN</div>
          <span className="text-2xs font-semibold text-surface-400">{match.homeTeam}</span>
        </div>
        <div className="text-center px-3">
          <div className="text-2xl font-bold text-surface-50">{match.homeScore} - {match.awayScore}</div>
          <span className="text-2xs font-bold text-pitch-400 tabular-nums">{match.status === "live" ? `${match.minute}:00` : match.status}</span>
        </div>
        <div className="flex-1 text-center">
          <div className="w-12 h-12 rounded-xl bg-surface-200 mx-auto mb-1 flex items-center justify-center text-sm font-bold">LIV</div>
          <span className="text-2xs font-semibold text-surface-400">{match.awayTeam}</span>
        </div>
      </div>
    </div>
  );
}

function LiveTab() {
  const { match, isTicking, startTicking, stopTicking } = useMatchStore();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Badge variant="lime">Attacking: {match.lastEvent?.team === "home" ? match.homeTeam : match.awayTeam}</Badge>
        <button
          onClick={() => (isTicking ? stopTicking() : startTicking())}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-200 text-2xs font-bold text-surface-300"
        >
          {isTicking ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          {isTicking ? "Pause" : "Simulate"}
        </button>
      </div>

      <LiveTacticalMap lineup={match.homeLineup} highlightedId={match.lastEvent?.team === "home" ? "p-fernandes" : undefined} />

      {match.lastEvent && (
        <Card padding="sm" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-surface-200 shrink-0" />
          <div>
            <p className="text-2xs text-surface-600 uppercase tracking-wide">Last Event</p>
            <p className="text-sm font-bold text-surface-300">{match.lastEvent.player}</p>
            <p className="text-2xs text-surface-600">{match.lastEvent.detail ?? match.lastEvent.type}</p>
          </div>
        </Card>
      )}

      <MomentumChart values={match.momentum} homeLabel="MUN" awayLabel="LIV" />

      <Card>
        <h3 className="text-sm font-bold text-surface-300 mb-2">Tactical Control</h3>
        <div className="grid grid-cols-3 gap-3 text-center">
          <div><p className="text-2xs text-surface-600">Formation</p><p className="text-xs font-bold text-surface-300 mt-1">{match.homeFormation}</p></div>
          <div><p className="text-2xs text-surface-600">Mentality</p><p className="text-xs font-bold text-accent-red mt-1">Attacking</p></div>
          <div><p className="text-2xs text-surface-600">Instructions</p><p className="text-xs font-bold text-surface-300 mt-1">7 Active</p></div>
        </div>
      </Card>
    </div>
  );
}

function TimelineTab() {
  const { match } = useMatchStore();
  return (
    <Card>
      <Timeline events={match.events} />
    </Card>
  );
}

function StatsTab() {
  const { match } = useMatchStore();
  return (
    <Card>
      {match.stats.map((s) => <MatchStatRow key={s.label} stat={s} />)}
    </Card>
  );
}

function TacticsTab() {
  const { match } = useMatchStore();
  return (
    <div className="space-y-4">
      <Card>
        <h3 className="text-sm font-bold text-surface-300 mb-3">Our Shape</h3>
        <LiveTacticalMap lineup={match.homeLineup} />
      </Card>
      <Card>
        <h4 className="text-2xs font-bold text-surface-500 uppercase tracking-wide mb-2">Formation</h4>
        <p className="text-sm font-bold text-surface-300">{match.homeFormation}</p>
      </Card>
    </div>
  );
}

function RatingsTab() {
  const { match } = useMatchStore();
  const rated = [...match.homeLineup].filter((p) => p.rating).sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
  return (
    <Card>
      <div className="space-y-2">
        {rated.map((p) => (
          <div key={p.id} className="flex items-center justify-between py-2 border-b border-surface-200/30 last:border-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-surface-200 flex items-center justify-center text-2xs font-bold text-surface-500">{p.number}</div>
              <span className="text-sm font-semibold text-surface-300">{p.name}</span>
            </div>
            <span className={`text-sm font-bold px-2 py-0.5 rounded ${(p.rating ?? 0) >= 7.5 ? "bg-pitch-500/15 text-pitch-400" : "bg-surface-200 text-surface-400"}`}>
              {p.rating?.toFixed(1)}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}

function AnalyticsTab() {
  return (
    <div className="space-y-4">
      <Card>
        <h3 className="text-sm font-bold text-surface-300 mb-2">Attacking Heat Map</h3>
        <HeatMapPlaceholder />
      </Card>
      <Card>
        <div className="flex items-center gap-2 text-surface-500">
          <BarChart3 className="w-4 h-4" />
          <p className="text-xs">Deeper xG and pass-network breakdowns available post-match.</p>
        </div>
      </Card>
    </div>
  );
}

export default function MatchPage() {
  const router = useRouter();
  const { reset } = useMatchStore();

  useEffect(() => {
    return () => useMatchStore.getState().stopTicking();
  }, []);

  const tabs = [
    { id: "live", label: "Live", content: <LiveTab /> },
    { id: "timeline", label: "Timeline", content: <TimelineTab /> },
    { id: "stats", label: "Stats", content: <StatsTab /> },
    { id: "tactics", label: "Tactics", content: <TacticsTab /> },
    { id: "ratings", label: "Ratings", content: <RatingsTab /> },
    { id: "analytics", label: "Analytics", content: <AnalyticsTab /> },
  ];

  return (
    <div>
      <Header title="MATCH CENTRE" showBack />
      <ScoreHeader />
      <div className="px-4 pt-3 pb-4">
        <Tabs tabs={tabs} defaultTab="live" />
      </div>
      <div className="px-4 pb-4 grid grid-cols-2 gap-3">
        <Button variant="secondary" onClick={() => router.push("/match/prep")}>Match Prep</Button>
        <Button variant="secondary" onClick={() => { reset(); router.push("/match/review"); }}>Post-Match</Button>
      </div>
    </div>
  );
}
