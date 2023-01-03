import { Box, Divider, Grid, Typography } from "@mui/material";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import HomeCard from "../components/HomeCard";
import ResponsiveDialog from "../components/ResponsiveDialog";
import IWatchlist from "../interfaces/IWatchlist";
import { decodeToken } from "../lib/auth/jwt";
import getTopRated from "../lib/clientHelpers/getTopRated";
import getUpcoming from "../lib/clientHelpers/getUpcoming";
import handleImage from "../lib/clientHelpers/handleImage";
import { useAuthenticationContext } from "../lib/context/authenticatedContext";
import { useLoadingContext } from "../lib/context/loadingContext";

const Home = (props: any) => {
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
	const router = useRouter();
	const [upcomingData, setUpcomingData]: Array<any> = useState([]);
	const [topRatedData, setTopRatedData]: Array<any> = useState([]);
	const { setIsAuthenticated, setUser } = useAuthenticationContext();
	const { setIsLoading } = useLoadingContext();

	const createNewArray = (arr: Array<any>) => {
		var results: Array<any> = [],
			temp: Array<number> = [],
			rand: number,
			i = 0;
		while (i != 6) {
			rand = Math.floor(Math.random() * arr.length);
			if (!temp.includes(rand)) {
				temp.push(rand);
				results.push(arr[rand]);
				i++;
			}
		}
		return results;
	};

	const fetchData = async () => {
		setIsLoading(true);
		var data: any = sessionStorage.getItem("data");
		if (data) {
			data = JSON.parse(data);
			setUpcomingData(data.upcoming);
			setTopRatedData(data.topRated);
			setIsLoading(false);
		} else {
			var topMoviesData: any = await getTopRated();
			var upcomingMoviesData: any = await getUpcoming();
			var tempData = {
				upcoming: createNewArray(upcomingMoviesData.results),
				topRated: createNewArray(topMoviesData.results),
			};
			sessionStorage.setItem("data", JSON.stringify(tempData));
			setTopRatedData(tempData.topRated);
			setUpcomingData(tempData.upcoming);
			setIsLoading(false);
		}
	};

	useEffect(() => {
		setIsAuthenticated(props.isAuthenticated);
		if (props.user) {
			setUser(props.user);
		}
		fetchData();
	}, []);

	return (
		<main>
			<Box sx={{ p: 5 }}>
				<Typography
					variant="h3"
					sx={{ textAlign: "center", fontFamily: "Monospace" }}
				>
					Top Rated
				</Typography>
				<Grid
					sx={{ flexGrow: 1, padding: "20px", mb: 5 }}
					container
					spacing={3}
					columns={6}
				>
					{topRatedData.map((result: any, i: number) => {
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
				<Divider variant="middle" flexItem sx={{}} />
				<Typography
					variant="h3"
					sx={{ textAlign: "center", fontFamily: "Monospace", mt: 5 }}
				>
					Upcoming
				</Typography>
				<Grid
					sx={{ flexGrow: 1, padding: "20px", mb: 5 }}
					container
					spacing={2.5}
					columns={6}
				>
					{upcomingData.map((result: any, i: number) => {
						if (i < 6) {
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
						}
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

export default Home;

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
