import React from "react";
import { Backdrop, CircularProgress, Box } from "@mui/material";
import { useLoadingContext } from "../lib/context/loadedContext";

const LoginLoader = () => {
	const { isLoading } = useLoadingContext();

	return (
		<Backdrop
			sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
			open={isLoading}
		>
			<CircularProgress color="primary" size={55} />
		</Backdrop>
	);
};

export default LoginLoader;
