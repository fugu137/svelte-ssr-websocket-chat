import WebSocket, { WebSocketServer } from "ws";
import { createServer } from "http";
import cookie from "cookie";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "$env/static/private";
import type { User, Notification, Message } from "./types";

const PORT = 5174 as const;

const wss = new WebSocketServer({ noServer: true });
const server = createServer();

const activeUsers = new Map<number, WebSocket>();

server.on("upgrade", (request, socket, head) => {
	console.log("Client requested connection upgrade");

	wss.handleUpgrade(request, socket, head, (ws) => {
		const cookies = cookie.parse(request.headers["cookie"] ?? "");
		const authToken = cookies["authToken"];

		if (authToken) {
			const user = jwt.verify(authToken, JWT_SECRET) as User;

			activeUsers.set(user.id, ws);

			wss.emit("connection", ws, request, user);
		} else {
			socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n");
			socket.destroy();
		}
	});
});

wss.on("connection", async (ws: WebSocket, request: any, user: User) => {
	console.log("Connected to client", user);

	ws.on("message", (message) => {
		console.log(`Message from the client ${user.id}: ${message}`);
	});

	ws.on("close", (event) => {
		console.log("Closing WebSocket connection", event);

		activeUsers.delete(user.id);
	});
});

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));

export const sendNotification = (userId: number, conversationId: number, message: Message) => {
	const client = activeUsers.get(userId);

	if (client && client.readyState === WebSocket.OPEN) {
		console.log("Sending notification...");
		console.log("User:", userId, "Online:", activeUsers.has(userId));

		const notification = {
			conversationId,
			message
		} satisfies Notification;

		client.send(JSON.stringify(notification));
	}
};
