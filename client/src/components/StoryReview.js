import { withRouter } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../AuthContext';
import Navigation from './Navigation';

const StoryList = () => {
	const [details] = useContext(AuthContext);

	return (
		<div>
			<Navigation />
			<p>Story review page</p>
		</div>
	);
};

export default withRouter(StoryList);
