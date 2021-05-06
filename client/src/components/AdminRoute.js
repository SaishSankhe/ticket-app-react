import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

/**
 * This component checks if the logged in user is admin or not
 * If yes, gives access to the routes
 * If not, renders /no-access route
 */
const AdminRoute = ({ component: RouteComponent, ...rest }) => {
	const [details] = useContext(AuthContext);

	return (
		<Route
			{...rest}
			render={(routeProps) =>
				/** Check if the role is "admin" */
				details.role === 'admin' ? (
					/** If yes, continue to the visiting route */
					<RouteComponent {...routeProps} />
				) : (
					/** If not, block access and render /no-access */
					<Redirect to={'/no-access'} />
				)
			}
		/>
	);
};

export default AdminRoute;
