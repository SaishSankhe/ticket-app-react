import React, { useState } from 'react';

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
	const [details, setDetails] = useState({});

	return (
		<AuthContext.Provider value={[details, setDetails]}>
			{children}
		</AuthContext.Provider>
	);
};
