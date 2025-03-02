import { getConversationMembers } from "$lib/server/database";
import { getMessages, sendMessage } from "$lib/server/messages";
import type { Conversation } from "$lib/server/types";
import type { ServerLoad } from "@sveltejs/kit";
import type { Actions } from "@sveltejs/kit";

export const load: ServerLoad = async ({ parent, params, locals }) => {
	console.log("/conversations/[conversationId]/+page.server.ts");

	const { conversations } = await parent();

	const conversationId = Number(params.conversationId);

	const conversation = conversations.find((conv: Conversation) => conv.id === conversationId) as Conversation;
	const users = await getConversationMembers(conversationId);
	const messages = await getMessages(locals.user.id, conversationId);

	return {
		conversation,
		users,
		messages
	};
};

export const actions = {
	default: async ({ request, params, locals }) => {
		const data = await request.formData();

		const userId = locals.user.id;
		const conversationId = Number(params.conversationId);
		const message = data.get('message') as string;

		sendMessage(userId, conversationId, message);
	}
} satisfies Actions;
