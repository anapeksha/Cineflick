import React, { useState, useEffect } from "react";
import { AlertColor, Box } from "@mui/material";
import Form from "../components/Form";
import axios, { AxiosError, AxiosResponse } from "axios";
import CustomAlert from "../components/CustomAlert";
import { useRouter } from "next/router";
import { useAuthenticationContext } from "../lib/context/authenticatedContext";
import { useLoadingContext } from "../lib/context/loadedContext";

const fields = [
	{
		label: "email or username",
		name: "username",
		autocomplete: "email",
		autofocus: true,
		type: "text",
	},
	{
		label: "password",
		name: "password",
		autocomplete: "current-password",
		autofocus: false,
		type: "password",
	},
];

var alert: AlertColor = "error";

const Login = () => {
	const [open, setOpen] = useState(false);
	const [message, setMessage] = useState("");
	const [variant, setVariant] = useState<AlertColor | undefined>();
	const { setIsAuthenticated } = useAuthenticationContext();
	const { setIsLoading } = useLoadingContext();
	const router = useRouter();

	const handleGetWatchlist = async () => {
		try {
			const response = await axios.get("/api/watchlist/getWatchlist");
			if (response.status === 200) {
				localStorage.setItem(
					"watchlist",
					JSON.stringify(response.data.watchlist.list)
				);
			}
		} catch (err) {
			router.push("/login");
		}
	};

	const login = async (
		username: FormDataEntryValue | null,
		password: FormDataEntryValue | null
	) => {
		setIsLoading(true);
		try {
			const response = await axios.post(`/api/auth/login`, {
				username: username,
				password: password,
			});
			if (response.status === 200) {
				handleGetWatchlist();
				setIsLoading(false);
				alert = "success";
				setOpen(true);
				setMessage("Logged in, redirecting...");
				setVariant(alert);
				setTimeout(() => {
					router.push("/");
					setIsAuthenticated(true);
				}, 2000);
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
		const password = data.get("password");
		login(username, password);
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
