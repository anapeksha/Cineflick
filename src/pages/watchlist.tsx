import React, { useEffect, useState } from "react";
import { Box, Typography, Grid } from "@mui/material";
import HomeCard from "../components/HomeCard";
import { GetServerSideProps } from "next";
import IWatchlist from "../interfaces/IWatchlist";
import handleImage from "../lib/clientHelpers/handleImage";
import ResponsiveDialog from "../components/ResponsiveDialog";
import Loader from "../components/Loader";
import { useRouter } from "next/router";
import { useAuthenticationContext } from "../lib/context/authenticatedContext";
import { useLoadingContext } from "../lib/context/loadedContext";
import axios from "axios";
import { decodeToken } from "../lib/auth/jwt";

const Watchlist = (props: any) => {
	const [watchlist, setWatchlist] = useState<Array<IWatchlist>>([
		{
			adult: false,
			backdrop_path: "",
			genre_ids: [],
			id: 0,
			original_language: "",
			original_title: "",
			overview: "",
			popularity: 0,
			poster_path: "",
			release_date: "",
			title: "",
			video: false,
			vote_average: 0,
			vote_count: 0,
		},
	]);
	const [modalData, setModalData] = useState<IWatchlist>({
		adult: false,
		backdrop_path: "",
		genre_ids: [],
		id: 0,
		original_language: "",
		original_title: "",
		overview: "",
		popularity: 0,
		poster_path: "",
		release_date: "",
		title: "",
		video: false,
		vote_average: 0,
		vote_count: 0,
	});
	const [modalOpen, setModalOpen] = useState(false);
	const { isAuthenticated, setIsAuthenticated, setUser } =
		useAuthenticationContext();
	const { setIsLoading } = useLoadingContext();
	const router = useRouter();

	const fetchWatchlist = async () => {
		const cachedWatchlist = localStorage.getItem("watchlist");
		if (cachedWatchlist) {
			setWatchlist(JSON.parse(cachedWatchlist));
		} else {
			setIsLoading(true);
			try {
				const response = await axios.get("/api/watchlist/getWatchlist");
				if (response.status === 200) {
					setIsLoading(false);
					setWatchlist(response.data.watchlist.list);
					localStorage.setItem(
						"watchlist",
						JSON.stringify(response.data.watchlist.list)
					);
				}
			} catch (err) {
				setIsLoading(false);
				console.log(err);
			}
		}
	};

	useEffect(() => {
		fetchWatchlist();
		setIsAuthenticated(props.isAuthenticated);
		if (props.user) {
			setUser(props.user);
		}
	}, []);

	return (
		<main>
			<Box padding="3%">
				<Grid
					sx={{ flexGrow: 1, padding: "20px", mb: 5 }}
					container
					spacing={2}
					columns={6}
				>
					{watchlist &&
						watchlist.map((result: any, i: number) => {
							return (
								<Grid item xs={3} sm={2} md={1} key={i}>
									<HomeCard
										image={handleImage(result.poster_path, "300")}
										altText={result.original_title || result.title}
										handleClick={() => {
											setModalData(result);
											setModalOpen(true);
										}}
									/>
								</Grid>
							);
						})}
				</Grid>
			</Box>

			<ResponsiveDialog
				data={modalData}
				open={modalOpen}
				setOpen={setModalOpen}
			/>
		</main>
	);
};

export default Watchlist;

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { token } = context.req.cookies;
	const userData = await decodeToken(token as string);
	if (userData !== undefined) {
		return {
			props: {
				isAuthenticated: true,
				user: userData,
			},
		};
	} else {
		return {
			props: {
				isAuthenticated: false,
				user: null,
			},
		};
	}
};
