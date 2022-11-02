import * as React from "react";

interface ISearchBarProps {
	searchQuery: string;
	setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
	onSearch: (query: string) => void;
}

export default ISearchBarProps;
