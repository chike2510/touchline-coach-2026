"use client";

import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { motion } from "framer-motion";
import type { TacticSetting } from "@/types";

interface InstructionRowProps {
  setting: TacticSetting;
  index?: number;
  onClick?: () => void;
}

export function InstructionRow({ setting, index = 0, onClick }: InstructionRowProps) {
  return (
    <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 + index * 0.03 }}>
      <Card padding="sm" interactive onClick={onClick} className="flex items-center justify-between">
        <div>
          <div className="text-xs font-bold text-surface-300">{setting.label}</div>
          <div className="text-2xs text-surface-600">{setting.value}</div>
        </div>
        <Badge variant="outline" size="sm">{setting.sub}</Badge>
      </Card>
    </motion.div>
  );
}
