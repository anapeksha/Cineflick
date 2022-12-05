import React from "react";
import { Box, Snackbar, Alert } from "@mui/material";
import IAlertProps from "../interfaces/IAlertProps";

const CustomAlert: React.FC<IAlertProps> = (props) => {
	return (
		<Box>
			<Snackbar
				open={props.open}
				autoHideDuration={1500}
				onClose={() => props.setOpen(false)}
				anchorOrigin={{ horizontal: "right", vertical: "top" }}
			>
				<Alert severity={props.variant}>{props.message}</Alert>
			</Snackbar>
		</Box>
	);
};

export default CustomAlert;
