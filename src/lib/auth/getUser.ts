import axios from "axios";

const getUser = async () => {
	try {
		const res = await axios.get("/api/auth/getUser");
		if (res.status === 200 && res.data.user.type === "user") {
			return res.data.user;
		} else return undefined;
	} catch (err) {
		return undefined;
	}
};

export default getUser;
