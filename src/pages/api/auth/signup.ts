// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { createHash } from "../../../lib/auth/passHash";
import User from "../../../lib/models/users";
import dbConnect from "../../../lib/db/dbConnect";
import { SALT_ROUNDS } from "../../../uri";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<any>
) {
	const salt = parseInt(SALT_ROUNDS as string);
	await dbConnect();
	const email = req.body.email;
	const username = req.body.username;
	const plainPassword = req.body.password;
	const password = await createHash(plainPassword, salt);
	try {
		const response = await User.create({
			username: username,
			email: email,
			password: password,
		});
		return res.status(200).json(response);
	} catch (err: any) {
		if (err.code === 11000) {
			return res
				.status(409)
				.json({ error: "Username or Email already exists" });
		} else return res.status(408).json({ error: "Timed out" });
	}
}
