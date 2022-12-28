import axios from "axios";
import { API_KEY } from "../../uri";

const config = {
	headers: {
		Accept: "application/json",
	},
};

const getUpcoming: any = () => {
	return axios
		.get(
			`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&page=${Math.floor(
				Math.random() * 10
			)}`,
			config
		)
		.then((response) => {
			return response.data;
		});
};

export default getUpcoming;
