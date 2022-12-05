import React, { createContext, useContext, useState, ReactNode } from "react";

interface Props {
	children?: ReactNode;
}

const LoadedContext = createContext({
	isLoading: false,
	setIsLoading: (isLoading: boolean) => {},
});

export const LoadingProvider: React.FC<Props> = ({ children }) => {
	const [loading, setLoading] = useState(false);

	return (
		<LoadedContext.Provider
			value={{
				isLoading: loading,
				setIsLoading: setLoading,
			}}
		>
			{children}
		</LoadedContext.Provider>
	);
};

export const useLoadingContext = () => useContext(LoadedContext);
