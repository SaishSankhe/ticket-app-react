import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

/**
 * This component checks if any user is logged in or not
 * If yes, gives access to the routes
 * If not, renders /login page
 */
const AuthRoute = ({ component: RouteComponent, ...rest }) => {
	const [details] = useContext(AuthContext);

	return (
		<Route
			{...rest}
			render={(routeProps) =>
				/** Check if the role is "admin" or "user" */
				details.role === 'admin' || details.role === 'user' ? (
					/** If yes, continue to the visiting route */
					<RouteComponent {...routeProps} />
				) : (
					/** If not, block access and render /login page */
					<Redirect to={'/login'} />
				)
			}
		/>
	);
};

export default AuthRoute;
