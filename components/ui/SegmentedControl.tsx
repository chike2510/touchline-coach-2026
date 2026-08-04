"use client";

import { cn } from "@/utils/cn";
import { motion } from "framer-motion";

interface SegmentedControlProps {
  options: { label: string; value: string }[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function SegmentedControl({ options, value, onChange, className }: SegmentedControlProps) {
  return (
    <div className={cn("flex p-1 rounded-xl bg-surface-200", className)}>
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={cn(
            "relative flex-1 py-2 px-3 text-xs font-semibold rounded-lg transition-colors z-10",
            value === option.value ? "text-surface-0" : "text-surface-600 hover:text-surface-400"
          )}
        >
          {value === option.value && (
            <motion.div
              layoutId="segmented-active"
              className="absolute inset-0 bg-pitch-600 rounded-lg"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
          <span className="relative z-10">{option.label}</span>
        </button>
      ))}
    </div>
  );
}
