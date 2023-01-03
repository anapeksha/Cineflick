import { Grid } from "@mui/material";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import BasicCard from "../components/BasicCard";
import Paginate from "../components/Paginate";
import ResponsiveDialog from "../components/ResponsiveDialog";
import SearchBar from "../components/SearchBar";
import IWatchlist from "../interfaces/IWatchlist";
import { decodeToken } from "../lib/auth/jwt";
import trendingMovies from "../lib/clientHelpers/getTrending";
import handleImage from "../lib/clientHelpers/handleImage";
import searchMovies from "../lib/clientHelpers/searchMovies";
import { useAuthenticationContext } from "../lib/context/authenticatedContext";
import { useLoadingContext } from "../lib/context/loadingContext";

const Browse = (props: any) => {
	const [query, setQuery] = useState("");
	const [page, setPage] = useState("1");
	const [totalPages, setTotalPages] = useState<number>(0);
	const [initialData, setInitialData] = useState<any>();
	const [searching, setSearching] = useState<boolean>();
	const [searchResults, setSearchResults] = useState([]);
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
	const { isAuthenticated, setIsAuthenticated, setUser } =
		useAuthenticationContext();
	const { setIsLoading } = useLoadingContext();

	const refreshData = () => {
		router.replace(router.asPath);
	};

	const handleInitialSearch = async () => {
		setIsLoading(true);
		try {
			const initialResponse = await trendingMovies(page || 1, "week");
			if (initialResponse) {
				setSearchResults(initialResponse.results);
				setTotalPages(initialResponse.total_pages);
			}
			setIsLoading(false);
		} catch (error: any) {
			console.log(error);
			setIsLoading(false);
		}
	};

	const handleSearch = async () => {
		setIsLoading(true);
		try {
			const searchResponse = await searchMovies(query, page);
			if (searchResponse) {
				setSearchResults(searchResponse.results);
				setTotalPages(searchResponse.total_pages);
			}
			setIsLoading(false);
		} catch (error: any) {
			console.log(error);
			setIsLoading(false);
		}
	};

	const handlePageRedirect = () => {
		if (query !== "") {
			handleSearch();
		} else {
			handleInitialSearch();
		}
	};

	useEffect(() => {
		handleInitialSearch();
		setIsAuthenticated(props.isAuthenticated);
		if (props.user) {
			setUser(props.user);
		}
	}, []);

	useEffect(() => {
		handlePageRedirect();
	}, [page]);

	useEffect(() => {
		if (query === "") {
			handleInitialSearch();
			setPage("1");
		}
	}, [query]);

	return (
		<main>
			<SearchBar
				searchQuery={query}
				setSearchQuery={setQuery}
				onSearch={handleSearch}
			/>
			<Grid
				sx={{ flexGrow: 1, padding: "20px" }}
				container
				spacing={2.5}
				columns={10}
			>
				{searchResults &&
					searchResults.map((d: any, i: number) => {
						return (
							<Grid item xs={5} sm={2.5} md={2} key={i}>
								<BasicCard
									altText={d.original_title || d.title}
									image={handleImage(d.poster_path, "300")}
									title={d.title}
									id={d.id}
									handleClick={() => {
										setModalOpen(true);
										setModalData(d);
										refreshData();
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
			<Paginate page={page} setPage={setPage} totalPages={totalPages} />
		</main>
	);
};

export default Browse;

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
