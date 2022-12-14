import { Box, Button, TextField, Typography } from "@mui/material";
import React from "react";
import IFormProps from "../interfaces/IFormProps";
import Link from "next/link";
import { PhotoCamera } from "@mui/icons-material";

const Form: React.FC<IFormProps> = (props) => {
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				padding: "4%",
			}}
			maxWidth="xs"
		>
			<Typography variant="h5">{props.headerText}</Typography>
			<Box component="form" onSubmit={props.handleSubmit} noValidate>
				{props.headerText === "Update Profile" ? (
					<Box display="flex" justifyContent="center">
						<Button
							variant="contained"
							component="label"
							startIcon={<PhotoCamera />}
							sx={{ mt: 3, mb: 3 }}
						>
							Photo
							<input
								hidden
								accept="image/*"
								type="file"
								name="profile-image"
							/>
						</Button>
					</Box>
				) : null}
				{props.formFields.map((field: any, i: number) => {
					return field.autofocus ? (
						<TextField
							key={i}
							margin="normal"
							required
							fullWidth
							type={field.type}
							label={field.label}
							name={field.name}
							autoComplete={field.autocomplete}
						/>
					) : (
						<TextField
							key={i}
							margin="normal"
							required
							fullWidth
							type={field.type}
							label={field.label}
							name={field.name}
							autoComplete={field.autocomplete}
						/>
					);
				})}
				<Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }}>
					{props.buttonText}
				</Button>
				{props.headerText === "Log In" ? (
					<Link
						href="signup"
						style={{
							display: "flex",
							justifyContent: "flex-end",
							marginTop: "20px",
							textDecoration: "none",
						}}
					>
						New here? Register
					</Link>
				) : props.headerText === "Sign Up" ? (
					<Link
						href="login"
						style={{
							display: "flex",
							justifyContent: "flex-end",
							marginTop: "20px",
							textDecoration: "none",
						}}
					>
						Already registered? Login
					</Link>
				) : null}
			</Box>
		</Box>
	);
};

export default Form;
