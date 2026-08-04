"use client";

import { Header } from "@/components/navigation/Header";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { medicalService } from "@/services";
import { motion } from "framer-motion";
import { Activity, Droplets, Moon, Stethoscope } from "lucide-react";

function riskColor(risk: string) {
  if (risk === "High") return "text-accent-red";
  if (risk === "Medium") return "text-accent-amber";
  return "text-pitch-400";
}

export default function MedicalCentrePage() {
  const overview = medicalService.getMedicalOverview();

  return (
    <div>
      <Header title="MEDICAL CENTRE" subtitle="Player Health & Fitness" showBack />

      <div className="px-4 py-4 space-y-4">
        <div className="grid grid-cols-4 gap-2">
          <Card padding="sm" className="text-center"><p className="text-lg font-bold text-pitch-400">{overview.fitCount}</p><p className="text-[10px] text-surface-600">Fit</p></Card>
          <Card padding="sm" className="text-center"><p className="text-lg font-bold text-accent-amber">{overview.fatiguedCount}</p><p className="text-[10px] text-surface-600">Fatigued</p></Card>
          <Card padding="sm" className="text-center"><p className="text-lg font-bold text-accent-red">{overview.injuredCount}</p><p className="text-[10px] text-surface-600">Injured</p></Card>
          <Card padding="sm" className="text-center"><p className="text-lg font-bold text-surface-300">{overview.squadFitnessPct}%</p><p className="text-[10px] text-surface-600">Squad Fitness</p></Card>
        </div>

        {overview.injuredPlayers.length > 0 && (
          <Card>
            <h3 className="text-sm font-bold text-surface-300 mb-3">Injured Players ({overview.injuredPlayers.length})</h3>
            {overview.injuredPlayers.map((p) => (
              <div key={p.playerId} className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-xl bg-surface-200 flex items-center justify-center font-bold text-surface-500 shrink-0">
                  {p.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-surface-300">{p.name}</p>
                  <p className="text-2xs text-surface-600">{p.position} • {p.age} yrs</p>
                  <p className="text-xs text-surface-400 mt-1">{p.injury}</p>
                  <div className="flex items-center gap-3 mt-1.5">
                    <Badge variant={p.severity === "Severe" ? "red" : p.severity === "Moderate" ? "amber" : "lime"} size="sm">{p.severity}</Badge>
                    <span className="text-2xs text-surface-600">Return: {p.expectedReturnLabel}</span>
                  </div>
                </div>
              </div>
            ))}
          </Card>
        )}

        <Card>
          <h3 className="text-sm font-bold text-surface-300 mb-3">Squad Fitness Overview</h3>
          <div className="flex items-center gap-4">
            <div className="relative w-24 h-24 rounded-full flex items-center justify-center shrink-0" style={{
              background: "conic-gradient(#a3e635 0% 15%, #f59e0b 15% 53%, #fb923c 53% 84%, #ef4444 84% 92%, #a855f7 92% 100%)",
            }}>
              <div className="w-16 h-16 rounded-full bg-surface-100 flex items-center justify-center flex-col">
                <span className="text-base font-bold text-surface-300">{overview.squadFitnessPct}%</span>
              </div>
            </div>
            <div className="space-y-1 flex-1">
              {overview.breakdown.map((b) => (
                <div key={b.label} className="flex items-center justify-between text-2xs">
                  <span className="text-surface-500">{b.label}</span>
                  <span className="font-semibold text-surface-300">{b.pct}%</span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card>
          <h3 className="text-sm font-bold text-surface-300 mb-3">Fitness Distribution</h3>
          <div className="flex items-end justify-between gap-2 h-24">
            {overview.fitnessDistribution.map((band) => (
              <div key={band.label} className="flex-1 flex flex-col items-center justify-end gap-1">
                <span className="text-2xs font-bold text-surface-400">{band.count}</span>
                <motion.div
                  initial={{ height: 0 }} animate={{ height: `${(band.count / 9) * 64}px` }}
                  className={`w-full rounded-t ${band.label === "Excellent" ? "bg-pitch-500" : band.label === "Good" ? "bg-accent-amber" : band.label === "Fair" ? "bg-accent-orange" : "bg-accent-red"}`}
                />
                <span className="text-[9px] text-surface-600">{band.range}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h3 className="text-sm font-bold text-surface-300 mb-3">Squad Player Status</h3>
          <div className="space-y-3">
            {overview.squadStatus.map((p) => (
              <div key={p.playerId} className="flex items-center justify-between py-1.5 border-b border-surface-200/30 last:border-0">
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-surface-300 truncate">{p.name}</p>
                  <p className="text-2xs text-surface-600">{p.position} • {p.age}</p>
                </div>
                <div className="text-center px-2">
                  <p className="text-2xs font-bold text-surface-300">{p.fitnessPct}%</p>
                  <p className="text-[9px] text-surface-600">{p.fitnessLabel}</p>
                </div>
                <div className={`text-2xs font-bold ${riskColor(p.injuryRisk)} w-14 text-right`}>{p.injuryRisk} risk</div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h3 className="text-sm font-bold text-surface-300 mb-3">Recovery Recommendations</h3>
          <div className="grid grid-cols-2 gap-3">
            {overview.recommendations.map((r) => {
              const Icon = r.label === "Sleep" ? Moon : r.label === "Hydration" ? Droplets : r.label === "Recovery" ? Activity : Stethoscope;
              return (
                <div key={r.label} className="p-3 rounded-xl bg-surface-200/60">
                  <Icon className="w-4 h-4 text-accent-blue mb-1.5" />
                  <p className="text-xs font-bold text-surface-300">{r.label}</p>
                  <p className="text-[10px] text-surface-600 mt-0.5">{r.description}</p>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}
