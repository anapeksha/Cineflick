import { Grid } from "@mui/material";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import BasicCard from "../components/BasicCard";
import ResponsiveDialog from "../components/ResponsiveDialog";
import IWatchlist from "../interfaces/IWatchlist";
import { decodeToken } from "../lib/auth/jwt";
import getTrending from "../lib/clientHelpers/getTrending";
import handleImage from "../lib/clientHelpers/handleImage";
import { useAuthenticationContext } from "../lib/context/authenticatedContext";
import { useLoadingContext } from "../lib/context/loadedContext";

const Trending = (props: any) => {
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
	const { setIsAuthenticated, setUser } = useAuthenticationContext();
	const { setIsLoading } = useLoadingContext();
	const [data, setData] = useState<any>();
	const router = useRouter();

	const fetchData = async () => {
		setIsLoading(true);
		try {
			const response: any = await getTrending(1, "day");
			if (response) {
				setData(response);
			}
			setIsLoading(false);
		} catch (error: any) {
			console.log(error);
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
			<Grid
				sx={{ flexGrow: 1, padding: "20px" }}
				container
				spacing={2.5}
				columns={10}
			>
				{data &&
					data.results.map((d: any, i: number) => {
						return (
							<Grid item xs={5} sm={2.5} md={2} key={i}>
								<BasicCard
									altText={d.original_title || d.title}
									image={handleImage(d.poster_path, "300")}
									title={d.title}
									id={d.id}
									handleClick={() => {
										setModalData(d);
										setModalOpen(true);
									}}
								/>
							</Grid>
						);
					})}
			</Grid>
			<ResponsiveDialog
				data={modalData}
				open={modalOpen}
				setOpen={setModalOpen}
			/>
		</main>
	);
};

export default Trending;

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { token } = context.req.cookies;
	const userData = await decodeToken(token as string);
	if (userData !== undefined) {
		return {
			props: { isAuthenticated: true, user: userData },
		};
	} else {
		return {
			props: { isAuthenticated: false, user: null },
		};
	}
};
