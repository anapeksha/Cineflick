import { Theme } from "@mui/material";

interface INavbarProps {
	theme: Theme;
	setTheme: Dispatch<SetStateAction<Theme>>;
	drawerOpen: Boolean;
	setDrawerOpen: Dispatch<SetStateAction<Boolean>>;
}

export default INavbarProps;
