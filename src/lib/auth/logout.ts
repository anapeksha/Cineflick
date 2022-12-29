import axios from "axios";

const logout = async () => {
	try {
		const response = await axios.get("/api/auth/logout");
		if (response.status === 200) {
			localStorage.removeItem("watchlist");
			localStorage.removeItem("photo");
			return true;
		} else return false;
	} catch (err: any) {
		return false;
	}
};
export default logout;
