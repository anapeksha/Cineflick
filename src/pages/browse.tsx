import BasicCard from "../components/BasicCard";
import SearchBar from "../components/SearchBar";
import Paginate from "../components/Paginate";
import dynamic from "next/dynamic";
import { Suspense } from "react";
const ResponsiveDialog = dynamic(
	() => import("../components/ResponsiveDialog"),
	{
		suspense: true,
	}
);
import Loader from "../components/Loader";
import { useEffect, useState } from "react";
import {
	handleImage,
	searchMovies,
	trendingMovies,
	getIMDB,
	handleCredits,
} from "../utils";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { Grid } from "@mui/material";

const Browse = (props: any) => {
	const [query, setQuery] = useState("");
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(props.data.total_pages);
	const [searchResults, setSearchResults] = useState([]);
	const [modalData, setModalData] = useState({});
	const [modalOpen, setModalOpen] = useState(false);
	const router = useRouter();

	var searchQueryMaker = (query: string): string => {
		var searchQuery = query.split(" ").join("+");
		return searchQuery;
	};

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
			<Suspense fallback={<Loader />}>
				<ResponsiveDialog
					data={modalData}
					open={modalOpen}
					setOpen={setModalOpen}
				/>
			</Suspense>
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
	var { page, searchQuery, id } = context.query;
	var data: any;
	if (searchQuery) {
		data = await searchMovies(searchQuery, page);
	} else {
		data = await trendingMovies(page || 1, "week");
	}
	return {
		props: {
			data: data,
			page: page,
		},
	};
};
