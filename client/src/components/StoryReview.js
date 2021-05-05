import { withRouter } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../AuthContext';

const StoryList = () => {
	const [details] = useContext(AuthContext);

	return (
		<div>
			<p>Story review page</p>
		</div>
	);
};

export default withRouter(StoryList);
