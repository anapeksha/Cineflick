import axios from "axios";

const getYTS: any = (query) => {
	return axios(`https://yts.mx/api/v2/movie_details.json?imdb_id=${query}`, {
		method: "GET",
	})
		.then((response) => {
			return response.data;
		})
		.catch((err) => {
			return err;
		});
};

export default getYTS;
