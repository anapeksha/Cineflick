import axios from "axios";

const isAuthenticated = async () => {
	try {
		const res = await axios.get("/api/auth/getUser");
		console.log(res);
		if (res.status === 200 && res.data.user.type === "user") {
			return true;
		} else return false;
	} catch (err) {
		console.log(err);
		return false;
	}
};

export default isAuthenticated;
