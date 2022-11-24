import * as React from "react";

interface IDrawerProps {
	drawerOpen: boolean;
	setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
	isAuthenticated: boolean;
}

export default IDrawerProps;
