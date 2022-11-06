import { Box, Typography, Grid, Divider } from "@mui/material";
import { GetServerSideProps } from "next";
import { getTopRated, handleImage, getUpcoming } from "../utils";
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

const Home = (props: any) => {
	const [modalData, setModalData] = React.useState({});
	const [modalOpen, setModalOpen] = React.useState(false);
	const router = useRouter();

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
					{props.topMoviesData.results.map((result: any, i: number) => {
						if (i < 6) {
							return (
								<Grid item xs={3} sm={2} md={1} key={i}>
									<HomeCard
										image={handleImage(result.poster_path)}
										altText={props.title}
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
					{props.upcomingMoviesData.results.map((result: any, i: number) => {
						if (i < 6) {
							return (
								<Grid item xs={3} sm={2} md={1} key={i}>
									<HomeCard
										image={handleImage(result.poster_path)}
										altText={props.title}
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
	var topMoviesData: any = await getTopRated();
	var upcomingMoviesData: any = await getUpcoming();
	return {
		props: {
			topMoviesData: topMoviesData,
			upcomingMoviesData: upcomingMoviesData,
		},
	};
};
