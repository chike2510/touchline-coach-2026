"use client";

import { BottomSheet } from "@/components/layout/BottomSheet";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/utils/cn";
import { AVAILABLE_ROLES, ROLE_DUTY_OPTIONS } from "@/types";
import type { FormationSlot, Player } from "@/types";

interface RoleEditorSheetProps {
  isOpen: boolean;
  onClose: () => void;
  slot: FormationSlot | undefined;
  player: Player | undefined;
  onSetRole: (role: string) => void;
  onSetDuty: (duty: FormationSlot["duty"]) => void;
}

const dutyLabel: Record<string, string> = { At: "Attack", Su: "Support", De: "Defend" };

// Note: we don't early-return null when `slot` is missing — BottomSheet's own
// `isOpen` flag controls mount/unmount so its exit animation can still play
// during the brief moment `slot` clears alongside `isOpen`.
export function RoleEditorSheet({ isOpen, onClose, slot, player, onSetRole, onSetDuty }: RoleEditorSheetProps) {
  const roles = slot ? AVAILABLE_ROLES[slot.positionLabel] ?? [slot.role] : [];

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} title={player?.name ?? slot?.positionLabel ?? ""} height="md">
      {slot && (
        <div className="space-y-5 pt-1">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-surface-200 flex items-center justify-center font-bold text-surface-500">
              {player?.number ?? "?"}
            </div>
            <div>
              <p className="text-sm font-bold text-surface-300">{player?.name}</p>
              <p className="text-xs text-surface-600">{slot.positionLabel} • Overall {player?.overall}</p>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-surface-500 uppercase tracking-wider mb-2">Role</h4>
            <div className="flex flex-wrap gap-2">
              {roles.map((role) => (
                <button
                  key={role}
                  onClick={() => onSetRole(role)}
                  className={cn(
                    "px-3 py-2 rounded-xl text-xs font-bold border transition-colors",
                    slot.role === role ? "bg-pitch-500/15 text-pitch-400 border-pitch-500/30" : "bg-surface-200 text-surface-600 border-transparent"
                  )}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-surface-500 uppercase tracking-wider mb-2">Duty</h4>
            <div className="flex gap-2">
              {ROLE_DUTY_OPTIONS.map((duty) => (
                <button
                  key={duty}
                  onClick={() => onSetDuty(duty)}
                  className={cn(
                    "flex-1 py-2.5 rounded-xl text-xs font-bold border transition-colors",
                    slot.duty === duty ? "bg-pitch-600 text-surface-0 border-pitch-400" : "bg-surface-200 text-surface-600 border-transparent"
                  )}
                >
                  {dutyLabel[duty]}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between px-1">
            <span className="text-xs text-surface-600">Current Selection</span>
            <Badge variant="lime">{slot.role} - {slot.duty}</Badge>
          </div>
        </div>
      )}
    </BottomSheet>
  );
}
