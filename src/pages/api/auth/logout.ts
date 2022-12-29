import type { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<any>
) {
	const { cookies } = req;
	const token = cookies.token;
	if (!token) {
		return res.status(401).json({ error: "Not logged in" });
	} else {
		const serialized = serialize("token", token, {
			httpOnly: true,
			secure: process.env.NODE_ENV !== "development",
			sameSite: "strict",
			maxAge: -1,
			path: "/",
		});
		res.setHeader("Cache-Control", "no-store");
		res.setHeader("Set-Cookie", serialized);
		return res.status(200).json({ message: "Success" });
	}
}
