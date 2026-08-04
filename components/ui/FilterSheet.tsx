"use client";

import { BottomSheet } from "@/components/layout/BottomSheet";
import { Button } from "./Button";
import { cn } from "@/utils/cn";
import { ReactNode } from "react";

interface FilterGroup {
  label: string;
  options: string[];
  selected: string[];
  onToggle: (option: string) => void;
}

interface FilterSheetProps {
  isOpen: boolean;
  onClose: () => void;
  groups: FilterGroup[];
  onApply?: () => void;
  onReset?: () => void;
  footer?: ReactNode;
}

export function FilterSheet({ isOpen, onClose, groups, onApply, onReset, footer }: FilterSheetProps) {
  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} title="Filters" height="lg">
      <div className="space-y-5 pt-2">
        {groups.map((group) => (
          <div key={group.label}>
            <h4 className="text-xs font-bold text-surface-500 uppercase tracking-wider mb-2">{group.label}</h4>
            <div className="flex flex-wrap gap-2">
              {group.options.map((option) => {
                const active = group.selected.includes(option);
                return (
                  <button
                    key={option}
                    onClick={() => group.onToggle(option)}
                    className={cn(
                      "px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors",
                      active
                        ? "bg-pitch-500/15 text-pitch-400 border-pitch-500/30"
                        : "bg-surface-200 text-surface-600 border-transparent"
                    )}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
        {footer}
        <div className="flex gap-2 pt-2">
          {onReset && <Button variant="secondary" fullWidth onClick={onReset}>Reset</Button>}
          <Button fullWidth onClick={() => { onApply?.(); onClose(); }}>Apply Filters</Button>
        </div>
      </div>
    </BottomSheet>
  );
}
