import React from "react";
import { Backdrop, CircularProgress, Box } from "@mui/material";
import { useAuthenticationContext } from "../lib/context/authenticatedContext";

const LoginLoader = () => {
	const { isLoading } = useAuthenticationContext();

	return (
		<Backdrop
			sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
			open={isLoading}
		>
			<CircularProgress color="inherit" />
		</Backdrop>
	);
};

export default LoginLoader;
