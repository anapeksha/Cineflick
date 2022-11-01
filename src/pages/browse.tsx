import BasicGrid from "../components/BasicGrid";
import SearchBar from "../components/SearchBar";

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

const Browse = () => {
	return (
		<div>
			<SearchBar />
			<BasicGrid data={data} />
		</div>
	);
};

export default Browse;
