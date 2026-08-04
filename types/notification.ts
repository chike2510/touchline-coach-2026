import type { NotificationCategory, NotificationType } from "./common";

export interface InboxAttachment {
  name: string;
  sizeLabel: string;
}

export interface InboxMessage {
  id: string;
  from: string;
  role: string;
  subject: string;
  preview: string;
  body: string[];
  category: NotificationCategory;
  categoryLabel: string;
  timeLabel: string;
  dateGroup: string;
  read: boolean;
  type: NotificationType;
  quickActions?: string[];
  attachments?: InboxAttachment[];
  relatedPlayer?: { name: string; age: number; position: string; nationality: string; overall: number; photoUrl?: string };
  offer?: { club: string; fee: number; wage: number };
}
