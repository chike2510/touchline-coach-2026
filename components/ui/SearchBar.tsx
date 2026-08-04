"use client";

import { cn } from "@/utils/cn";
import { Search, X } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  autoFocus?: boolean;
}

export function SearchBar({ value, onChange, placeholder = "Search…", className, autoFocus }: SearchBarProps) {
  return (
    <div className={cn("relative flex items-center", className)}>
      <Search className="absolute left-3 w-4 h-4 text-surface-600 pointer-events-none" />
      <input
        autoFocus={autoFocus}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-10 pl-9 pr-9 rounded-xl bg-surface-200 text-sm text-surface-950 placeholder:text-surface-600 outline-none focus-visible:outline focus-visible:outline-pitch-500"
      />
      {value.length > 0 && (
        <button
          onClick={() => onChange("")}
          className="absolute right-2 p-1 rounded-lg hover:bg-surface-300 transition-colors"
          aria-label="Clear search"
        >
          <X className="w-4 h-4 text-surface-600" />
        </button>
      )}
    </div>
  );
}
