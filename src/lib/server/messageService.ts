import * as db from "./database";

export const getConversations = async (userId: number) => {
	return await db.getConversations(userId);
};

export const getMessages = async (userId: number, conversationId: number) => {
	// Validation
	return await db.getMessages(conversationId);
};

export const sendMessage = async (userId: number, conversationId: number, message: string) => {
	// Validation
	return await db.insertMessage(userId, conversationId, message);
};
