import { Box, Typography } from "@mui/material";
const Home = () => {
	return (
		<div>
			<main>
				<Box>
					<Typography variant="h4" style={{ textAlign: "center" }}>
						Welcome to Finderbar
					</Typography>
					<Typography variant="h6" style={{ textAlign: "center" }}>
						Click here to continue
					</Typography>
				</Box>
			</main>
		</div>
	);
};

export default Home;
