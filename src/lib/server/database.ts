import { PGDATABASE, PGPASSWORD, PGUSERNAME } from "$env/static/private";
import postgres from "postgres";
import type { Conversation, Message, User } from "./types";

const sql = postgres({
	database: PGDATABASE,
	username: PGUSERNAME,
	password: PGPASSWORD,

	transform: postgres.toCamel
});

export const getUserById = async (userId: number) => {
	const [user] = await sql<User[]>`
        SELECT
            *
        FROM
            users
        WHERE
            id = ${userId}
    `;

	return user;
};

export const getUserByUsername = async (username: string) => {
	const [user] = await sql<User[]>`
        SELECT
            *
        FROM
            users
        WHERE
            username = ${username}
    `;

	return user;
};

export const getConversations = async (userId: number) => {
	const conversations = await sql<Conversation[]>`
        SELECT 
            conversations.id, 
            conversations.name
        FROM 
            users_conversations
        INNER JOIN 
            conversations 
            ON conversations.id = conversation_id
        WHERE 
            user_id = ${userId}
    `;

	return conversations;
};

export const getConversationMembers = async (conversationId: number) => {
	const members = await sql<User[]>`
        SELECT
            users.id,
            users.username
        FROM 
            users_conversations
        INNER JOIN
            users
            ON user_id = users.id
        WHERE
            conversation_id = ${conversationId}
    `;

	return members;
};

export const getMessages = async (conversationId: number) => {
	const chatMessages = await sql<(Message & { senderName: string })[]>`
        SELECT 
            messages.id, 
            users.id as "senderId", 
            messages.body 
        FROM 
            conversations_messages 
        INNER JOIN 
            messages 
            ON messages.id = message_id 
        INNER JOIN 
            users 
            ON users.id = messages.sender_id
        WHERE 
            conversation_id = ${conversationId}
    `;

	return chatMessages;
};

export const insertMessage = async (senderId: number, conversationId: number, message: string) => {
	const [insertedMessage, insertedConversation] = await sql.begin(async (sql) => {
		const [insertedMessage] = await sql<Message[]>`
            INSERT INTO 
                messages (sender_id, body)
            VALUES 
                (${senderId}, ${message})
            RETURNING 
                *
        `;

		const [insertedConversation] = await sql<Conversation[]>`
            INSERT INTO 
                conversations_messages (conversation_id, message_id)
            VALUES 
                (${conversationId}, ${insertedMessage.id})
            RETURNING
                *
        `;

		return [insertedMessage, insertedConversation];
	});

	return [insertedMessage, insertedConversation] as const;
};
