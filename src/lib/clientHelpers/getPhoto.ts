import axios from "axios";
import { API_KEY } from "../../uri";

const getPhoto: any = async (id: string) => {
	const response = await axios.get("/api/profile/getPhoto");
	if (response.status === 200) {
		return response.data;
	} else {
		return null;
	}
};

export default getPhoto;
