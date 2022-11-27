import React, { createContext, useContext, useState, ReactNode } from "react";

interface Props {
	children?: ReactNode;
}

const AuthenticatedContext = createContext({
	isAuthenticated: false,
	setIsAuthenticated: (isAuthenticated: boolean) => {},
	isLoading: false,
	setIsLoading: (isLoading: boolean) => {},
});

export const AuthenticationProvider: React.FC<Props> = ({ children }) => {
	const [authenticated, setAuthenticated] = useState(false);
	const [loading, setLoading] = useState(false);

	return (
		<AuthenticatedContext.Provider
			value={{
				isAuthenticated: authenticated,
				setIsAuthenticated: setAuthenticated,
				isLoading: loading,
				setIsLoading: setLoading,
			}}
		>
			{children}
		</AuthenticatedContext.Provider>
	);
};

export const useAuthenticationContext = () => useContext(AuthenticatedContext);
