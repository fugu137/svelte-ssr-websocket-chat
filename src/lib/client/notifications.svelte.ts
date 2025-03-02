import type { Notification } from "$lib/server/types";
import type { ClientState } from "./types";

const websocket = new WebSocket("ws://localhost:5174");

let notifications: ClientState = $state({});

websocket.addEventListener("open", (event) => {
	console.log(event);

	websocket.send("Connected");
});

websocket.addEventListener("close", (event) => {
	console.log(event);
});

websocket.addEventListener("error", (event) => {
	console.error(event);
});

websocket.addEventListener("message", (event) => {
	console.log(event);

	const notification = JSON.parse(event.data) as Notification;

    const conversationId = notification.conversationId;
	const conversationNotifications = notifications[conversationId];

    if (conversationNotifications) {
        notifications[conversationId].push(notification);
    } else {
        notifications[conversationId] = [notification];
    }
});

export default {
	get: (conversationId: number) => {
		return notifications[conversationId] ?? [];
	},
    clear: (conversationId: number) => {
        notifications[conversationId] = [];
    }
};