import React from "react";
import { Card, CardContent, CardMedia, CardActionArea } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";

const HomeCard = (props: any) => {
	return (
		<Card sx={{ maxWidth: 200, maxHeight: 340 }} elevation={6}>
			<CardActionArea>
				<CardMedia>
					<Image
						src={props.image}
						alt={props.altText}
						width="200"
						height="340"
					/>
				</CardMedia>
			</CardActionArea>
		</Card>
	);
};

export default HomeCard;
