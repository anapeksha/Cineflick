// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { createHash } from "../../utils/auth/passHash";
import User from "../../utils/models/users";
import dbConnect from "../../utils/dbConnect";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<any>
) {
	dbConnect();
	const email = req.body.email;
	const plainPassword = req.body.password;
	const password = await createHash(plainPassword);
	try {
		const response = await User.create({
			email,
			password,
		});
		res.status(200).json(response);
		res.end();
	} catch (err: any) {
		console.log(err);
		if (err.code === 11000) {
			res.status(409).json({ error: "Email already exists" });
			res.end();
		}
	}
}
