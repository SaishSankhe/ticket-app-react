import { withRouter } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../AuthContext';

const Home = (props) => {
	const [details] = useContext(AuthContext);

	const checkAuthenticated = () => {
		if (!details) {
			props.history.push('/login');
		} else {
			if (details.role === 'user') {
				props.history.push('/create-story');
			} else if (details.role === 'admin') {
				props.history.push('/story-review');
			} else {
				props.history.push('/login');
			}
		}
	};

	return (
		<div>
			<p>Checking if you're logged in...</p>
			<p>Loading ...</p>
			{checkAuthenticated()}
		</div>
	);
};

export default withRouter(Home);
