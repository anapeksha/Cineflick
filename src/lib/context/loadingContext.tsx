import React, { createContext, ReactNode, useContext, useState } from "react";

interface Props {
	children?: ReactNode;
}

const LoadingContext = createContext({
	isLoading: false,
	setIsLoading: (isLoading: boolean) => {},
});

export const LoadingProvider: React.FC<Props> = ({ children }) => {
	const [loading, setLoading] = useState(false);

	return (
		<LoadingContext.Provider
			value={{
				isLoading: loading,
				setIsLoading: setLoading,
			}}
		>
			{children}
		</LoadingContext.Provider>
	);
};

export const useLoadingContext = () => useContext(LoadingContext);
