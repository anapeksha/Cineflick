import axios from "axios";
import { API_KEY } from "../../uri";

const config = {
	headers: {
		"Accept-Encoding": "application/json",
	},
};

const getIMDB: any = (id: string) => {
	return axios
		.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`, config)
		.then((response) => {
			return response.data.imdb_id;
		});
};

export default getIMDB;
