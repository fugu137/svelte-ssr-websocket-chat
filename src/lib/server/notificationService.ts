import WebSocket, { WebSocketServer } from "ws";
import { createServer } from "http";

const PORT = 5174 as const;

const wss = new WebSocketServer({ noServer: true });
const server = createServer();

const activeUsers = new Map<string, WebSocket>();

server.on("upgrade", (request, socket, head) => {
	console.log("Client requested connection upgrade");

	wss.handleUpgrade(request, socket, head, (ws) => {
		const authenticated = false;

		if (!authenticated) {
			socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n");
			socket.destroy();
			return;
		}

		wss.emit("connection", ws, request);
	});
});

wss.on("connection", async (ws, request) => {
	console.log("Connected to client");

	ws.on("message", (message) => {
		console.log(`Message from the client: ${message}`);
	});

	ws.send("Hello from the server");
});

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
