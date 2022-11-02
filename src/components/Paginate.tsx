import { Box, Pagination } from "@mui/material";
import IPaginateProps from "../interfaces/IPaginateProps";
import React from "react";

const Paginate: React.FC<IPaginateProps> = (props) => {
	const handleChange = (page: number) => {
		props.setPage(parseInt(page));
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: "smooth",
		});
	};
	return (
		<Box
			sx={{ display: "flex", justifyContent: "center", paddingBottom: "20px" }}
		>
			<Pagination
				count={props.totalPages || 10}
				onChange={(e: React.ChangeEvent) => {
					if (e.target.textContent) {
						handleChange(e.target.textContent);
					} else if (
						e.currentTarget.outerHTML.includes(
							'aria-label="Go to previous page"'
						)
					) {
						handleChange(props.page - 1);
					} else if (
						e.currentTarget.outerHTML.includes('aria-label="Go to next page"')
					) {
						handleChange(props.page + 1);
					}
				}}
			/>
		</Box>
	);
};

export default Paginate;
