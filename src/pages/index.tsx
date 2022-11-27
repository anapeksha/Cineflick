import { Box, Typography, Grid, Divider } from "@mui/material";
import { GetServerSideProps } from "next";
import getTopRated from "../lib/clientHelpers/getTopRated";
import getUpcoming from "../lib/clientHelpers/getUpcoming";
import handleImage from "../lib/clientHelpers/handleImage";
import HomeCard from "../components/HomeCard";
import { useRouter } from "next/router";
import * as React from "react";
import dynamic from "next/dynamic";
import { Suspense } from "react";
const ResponsiveDialog = dynamic(
	() => import("../components/ResponsiveDialog"),
	{
		suspense: true,
	}
);
import Loader from "../components/Loader";
import { useAuthenticationContext } from "../lib/context/authenticatedContext";

const Home = (props: any) => {
	const [modalData, setModalData] = React.useState({});
	const [modalOpen, setModalOpen] = React.useState(false);
	const router = useRouter();
	const [upcomingData, setUpcomingData]: Array<any> = React.useState([]);
	const [topRatedData, setTopRatedData]: Array<any> = React.useState([]);
	const { setIsAuthenticated } = useAuthenticationContext();

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

	React.useEffect(() => {
		setIsAuthenticated(props.isAuthenticated);
		var data: any = sessionStorage.getItem("data");
		if (data) {
			data = JSON.parse(data);
			setUpcomingData(data.upcoming);
			setTopRatedData(data.topRated);
		} else {
			var tempData = {
				upcoming: createNewArray(props.upcomingMoviesData.results),
				topRated: createNewArray(props.topMoviesData.results),
			};
			sessionStorage.setItem("data", JSON.stringify(tempData));
			setUpcomingData(tempData.upcoming);
			setTopRatedData(tempData.topRated);
		}
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
						}
					})}
				</Grid>
			</Box>
			<Suspense fallback={<Loader />}>
				<ResponsiveDialog
					data={modalData}
					open={modalOpen}
					setOpen={setModalOpen}
				/>
			</Suspense>
		</main>
	);
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
	var { id } = context.query;
	const { token } = context.req.cookies;
	var loggedIn = token ? true : false;
	var topMoviesData: any = await getTopRated();
	var upcomingMoviesData: any = await getUpcoming();
	return {
		props: {
			topMoviesData: topMoviesData,
			upcomingMoviesData: upcomingMoviesData,
			isAuthenticated: loggedIn,
		},
	};
};
