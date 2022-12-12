import type { NextApiRequest, NextApiResponse } from "next";
import { decodeToken } from "../../../lib/auth/jwt";
import dbConnect from "../../../lib/db/dbConnect";
import Watchlist from "../../../lib/models/watchlist";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<any>
) {
	await dbConnect();
	if (req.method === "POST") {
		const { token } = req.cookies;
		const watchlist = req.body.list;
		if (!token) {
			return res.status(401).json({ error: "Unauthorised" });
		}
		const decodedToken: any = await decodeToken(token);
		if (decodedToken) {
			try {
				const response = await Watchlist.findByIdAndUpdate(decodedToken.id, {
					list: watchlist,
				});
				return res.status(200).json({ message: "Success" });
			} catch (err: any) {
				return res.status(408).json({ error: "Timed out" });
			}
		} else {
			return res.status(401).json({ error: "Unauthorised" });
		}
	}
}
