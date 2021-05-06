import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

const AuthRoute = ({ component: RouteComponent, ...rest }) => {
	const [details] = useContext(AuthContext);

	return (
		<Route
			{...rest}
			render={(routeProps) =>
				details.role === 'admin' || details.role === 'user' ? (
					<RouteComponent {...routeProps} />
				) : (
					<Redirect to={'/login'} />
				)
			}
		/>
	);
};

export default AuthRoute;
