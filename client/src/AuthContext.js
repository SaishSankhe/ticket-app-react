import React, { useState, useEffect } from 'react';

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
	const localState = JSON.parse(localStorage.getItem('details'));

	const [details, setDetails] = useState(
		{ token: localState.token, role: localState.role } || {}
	);

	useEffect(() => {
		localStorage.setItem('details', JSON.stringify(details));
	}, [details]);

	return (
		<AuthContext.Provider value={[details, setDetails]}>
			{children}
		</AuthContext.Provider>
	);
};
