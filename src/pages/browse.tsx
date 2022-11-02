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

	const handleSearch = async (query: string) => {
		var searchQuery = query.split(" ").join("+");
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
	}, [page]);

	return (
		<div>
			<SearchBar
				searchQuery={query}
				setSearchQuery={setQuery}
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
	if (searchQuery) {
		var data: any = await searchMovies(searchQuery, page);
	} else {
		var data: any = await trendingMovies(page || 1, "week");
	}
	return {
		props: { data: data, page: page },
	};
};
