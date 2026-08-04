"use client";

import { useMemo } from "react";
import { playerService } from "@/services";

export function useSquad() {
  return useMemo(() => playerService.getSquad(), []);
}

export function usePlayer(id: string | undefined) {
  return useMemo(() => (id ? playerService.getPlayerById(id) : undefined), [id]);
}
