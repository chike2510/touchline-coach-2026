"use client";

import { cn } from "@/utils/cn";
import type { MatchEvent } from "@/types";
import { Circle, Flag, PlayCircle, Repeat, Square, Target } from "lucide-react";

interface TimelineProps {
  events: MatchEvent[];
  homeTeamShort?: string;
  className?: string;
}

const iconFor = (type: MatchEvent["type"]) => {
  switch (type) {
    case "goal": return Target;
    case "yellow": return Square;
    case "red": return Square;
    case "sub": return Repeat;
    case "kickoff": return PlayCircle;
    case "halftime": return Flag;
    case "fulltime": return Flag;
    default: return Circle;
  }
};

const colorFor = (type: MatchEvent["type"]) => {
  switch (type) {
    case "goal": return "text-pitch-400";
    case "yellow": return "text-accent-amber";
    case "red": return "text-accent-red";
    case "sub": return "text-accent-blue";
    default: return "text-surface-500";
  }
};

export function Timeline({ events, className }: TimelineProps) {
  return (
    <div className={cn("space-y-3", className)}>
      {events.map((event, i) => {
        const Icon = iconFor(event.type);
        return (
          <div key={i} className="flex items-start gap-3">
            <span className="text-2xs font-bold text-surface-600 w-8 pt-0.5 tabular-nums">
              {event.type === "halftime" ? "HT" : event.type === "fulltime" ? "FT" : `${event.minute}'`}
            </span>
            <Icon className={cn("w-4 h-4 mt-0.5 shrink-0", colorFor(event.type))} />
            <div className="min-w-0">
              {event.player && (
                <p className="text-sm font-semibold text-surface-300 truncate">{event.player}</p>
              )}
              {event.detail && <p className="text-xs text-surface-600">{event.detail}</p>}
              {!event.player && !event.detail && (
                <p className="text-xs text-surface-600 capitalize">{event.type}</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
