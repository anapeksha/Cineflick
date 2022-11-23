import axios from "axios";

const getTopRated: any = () => {
	return axios(`/api/getTopRated`, {
		method: "GET",
	})
		.then((response) => {
			return response.data;
		})
		.catch((err) => {
			return err;
		});
};

export default getTopRated;
