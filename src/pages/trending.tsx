import { GetServerSideProps } from "next";
import BasicCard from "../components/BasicCard";
import { Grid } from "@mui/material";
import { trendingMovies } from "../utils";
import { handleImage } from "../utils";
import { useRouter } from "next/router";
import React from "react";
import dynamic from "next/dynamic";
import { Suspense } from "react";
const ResponsiveDialog = dynamic(
	() => import("../components/ResponsiveDialog"),
	{
		suspense: true,
	}
);
import Loader from "../components/Loader";

const Trending = (props: any) => {
	const [modalData, setModalData] = React.useState({});
	const [modalOpen, setModalOpen] = React.useState(false);
	const router = useRouter();
	return (
		<main>
			<Grid
				sx={{ flexGrow: 1, padding: "20px" }}
				container
				spacing={2.5}
				columns={10}
			>
				{props.data.results.map((d: any, i: number) => {
					return (
						<Grid item xs={5} sm={2.5} md={2} key={i}>
							<BasicCard
								altText={d.original_title || d.title}
								image={handleImage(d.poster_path)}
								title={d.title}
								id={d.id}
								handleClick={() => {
									router.query.id = d.id;
									router.replace(router);
									setModalData(d);
									setModalOpen(true);
								}}
							/>
						</Grid>
					);
				})}
			</Grid>
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

export default Trending;

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { id } = context.query;
	var data: any = await trendingMovies(1, "day");
	return {
		props: { data: data },
	};
};
