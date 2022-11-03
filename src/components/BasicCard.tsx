import { CardActionArea } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import * as React from "react";
import ICardProps from "../interfaces/ICardProps";
import AnimatedCard from "../styles/AnimatedCard.style";

const BasicCard: React.FC<ICardProps> = (props) => {
	return (
		<AnimatedCard
			sx={{ maxWidth: 345 }}
			elevation={6}
			onClick={props.handleClick}
		>
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
		</AnimatedCard>
	);
};

export default BasicCard;
