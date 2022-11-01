import { Box, Grid } from "@mui/material";
import { handleImage } from "../utils";
import BasicCard from "./BasicCard";

const BasicGrid = (props: any) => {
	return (
		<Box>
			<Grid sx={{ flexGrow: 1, padding: "20px" }} container spacing={2}>
				{props.data.map((d: any, i: number) => {
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
