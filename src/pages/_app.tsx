import { CssBaseline, ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useState } from "react";
import BasicDrawer from "../components/BasicDrawer";
import Navbar from "../components/Navbar";
import { darkTheme } from "../utils/theme";

export default function App({ Component, pageProps }: AppProps): JSX.Element {
	const [theme, setTheme] = useState(darkTheme);
	const [drawerOpen, setDrawerOpen] = useState(false);

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
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Navbar
				theme={theme}
				setTheme={setTheme}
				drawerOpen={drawerOpen}
				setDrawerOpen={setDrawerOpen}
			/>
			<BasicDrawer drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
			<Component {...pageProps} />
		</ThemeProvider>
	);
}
