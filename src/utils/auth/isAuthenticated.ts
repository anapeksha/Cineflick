import { decodeToken } from "./jwt";

const isAuthenticated = () => {
	if (typeof window === undefined) {
		return false;
	} else {
		var token = localStorage.getItem("token");
		if (token !== null) {
			return true;
		}
		return false;
	}
};

export default isAuthenticated;
