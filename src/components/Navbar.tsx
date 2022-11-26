import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import {
	AppBar,
	Box,
	IconButton,
	Menu,
	MenuItem,
	Toolbar,
	Typography,
	Tooltip,
} from "@mui/material";
import React, { useState } from "react";
import INavbarProps from "../interfaces/INavbarProps";
import ThemeSwitch from "../lib/styles/ThemeSwitch.style";
import { darkTheme, lightTheme } from "../lib/theme/theme";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import logout from "../lib/auth/logout";
import { useRouter } from "next/router";

const Navbar: React.FC<INavbarProps> = (props) => {
	const router = useRouter();
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

	const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

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
					{props.isAuthenticated ? (
						<>
							<Tooltip title="Profile">
								<IconButton
									color="inherit"
									size="large"
									aria-haspopup="true"
									onClick={handleMenu}
								>
									<AccountCircle />
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
								<MenuItem onClick={() => router.push("/users/123/dashboard")}>
									Profile
								</MenuItem>
								<MenuItem
									onClick={() => {
										logout();
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
