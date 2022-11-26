import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import isAuthenticated from "./lib/auth/isAuthenticated";
import axios, { AxiosResponse } from "axios";

export async function middleware(req: NextRequest) {
	try {
		const isValid = await isAuthenticated();
		if (isValid) {
			const url = req.nextUrl.clone();
			url.pathname = "/";
			NextResponse.redirect(url);
		} else {
			const url = req.nextUrl.clone();
			url.pathname = "/login";
			NextResponse.redirect(url);
		}
	} catch (err: any) {
		NextResponse.next();
	}
}

export const config = {
	matcher: ["/login", "/signup", "/users/:path*"],
};
