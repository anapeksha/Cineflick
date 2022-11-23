import axios from "axios";
import { API_KEY } from "../uri";

const getIMDB: any = (id: string) => {
	return axios
		.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`)
		.then((response) => {
			return response.data.imdb_id;
		});
};

export default getIMDB;
