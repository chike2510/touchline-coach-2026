"use client";

import { Card } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { getRatingColor } from "@/lib/utils";
import { cn } from "@/utils/cn";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import type { Player } from "@/types";

interface PlayerCardProps {
  player: Player;
  index?: number;
  view?: "grid" | "list";
}

export function PlayerCard({ player, index = 0, view = "grid" }: PlayerCardProps) {
  const router = useRouter();

  if (view === "list") {
    return (
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.03 }}>
        <Card interactive padding="sm" onClick={() => router.push(`/player/${player.id}`)} className="flex items-center gap-3">
          <Avatar name={player.name} size="sm" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <p className="text-sm font-bold text-surface-300 truncate">{player.name}</p>
              {player.isCaptain && <Badge variant="lime" size="sm">C</Badge>}
            </div>
            <p className="text-2xs text-surface-600">{player.positionLabel} • #{player.number}</p>
          </div>
          <div className="flex items-center gap-4 text-right">
            <div>
              <div className="text-2xs text-surface-600">Fit</div>
              <div className="text-xs font-bold text-pitch-400">{player.fitness}%</div>
            </div>
            <span className={cn("text-lg font-bold tabular-nums", getRatingColor(player.overall))}>{player.overall}</span>
          </div>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.04 }}>
      <Card interactive className="relative" onClick={() => router.push(`/player/${player.id}`)}>
        <div className="absolute top-3 right-3 text-2xl font-bold text-surface-300/20">{player.number}</div>
        {player.isCaptain && (
          <span className="absolute top-3 left-3 text-2xs font-bold px-1.5 py-0.5 rounded bg-pitch-500/15 text-pitch-400 border border-pitch-500/20">C</span>
        )}
        <Avatar name={player.name} size="lg" className="mb-3" />
        <h3 className="text-sm font-bold text-surface-300 truncate">{player.name}</h3>
        <p className="text-2xs text-surface-600">{player.nationalityFlag} Age {player.age}</p>
        <div className="flex items-center gap-2 mt-1.5">
          <span className="text-2xs font-semibold px-1.5 py-0.5 rounded bg-surface-200 text-surface-500">{player.position}</span>
          <span className={cn("text-lg font-bold", getRatingColor(player.overall))}>{player.overall}</span>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-surface-200/50">
          <div>
            <div className="text-2xs text-surface-600">Sharpness</div>
            <div className="text-xs font-bold text-pitch-400">{player.sharpness}%</div>
          </div>
          <div>
            <div className="text-2xs text-surface-600">Fitness</div>
            <div className="text-xs font-bold text-pitch-400">{player.fitness}%</div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
