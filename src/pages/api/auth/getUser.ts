import type { NextApiRequest, NextApiResponse } from "next";
import { decodeToken } from "../../../lib/auth/jwt";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<any>
) {
	const { cookies } = req;
	const token = cookies.token;
	if (!token) {
		return res.status(401).json({ error: "Not logged in" });
	} else {
		const data = await decodeToken(token);
		return res.status(200).json({ user: data });
	}
}
