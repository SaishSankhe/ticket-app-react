import { withRouter } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../AuthContext';
import { Button } from 'antd';

/**
 * This component acts as a button to logout
 */
const Logout = (props) => {
	const [details, setDetails] = useContext(AuthContext);

	const logout = () => {
		setDetails({});
		localStorage.removeItem('details');
		props.history.push('/login');
	};

	return (
		<div className="logout-btn">
			<Button onClick={logout} width={80}>
				Logout
			</Button>
		</div>
	);
};

export default withRouter(Logout);
