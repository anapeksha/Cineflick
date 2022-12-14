import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import {
	AppBar,
	Avatar,
	Box,
	Divider,
	IconButton,
	Menu,
	MenuItem,
	Toolbar,
	Typography,
	Tooltip,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import INavbarProps from "../interfaces/INavbarProps";
import ThemeSwitch from "../lib/styles/ThemeSwitch.style";
import { darkTheme, lightTheme } from "../lib/theme/theme";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import logout from "../lib/auth/logout";
import { useRouter } from "next/router";
import getPhoto from "../lib/clientHelpers/getPhoto";
import { useAuthenticationContext } from "../lib/context/authenticatedContext";

const Navbar: React.FC<INavbarProps> = (props) => {
	const router = useRouter();
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [photo, setPhoto] = useState<string>("");
	const { isAuthenticated, setIsAuthenticated, user } =
		useAuthenticationContext();

	const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const fetchData = async () => {
		const response = await getPhoto();
		if (response !== undefined) {
			setPhoto(response.photo);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					<IconButton
						size="large"
						edge="start"
						color="inherit"
						aria-label="menu"
						sx={{ mr: 2 }}
						onClick={() => props.setDrawerOpen(!props.drawerOpen)}
					>
						<MenuIcon />
					</IconButton>
					<Typography
						variant="body1"
						component="div"
						sx={{ flexGrow: 1, fontWeight: "bold" }}
					>
						CINEFLICK
					</Typography>
					{props.theme === lightTheme ? (
						<Tooltip title="Light">
							<ThemeSwitch
								sx={{ m: 1 }}
								theme={props.theme}
								value={props.theme}
								onChange={() => {
									if (props.theme === lightTheme) {
										props.setTheme(darkTheme);
										localStorage.setItem("theme", "dark");
									} else if (props.theme === darkTheme) {
										props.setTheme(lightTheme);
										localStorage.setItem("theme", "light");
									}
								}}
							/>
						</Tooltip>
					) : (
						<Tooltip title="Dark">
							<ThemeSwitch
								sx={{ m: 1 }}
								theme={props.theme}
								value={props.theme}
								checked
								onChange={() => {
									if (props.theme === lightTheme) {
										props.setTheme(darkTheme);
										localStorage.setItem("theme", "dark");
									} else if (props.theme === darkTheme) {
										props.setTheme(lightTheme);
										localStorage.setItem("theme", "light");
									}
								}}
							/>
						</Tooltip>
					)}
					{isAuthenticated ? (
						<>
							<Tooltip title="Profile">
								<IconButton
									color="inherit"
									size="large"
									aria-haspopup="true"
									onClick={handleMenu}
								>
									{photo !== null || photo !== "" ? (
										<Avatar sx={{ width: 30, height: 30 }} src={photo} />
									) : (
										<Avatar sx={{ width: 30, height: 30 }} />
									)}
								</IconButton>
							</Tooltip>
							<Menu
								anchorEl={anchorEl}
								anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
								keepMounted
								transformOrigin={{
									vertical: "top",
									horizontal: "center",
								}}
								open={Boolean(anchorEl)}
								onClose={handleClose}
							>
								<MenuItem
									onClick={() => {
										router.push(`/users/${user.username}/profile`);
									}}
								>
									Account
								</MenuItem>
								<MenuItem
									onClick={() => {
										logout().then((res) => {
											if (res) {
												setIsAuthenticated(false);
											}
										});
									}}
								>
									Logout
								</MenuItem>
							</Menu>
						</>
					) : null}
				</Toolbar>
			</AppBar>
		</Box>
	);
};

export default Navbar;
