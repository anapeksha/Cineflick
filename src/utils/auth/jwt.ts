import jwt, { Secret } from "jsonwebtoken";
import { JWT_SECRET } from "../../uri";

const encodeToken = (data: any) => {
	return jwt.sign(data, JWT_SECRET as Secret, {});
};

const decodeToken = async (token: string) => {
	const verify: any = await jwt.verify(token, JWT_SECRET as Secret);
	if (verify.type === "user") return true;
	else return false;
};

export { encodeToken, decodeToken };
