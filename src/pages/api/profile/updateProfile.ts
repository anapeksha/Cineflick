// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { createHash } from "../../../lib/auth/passHash";
import { decodeToken } from "../../../lib/auth/jwt";
import User from "../../../lib/models/users";
import dbConnect from "../../../lib/db/dbConnect";
import { SALT_ROUNDS } from "../../../uri";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<any>
) {
	const salt = parseInt(SALT_ROUNDS as string);
	await dbConnect();
	if (req.method === "POST") {
		const { token } = req.cookies;
		const photo = req.body.photo;
		const email = req.body.email;
		const username = req.body.username;
		const plainPassword = req.body.password;
		const password = await createHash(plainPassword, salt);
		if (!token) {
			return res.status(401).json({ error: "Unauthorised" });
		}
		const decodedToken: any = await decodeToken(token);
		if (decodedToken) {
			try {
				const response = await User.findByIdAndUpdate(decodedToken.id, {
					photo: photo,
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
	} else {
		return res.status(401).json({ error: "Unauthorised" });
	}
}
