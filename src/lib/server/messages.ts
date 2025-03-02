import * as db from "./database";
import { sendNotification } from "./notifications";

export const getConversations = async (userId: number) => {
	return await db.getConversations(userId);
};

export const getConversationMembers = async (conversationId: number) => {
	return await db.getConversationMembers(conversationId);
};

export const getMessages = async (userId: number, conversationId: number) => {
	return await db.getMessages(conversationId);
};

export const sendMessage = async (userId: number, conversationId: number, message: string) => {
	const [sentMessage] = await db.insertMessage(userId, conversationId, message);
	const members = await getConversationMembers(conversationId);

	members.forEach((member) => {
		if (member.id !== userId) {
			sendNotification(member.id, conversationId, sentMessage);
		}
	});

	return sentMessage;
};
