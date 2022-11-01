import SearchIcon from "@mui/icons-material/Search";
import { Box, Divider, IconButton, InputBase, Paper } from "@mui/material";

const SearchBar = () => {
	return (
		<Box sx={{ display: "flex", justifyContent: "center", paddingTop: "20px" }}>
			<Paper
				component="form"
				sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400 }}
			>
				<InputBase
					sx={{ ml: 1, flex: 1 }}
					placeholder="Search"
					inputProps={{ "aria-label": "search" }}
				/>
				<Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
				<IconButton type="button" sx={{ p: "10px" }} aria-label="search">
					<SearchIcon />
				</IconButton>
			</Paper>
		</Box>
	);
};

export default SearchBar;
