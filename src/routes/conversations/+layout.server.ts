import { getConversations } from "$lib/server/messageService";
import { redirect, type ServerLoad } from "@sveltejs/kit";

export const load: ServerLoad = async ({ params, locals }) => {
	console.log("/conversations/+layout.server.ts");

	if (!locals.user) {
		redirect(303, "/");
	}

	const conversations = await getConversations(locals.user.id);

	return { conversations };
};
