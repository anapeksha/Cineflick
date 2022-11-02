import { GetServerSideProps } from "next";
import BasicGrid from "../components/BasicGrid";
import { trendingMovies } from "../utils";

const Trending = (props: any) => {
	return (
		<div>
			<BasicGrid data={props.data.results} />
		</div>
	);
};

export default Trending;

export const getServerSideProps: GetServerSideProps = async () => {
	var data: any = await trendingMovies(1, "day");
	return {
		props: { data: data },
	};
};
