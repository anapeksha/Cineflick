import BasicGrid from "../components/BasicGrid";
import SearchBar from "../components/SearchBar";
import Paginate from "../components/Paginate";
import { useEffect, useState } from "react";
import { handleImage, searchMovies, trendingMovies } from "../utils";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";

const Browse = (props: any) => {
	const [query, setQuery] = useState("");
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(props.data.total_pages);
	const [searchResults, setSearchResults] = useState([]);
	const router = useRouter();

	const searchQueryMaker: string = (query: string) => {
		var searchQuery = query.split(" ").join("+");
		return searchQuery;
	};

	const handleSearch = (query: string) => {
		var searchQuery = searchQueryMaker(query);
		router.replace(`browse?searchQuery=${searchQuery}&page=${page}`);
	};

	const handlePageRedirect = (page: number) => {
		if (query !== "") {
			handleSearch(query);
		} else {
			router.replace(`browse?page=${page}`);
		}
	};

	useEffect(() => {
		setSearchResults(props.data.results);
		setTotalPages(props.data.total_pages);
	}, [props.data]);

	useEffect(() => {
		handlePageRedirect(page);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page]);

	return (
		<div>
			<SearchBar
				searchQuery={query}
				setSearchQuery={setQuery}
				page={page}
				onSearch={handleSearch}
			/>
			<BasicGrid data={searchResults} />
			<Paginate
				page={page.toString()}
				setPage={setPage}
				totalPages={totalPages}
			/>
		</div>
	);
};

export default Browse;

export const getServerSideProps: GetServerSideProps = async (context) => {
	var { page, searchQuery } = context.query;
	var data: any;
	if (searchQuery) {
		data = await searchMovies(searchQuery, page);
	} else {
		data = await trendingMovies(page || 1, "week");
	}
	return {
		props: { data: data, page: page },
	};
};
