import { createTheme } from "@mui/material";

const lightTheme = createTheme({
	palette: {
		mode: "light",
		primary: {
			main: "#dee4e7",
		},
	},
});

const darkTheme = createTheme({
	palette: {
		mode: "dark",
	},
});

export { lightTheme, darkTheme };
