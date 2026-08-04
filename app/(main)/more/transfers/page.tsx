"use client";

import { Header } from "@/components/navigation/Header";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { transferService } from "@/services";
import { formatCurrency } from "@/lib/utils";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Interest } from "@/types";

const interestVariant: Record<Interest, "lime" | "amber" | "neutral" | "outline"> = {
  "very-high": "lime", high: "lime", medium: "amber", low: "neutral",
};
const interestLabel: Record<Interest, string> = {
  "very-high": "Very High", high: "High", medium: "Medium", low: "Low",
};

export default function TransfersPage() {
  const router = useRouter();
  const [tab, setTab] = useState("targets");
  const targets = transferService.getTransferTargets();
  const needs = transferService.getSquadNeeds();
  const strategy = transferService.getTransferStrategy();
  const deals = transferService.getTransferDealsSummary();
  const negotiations = transferService.getActiveNegotiations();
  const activity = transferService.getRecentTransferActivity();

  return (
    <div>
      <Header title="TRANSFERS" subtitle="Summer Window · Open" showBack />

      <div className="px-4 py-4 space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <Card padding="sm"><div className="text-2xs text-surface-600">Budget</div><div className="text-lg font-bold text-pitch-400">{formatCurrency(96_500_000)}</div></Card>
          <Card padding="sm"><div className="text-2xs text-surface-600">Wage Budget</div><div className="text-lg font-bold text-pitch-400">£245K/w</div></Card>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Card padding="sm">
            <p className="text-2xs text-surface-600 mb-1">Players In</p>
            <p className="text-lg font-bold text-pitch-400">{deals.playersIn}</p>
            <p className="text-2xs text-surface-500 mt-1">{formatCurrency(deals.spent)} spent</p>
          </Card>
          <Card padding="sm">
            <p className="text-2xs text-surface-600 mb-1">Players Out</p>
            <p className="text-lg font-bold text-accent-red">{deals.playersOut}</p>
            <p className="text-2xs text-surface-500 mt-1">{formatCurrency(deals.received)} received</p>
          </Card>
        </div>

        <Card>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-bold text-surface-300">Transfer Strategy</h3>
            <Badge variant="lime" size="sm">{strategy.approach}</Badge>
          </div>
          <p className="text-xs text-surface-500 mb-2">{strategy.description}</p>
          <div className="flex flex-wrap gap-1.5">
            {strategy.focus.map((f) => <Badge key={f} variant="outline" size="sm">{f}</Badge>)}
          </div>
        </Card>

        <Card>
          <h3 className="text-sm font-bold text-surface-300 mb-3">Squad Needs</h3>
          <div className="space-y-2">
            {needs.map((n) => (
              <div key={n.position} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xs font-bold px-1.5 py-0.5 rounded bg-surface-200 text-surface-500">{n.position}</span>
                  <span className="text-xs text-surface-400">{n.role}</span>
                </div>
                <Badge variant={n.priority === "High" ? "red" : n.priority === "Medium" ? "amber" : "neutral"} size="sm">{n.priority}</Badge>
              </div>
            ))}
          </div>
        </Card>

        <SegmentedControl
          options={[{ label: "Targets", value: "targets" }, { label: "Negotiations", value: "negotiations" }, { label: "History", value: "history" }]}
          value={tab} onChange={setTab}
        />

        {tab === "targets" && (
          <div className="space-y-2">
            {targets.map((p, i) => (
              <motion.div key={p.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
                <Card interactive className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-surface-200 flex items-center justify-center font-bold text-surface-500">{p.name[0]}</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold text-surface-300 truncate">{p.name}</div>
                    <div className="text-2xs text-surface-600">{p.club} • {p.position} • {p.age}y • OVR {p.overall}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-pitch-400">{formatCurrency(p.value)}</div>
                    <Badge variant={interestVariant[p.interest]} size="sm">{interestLabel[p.interest]}</Badge>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {tab === "negotiations" && (
          <div className="space-y-2">
            {negotiations.map((n) => (
              <Card key={n.id} interactive onClick={() => router.push("/more/transfers/negotiation")} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-surface-300">{n.playerName}</p>
                  <p className="text-2xs text-surface-600">{n.club}</p>
                </div>
                <div className="text-right">
                  <Badge variant="outline" size="sm">{n.status}</Badge>
                  {n.fee > 0 && <p className="text-2xs text-surface-500 mt-1">{formatCurrency(n.fee)}</p>}
                </div>
              </Card>
            ))}
          </div>
        )}

        {tab === "history" && (
          <div className="space-y-2">
            {activity.map((a) => (
              <Card key={a.id} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-surface-300">{a.playerName}</p>
                  <p className="text-2xs text-surface-600">{a.club}</p>
                </div>
                <div className="text-right">
                  {a.fee !== undefined && <p className={`text-sm font-bold ${a.type === "in" ? "text-accent-red" : "text-pitch-400"}`}>{formatCurrency(a.fee)}</p>}
                  <p className="text-2xs text-surface-600">{a.date}</p>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
