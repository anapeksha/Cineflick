const bcrypt = require("bcrypt");
import { SALT } from "../../uri";

const comparePass = async (password: string, encryPassword: string) => {
	if (await bcrypt.compare(password, encryPassword)) return true;
	else return false;
};

const createHash = async (password: string) => {
	const encryptedPassword = await bcrypt.hash(password, parseInt(SALT!));
	return encryptedPassword;
};

export { comparePass, createHash };
