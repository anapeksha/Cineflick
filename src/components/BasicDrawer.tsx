import HomeIcon from "@mui/icons-material/Home";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import SearchIcon from "@mui/icons-material/Search";
import WhatshotIcon from "@mui/icons-material/Whatshot";
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
import * as React from "react";
import IDrawerProps from "../interfaces/IDrawerProps";

const listItems = [
	{ title: "Home", icon: <HomeIcon />, url: "/" },
	{ title: "Trending", icon: <WhatshotIcon />, url: "trending" },
	{ title: "Browse", icon: <SearchIcon />, url: "browse?page=1" },
];

const authItems = [
	{ title: "Login", icon: <LoginIcon />, url: "login", display: true },
	{ title: "Logout", icon: <LogoutIcon />, url: "logout", display: true },
];

const BasicDrawer: React.FC<IDrawerProps> = (props) => {
	const router = useRouter();
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
				{listItems.map((item, index) => (
					<ListItem key={index} disablePadding>
						<ListItemButton onClick={() => router.push(item.url)}>
							<ListItemIcon>{item.icon}</ListItemIcon>
							<ListItemText primary={item.title} />
						</ListItemButton>
					</ListItem>
				))}
				<Divider />
				{authItems.map((item, index) =>
					item.display ? (
						<ListItem key={index} disablePadding>
							<ListItemButton>
								<ListItemIcon>{item.icon}</ListItemIcon>
								<ListItemText primary={item.title} />
							</ListItemButton>
						</ListItem>
					) : null
				)}
			</List>
		</Box>
	);

	return (
		<Drawer anchor="left" open={props.drawerOpen} onClose={toggleDrawer(false)}>
			{list()}
		</Drawer>
	);
};

export default BasicDrawer;
