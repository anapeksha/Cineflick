import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import handleCredits from "../lib/clientHelpers/handleCredits";
import handleImage from "../lib/clientHelpers/handleImage";
import Image from "next/image";
import ICarouselProps from "../interfaces/ICarouselProps";

const Carousel: React.FC<ICarouselProps> = (props) => {
	const [credits, setCredits] = useState([]);

	const handleDragStart = (e: React.DragEvent) => e.preventDefault();

	useEffect(() => {
		handleCredits(props.id).then((data: any) => {
			setCredits(data.cast);
		});
	}, [props.id]);

	const items = credits.map((credit: any, i: number) => (
		<Box
			style={{
				display: "flex",
				flexDirection: "column",
				padding: "20px",
			}}
			key={i}
		>
			<Image
				src={handleImage(credit.profile_path, "300")}
				alt={credit.name}
				onDragStart={handleDragStart}
				width="65"
				height="90"
				style={{
					borderRadius: "5px",
					marginBottom: "5px",
					objectFit: "cover",
					boxShadow:
						"rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
				}}
			/>

			<Typography variant="caption">{credit.name}</Typography>
		</Box>
	));

	const responsive = {
		0: {
			items: 3,
		},
		512: {
			items: 5,
		},
		1024: {
			items: 7,
		},
	};

	return (
		<AliceCarousel
			mouseTracking
			infinite
			disableDotsControls
			disableButtonsControls
			responsive={responsive}
			items={items}
			autoPlay
		/>
	);
};

export default Carousel;
