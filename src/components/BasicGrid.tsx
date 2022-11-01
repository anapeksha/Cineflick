import { Box, Grid } from "@mui/material";
import BasicCard from "./BasicCard";
import { handleImage } from "../utils";

const BasicGrid = (props) => {
	return (
		<Box>
			<Grid sx={{ flexGrow: 1, padding: "20px" }} container spacing={2}>
				{props.data.map((d, i) => {
					return (
						<Grid item xs={4} sm={3} md={2} key={i}>
							<BasicCard
								altText={d.original_title}
								image={handleImage(d.poster_path)}
								title={d.title}
								id={d.id}
							/>
						</Grid>
					);
				})}
			</Grid>
		</Box>
	);
};

export default BasicGrid;
