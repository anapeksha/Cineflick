import axios from "axios";
import { API_KEY } from "../../uri";

const config = {
	headers: {
		"Accept-Encoding": "application/json",
	},
};

const searchMovies: any = (query: string, page: string) => {
	return axios
		.get(
			`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`,
			config
		)
		.then((response) => {
			return response.data;
		})
		.catch((err) => {
			return err;
		});
};

export default searchMovies;
