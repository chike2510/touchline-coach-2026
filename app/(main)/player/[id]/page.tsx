"use client";

import { Header } from "@/components/navigation/Header";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { RadarChart } from "@/components/ui/RadarChart";
import { Tabs } from "@/components/ui/Tabs";
import { EmptyState } from "@/components/ui/EmptyState";
import { playerService } from "@/services";
import { formatCurrency, getRatingColor } from "@/lib/utils";
import { motion } from "framer-motion";
import { Euro, FileText, Heart, Link2, Shield, UserX, Zap } from "lucide-react";

export default function PlayerProfilePage({ params }: { params: { id: string } }) {
  const player = playerService.getPlayerById(params.id);

  if (!player) {
    return (
      <div>
        <Header title="Player Profile" showBack />
        <EmptyState icon={<UserX className="w-7 h-7" />} title="Player not found" description="This player is no longer part of the squad." />
      </div>
    );
  }

  const radarData = player.keyAttributes.slice(0, 6).map((a) => ({ axis: a.label, value: a.value / 10 }));

  const overviewTab = (
    <div className="space-y-4">
      <Card>
        <h3 className="text-sm font-bold text-surface-300 mb-3">Attribute Profile</h3>
        <RadarChart data={radarData} max={10} />
      </Card>

      <Card>
        <h3 className="text-sm font-bold text-surface-300 mb-4">Key Attributes</h3>
        <div className="space-y-3">
          {player.keyAttributes.map((attr) => (
            <ProgressBar key={attr.label} label={attr.label} value={attr.value} showValue size="sm" />
          ))}
        </div>
      </Card>

      <Card>
        <h3 className="text-sm font-bold text-surface-300 mb-3">Traits</h3>
        <div className="flex flex-wrap gap-2">
          {player.traits.map((t) => <Badge key={t.id} variant="outline">{t.label}</Badge>)}
        </div>
      </Card>

      <Card>
        <h3 className="text-sm font-bold text-surface-300 mb-3">Season Stats</h3>
        <div className="grid grid-cols-4 gap-2 text-center">
          <div><p className="text-lg font-bold text-surface-300">{player.stats.appearances}</p><p className="text-2xs text-surface-600">Apps</p></div>
          <div><p className="text-lg font-bold text-pitch-400">{player.stats.goals}</p><p className="text-2xs text-surface-600">Goals</p></div>
          <div><p className="text-lg font-bold text-pitch-400">{player.stats.assists}</p><p className="text-2xs text-surface-600">Assists</p></div>
          <div><p className="text-lg font-bold text-surface-300">{player.stats.rating}</p><p className="text-2xs text-surface-600">Avg Rating</p></div>
        </div>
      </Card>
    </div>
  );

  const attributesTab = (
    <div className="space-y-4">
      {(["technical", "mental", "physical"] as const).map((group) => (
        <Card key={group}>
          <h3 className="text-sm font-bold text-surface-300 mb-3 capitalize">{group}</h3>
          <div className="space-y-3">
            {Object.entries(player.attributes[group]).map(([label, value]) => (
              <ProgressBar key={label} label={label} value={value} showValue size="sm" />
            ))}
          </div>
        </Card>
      ))}
    </div>
  );

  const dev = player.development;
  const developmentTab = dev ? (
    <div className="space-y-4">
      <Card>
        <div className="flex items-center justify-between">
          <div className="text-center flex-1">
            <p className="text-2xl font-bold text-pitch-400">{dev.currentAbility}</p>
            <p className="text-2xs text-surface-600">Current Ability</p>
          </div>
          <div className="text-center flex-1">
            <p className="text-2xl font-bold text-accent-purple">{dev.potentialAbility}</p>
            <p className="text-2xs text-surface-600">Potential Ability</p>
          </div>
        </div>
      </Card>

      <Card>
        <h3 className="text-sm font-bold text-surface-300 mb-3">Development Plan</h3>
        <div className="space-y-3">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-surface-300">{dev.primaryFocus.attribute}</span>
              <span className="text-2xs text-surface-600">Target {dev.primaryFocus.targetDate}</span>
            </div>
            <p className="text-2xs text-surface-600 mb-1.5">{dev.primaryFocus.description}</p>
            <ProgressBar value={dev.primaryFocus.progress} showValue size="sm" />
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-surface-300">{dev.secondaryFocus.attribute}</span>
              <span className="text-2xs text-surface-600">Target {dev.secondaryFocus.targetDate}</span>
            </div>
            <p className="text-2xs text-surface-600 mb-1.5">{dev.secondaryFocus.description}</p>
            <ProgressBar value={dev.secondaryFocus.progress} showValue size="sm" />
          </div>
        </div>
      </Card>

      <Card>
        <h3 className="text-sm font-bold text-surface-300 mb-3">Role Familiarity</h3>
        <div className="space-y-2.5">
          {dev.roleFamiliarity.map((r) => (
            <ProgressBar key={r.role} label={r.role} value={r.percentage} showValue size="sm" />
          ))}
        </div>
      </Card>

      <Card>
        <h3 className="text-sm font-bold text-surface-300 mb-2">System Familiarity</h3>
        <div className="flex items-center justify-between">
          <span className="text-xs text-surface-500">{dev.systemFamiliarity.system}</span>
          <span className="text-lg font-bold text-pitch-400">{dev.systemFamiliarity.rating}%</span>
        </div>
      </Card>

      <Card className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-surface-200 shrink-0" />
        <div>
          <p className="text-sm font-bold text-surface-300">{dev.coachFeedback.coach}</p>
          <p className="text-2xs text-surface-600 mb-1.5">{dev.coachFeedback.role}</p>
          <p className="text-xs text-surface-400 italic mb-2">"{dev.coachFeedback.quote}"</p>
          <div className="flex flex-wrap gap-1.5">
            {dev.coachFeedback.strengths.map((s) => <Badge key={s} variant="lime" size="sm">{s}</Badge>)}
            {dev.coachFeedback.improve.map((s) => <Badge key={s} variant="outline" size="sm">{s}</Badge>)}
          </div>
        </div>
      </Card>
    </div>
  ) : (
    <EmptyState title="No development plan" description="This player doesn't have an active development plan yet." />
  );

  const tabs = [
    { id: "overview", label: "Overview", content: overviewTab },
    { id: "attributes", label: "Attributes", content: attributesTab },
    { id: "development", label: "Development", content: developmentTab },
  ];

  return (
    <div>
      <Header title="Player Profile" showBack />

      <div className="px-4 py-4 space-y-4">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-2xl bg-surface-200 flex items-center justify-center text-2xl font-bold text-surface-500">
              {player.name.split(" ").map((n) => n[0]).join("")}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-xl font-bold text-surface-300">{player.name}</h2>
                {player.isCaptain && <Badge variant="lime" size="sm">C</Badge>}
              </div>
              <p className="text-sm text-surface-500 mb-2">{player.positionLabel}</p>
              <div className="flex items-center gap-3 text-2xs text-surface-600">
                <span>{player.nationalityFlag} {player.nationality}</span>
                <span>{player.age} yrs</span>
                <span>{player.heightCm}cm</span>
              </div>
            </div>
            <div className={`text-3xl font-bold ${getRatingColor(player.overall)}`}>{player.overall}</div>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <div className="grid grid-cols-4 gap-3">
            {[
              { icon: Zap, label: "Sharpness", value: `${player.sharpness}%` },
              { icon: Heart, label: "Fitness", value: `${player.fitness}%` },
              { icon: Shield, label: "Morale", value: player.morale },
              { icon: Link2, label: "Chemistry", value: player.chemistry },
            ].map((stat) => (
              <Card key={stat.label} padding="sm" className="text-center">
                <stat.icon className="w-4 h-4 mx-auto mb-2 text-pitch-400" />
                <div className="text-sm font-bold text-pitch-400">{stat.value}</div>
                <div className="text-2xs text-surface-600 mt-1">{stat.label}</div>
              </Card>
            ))}
          </div>
        </motion.div>

        <Tabs tabs={tabs} defaultTab="overview" />

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <div className="grid grid-cols-2 gap-3">
            <Card padding="sm">
              <FileText className="w-4 h-4 text-surface-500 mb-2" />
              <div className="text-2xs text-surface-600">Contract</div>
              <div className="text-sm font-bold text-surface-300">{player.contractExpiry}</div>
              <div className="text-xs text-pitch-400 mt-1">£{(player.wage / 1000).toFixed(0)}K/w</div>
            </Card>
            <Card padding="sm">
              <Euro className="w-4 h-4 text-surface-500 mb-2" />
              <div className="text-2xs text-surface-600">Value</div>
              <div className="text-sm font-bold text-surface-300">{formatCurrency(player.value)}</div>
              <div className="text-xs text-surface-500 mt-1">{player.transferStatus}</div>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
