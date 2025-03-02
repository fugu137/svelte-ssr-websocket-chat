import type { Notification } from "$lib/server/types";

let notifications = $state<Notification[]>([]);

const websocket = new WebSocket("ws://localhost:5174");

websocket.addEventListener("open", (event) => {
	console.log(event);

	websocket.send("Hello from the client");
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

	notifications.push(notification);
});

export default {
	get notifications() {
		return notifications;
	}
};
