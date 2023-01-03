import { AlertColor, Box } from "@mui/material";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import CustomAlert from "../components/CustomAlert";
import Form from "../components/Form";
import getUser from "../lib/auth/getUser";
import getPhoto from "../lib/clientHelpers/getPhoto";
import { useAuthenticationContext } from "../lib/context/authenticatedContext";
import { useLoadingContext } from "../lib/context/loadingContext";

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

const Login = (props: any) => {
	const [open, setOpen] = useState(false);
	const [message, setMessage] = useState("");
	const [variant, setVariant] = useState<AlertColor | undefined>();
	const { isAuthenticated, setIsAuthenticated, setUser } =
		useAuthenticationContext();
	const { setIsLoading } = useLoadingContext();
	const router = useRouter();

	const handleGetWatchlist = async () => {
		setIsLoading(true);
		try {
			const response = await axios.get("/api/watchlist/getWatchlist");
			if (response.status === 200) {
				localStorage.setItem(
					"watchlist",
					JSON.stringify(response.data.watchlist.list)
				);
				setIsLoading(false);
			}
		} catch (err) {
			router.push("/login");
			setIsLoading(false);
		}
	};

	const handlePhoto = async () => {
		try {
			const response = await getPhoto();
			localStorage.setItem("photo", response.photo);
		} catch (error: any) {
			console.log(error);
		}
	};

	const fetchUser = async () => {
		const response = await getUser();
		if (response !== undefined) {
			setUser(response);
		}
	};

	useEffect(() => {
		fetchUser();
	}, [isAuthenticated]);

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
				handlePhoto();
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
		<main>
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
		</main>
	);
};

export default Login;
