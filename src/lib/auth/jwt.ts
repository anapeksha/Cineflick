import { SignJWT, jwtVerify } from "jose";
import { JWT_SECRET } from "../../uri";

const encodeToken = async (data: any) => {
	const token = await new SignJWT(data)
		.setExpirationTime("24h")
		.setProtectedHeader({ alg: "HS256" })
		.sign(new TextEncoder().encode(JWT_SECRET));
	return token;
};

const decodeToken = async (token: string) => {
	try {
		const data = await jwtVerify(token, new TextEncoder().encode(JWT_SECRET));
		return data.payload;
	} catch (error) {
		return undefined;
	}
};

export { encodeToken, decodeToken };
