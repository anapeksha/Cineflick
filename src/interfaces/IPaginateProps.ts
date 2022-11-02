import * as React from "react";

interface IPaginateProps {
	page: string;
    totalPages: number;
	setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default IPaginateProps;