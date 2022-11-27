import { CssBaseline, ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useState, useEffect, useMemo } from "react";
import BasicDrawer from "../components/BasicDrawer";
import Navbar from "../components/Navbar";
import { darkTheme, lightTheme } from "../lib/theme/theme";
import Loader from "../components/Loader";
import { GetServerSideProps } from "next";
import { decodeToken } from "../lib/auth/jwt";
import {
	useAuthenticationContext,
	AuthenticationProvider,
} from "../lib/context/authenticatedContext";

export default function App({ Component, pageProps }: AppProps): JSX.Element {
	const [theme, setTheme] = useState(darkTheme);
	const [drawerOpen, setDrawerOpen] = useState(false);

	useEffect(() => {
		var localTheme = localStorage.getItem("theme");
		if (localTheme) {
			if (localTheme === "dark") {
				setTheme(darkTheme);
			} else if (localTheme === "light") {
				setTheme(lightTheme);
			}
		} else {
			localStorage.setItem("theme", "dark");
			setTheme(darkTheme);
		}
	}, []);

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Head>
				<title>CINEFLICK</title>
				<meta name="description" content="A movie browsing website" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta
					name="theme-color"
					content={theme === darkTheme ? "#272727" : "#1876d2"}
				/>
				<link rel="manifest" href="/manifest.json" />
				<link rel="apple-touch-icon" href="/logo512.png" />
				<link rel="icon" type="image/x-icon" href="/favicon.ico" />
			</Head>
			<AuthenticationProvider>
				<Navbar
					theme={theme}
					setTheme={setTheme}
					drawerOpen={drawerOpen}
					setDrawerOpen={setDrawerOpen}
				/>
				<BasicDrawer drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
				<Loader />
				<Component {...pageProps} />
			</AuthenticationProvider>
		</ThemeProvider>
	);
}
