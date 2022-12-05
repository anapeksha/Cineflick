import axios from "axios";
import { API_KEY } from "../../uri";

const config = {
	headers: {
		"Accept-Encoding": "application/json",
	},
};

const handleCredits: any = (id: string) => {
	return axios
		.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`, config)
		.then((response) => {
			return response.data;
		});
};

export default handleCredits;
