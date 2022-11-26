import bcrypt from "bcrypt";

const comparePass = async (password: string, encryPassword: string) => {
	if (await bcrypt.compare(password, encryPassword)) return true;
	else return false;
};

const createHash = async (password: string, saltRound: number) => {
	const encryptedPassword = await bcrypt.hash(password, saltRound);
	return encryptedPassword;
};

export { comparePass, createHash };
