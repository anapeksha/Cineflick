import type { NextApiRequest, NextApiResponse } from "next";
import { decodeToken } from "../../../lib/auth/jwt";
import dbConnect from "../../../lib/db/dbConnect";
import Watchlist from "../../../lib/models/watchlist";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<any>
) {
	await dbConnect();
	const { token } = req.cookies;
	if (!token) {
		return res.status(401).json({ message: "Unauthorised" });
	}
	const decodedToken: any = await decodeToken(token);
	if (decodedToken) {
		try {
			var watchlist = await Watchlist.findById(decodedToken.id).lean();
			if (!watchlist) {
				return res.status(404).json({ error: "Not Found" });
			} else {
				return res.status(200).json({ watchlist: watchlist });
			}
		} catch (err: any) {
			return res.status(408).json({ error: "Timed out" });
		}
	}
}
