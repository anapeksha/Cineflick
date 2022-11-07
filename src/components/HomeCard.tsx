import React from "react";
import { Card, CardContent, CardMedia, CardActionArea } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";

const HomeCard = (props: any) => {
	return (
		<Card
			sx={{ maxWidth: 150, maxHeight: 250 }}
			elevation={6}
			onClick={props.handleClick}
		>
			<CardActionArea>
				<CardMedia>
					<Image
						src={props.image}
						alt={props.altText}
						width="150"
						height="250"
						style={{ objectFit: "cover" }}
					/>
				</CardMedia>
			</CardActionArea>
		</Card>
	);
};

export default HomeCard;
