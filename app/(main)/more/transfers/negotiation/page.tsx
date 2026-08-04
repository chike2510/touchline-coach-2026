"use client";

import { Header } from "@/components/navigation/Header";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Tabs } from "@/components/ui/Tabs";
import { transferService } from "@/services";
import { formatCurrency } from "@/lib/utils";
import { Send } from "lucide-react";
import { useState } from "react";

export default function ContractNegotiationPage() {
  const n = transferService.getContractNegotiation();
  const [wage, setWage] = useState(n.proposedWage);

  const termsTab = (
    <div className="space-y-4">
      <Card>
        <h3 className="text-xs font-bold text-surface-500 uppercase tracking-wide mb-3">Financial Terms</h3>
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-surface-500">Wage</span>
            <span className="text-sm font-bold text-pitch-400">£{(wage / 1000).toFixed(0)}K p/w</span>
          </div>
          <input
            type="range" min={n.wageRange.low * 0.7} max={n.wageRange.high * 1.3} value={wage}
            onChange={(e) => setWage(Number(e.target.value))}
            className="w-full accent-pitch-500"
          />
          <div className="flex justify-between text-2xs text-surface-600 mt-1">
            <span>£{(n.wageRange.low * 0.7 / 1000).toFixed(0)}K</span>
            <span>Recommended £{(n.wageRange.low / 1000).toFixed(0)}K – £{(n.wageRange.high / 1000).toFixed(0)}K</span>
            <span>£{(n.wageRange.high * 1.3 / 1000).toFixed(0)}K+</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 text-2xs">
          <div><span className="text-surface-600">Signing-On Fee</span><p className="font-bold text-surface-300">{formatCurrency(n.signingOnFee)}</p></div>
          <div><span className="text-surface-600">Contract Length</span><p className="font-bold text-surface-300">{n.contractLengthYears} Years</p></div>
          <div><span className="text-surface-600">Squad Status</span><p className="font-bold text-surface-300">{n.squadStatus}</p></div>
          <div><span className="text-surface-600">Loyalty Bonus</span><p className="font-bold text-surface-300">{formatCurrency(n.loyaltyBonus)}</p></div>
        </div>
      </Card>

      <Card>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-bold text-surface-500 uppercase tracking-wide">Agent Feedback</h3>
          <span className="text-sm font-bold text-pitch-400">{n.agentPositivityPct}% Positive</span>
        </div>
        <div className="space-y-1">
          {n.agentWants.map((w) => <p key={w} className="text-2xs text-surface-500">• {w}</p>)}
        </div>
      </Card>

      <Card>
        <h3 className="text-xs font-bold text-surface-500 uppercase tracking-wide mb-3">Player Demands</h3>
        <div className="space-y-2">
          {n.playerDemands.map((d) => (
            <div key={d.label} className="flex items-center justify-between">
              <span className="text-xs text-surface-500">{d.label}</span>
              <Badge variant={d.importance === "Very Important" ? "red" : d.importance === "Important" ? "amber" : "lime"} size="sm">{d.importance}</Badge>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <h3 className="text-xs font-bold text-surface-500 uppercase tracking-wide mb-3">Negotiation History</h3>
        <div className="space-y-2">
          {n.negotiationHistory.map((h, i) => (
            <div key={i} className="flex items-center justify-between text-2xs">
              <div>
                <p className="text-surface-400">{h.label}</p>
                <p className="text-surface-600">{h.date}</p>
              </div>
              <span className={`font-bold ${h.status === "Accepted" ? "text-pitch-400" : h.status === "Countered" ? "text-accent-blue" : "text-surface-500"}`}>{h.status}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );

  return (
    <div>
      <Header title="CONTRACT NEGOTIATION" subtitle={`Discuss terms with ${n.playerName}`} showBack />

      <div className="px-4 py-4 space-y-4">
        <Card className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-xl bg-surface-200 flex items-center justify-center font-bold text-surface-500">
            {n.playerName.split(" ").map((p) => p[0]).join("")}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-surface-300">{n.playerName}</p>
            <p className="text-2xs text-surface-600">{n.nationalityFlag} {n.age} yrs • {n.position}</p>
            <Badge variant="lime" size="sm" className="mt-1">{n.status}</Badge>
          </div>
          <div className="text-right">
            <p className="text-2xs text-surface-600">Value</p>
            <p className="text-sm font-bold text-surface-300">{formatCurrency(n.value)}</p>
          </div>
        </Card>

        <Card padding="sm">
          <p className="text-2xs text-surface-600 mb-1">Interest From</p>
          <div className="flex flex-wrap gap-1.5">
            {n.interestedClubs.map((c) => <Badge key={c} variant="outline" size="sm">{c}</Badge>)}
          </div>
        </Card>

        <Tabs tabs={[{ id: "terms", label: "Terms", content: termsTab }]} defaultTab="terms" />

        <Card>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-surface-500">Board Confidence</span>
            <span className="text-sm font-bold text-pitch-400">{n.boardConfidencePct}%</span>
          </div>
          <div className="grid grid-cols-2 gap-3 text-2xs pt-2 border-t border-surface-200/40">
            <div><span className="text-surface-600">Estimated Cost</span><p className="font-bold text-pitch-400">{formatCurrency(n.estimatedCost)} over {n.contractLengthYears}y</p></div>
            <div><span className="text-surface-600">Wage Impact</span><p className="font-bold text-accent-amber">+£{(n.wageBudgetImpact / 1000).toFixed(0)}K ({n.wageBudgetImpactPct}%)</p></div>
          </div>
        </Card>

        <Button fullWidth icon={<Send className="w-4 h-4" />}>Send Final Offer</Button>
      </div>
    </div>
  );
}
