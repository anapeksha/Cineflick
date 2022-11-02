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
					{true && (
						<div>
							<IconButton
								size="large"
								aria-label="account of current user"
								aria-controls="menu-appbar"
								aria-haspopup="true"
								onClick={handleMenu}
								color="inherit"
							>
								<AccountCircle />
							</IconButton>
							<Menu
								id="menu-appbar"
								anchorEl={anchorEl}
								PaperProps={{
									elevation: 0,
									sx: {
										overflow: "visible",
										filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
										mt: 1.5,
										"& .MuiAvatar-root": {
											width: 32,
											height: 32,
											ml: -0.5,
											mr: 1,
										},
										"&:before": {
											content: '""',
											display: "block",
											position: "absolute",
											top: 0,
											right: 14,
											width: 10,
											height: 10,
											bgcolor: "background.paper",
											transform: "translateY(-50%) rotate(45deg)",
											zIndex: 0,
										},
									},
								}}
								anchorOrigin={{
									vertical: "bottom",
									horizontal: "right",
								}}
								keepMounted
								transformOrigin={{
									vertical: "top",
									horizontal: "right",
								}}
								open={Boolean(anchorEl)}
								onClose={handleClose}
							>
								<MenuItem onClick={handleClose}>Profile</MenuItem>
								<MenuItem onClick={handleClose}>Wishlist</MenuItem>
							</Menu>
						</div>
					)}
				</Toolbar>
			</AppBar>
		</Box>
	);
};

export default Navbar;
