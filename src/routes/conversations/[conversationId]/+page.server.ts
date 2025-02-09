import { getMessages } from "$lib/server/messageService";
import type { Conversation } from "$lib/server/types";
import type { ServerLoad } from "@sveltejs/kit";

export const load: ServerLoad = async ({ parent, params, locals }) => {
	console.log("/conversations/[conversationId]/+page.server.ts");

	const { conversations } = await parent();

	const conversationId = Number(params.conversationId);
	const conversation = conversations.find((conv: Conversation) => conv.id === conversationId);
	const messages = await getMessages(locals.user.id, conversationId);

	return {
		conversation,
		messages
	};
};
