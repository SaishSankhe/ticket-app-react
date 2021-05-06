import { withRouter } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../AuthContext';

const Logout = (props) => {
	const [details, setDetails] = useContext(AuthContext);

	const logout = () => {
		setDetails({});
		setInterval(100);
		props.history.push('/login');
	};

	return (
		<div>
			<p>Logging out</p>
			{logout()}
		</div>
	);
};

export default withRouter(Logout);
