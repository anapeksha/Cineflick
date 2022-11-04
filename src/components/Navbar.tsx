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
} from "@mui/material";
import React, { useState } from "react";
import INavbarProps from "../interfaces/INavbarProps";
import ThemeSwitch from "../styles/ThemeSwitch.style";
import { darkTheme, lightTheme } from "../utils/theme";

const Navbar: React.FC<INavbarProps> = (props) => {
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
					<ThemeSwitch
						sx={{ m: 1 }}
						theme={props.theme}
						value={props.theme}
						defaultChecked
						onChange={() => {
							if (props.theme === lightTheme) {
								props.setTheme(darkTheme);
							} else {
								props.setTheme(lightTheme);
							}
						}}
					/>
				</Toolbar>
			</AppBar>
		</Box>
	);
};

export default Navbar;
