"use client";

import { Header } from "@/components/navigation/Header";
import { Card } from "@/components/ui/Card";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { notificationService, transferService } from "@/services";
import {
  TrendingUp, Search, Calendar, Heart, Activity,
  Users, Settings, Mail, Trophy, BarChart3, Shield,
} from "lucide-react";

export default function MorePage() {
  const router = useRouter();
  const unreadCount = notificationService.getUnreadCount();
  const negotiationCount = transferService.getActiveNegotiations().length;

  const menuItems = [
    { icon: Shield, label: "Club Overview", href: "/more/club" },
    { icon: TrendingUp, label: "Transfers", href: "/more/transfers", badge: negotiationCount },
    { icon: Activity, label: "Training", href: "/more/training" },
    { icon: BarChart3, label: "Analytics", href: "/more/analytics" },
    { icon: Search, label: "Scouting", href: "/more/scouting" },
    { icon: Heart, label: "Medical Centre", href: "/more/medical" },
    { icon: Calendar, label: "Calendar", href: "/more/calendar" },
    { icon: Trophy, label: "Competitions", href: "/more/competitions" },
    { icon: Users, label: "Staff", href: "/more/staff" },
    { icon: Mail, label: "Inbox", href: "/more/inbox", badge: unreadCount },
    { icon: Settings, label: "Settings", href: "/more/settings" },
  ];

  return (
    <div>
      <Header title="CLUB" subtitle="Manchester United" />

      <div className="px-4 py-4 space-y-2">
        {menuItems.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
          >
            <Card
              padding="sm"
              interactive
              onClick={() => router.push(item.href)}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-surface-200 flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-pitch-400" />
                </div>
                <span className="text-sm font-semibold text-surface-300">{item.label}</span>
              </div>
              <div className="flex items-center gap-2">
                {!!item.badge && (
                  <div className="w-5 h-5 rounded-full bg-pitch-500 flex items-center justify-center text-[10px] font-bold text-surface-0">
                    {item.badge}
                  </div>
                )}
                <span className="text-surface-600">›</span>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
