import React, { useState, useEffect } from "react";
import { AlertColor, Box } from "@mui/material";
import Image from "next/image";
import Form from "../../../components/Form";
import CustomAlert from "../../../components/CustomAlert";
import { useRouter } from "next/router";
import { useLoadingContext } from "../../../lib/context/loadedContext";
import axios, { AxiosError, AxiosResponse } from "axios";

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

const Profile = () => {
	const [open, setOpen] = useState(false);
	const [message, setMessage] = useState("");
	const [variant, setVariant] = useState<AlertColor | undefined>(alert);
	const { setIsLoading } = useLoadingContext();
	const router = useRouter();

	const updateProfile = async (
		image: string | ArrayBuffer | null,
		email: FormDataEntryValue | null,
		username: FormDataEntryValue | null,
		password: FormDataEntryValue | null
	) => {
		setIsLoading(true);
		try {
			const response = await axios.put("/api/profile/updateProfile", {
				photo: image,
				email: email,
				username: username,
				password: password,
			});
			console.log(response);
			if (response.status === 200) {
				setIsLoading(false);
				alert = "success";
				setOpen(true);
				setMessage("Account details updated...");
				setVariant(alert);
				setTimeout(() => {
					router.push("/");
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
		const email = data.get("email");
		const password = data.get("password");
		const photoFile = data.get("profile-image");
		const reader = new FileReader();
		reader.readAsDataURL(photoFile as Blob);
		reader.onloadend = () => {
			updateProfile(reader.result, email, username, password);
		};
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
					headerText="Update Profile"
					buttonText="Update"
					handleSubmit={handleSubmit}
				/>
			</Box>
		</main>
	);
};

export default Profile;
