"use client";

import { Header } from "@/components/navigation/Header";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { PitchMarkings } from "@/features/tactics/PitchMarkings";
import { PlayerToken } from "@/features/tactics/PlayerToken";
import { RoleEditorSheet } from "@/features/tactics/RoleEditorSheet";
import { InstructionRow } from "@/features/tactics/InstructionRow";
import { PrincipleSlider } from "@/features/tactics/PrincipleSlider";
import { TacticPresetPill } from "@/features/tactics/TacticPresetPill";
import { useTacticsStore, useAppStore } from "@/store";
import { playerService } from "@/services";
import { motion } from "framer-motion";
import { FlaskConical, Save, Move } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

export default function TacticsPage() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null!);
  const {
    presets, activePresetId, slots, selectedSlotId, setActivePreset,
    selectSlot, moveSlot, setSlotRole, setSlotDuty, resetActivePreset, saveActivePreset,
  } = useTacticsStore();
  const showToast = useAppStore((s) => s.showToast);

  const [editMode, setEditMode] = useState(false);
  const activePreset = presets.find((p) => p.id === activePresetId) ?? presets[0];
  const selectedSlot = slots.find((s) => s.id === selectedSlotId);
  const selectedPlayer = selectedSlot ? playerService.getPlayerById(selectedSlot.playerId) : undefined;

  return (
    <div>
      <Header
        title="TACTICS"
        subtitle={activePreset.name}
        rightAction={
          <div className="flex gap-1">
            <button
              onClick={() => router.push("/tactics/lab")}
              className="p-2 rounded-xl hover:bg-surface-100 transition-colors"
              aria-label="Tactical Lab"
            >
              <FlaskConical className="w-5 h-5 text-surface-400" />
            </button>
            <button
              onClick={() => { saveActivePreset(); showToast("Tactic saved", "success"); }}
              className="p-2 rounded-xl hover:bg-surface-100 transition-colors"
              aria-label="Save tactic"
            >
              <Save className="w-5 h-5 text-surface-400" />
            </button>
          </div>
        }
      />

      <div className="px-4 py-4 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex-1 mr-3">
            <ProgressBar value={activePreset.familiarity} label="Tactic Familiarity" showValue size="sm" />
          </div>
          <button
            onClick={() => setEditMode((v) => !v)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-2xs font-bold border transition-colors ${
              editMode ? "bg-pitch-500/15 text-pitch-400 border-pitch-500/30" : "bg-surface-200 text-surface-600 border-transparent"
            }`}
          >
            <Move className="w-3.5 h-3.5" />
            {editMode ? "Editing" : "Edit Shape"}
          </button>
        </div>

        {/* Preset picker */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide -mx-4 px-4">
          {presets.map((preset) => (
            <TacticPresetPill key={preset.id} preset={preset} active={preset.id === activePresetId} onClick={() => setActivePreset(preset.id)} />
          ))}
        </div>

        {/* Formation pitch */}
        <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}>
          <Card padding="none" className="relative aspect-[4/5] bg-gradient-to-b from-emerald-950/40 to-emerald-950/20 overflow-hidden">
            <div ref={containerRef} className="absolute inset-0">
              <PitchMarkings />
              {slots.map((slot) => (
                <PlayerToken
                  key={slot.id}
                  slot={slot}
                  player={playerService.getPlayerById(slot.playerId)}
                  containerRef={containerRef}
                  selected={slot.id === selectedSlotId}
                  draggable={editMode}
                  onSelect={selectSlot}
                  onMove={moveSlot}
                />
              ))}
            </div>
          </Card>
        </motion.div>
        {editMode && (
          <p className="text-2xs text-surface-600 text-center -mt-2">Drag players to reposition · Tap a player to edit role &amp; duty</p>
        )}

        <div className="flex items-center justify-between px-1">
          <Badge variant="outline">{activePreset.mentality} Mentality</Badge>
          <Badge variant="outline">{activePreset.teamFluidity} Team Fluidity</Badge>
        </div>

        {/* Tactical principles */}
        <Card>
          <h3 className="text-sm font-bold text-surface-300 mb-3">Tactical Principles</h3>
          <div className="space-y-1">
            {activePreset.principles.map((p) => (
              <PrincipleSlider key={p.key} principle={p} />
            ))}
          </div>
        </Card>

        {/* Team instructions */}
        <Card>
          <h3 className="text-sm font-bold text-surface-300 mb-3">Team Instructions</h3>
          <div className="grid grid-cols-3 gap-3 text-2xs">
            <div>
              <p className="font-bold text-surface-500 uppercase tracking-wide mb-1.5">In Possession</p>
              <ul className="space-y-1 text-surface-400">{activePreset.instructions.inPossession.map((i) => <li key={i}>{i}</li>)}</ul>
            </div>
            <div>
              <p className="font-bold text-surface-500 uppercase tracking-wide mb-1.5">In Transition</p>
              <ul className="space-y-1 text-surface-400">{activePreset.instructions.inTransition.map((i) => <li key={i}>{i}</li>)}</ul>
            </div>
            <div>
              <p className="font-bold text-surface-500 uppercase tracking-wide mb-1.5">Out of Possession</p>
              <ul className="space-y-1 text-surface-400">{activePreset.instructions.outOfPossession.map((i) => <li key={i}>{i}</li>)}</ul>
            </div>
          </div>
        </Card>

        {/* Detailed settings */}
        <div className="space-y-2">
          {activePreset.settings.map((setting, i) => (
            <InstructionRow key={setting.key} setting={setting} index={i} />
          ))}
        </div>
      </div>

      <RoleEditorSheet
        isOpen={!!selectedSlotId}
        onClose={() => selectSlot(null)}
        slot={selectedSlot}
        player={selectedPlayer}
        onSetRole={(role) => selectedSlotId && setSlotRole(selectedSlotId, role)}
        onSetDuty={(duty) => selectedSlotId && setSlotDuty(selectedSlotId, duty)}
      />
    </div>
  );
}
