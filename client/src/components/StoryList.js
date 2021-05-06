import { withRouter } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../AuthContext';
import axios from 'axios';

const StoryList = () => {
	const [details] = useContext(AuthContext);
	const [stories, setStories] = useState({});

	useEffect(() => {
		async function getStories() {
			const getStories = await axios.get('/api/v1/stories', {
				headers: {
					Authorization: `Bearer ${details.token}`,
				},
			});

			setStories(getStories);
		}
		getStories();
	}, []);

	console.log(stories);

	return (
		<div>
			<p>Story list page</p>
		</div>
	);
};

export default withRouter(StoryList);
