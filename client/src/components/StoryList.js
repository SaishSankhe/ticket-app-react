import { withRouter } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../AuthContext';
import axios from 'axios';

const StoryList = () => {
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

	console.log(stories);

	return (
		<div>
			{stories.map((item, index) => (
				<div index={index}>
					<p>{item.id}</p>
					<p>{item.summary}</p>
					<p>{item.description}</p>
					<p>{item.type}</p>
					<p>{item.complexity}</p>
					<p>{item.estimatedHrs}</p>
					<p>{item.cost}</p>
					<hr />
				</div>
			))}
		</div>
	);
};

export default withRouter(StoryList);
