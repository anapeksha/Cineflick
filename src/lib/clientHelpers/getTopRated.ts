import axios from "axios";
import { API_KEY } from "../../uri";

const config = {
	headers: {
		Accept: "application/json",
	},
};

const getTopRated: any = () => {
	return axios
		.get(
			`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`,
			config
		)
		.then((response) => {
			return response.data;
		});
};

export default getTopRated;
