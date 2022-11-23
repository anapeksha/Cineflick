import axios from "axios";

const searchMovies: any = (query: string, page: string) => {
	return axios(`/api/handleSearch?searchQuery=${query}&page=${page}`, {
		method: "GET",
	})
		.then((response) => {
			return response.data;
		})
		.catch((err) => {
			return err;
		});
};

export default searchMovies;
