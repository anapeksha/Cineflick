import axios from "axios";

const handleCredits: any = (id: string) => {
	return axios(`/api/getCredits?id=${id}`, {
		method: "GET",
	})
		.then((response) => {
			return response.data;
		})
		.catch((err) => {
			return err;
		});
};

export default handleCredits;
