import { withRouter } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../AuthContext';
import Navigation from './Navigation';
import axios from 'axios';

/**
 * This component is for admin to review the stories
 * Admin can click on each story to accept/reject ot
 */
const StoryList = (props) => {
	const [details] = useContext(AuthContext);
	const [stories, setStories] = useState([]);

	useEffect(() => {
		async function getStories() {
			const getStories = await axios.get('/api/v1/stories', {
				headers: {
					Authorization: `Bearer ${details.token}`,
				},
			});

			setStories(getStories.data);
		}
		getStories();
	}, [details]);

	const viewStory = (id) => {
		props.history.push(`/story-review/${id}`);
	};

	return (
		<div>
			<Navigation />
			{stories.map((item, index) => (
				<div key={index}>
					<button
						onClick={() => {
							viewStory(item.id);
						}}
					>
						{item.id}
					</button>
					<p>{item.summary}</p>
					<p>{item.description}</p>
					<p>{item.type}</p>
					<p>{item.complexity}</p>
					<p>{item.estimatedHrs}</p>
					<p>{item.cost}</p>
					<p>{item.status}</p>
					<hr />
				</div>
			))}
		</div>
	);
};

export default withRouter(StoryList);
