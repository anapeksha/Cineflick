import axios from "axios";

const config = {
	headers: {
		Accept: "application/json",
	},
};

const getYTS: any = (query: string) => {
	return axios
		.get(`/api/getYTS?movieQuery=${query}`, config)
		.then((response) => {
			return response.data;
		})
		.catch((err) => {
			return err;
		});
};

export default getYTS;
