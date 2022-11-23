import axios from "axios";
import { API_KEY } from "../uri";

const handleCredits: any = (id: string) => {
	return axios
		.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`)
		.then((response) => {
			return response.data;
		});
};

export default handleCredits;
