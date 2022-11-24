// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { comparePass } from "../../utils/auth/passHash";
import { encodeToken } from "../../utils/auth/jwt";
import dbConnect from "../../utils/dbConnect";
import User from "../../utils/models/users";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<any>
) {
	dbConnect();
	const email = req.body.email;
	const password = req.body.password;
	if (req.method === "POST") {
		try {
			const user = await User.findOne({ email }).lean();
			if (!user) {
				res.status(404).json({ error: "User does not exist" });
				res.end();
				return;
			}
			if (await comparePass(password, user.password)) {
				var token = encodeToken({
					id: user._id,
					email: user.email,
					type: "user",
				});
				res.status(200).json({ token: token });
				res.end();
				return;
			}
			res.status(401).json({ error: "Invalid Password" });
			res.end();
		} catch (err: any) {
			console.log(err);
			res.status(408).json({ error: "Timed Out" });
			res.end();
		}
	}
}
