import { JWT_SECRET } from '$env/static/private';
import type { User } from '$lib/server/types';
import type { Handle } from '@sveltejs/kit';
import jwt from "jsonwebtoken";

export const handle: Handle = async ({ event, resolve }) => {
    const authToken = event.cookies.get("authToken")
	
	if (authToken) {
		const decoded = jwt.verify(authToken, JWT_SECRET) as jwt.JwtPayload;
		event.locals.user = decoded as User;
	}

	const response = await resolve(event);

	return response;
};