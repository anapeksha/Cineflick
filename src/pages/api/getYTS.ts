// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<any>
) {
	try {
		const response = await axios.get(
			`https://yts.mx/api/v2/movie_details.json?imdb_id=${req.query.movieQuery}`
		);
		res.status(200).json(response.data);
	} catch (err) {
		res.status(400).json({ error: err });
	}
}
