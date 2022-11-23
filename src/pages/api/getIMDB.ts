import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { API_KEY } from "../../uri";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<any>
) {
	try {
		const response = await axios.get(
			`https://api.themoviedb.org/3/movie/${req.query.id}?api_key=${API_KEY}`
		);
		res.status(200).json(response.data);
	} catch (err) {
		res.status(400).json({ error: err });
	}
}
