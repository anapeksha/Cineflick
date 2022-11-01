import { useEffect, useState } from "react";
import BasicGrid from "../components/BasicGrid";
import { trendingMovies } from "../utils";

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

const Trending = () => {
	const [trending, setTrending] = useState([]);

	useEffect(() => {
		trendingMovies(1, "day").then((data) => {
			setTrending(data.results);
		});
	}, []);

	return (
		<div>
			<BasicGrid data={trending} />
		</div>
	);
};

export default Trending;
