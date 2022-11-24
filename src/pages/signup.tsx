import React, { useState } from "react";
import { AlertColor, Box } from "@mui/material";
import Form from "../components/Form";
import axios, { AxiosError } from "axios";
import CustomAlert from "../components/CustomAlert";
import { useRouter } from "next/router";

const fields = [
	{ label: "Email Address", name: "email", autocomplete: "email" },
	{ label: "Password", name: "password", autocomplete: "new-password" },
];

var alert: AlertColor = "error";

const Signup = () => {
	const [open, setOpen] = useState(false);
	const [message, setMessage] = useState("");
	const [variant, setVariant] = useState<AlertColor | undefined>(alert);
	const router = useRouter();

	const signup = async (
		email: FormDataEntryValue | null,
		password: FormDataEntryValue | null
	) => {
		try {
			const response = await axios.post(`/api/signup`, {
				email: email,
				password: password,
			});
			if (response.status === 200) {
				alert = "success";
				setOpen(true);
				setMessage("Account created, please login...");
				setVariant(alert);
				setTimeout(() => {
					router.push("login");
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
		signup(email, password);
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
