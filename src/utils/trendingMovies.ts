import axios from "axios";

const trendingMovies: any = (page: string, timeDuration: string) => {
	return axios(`/api/getTrending?duration=${timeDuration}&page=${page}`, {
		method: "GET",
	})
		.then((response) => {
			return response.data;
		})
		.catch((err) => {
			return err;
		});
};

export default trendingMovies;
