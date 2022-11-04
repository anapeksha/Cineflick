import { CardActionArea, Box } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import * as React from "react";
import ICardProps from "../interfaces/ICardProps";
import AnimatedBasicCard from "../styles/AnimatedBasicCard.style";
import Image from "next/image";

const BasicCard: React.FC<ICardProps> = (props) => {
	return (
		<AnimatedBasicCard
			sx={{ maxWidth: 345 }}
			elevation={6}
			onClick={props.handleClick}
		>
			<CardActionArea>
				<CardMedia style={{ display: "flex", justifyContent: "center" }}>
					<Image
						src={props.image}
						width="250"
						height="140"
						style={{ objectFit: "contain" }}
						alt={props.altText}
					/>
				</CardMedia>
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
		</AnimatedBasicCard>
	);
};

export default BasicCard;
