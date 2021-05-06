import { withRouter } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../AuthContext';

/**
 * This component is check if anyone is logged in or not
 * If yes, redirect to respective pages
 * If user, redirect to /create-story
 * If admin, redirect to /story-review
 */
const Home = (props) => {
	const [details] = useContext(AuthContext);

	const checkAuthenticated = () => {
		/**
		 * check if anyone is logged in by checking the details in context
		 */
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
