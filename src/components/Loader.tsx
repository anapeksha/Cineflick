import React, { useState } from "react";
import { Backdrop, CircularProgress } from "@mui/material";

const Loader = () => {
	const [open, setOpen] = React.useState(false);
	const handleClose = () => {
		setOpen(false);
	};
	const handleToggle = () => {
		setOpen(!open);
	};
	return (
		true && (
			<Backdrop
				sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
				open={open}
				onClick={handleClose}
			>
				<CircularProgress size="lg" color="inherit" />
			</Backdrop>
		)
	);
};

export default Loader;
