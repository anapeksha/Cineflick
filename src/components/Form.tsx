import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const Form = () => {
	const [open, setOpen] = React.useState(true);
	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<Dialog open={open} onClose={handleClose}>
			<DialogTitle>Login</DialogTitle>
			<DialogContent style={{ alignItems: "center" }}>
				<TextField
					autoFocus
					margin="dense"
					variant="outlined"
					id="email"
					label="Email Address"
					type="email"
					fullWidth
				/>
				<TextField
					autoFocus
					margin="dense"
					variant="outlined"
					id="password"
					label="Password"
					type="password"
					fullWidth
				/>
			</DialogContent>
			<DialogActions
				style={{ display: "flex", justifyContent: "space-evenly" }}
			>
				<Button onClick={handleClose}>Register Now</Button>
				<Button onClick={handleClose}>Login</Button>
			</DialogActions>
		</Dialog>
	);
};

export default Form;
