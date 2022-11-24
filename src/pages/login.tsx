import React, { useState } from "react";
import { AlertColor, Box } from "@mui/material";
import Form from "../components/Form";
import axios, { AxiosError } from "axios";
import CustomAlert from "../components/CustomAlert";
import { useRouter } from "next/router";

const fields = [
	{ label: "Email Address", name: "email", autocomplete: "email" },
	{ label: "Password", name: "password", autocomplete: "current-password" },
];

var alert: AlertColor = "error";

const Login = () => {
	const [open, setOpen] = useState(false);
	const [message, setMessage] = useState("");
	const [variant, setVariant] = useState<AlertColor | undefined>();
	const router = useRouter();

	const login = async (
		email: FormDataEntryValue | null,
		password: FormDataEntryValue | null
	) => {
		try {
			const response = await axios.post(`/api/login`, {
				email: email,
				password: password,
			});
			if (response.status === 200) {
				alert = "success";
				localStorage.setItem("token", JSON.stringify(response.data.token));
				setOpen(true);
				setMessage("Logged in, redirecting...");
				setVariant(alert);
				setTimeout(() => {
					window.location.href = "/";
				}, 3000);
			}
		} catch (error: any) {
			alert = "error";
			if (error instanceof AxiosError || axios.isAxiosError(error)) {
				setOpen(true);
				setMessage(error!.response!.data!.error);
				setVariant(alert);
			} else {
				setOpen(true);
				setMessage("Something went wrong");
				setVariant(alert);
			}
		}
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		const email = data.get("email");
		const password = data.get("password");
		login(email, password);
	};

	return (
		<Box>
			<CustomAlert
				open={open}
				setOpen={setOpen}
				message={message}
				variant={variant}
			/>
			<Box
				display="flex"
				justifyContent="center"
				alignItems="center"
				minHeight="100vh"
			>
				<Form
					formFields={fields}
					headerText="Log In"
					buttonText="Login"
					handleSubmit={handleSubmit}
				/>
			</Box>
		</Box>
	);
};

export default Login;
