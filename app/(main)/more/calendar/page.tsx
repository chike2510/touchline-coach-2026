"use client";

import { Header } from "@/components/navigation/Header";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { fixtureService } from "@/services";
import { motion } from "framer-motion";
import { Calendar as CalendarIcon, MapPin, Plane, Trophy } from "lucide-react";
import { useState } from "react";
import type { CalendarEventType } from "@/types";

const typeIcon: Record<CalendarEventType, React.ElementType> = {
  Match: Trophy, Training: CalendarIcon, Event: CalendarIcon, Other: CalendarIcon, Travel: Plane, DayOff: CalendarIcon,
};
const typeColor: Record<CalendarEventType, string> = {
  Match: "text-pitch-400", Training: "text-accent-blue", Event: "text-accent-purple",
  Other: "text-accent-amber", Travel: "text-accent-red", DayOff: "text-surface-500",
};

export default function CalendarPage() {
  const events = fixtureService.getCalendarEvents();
  const importantDates = fixtureService.getImportantDates();
  const dates = Array.from(new Set(events.map((e) => e.date))).sort();
  const [selectedDate, setSelectedDate] = useState(dates[0]);

  const dayEvents = events.filter((e) => e.date === selectedDate);

  return (
    <div>
      <Header title="CALENDAR" subtitle="Season 2025/26" showBack />

      <div className="px-4 py-4 space-y-4">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {dates.map((date) => {
            const d = new Date(date);
            const active = date === selectedDate;
            return (
              <button
                key={date}
                onClick={() => setSelectedDate(date)}
                className={`shrink-0 flex flex-col items-center justify-center w-14 h-16 rounded-xl border transition-colors ${
                  active ? "bg-pitch-500/15 border-pitch-500/30" : "bg-surface-200 border-transparent"
                }`}
              >
                <span className={`text-[10px] font-bold ${active ? "text-pitch-400" : "text-surface-600"}`}>
                  {d.toLocaleDateString("en-GB", { weekday: "short" }).toUpperCase()}
                </span>
                <span className={`text-base font-bold ${active ? "text-pitch-400" : "text-surface-300"}`}>{d.getDate()}</span>
              </button>
            );
          })}
        </div>

        <div className="space-y-2">
          {dayEvents.map((event, i) => {
            const Icon = typeIcon[event.type];
            return (
              <motion.div key={event.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <Card padding="sm" className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-surface-200 flex items-center justify-center shrink-0">
                    <Icon className={`w-4 h-4 ${typeColor[event.type]}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-bold text-surface-300 truncate">{event.title}</p>
                      <Badge variant="outline" size="sm">{event.type}</Badge>
                    </div>
                    {event.subtitle && <p className="text-2xs text-surface-500">{event.subtitle}</p>}
                    {event.location && (
                      <p className="text-2xs text-surface-600 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3" /> {event.location}
                      </p>
                    )}
                  </div>
                  <span className="text-xs font-bold text-surface-400 shrink-0">{event.time}</span>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <Card>
          <h3 className="text-sm font-bold text-surface-300 mb-3">Important Dates</h3>
          <div className="space-y-2">
            {importantDates.map((d) => (
              <div key={d.label} className="flex items-center justify-between py-1.5 border-b border-surface-200/30 last:border-0">
                <span className="text-xs text-surface-500">{d.label}</span>
                <span className="text-xs font-bold text-surface-300">{d.date}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
