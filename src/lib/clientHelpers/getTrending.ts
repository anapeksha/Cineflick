import axios from "axios";
import { API_KEY } from "../../uri";

const config = {
	headers: {
		Accept: "application/json",
	},
};

const getTrending: any = (page: string, timeDuration: string) => {
	return axios
		.get(
			`https://api.themoviedb.org/3/trending/movie/${timeDuration}?api_key=${API_KEY}&page=${page}`,
			config
		)
		.then((response) => {
			return response.data;
		});
};

export default getTrending;
