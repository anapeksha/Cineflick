import React, { createContext, useContext, useState, ReactNode } from "react";

interface Props {
	children?: ReactNode;
}

interface User {
	exp: number;
	iat: number;
	id: string;
	type: string;
	username: string;
}

const AuthenticatedContext = createContext({
	isAuthenticated: false,
	setIsAuthenticated: (isAuthenticated: boolean) => {},
	user: { exp: 0, iat: 0, id: "", type: "", username: "" },
	setUser: (user: User) => {},
});

export const AuthenticationProvider: React.FC<Props> = ({ children }) => {
	const [authenticated, setAuthenticated] = useState(false);
	const [user, setUser] = useState({
		exp: 0,
		iat: 0,
		id: "",
		type: "",
		username: "",
	});

	return (
		<AuthenticatedContext.Provider
			value={{
				isAuthenticated: authenticated,
				setIsAuthenticated: setAuthenticated,
				user: user,
				setUser: setUser,
			}}
		>
			{children}
		</AuthenticatedContext.Provider>
	);
};

export const useAuthenticationContext = () => useContext(AuthenticatedContext);
