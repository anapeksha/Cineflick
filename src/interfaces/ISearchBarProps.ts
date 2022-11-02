import * as React from "react";

interface ISearchBarProps {
	searchQuery: string;
	setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
	onSearch: (query: string, page: number) => void;
}

export default ISearchBarProps;
