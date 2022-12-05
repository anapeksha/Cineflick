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
import axios from "axios";

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
	const { isAuthenticated, setIsAuthenticated } = useAuthenticationContext();
	const router = useRouter();

	const fetchWatchlist = async () => {
		try {
			const response = await axios.get("/api/watchlist/getWatchlist");
			if (response.status === 200) {
				setWatchlist(response.data.watchlist.list);
			}
		} catch (err) {
			router.push("/login");
		}
	};

	useEffect(() => {
		fetchWatchlist();
		setIsAuthenticated(props.isAuthenticated);
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
										image={handleImage(result.poster_path)}
										altText={result.original_title || result.title}
										handleClick={() => {
											router.query.id = result.id;
											router.replace(router);
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
	var isAuthenticated;
	if (token !== undefined) {
		return {
			props: {
				isAuthenticated: true,
				token: token,
			},
		};
	} else {
		return {
			props: {
				isAuthenticated: false,
				token: null,
			},
		};
	}
};
