import axios from "axios";

const getUpcoming: any = () => {
	return axios(`/api/getUpcoming`, {
		method: "GET",
	})
		.then((response) => {
			return response.data;
		})
		.catch((err) => {
			return err;
		});
};

export default getUpcoming;
