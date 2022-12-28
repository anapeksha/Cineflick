// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { comparePass } from "../../../lib/auth/passHash";
import { encodeToken, decodeToken } from "../../../lib/auth/jwt";
import { serialize } from "cookie";
import dbConnect from "../../../lib/db/dbConnect";
import User from "../../../lib/models/users";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<any>
) {
	await dbConnect();
	const username = req.body.username;
	const password = req.body.password;
	if (req.method === "POST") {
		try {
			var user = await User.findOne({
				$or: [{ username: username }, { email: username }],
			}).lean();
			if (!user) {
				return res.status(404).json({ error: "User does not exist" });
			}
			if (await comparePass(password, user.password)) {
				var token = await encodeToken({
					id: user._id,
					username: user.username,
					type: "user",
				});
				const serialized = serialize("token", token, {
					httpOnly: true,
					secure: process.env.NODE_ENV !== "development",
					sameSite: "strict",
					maxAge: 60 * 60 * 24,
					path: "/",
				});
				res.setHeader("Set-Cookie", serialized);
				return res.status(200).json({ message: "Success" });
			}
			return res.status(401).json({ error: "Invalid Password" });
		} catch (err: any) {
			console.log(err);

			return res.status(408).json({ error: "Timed Out" });
		}
	}
}
