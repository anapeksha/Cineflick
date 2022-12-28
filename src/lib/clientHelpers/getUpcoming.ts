import axios from "axios";
import { API_KEY } from "../../uri";

const config = {
	headers: {
		Accept: "application/json",
	},
};

const getRandom = () => {
	return Math.floor(Math.random() * 100);
};

const getUpcoming: any = () => {
	return axios
		.get(
			`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&page=${getRandom()}`,
			config
		)
		.then((response) => {
			return response.data;
		});
};

export default getUpcoming;
