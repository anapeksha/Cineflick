import * as React from "react";

interface ISearchBarProps {
	searchQuery: string;
	setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
	onSearch: Promise<void>;
}

export default ISearchBarProps;
