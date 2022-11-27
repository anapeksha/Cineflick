import React from "react";
import { Backdrop, CircularProgress, Box } from "@mui/material";
import { useAuthenticationContext } from "../lib/context/authenticatedContext";

const Loader = () => {
	const { isLoading, setIsLoading } = useAuthenticationContext();
	const handleClose = () => {
		setIsLoading(false);
	};
	return (
		<Backdrop
			sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
			open={isLoading}
			onClick={handleClose}
		>
			<CircularProgress color="inherit" />
		</Backdrop>
	);
};

export default Loader;
