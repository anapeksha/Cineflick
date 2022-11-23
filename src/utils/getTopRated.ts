import axios from "axios";
import { API_KEY } from "../uri";

const getTopRated: any = () => {
	return axios
		.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`)
		.then((response) => {
			return response.data;
		});
};

export default getTopRated;
