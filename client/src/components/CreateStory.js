import { withRouter } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../AuthContext';

const CreateStory = () => {
	const [details] = useContext(AuthContext);

	const printToken = () => {
		if (details) {
			console.log(details);
		}
	};
	return (
		<div>
			<p>Create story page</p>
			{printToken()}
		</div>
	);
};

export default withRouter(CreateStory);
