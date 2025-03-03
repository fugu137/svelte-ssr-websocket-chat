export interface User {
	id: number;
	username: string;
	password: string;
}

export interface Conversation {
	id: number;
	name: string;
}

export interface Message {
	id: number;
	senderId: number;
	body: string;
}

export interface Activity {
	userId: number;
	isTyping: boolean;
}

export type NotificationType = "MESSAGE" | "ACTIVITY";

export interface MessageNotificationData {
	conversationId: number;
	message: Message;
}

export interface ActivityNotificationData {
	conversationId: number;
	activity: Activity;
}

export interface Notification<T extends NotificationType> {
    // id: number;
	type: T;
	data: T extends "MESSAGE" ? MessageNotificationData : ActivityNotificationData;
}
