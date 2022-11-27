import { Secret, verify, sign } from "jsonwebtoken";
import { JWT_SECRET } from "../../uri";

const encodeToken = (data: any) => {
	return sign(data, JWT_SECRET as Secret, { expiresIn: "24h" });
};

const decodeToken = async (token: string) => {
	try {
		return await verify(token!, JWT_SECRET as Secret);
	} catch (err) {
		return err;
	}
};

export { encodeToken, decodeToken };
