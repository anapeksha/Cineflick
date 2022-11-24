import { AlertColor } from "@mui/material";
import * as React from "react";

interface IAlertProps {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	variant: AlertColor | undefined;
	message: string;
}

export default IAlertProps;
