import React, { useState } from "react";
import { AlertColor, Box } from "@mui/material";
import Form from "../components/Form";
import axios, { AxiosError, AxiosResponse } from "axios";
import CustomAlert from "../components/CustomAlert";
import { useAuthenticationContext } from "../lib/context/authenticatedContext";
import { useRouter } from "next/router";

const fields = [
	{
		label: "username",
		name: "username",
		autocomplete: "username",
		autofocus: true,
		type: "text",
	},
	{
		label: "email",
		name: "email",
		autocomplete: "email",
		autofocus: false,
		type: "email",
	},
	{
		label: "password",
		name: "password",
		autocomplete: "new-password",
		autofocus: false,
		type: "password",
	},
];

var alert: AlertColor = "error";

const Signup = () => {
	const [open, setOpen] = useState(false);
	const [message, setMessage] = useState("");
	const [variant, setVariant] = useState<AlertColor | undefined>(alert);
	const { setIsLoading } = useAuthenticationContext();
	const router = useRouter();

	const signup = async (
		username: FormDataEntryValue | null,
		email: FormDataEntryValue | null,
		password: FormDataEntryValue | null
	) => {
		setIsLoading(true);
		try {
			const response = await axios.post(`/api/auth/signup`, {
				username: username,
				email: email,
				password: password,
			});
			if (response.status === 200) {
				console.log(response.data);
				setIsLoading(false);
				alert = "success";
				setOpen(true);
				setMessage("Account created, please login...");
				setVariant(alert);
				setTimeout(() => {
					router.push("login");
				}, 3000);
			}
		} catch (error: any) {
			setIsLoading(false);
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
		const username = data.get("username");
		const email = data.get("email");
		const password = data.get("password");
		signup(username, email, password);
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
					headerText="Sign Up"
					buttonText="Signup"
					handleSubmit={handleSubmit}
				/>
			</Box>
		</Box>
	);
};

export default Signup;
