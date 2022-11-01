import axios from "axios";
import { API_KEY } from "../uri";

const searchMovies: any = (query: string, page: string) => {
	var searchQuery = query.split(" ").join("+");
	return axios(
		`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchQuery}&page=${page}`,
		{
			method: "GET",
		}
	).then((response) => {
		return response.data;
	});
};

export default searchMovies;
