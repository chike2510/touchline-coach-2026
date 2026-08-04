"use client";

import { Header } from "@/components/navigation/Header";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Tabs } from "@/components/ui/Tabs";
import { Timeline } from "@/components/ui/Timeline";
import { MomentumChart } from "@/components/ui/MomentumChart";
import { matchService } from "@/services";
import { Star } from "lucide-react";

function StarRow({ stars }: { stars: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(stars) ? "fill-pitch-400 text-pitch-400" : i < stars ? "fill-pitch-400/50 text-pitch-400" : "text-surface-400"}`} />
      ))}
    </div>
  );
}

export default function PostMatchReviewPage() {
  const review = matchService.getPostMatchReview();

  const summaryTab = (
    <div className="space-y-4">
      <Card>
        <h3 className="text-sm font-bold text-surface-300 mb-3">Match Timeline</h3>
        <Timeline events={review.timeline} />
      </Card>
      <Card>
        <h3 className="text-sm font-bold text-surface-300 mb-2">Match Momentum</h3>
        <MomentumChart values={review.momentum} homeLabel={review.homeTeam} awayLabel={review.awayTeam} />
        <p className="text-2xs text-surface-600 mt-2">{review.momentumSummary}</p>
      </Card>
      <Card>
        <h3 className="text-sm font-bold text-surface-300 mb-2">Key Match Stats</h3>
        <div className="space-y-2">
          {review.stats.map((s) => (
            <div key={s.label} className="flex items-center justify-between py-1.5 border-b border-surface-200/30 last:border-0">
              <span className="text-sm font-bold text-pitch-400 w-10">{s.home}</span>
              <span className="text-2xs text-surface-500 flex-1 text-center">{s.label}</span>
              <span className="text-sm font-bold text-surface-400 w-10 text-right">{s.away}</span>
            </div>
          ))}
        </div>
      </Card>
      <div className="grid grid-cols-3 gap-3">
        <Card padding="sm" className="text-center">
          <p className="text-2xs text-surface-600 mb-1">Pressing Success</p>
          <p className="text-lg font-bold text-pitch-400">{review.pressingSuccessPct}%</p>
        </Card>
        <Card padding="sm" className="text-center">
          <p className="text-2xs text-surface-600 mb-1">Rest Defence</p>
          <p className="text-lg font-bold text-pitch-400">{review.restDefenceRating}/10</p>
        </Card>
        <Card padding="sm" className="text-center">
          <p className="text-2xs text-surface-600 mb-1">Build-Up Success</p>
          <p className="text-lg font-bold text-pitch-400">{review.buildUpSuccessPct}%</p>
        </Card>
      </div>
      <Card>
        <h3 className="text-sm font-bold text-surface-300 mb-3">Set Piece Performance</h3>
        <div className="space-y-2">
          {review.setPieceRatings.map((sp) => (
            <div key={sp.label} className="flex items-center justify-between">
              <span className="text-xs text-surface-500">{sp.label}</span>
              <StarRow stars={sp.stars} />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );

  const insightsTab = (
    <div className="space-y-4">
      <Card>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-bold text-surface-300">Coach Rating</h3>
          <span className="text-2xl font-bold text-pitch-400">{review.coachRating}</span>
        </div>
        <p className="text-xs text-surface-500 mb-3">{review.coachRatingSummary}</p>
        <div className="space-y-1">
          {review.whatWentWell.map((w) => (
            <p key={w} className="text-2xs text-pitch-400">✓ {w}</p>
          ))}
        </div>
      </Card>
      <Card>
        <h3 className="text-sm font-bold text-surface-300 mb-3">AI Tactical Suggestions</h3>
        <div className="space-y-2">
          {review.aiTacticalSuggestions.map((s, i) => (
            <p key={i} className="text-xs text-surface-500">💡 {s}</p>
          ))}
        </div>
      </Card>
      <Card className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-surface-200 shrink-0" />
        <div>
          <p className="text-sm font-bold text-surface-300">{review.assistantNotes.author}</p>
          <p className="text-2xs text-surface-600 mb-1">{review.assistantNotes.role}</p>
          <p className="text-xs text-surface-500 italic">"{review.assistantNotes.note}"</p>
        </div>
      </Card>
    </div>
  );

  const tabs = [
    { id: "summary", label: "Summary", content: summaryTab },
    { id: "insights", label: "AI Insights", content: insightsTab },
  ];

  return (
    <div>
      <Header title="POST-MATCH REVIEW" subtitle={`${review.competition} · Matchday ${review.matchday}`} showBack />

      <div className="px-4 py-4 space-y-4">
        <Card>
          <div className="flex items-center justify-between mb-2">
            <div>
              <p className="text-sm font-bold text-surface-300">{review.homeTeam}</p>
              <p className="text-2xs text-surface-600">{review.homeFormation}</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-surface-50">{review.homeScore} - {review.awayScore}</p>
              <p className="text-2xs text-surface-600">FT</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-surface-300">{review.awayTeam}</p>
              <p className="text-2xs text-surface-600">{review.awayFormation}</p>
            </div>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-surface-200/40">
            <Badge variant={review.result === "Win" ? "lime" : review.result === "Draw" ? "outline" : "red"}>{review.result}</Badge>
            <span className="text-2xs text-surface-600">{review.importance}</span>
            <span className="text-2xs font-bold text-pitch-400">+{review.pointsGained} pts</span>
          </div>
        </Card>

        <Tabs tabs={tabs} defaultTab="summary" />
      </div>
    </div>
  );
}
