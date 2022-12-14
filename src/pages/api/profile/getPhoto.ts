import type { NextApiRequest, NextApiResponse } from "next";
import User from "../../../lib/models/users";
import dbConnect from "../../../lib/db/dbConnect";
import { decodeToken } from "../../../lib/auth/jwt";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<any>
) {
	await dbConnect();
	const { token } = req.cookies;
	if (!token) {
		return res.status(401).json({ error: "Unauthorised" });
	}
	const decodedToken: any = await decodeToken(token);
	if (decodedToken) {
		try {
			const response = await User.findById(decodedToken.id);
			if (response.photo) {
				return res.status(200).json({ photo: response.photo });
			} else {
				return res.status(200).json({ photo: null });
			}
		} catch (error: any) {
			return res.status(408).json({ error: "Timed Out" });
		}
	} else {
		return res.status(401).json({ error: "something went wrong" });
	}
}
