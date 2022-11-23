import axios from "axios";

const getYTS: any = (query: string) => {
	return axios
		.get(`/api/getYTS?movieQuery=${query}`)
		.then((response) => {
			return response.data;
		})
		.catch((err) => {
			return err;
		});
};

export default getYTS;
