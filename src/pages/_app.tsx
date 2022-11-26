import { CssBaseline, ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useState, useEffect, useMemo } from "react";
import BasicDrawer from "../components/BasicDrawer";
import Navbar from "../components/Navbar";
import isAuthenticated from "../lib/auth/isAuthenticated";
import { darkTheme, lightTheme } from "../lib/theme/theme";
import Loader from "../components/Loader";

export default function App({ Component, pageProps }: AppProps): JSX.Element {
	const [theme, setTheme] = useState(darkTheme);
	const [drawerOpen, setDrawerOpen] = useState(false);
	const [authenticated, setAuthenticated] = useState(false);

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

	useMemo(async () => {
		setAuthenticated(await isAuthenticated());
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
			<Navbar
				theme={theme}
				setTheme={setTheme}
				drawerOpen={drawerOpen}
				setDrawerOpen={setDrawerOpen}
				isAuthenticated={authenticated}
			/>
			<BasicDrawer
				drawerOpen={drawerOpen}
				setDrawerOpen={setDrawerOpen}
				isAuthenticated={authenticated}
			/>
			<Loader />
			<Component {...pageProps} />
		</ThemeProvider>
	);
}
