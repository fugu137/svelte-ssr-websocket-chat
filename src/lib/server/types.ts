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

export interface Notification {
    // id: number;
	conversationId: number;
	message: Message;
}
