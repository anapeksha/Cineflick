import axios from "axios";

const logout = async () => {
	try {
		const response = await axios.get("/api/auth/logout");
		if (response.statusText === "OK") {
			localStorage.removeItem("watchlist");
			localStorage.removeItem("photo");
			window.location.href = "/";
			return true;
		} else return false;
	} catch (err: any) {
		return false;
	}
};
export default logout;
