import { inboxMessages } from "@/lib/mock";
import type { InboxMessage, NotificationCategory } from "@/types";

export function getInboxMessages(category?: NotificationCategory | "all"): InboxMessage[] {
  if (!category || category === "all") return inboxMessages;
  return inboxMessages.filter((m) => m.category === category);
}

export function getUnreadCount(): number {
  return inboxMessages.filter((m) => !m.read).length;
}

export function getMessageById(id: string): InboxMessage | undefined {
  return inboxMessages.find((m) => m.id === id);
}
