import BasicCard from "../components/BasicCard";
import SearchBar from "../components/SearchBar";
import Paginate from "../components/Paginate";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import ResponsiveDialog from "../components/ResponsiveDialog";
import { useEffect, useState } from "react";
import handleImage from "../lib/clientHelpers/handleImage";
import searchMovies from "../lib/clientHelpers/searchMovies";
import trendingMovies from "../lib/clientHelpers/getTrending";
import getIMDB from "../lib/clientHelpers/getIMDB";
import handleCredits from "../lib/clientHelpers/handleCredits";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { Grid } from "@mui/material";
import { useAuthenticationContext } from "../lib/context/authenticatedContext";
import IWatchlist from "../interfaces/IWatchlist";

const Browse = (props: any) => {
	const [query, setQuery] = useState("");
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(props.data.total_pages);
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

	var searchQueryMaker = (query: string): string => {
		var searchQuery = query.split(" ").join("+");
		return searchQuery;
	};

	const { isAuthenticated, setIsAuthenticated } = useAuthenticationContext();

	const refreshData = () => {
		router.replace(router.asPath);
	};

	const handleInitialSearch = (query: string) => {
		var searchQuery = searchQueryMaker(query);
		setPage(1);
		router.replace(`browse?searchQuery=${searchQuery}&page=1`);
	};

	const handlePageRedirect = (page: number) => {
		if (query !== "") {
			var searchQuery = searchQueryMaker(query);
			router.replace(`browse?searchQuery=${searchQuery}&page=${page}`);
		} else {
			router.replace(`browse?page=${page}`);
		}
	};

	useEffect(() => {
		setSearchResults(props.data.results);
		setTotalPages(props.data.total_pages);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.data]);

	useEffect(() => {
		handlePageRedirect(page);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page]);

	useEffect(() => {
		setIsAuthenticated(props.isAuthenticated);
	}, []);

	return (
		<main>
			<SearchBar
				searchQuery={query}
				setSearchQuery={setQuery}
				onSearch={handleInitialSearch}
			/>
			<Grid
				sx={{ flexGrow: 1, padding: "20px" }}
				container
				spacing={2.5}
				columns={10}
			>
				{searchResults.map((d: any, i: number) => {
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
			<Paginate
				page={page.toString()}
				setPage={setPage}
				totalPages={totalPages}
			/>
		</main>
	);
};

export default Browse;

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { token } = context.req.cookies;
	var { page, searchQuery, id } = context.query;
	var loggedIn = token ? true : false;
	var data: any;
	if (searchQuery) {
		data = await searchMovies(searchQuery, page);
	} else {
		data = await trendingMovies(page || 1, "week");
	}
	if (token) {
	}
	return {
		props: {
			data: data,
			page: page,
			isAuthenticated: loggedIn,
		},
	};
};
