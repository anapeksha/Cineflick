import { CardActionArea } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import * as React from "react";
import ICardProps from "../interfaces/ICardProps";

const BasicCard: React.FC<ICardProps> = (props) => {
	return (
		<Card sx={{ maxWidth: 345 }} elevation={6}>
			<CardActionArea>
				<CardMedia
					component="img"
					height="140"
					image={props.image}
					alt={props.altText}
					style={{ objectFit: "contain" }}
				/>
				<CardContent>
					<Typography
						gutterBottom
						variant="subtitle2"
						component="div"
						align="center"
						noWrap
					>
						{props.title}
					</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	);
};

export default BasicCard;
