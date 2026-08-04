"use client";

import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import type { FormationSlot, Player } from "@/types";
import { RefObject } from "react";

interface PlayerTokenProps {
  slot: FormationSlot;
  player: Player | undefined;
  containerRef: RefObject<HTMLDivElement>;
  selected: boolean;
  draggable: boolean;
  onSelect: (id: string) => void;
  onMove: (id: string, x: number, y: number) => void;
}

export function PlayerToken({ slot, player, containerRef, selected, draggable, onSelect, onMove }: PlayerTokenProps) {
  return (
    <motion.div
      drag={draggable}
      dragMomentum={false}
      dragElastic={0.05}
      dragConstraints={containerRef}
      whileDrag={{ scale: 1.15, zIndex: 30 }}
      onDragEnd={(_, info) => {
        const container = containerRef.current;
        if (!container) return;
        const rect = container.getBoundingClientRect();
        const x = ((info.point.x - rect.left) / rect.width) * 100;
        const y = ((info.point.y - rect.top) / rect.height) * 100;
        onMove(slot.id, x, y);
      }}
      onClick={() => onSelect(slot.id)}
      className="absolute flex flex-col items-center cursor-grab active:cursor-grabbing touch-none z-10"
      style={{ left: `${slot.x}%`, top: `${slot.y}%`, transform: "translate(-50%, -50%)" }}
    >
      <div
        className={cn(
          "w-11 h-11 rounded-xl shadow-lg flex flex-col items-center justify-center text-white font-bold border-2 transition-colors",
          selected ? "bg-pitch-600 border-pitch-300" : "bg-red-600/90 border-red-800/60"
        )}
      >
        <span className="text-xs leading-none">{player?.number ?? "?"}</span>
      </div>
      <span className="text-[10px] font-bold text-surface-300 mt-1 bg-black/70 px-1.5 py-0.5 rounded whitespace-nowrap">
        {player?.name.split(" ").pop() ?? "Empty"}
      </span>
      <span className="text-[9px] font-semibold text-pitch-400 bg-black/70 px-1 rounded mt-0.5">
        {slot.role} · {slot.duty}
      </span>
    </motion.div>
  );
}
