import {
	createTheme,
	experimental_extendTheme as extendTheme,
} from "@mui/material";

const lightTheme = createTheme({
	palette: {
		mode: "light",
	},
});

const darkTheme = createTheme({
	palette: {
		mode: "dark",
	},
});

export { lightTheme, darkTheme };
