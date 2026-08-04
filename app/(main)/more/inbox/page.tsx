"use client";

import { Header } from "@/components/navigation/Header";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { NotificationCard } from "@/components/ui/NotificationCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { notificationService } from "@/services";
import { motion } from "framer-motion";
import { Inbox as InboxIcon, Paperclip } from "lucide-react";
import { useState } from "react";
import type { NotificationCategory } from "@/types";

const filters: { label: string; value: NotificationCategory | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Messages", value: "staff" },
  { label: "News", value: "press" },
  { label: "Competitions", value: "competition" },
  { label: "Transfers", value: "transfers" },
];

export default function InboxPage() {
  const [filter, setFilter] = useState<NotificationCategory | "all">("all");
  const messages = notificationService.getInboxMessages(filter);
  const [selectedId, setSelectedId] = useState(messages[0]?.id);
  const selected = messages.find((m) => m.id === selectedId) ?? messages[0];

  return (
    <div>
      <Header title="INBOX" subtitle="Stay on top of everything at your club" showBack />

      <div className="px-4 pt-3 pb-2 flex gap-2 overflow-x-auto scrollbar-hide">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => { setFilter(f.value); setSelectedId(undefined); }}
            className={`shrink-0 px-3 py-1.5 rounded-lg text-2xs font-bold border transition-colors ${
              filter === f.value ? "bg-pitch-500/15 text-pitch-400 border-pitch-500/30" : "bg-surface-200 text-surface-600 border-transparent"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {messages.length === 0 ? (
        <EmptyState icon={<InboxIcon className="w-7 h-7" />} title="No messages" description="You're all caught up in this category." className="px-4" />
      ) : (
        <>
          <div className="px-1 pb-2 divide-y divide-surface-200/40">
            {messages.map((m) => (
              <NotificationCard key={m.id} message={m} active={m.id === selected?.id} onClick={() => setSelectedId(m.id)} />
            ))}
          </div>

          {selected && (
            <motion.div key={selected.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="px-4 pb-6">
              <Card>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-sm font-bold text-surface-300">{selected.from}</p>
                    <p className="text-2xs text-surface-600">{selected.role}</p>
                  </div>
                  <span className="text-2xs text-surface-600">{selected.timeLabel}</span>
                </div>
                <h3 className="text-base font-bold text-surface-950 mb-3">{selected.subject}</h3>
                <div className="space-y-2 mb-4">
                  {selected.body.map((line, i) => <p key={i} className="text-sm text-surface-500">{line}</p>)}
                </div>

                {selected.offer && (
                  <Card padding="sm" className="mb-4 bg-surface-200/60">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-surface-300 font-semibold">{selected.offer.club}</span>
                      <Badge variant="outline" size="sm">Transfer</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mt-2">
                      <div><p className="text-2xs text-surface-600">Transfer Fee</p><p className="text-sm font-bold text-pitch-400">£{(selected.offer.fee / 1_000_000).toFixed(1)}M</p></div>
                      <div><p className="text-2xs text-surface-600">Player Wage</p><p className="text-sm font-bold text-pitch-400">£{(selected.offer.wage / 1000).toFixed(0)}K p/w</p></div>
                    </div>
                  </Card>
                )}

                {selected.quickActions && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Button size="sm">{selected.quickActions[0]}</Button>
                    {selected.quickActions.slice(1).map((a) => (
                      <Button key={a} size="sm" variant="secondary">{a}</Button>
                    ))}
                  </div>
                )}

                {selected.relatedPlayer && (
                  <Card padding="sm" className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-surface-200 flex items-center justify-center font-bold text-surface-500">
                      {selected.relatedPlayer.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-surface-300">{selected.relatedPlayer.name}</p>
                      <p className="text-2xs text-surface-600">{selected.relatedPlayer.age} yrs • {selected.relatedPlayer.position} • {selected.relatedPlayer.nationality}</p>
                    </div>
                    <span className="text-lg font-bold text-pitch-400">{selected.relatedPlayer.overall}</span>
                  </Card>
                )}

                {selected.attachments && (
                  <div className="space-y-1.5">
                    {selected.attachments.map((a) => (
                      <div key={a.name} className="flex items-center gap-2 p-2.5 rounded-xl bg-surface-200/60">
                        <Paperclip className="w-3.5 h-3.5 text-surface-500" />
                        <span className="text-xs text-surface-400 flex-1 truncate">{a.name}</span>
                        <span className="text-2xs text-surface-600">{a.sizeLabel}</span>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            </motion.div>
          )}
        </>
      )}
    </div>
  );
}
