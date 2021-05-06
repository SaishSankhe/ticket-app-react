import { withRouter } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../AuthContext';

/**
 * This component acts as a button to logout
 */
const Logout = (props) => {
	const [details, setDetails] = useContext(AuthContext);

	const logout = () => {
		setDetails({});
		localStorage.removeItem('details');
	};

	return (
		<div>
			<a href="/login" className="showlink" onClick={logout}>
				Logout
			</a>
		</div>
	);
};

export default withRouter(Logout);
