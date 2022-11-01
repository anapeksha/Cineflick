import axios from "axios";
import { API_KEY } from "../uri";

const trendingMovies: any = (page, timeDuration) => {
	return axios(
		`https://api.themoviedb.org/3/trending/movie/${timeDuration}?api_key=${API_KEY}&page=${page}`,
		{
			method: "GET",
		}
	).then((response) => {
		return response.data;
	});
};

export default trendingMovies;
