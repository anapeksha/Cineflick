import axios from "axios";
import { API_KEY } from "../uri";

const getUpcoming: any = () => {
	return axios(
		`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}`,
		{
			method: "GET",
		}
	).then((response) => {
		return response.data;
	});
};

export default getUpcoming;
