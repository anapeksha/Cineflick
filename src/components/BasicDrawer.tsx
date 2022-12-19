import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import CreateIcon from "@mui/icons-material/Create";
import {
	Box,
	Divider,
	Drawer,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
} from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import IDrawerProps from "../interfaces/IDrawerProps";
import logout from "../lib/auth/logout";
import { useAuthenticationContext } from "../lib/context/authenticatedContext";

const BasicDrawer: React.FC<IDrawerProps> = (props) => {
	const router = useRouter();
	const { isAuthenticated } = useAuthenticationContext();

	const listItems = [
		{ title: "Home", icon: <HomeIcon />, url: "/", visible: true },
		{
			title: "Trending",
			icon: <WhatshotIcon />,
			url: "/trending",
			visible: true,
		},
		{
			title: "Browse",
			icon: <SearchIcon />,
			url: "/browse",
			visible: true,
		},
		{
			title: "Watchlist",
			icon: <FavoriteRoundedIcon />,
			url: "/watchlist",
			visible: isAuthenticated,
		},
	];

	const authItems = [
		{
			title: "Login",
			icon: <LoginIcon />,
			url: "/login",
			visible: !isAuthenticated,
		},
		{
			title: "Signup",
			icon: <CreateIcon />,
			url: "/signup",
			visible: !isAuthenticated,
		},
	];

	const toggleDrawer =
		(open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
			if (
				event.type === "keydown" &&
				((event as React.KeyboardEvent).key === "Tab" ||
					(event as React.KeyboardEvent).key === "Shift")
			) {
				return;
			}
			props.setDrawerOpen(open);
		};

	const list = () => (
		<Box
			sx={{ width: 250 }}
			role="presentation"
			onClick={toggleDrawer(false)}
			onKeyDown={toggleDrawer(false)}
		>
			<List>
				{listItems.map((item, index) => {
					if (item.visible) {
						return (
							<ListItem key={index} disablePadding>
								<ListItemButton onClick={() => router.push(item.url)}>
									<ListItemIcon>{item.icon}</ListItemIcon>
									<ListItemText primary={item.title} />
								</ListItemButton>
							</ListItem>
						);
					}
				})}
			</List>
			{!isAuthenticated ? (
				<>
					<Divider />
					<List>
						{authItems.map((item, index) => {
							if (item.visible) {
								return (
									<ListItem key={index} disablePadding>
										<ListItemButton onClick={() => router.push(item.url)}>
											<ListItemIcon>{item.icon}</ListItemIcon>
											<ListItemText primary={item.title} />
										</ListItemButton>
									</ListItem>
								);
							} else {
								return null;
							}
						})}
					</List>
				</>
			) : null}
		</Box>
	);

	return (
		<Drawer anchor="left" open={props.drawerOpen} onClose={toggleDrawer(false)}>
			{list()}
		</Drawer>
	);
};

export default BasicDrawer;
