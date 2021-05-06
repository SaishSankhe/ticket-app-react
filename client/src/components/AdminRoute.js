import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

const AdminRoute = ({ component: RouteComponent, ...rest }) => {
	const [details] = useContext(AuthContext);

	return (
		<Route
			{...rest}
			render={(routeProps) =>
				details.role === 'admin' ? (
					<RouteComponent {...routeProps} />
				) : (
					<Redirect to={'/no-access'} />
				)
			}
		/>
	);
};

export default AdminRoute;
