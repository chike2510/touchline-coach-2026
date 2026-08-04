"use client";

import { Header } from "@/components/navigation/Header";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { scoutingService } from "@/services";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useState } from "react";

export default function ScoutingPage() {
  const [tab, setTab] = useState("players");
  const assignments = scoutingService.getScoutAssignments();
  const scoutedPlayers = scoutingService.getScoutedPlayers();
  const regions = scoutingService.getScoutingRegions();

  return (
    <div>
      <Header title="SCOUTING" subtitle="Discover the next generation of talent" showBack />

      <div className="px-4 py-4 space-y-4">
        <SegmentedControl
          options={[{ label: "Players", value: "players" }, { label: "Assignments", value: "assignments" }, { label: "Regions", value: "regions" }]}
          value={tab} onChange={setTab}
        />

        {tab === "players" && (
          <div className="space-y-2">
            {scoutedPlayers.map((p, i) => (
              <motion.div key={p.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
                <Card interactive className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-surface-200 flex items-center justify-center font-bold text-surface-500">{p.name[0]}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <p className="text-sm font-bold text-surface-300 truncate">{p.name}</p>
                      {p.wonderkid && <Sparkles className="w-3.5 h-3.5 text-accent-amber shrink-0" />}
                    </div>
                    <p className="text-2xs text-surface-600">{p.club} • {p.position} • {p.age}y • {p.nationality}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-surface-500">CA <span className="font-bold text-surface-300">{p.currentAbility}</span></p>
                    <p className="text-xs text-pitch-400">PA <span className="font-bold">{p.potential}</span></p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {tab === "assignments" && (
          <div className="space-y-2">
            {assignments.map((a) => (
              <Card key={a.id}>
                <div className="flex items-center justify-between mb-1.5">
                  <p className="text-sm font-bold text-surface-300">{a.scoutName}</p>
                  <Badge variant={a.status === "Active" ? "lime" : "neutral"} size="sm">{a.status}</Badge>
                </div>
                <p className="text-2xs text-surface-600">{a.region} • {a.focus}</p>
                <p className="text-2xs text-pitch-400 mt-1.5">{a.playersFound} players found</p>
              </Card>
            ))}
          </div>
        )}

        {tab === "regions" && (
          <div className="space-y-2">
            {regions.map((r) => (
              <Card key={r.name}>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-bold text-surface-300">{r.name}</p>
                  <span className="text-2xs text-surface-600">{r.scoutsAssigned} scouts</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-surface-300 overflow-hidden">
                  <div className="h-full bg-pitch-500" style={{ width: `${r.knowledge}%` }} />
                </div>
                <p className="text-2xs text-surface-600 mt-1">{r.knowledge}% Knowledge</p>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
