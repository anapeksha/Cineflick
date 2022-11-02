import SearchIcon from "@mui/icons-material/Search";
import { Box, Divider, IconButton, InputBase, Paper } from "@mui/material";
import * as React from "react";
import ISearchBarProps from "../interfaces/ISearchBarProps";

const SearchBar: React.FC<ISearchBarProps> = (props) => {
	return (
		<Box sx={{ display: "flex", justifyContent: "center", padding: "20px" }}>
			<Paper
				component="form"
				sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 400 }}
			>
				<InputBase
					sx={{ ml: 1, flex: 1 }}
					placeholder="Search"
					inputProps={{ "aria-label": "search" }}
					value={props.searchQuery}
					onChange={(e: React.ChangeEvent<any>) =>
						props.setSearchQuery(e.target.value)
					}
					onKeyDown={(e: React.KeyboardEvent<any>) => {
						if (e.key === "Enter") {
							e.preventDefault();
							props.onSearch(props.searchQuery);
						}
					}}
				/>
				<Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
				<IconButton
					type="button"
					sx={{ p: "10px" }}
					aria-label="search"
					onClick={() => props.onSearch(props.searchQuery)}
				>
					<SearchIcon />
				</IconButton>
			</Paper>
		</Box>
	);
};

export default SearchBar;
