import { CssBaseline, ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useState, useEffect } from "react";
import BasicDrawer from "../components/BasicDrawer";
import Navbar from "../components/Navbar";
import { darkTheme, lightTheme } from "../lib/theme/theme";
import Loader from "../components/Loader";
import {
	AuthenticationProvider,
	useAuthenticationContext,
} from "../lib/context/authenticatedContext";
import {
	LoadingProvider,
	useLoadingContext,
} from "../lib/context/loadedContext";
import getUser from "../lib/auth/getUser";
import axios from "axios";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps): JSX.Element {
	const [theme, setTheme] = useState(darkTheme);
	const [drawerOpen, setDrawerOpen] = useState(false);
	const { isLoading, setIsLoading } = useLoadingContext();
	const { user, setUser, isAuthenticated } = useAuthenticationContext();
	const router = useRouter();

	const fetchData = async () => {
		setIsLoading(true);
		try {
			const response = await getUser();
			if (response !== undefined) {
				setUser(response);
				setIsLoading(false);
			}
			setIsLoading(false);
		} catch (error: any) {
			setIsLoading(false);
		}
	};

	const handleGetWatchlist = async () => {
		setIsLoading(true);
		const watchlist = localStorage.getItem("watchlist");
		if (!watchlist) {
			try {
				const response = await axios.get("/api/watchlist/getWatchlist");
				if (response.status === 200) {
					localStorage.setItem(
						"watchlist",
						JSON.stringify(response.data.watchlist.list)
					);
					setIsLoading(false);
				}
			} catch (err) {
				router.push("/login");
				setIsLoading(false);
			}
		} else {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		var localTheme = localStorage.getItem("theme");
		fetchData();
		handleGetWatchlist();
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

	useEffect(() => {
		fetchData();
	}, [isAuthenticated]);

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Head>
				<title>CINEFLICK</title>
				<meta name="description" content="A movie browsing website" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta
					name="theme-color"
					content={theme === darkTheme ? "#2a2a2a" : "#1876d2"}
				/>
				<link rel="manifest" href="/manifest.json" />
				<link rel="apple-touch-icon" href="/logo512.png" />
				<link rel="icon" type="image/x-icon" href="/favicon.ico" />
			</Head>
			<AuthenticationProvider>
				<LoadingProvider>
					<Navbar
						theme={theme}
						setTheme={setTheme}
						drawerOpen={drawerOpen}
						setDrawerOpen={setDrawerOpen}
					/>
					<BasicDrawer drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
					<Loader />
					<Component {...pageProps} />
				</LoadingProvider>
			</AuthenticationProvider>
		</ThemeProvider>
	);
}
