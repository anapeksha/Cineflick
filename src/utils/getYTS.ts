import axios from "axios";

const getYTS: any = (query: string) => {
	return axios(`/api/getYTS?movieQuery=${query}`, {
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
