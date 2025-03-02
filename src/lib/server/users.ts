import * as db from "./database";
import * as argon2 from "argon2";
import type { User } from "./types";

export const getUser = async (username: string, password: string) => {
	const user = await db.getUserByUsername(username);

	if (!user || !(await argon2.verify(user.password, password))) {
		return null;
	}

	return {
		id: user.id,
		username: user.username
	} satisfies Omit<User, "password">;
};
