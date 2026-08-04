"use client";

import { Header } from "@/components/navigation/Header";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { staffService } from "@/services";
import { motion } from "framer-motion";
import { Star, UserPlus } from "lucide-react";

function StarRating({ value }: { value: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`w-3 h-3 ${i < Math.round(value) ? "fill-accent-amber text-accent-amber" : "text-surface-400"}`} />
      ))}
    </div>
  );
}

export default function StaffPage() {
  const overview = staffService.getStaffOverview();

  return (
    <div>
      <Header title="STAFF" subtitle="Build your backroom team" showBack />

      <div className="px-4 py-4 space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <Card padding="sm" className="text-center">
            <div className="text-xl font-bold text-pitch-400">{overview.totalStaff}</div>
            <div className="text-2xs text-surface-600 mt-1">Total Staff</div>
          </Card>
          <Card padding="sm" className="text-center">
            <div className="text-xl font-bold text-pitch-400">{overview.staffQuality}</div>
            <div className="text-2xs text-surface-600 mt-1">Staff Quality</div>
          </Card>
          <Card padding="sm" className="text-center">
            <div className="text-xl font-bold text-pitch-400">{overview.teamCohesion}</div>
            <div className="text-2xs text-surface-600 mt-1">Team Cohesion</div>
          </Card>
        </div>

        <Card>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-surface-500">Monthly Wage</span>
            <span className="text-xs font-bold text-surface-300">£{(overview.monthlyWage / 1000).toFixed(0)}K / £{(overview.wageBudget / 1000).toFixed(0)}K</span>
          </div>
          <ProgressBar value={overview.monthlyWage} max={overview.wageBudget} size="sm" />
        </Card>

        <div>
          <h3 className="text-sm font-bold text-surface-300 mb-2">Key Staff</h3>
          <div className="space-y-2">
            {overview.keyStaff.map((s, i) => (
              <motion.div key={s.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
                <Card padding="sm">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 rounded-xl bg-surface-200 flex items-center justify-center font-bold text-surface-500">
                      {s.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-surface-300 truncate">{s.name}</p>
                      <p className="text-2xs text-surface-600">{s.role} • {s.nationalityFlag} {s.nationality} • {s.age}y</p>
                    </div>
                    <StarRating value={s.reputation} />
                  </div>
                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-surface-200/40">
                    {s.attributes.map((a) => (
                      <div key={a.label}>
                        <p className="text-[10px] text-surface-600 truncate">{a.label}</p>
                        <p className="text-xs font-bold text-pitch-400">{a.value}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        <Card>
          <h3 className="text-sm font-bold text-surface-300 mb-3">Staff by Department</h3>
          <div className="space-y-2">
            {overview.byDepartment.map((d) => (
              <div key={d.department} className="flex items-center justify-between">
                <span className="text-xs text-surface-500">{d.department}</span>
                <span className="text-xs font-bold text-surface-300">{d.count}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h3 className="text-sm font-bold text-surface-300 mb-3">Staff Roles Filled</h3>
          <div className="space-y-3">
            {overview.rolesFilled.map((r) => (
              <div key={r.role}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-surface-500">{r.role}</span>
                  <span className="text-2xs font-bold text-surface-400">{r.filled}/{r.total}</span>
                </div>
                <ProgressBar value={r.filled} max={r.total} size="sm" />
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h3 className="text-sm font-bold text-surface-300 mb-3">Recruitment Priorities</h3>
          <div className="space-y-2">
            {overview.recruitmentPriorities.map((p) => (
              <div key={p.role} className="flex items-center gap-3 p-2.5 rounded-xl bg-surface-200/60">
                <UserPlus className="w-4 h-4 text-surface-500 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-surface-300">{p.role}</p>
                  <p className="text-2xs text-surface-600">{p.description}</p>
                </div>
                <Badge variant={p.priority === "High" ? "red" : "amber"} size="sm">{p.priority}</Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h3 className="text-sm font-bold text-surface-300 mb-3">Recent Staff Updates</h3>
          <div className="space-y-2">
            {overview.recentUpdates.map((u) => (
              <div key={u.id} className="flex items-center justify-between py-1.5 border-b border-surface-200/30 last:border-0">
                <div>
                  <p className="text-xs font-semibold text-surface-300">{u.name}</p>
                  <p className="text-2xs text-surface-600">{u.role}</p>
                </div>
                <div className="text-right">
                  <span className={`text-2xs font-bold ${u.status === "Joined" ? "text-pitch-400" : "text-accent-red"}`}>{u.status}</span>
                  <p className="text-[10px] text-surface-600">{u.timeAgo}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
