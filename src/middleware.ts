import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decodeToken } from "./lib/auth/jwt";

export async function middleware(request: NextRequest) {
	const token = request.cookies.get("token");
	const data = await decodeToken(token?.value);
	const url = request.nextUrl.clone();
	if (data !== undefined) {
		if (url.pathname.includes("/login") || url.pathname.includes("/signup")) {
			url.pathname = "/";
			NextResponse.redirect(url);
		} else if (
			url.pathname.includes("/users") ||
			url.pathname.includes("/watchlist")
		) {
			NextResponse.next();
		}
	} else {
		url.pathname = "/login";
		NextResponse.redirect(url);
	}
}

export const config = {
	matcher: ["/login", "/signup", "/users/:path*", "/watchlist"],
};
