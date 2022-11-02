import * as React from "react";

interface IPaginateProps {
	page: number;
    totalPages: number;
	setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default IPaginateProps;