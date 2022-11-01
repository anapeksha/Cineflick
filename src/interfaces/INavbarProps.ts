import { Theme } from "@mui/material";

interface INavbarProps {
	theme: Theme;
	setTheme: Dispatch<SetStateAction<Theme>>;
	drawerOpen: boolean;
	setDrawerOpen: Dispatch<SetStateAction<boolean>>;
}

export default INavbarProps;
