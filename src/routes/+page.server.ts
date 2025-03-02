import { getUser } from "$lib/server/users";
import { fail, redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";
import { JWT_SECRET } from "$env/static/private";
import jwt from "jsonwebtoken";

export const actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();

		const username = data.get("username");
		const password = data.get("password");

		if (!username || !password) {
			return fail(400, { username, missing: true });
		}

		const user = await getUser(username as string, password as string);

		if (!user) {
			return fail(401, { username, invalid: true });
		}

		const authToken = jwt.sign(user, JWT_SECRET);

		cookies.set("authToken", authToken, { path: "/" });

		redirect(303, "/conversations");
	}
} satisfies Actions;
