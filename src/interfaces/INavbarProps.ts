import { Theme } from "@mui/material";
import * as React from "react";

interface INavbarProps {
	theme: Theme;
	setTheme: React.Dispatch<React.SetStateAction<Theme>>;
	drawerOpen: boolean;
	setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default INavbarProps;
