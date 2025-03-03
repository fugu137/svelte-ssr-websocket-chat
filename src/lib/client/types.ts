import type { Conversation, Notification } from "$lib/server/types";

export type NotificationState = Record<Conversation["id"], Notification<"MESSAGE">[]>; 

export type ActivityState = Record<Conversation["id"], Notification<"ACTIVITY">[]>; 