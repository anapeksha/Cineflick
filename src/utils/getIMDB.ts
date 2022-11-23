import axios from "axios";

const getIMDB: any = (id: string) => {
	return axios(`/api/getIMDB?id=${id}`, {
		method: "GET",
	})
		.then((response) => {
			return response.data.imdb_id;
		})
		.catch((err) => {
			return err;
		});
};

export default getIMDB;
