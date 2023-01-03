import axios from "axios";

const logout = async () => {
	try {
		const response = await axios.get("/api/auth/logout");
		localStorage.removeItem("watchlist");
		localStorage.removeItem("photo");
		window.location.href = "/";
		return true;
	} catch (err: any) {
		return false;
	}
};
export default logout;
