import {
	Divider,
	Link,
	Paper,
	Popover,
	Stack,
	Typography,
	Zoom,
} from "@mui/material";
import React from "react";

const BasicPopover = (props: any) => {
	const handleClose = () => {
		props.setAnchor(null);
	};

	const open = Boolean(props.anchor);

	return (
		<Popover
			open={open}
			onClose={handleClose}
			anchorEl={props.anchor}
			anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
			transformOrigin={{ vertical: "top", horizontal: "left" }}
			TransitionComponent={Zoom}
			elevation={12}
		>
			<Paper style={{ overflow: "auto" }}>
				{props.found && props.data !== null ? (
					<Stack
						direction="row"
						spacing={2}
						sx={{ p: 2 }}
						divider={<Divider orientation="vertical" flexItem={true} />}
					>
						{props.data.torrents.map((torrent: any, i: number) => {
							return (
								<Link
									href={torrent.url}
									sx={{ p: 2 }}
									underline="hover"
									key={i}
								>
									{torrent.quality} {torrent.type.toUpperCase()}
								</Link>
							);
						})}
					</Stack>
				) : (
					<Typography variant="body2" sx={{ p: 2 }}>
						Not Yet Available
					</Typography>
				)}
			</Paper>
		</Popover>
	);
};

export default BasicPopover;
