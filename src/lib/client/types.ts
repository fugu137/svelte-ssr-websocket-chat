import type { Conversation, Notification } from "$lib/server/types";

export type ClientState = Record<Conversation["id"], Notification[]>; 