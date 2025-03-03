import type { Notification, NotificationType } from "$lib/server/types";
import type { ActivityState, NotificationState } from "./types";

const websocket = new WebSocket("ws://localhost:5174");

let notificationState: NotificationState = $state({});
let activityState: ActivityState = $state({});

websocket.addEventListener("open", (event) => {
	console.log(event);
	// websocket.send("Connected");
});

websocket.addEventListener("close", (event) => {
	console.log(event);
});

websocket.addEventListener("error", (event) => {
	console.error(event);
});

websocket.addEventListener("message", (event) => {
	console.log(event);

	const notification = JSON.parse(event.data) as Notification<NotificationType>;
	const notificationType = notification.type;

	switch (notificationType) {
		case "MESSAGE": {
			const messageNotification = notification as Notification<"MESSAGE">;

			const conversationId = messageNotification.data.conversationId;
			const conversationNotifications = notificationState[conversationId];

			if (conversationNotifications) {
				notificationState[conversationId].push(messageNotification);
			} else {
				notificationState[conversationId] = [messageNotification];
			}
			break;
		}
		case "ACTIVITY": {
			const activityNotification = notification as Notification<"ACTIVITY">;

			const conversationId = activityNotification.data.conversationId;
			const conversationNotifications = activityState[conversationId];

			if (conversationNotifications) {
				const userId = activityNotification.data.activity.userId;
				
				activityState[conversationId] = conversationNotifications.filter(notification => notification.data.activity.userId !== userId);
				activityState[conversationId].push(activityNotification);
			} else {
				activityState[conversationId] = [activityNotification];
			}
		}
	}
});

export const notifications = {
	get: (conversationId: number) => {
		return notificationState[conversationId] ?? [];
	},
	clear: (conversationId: number) => {
		notificationState[conversationId] = [];
	}
};

export const activity = {
	get: (conversationId: number) => {
		return activityState[conversationId] ?? [];
	}
};

export const sendNotification = (notification: Notification<NotificationType>) => {
	websocket.send(JSON.stringify(notification));
}
