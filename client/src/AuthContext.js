import React, { useState, useEffect } from 'react';

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
	/**
	 * initialise local storage to store the token and role
	 * this will be used when the page is refreshed
	 */
	let localState = '';

	/**
	 * Check if the local storage has details info
	 * This info is removed while logging out
	 */
	if (JSON.parse(localStorage.getItem('details'))) {
		localState = JSON.parse(localStorage.getItem('details'));
	}

	/**
	 * set details info from local storage or from other components
	 * this is useful for setting details after page refresh
	 */
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
