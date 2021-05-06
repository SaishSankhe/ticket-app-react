import { withRouter } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../AuthContext';
import Navigation from './Navigation';
import axios from 'axios';

const EachStory = (props) => {
	const [details] = useContext(AuthContext);
	const storyId = props.match.params.id;
	const [story, setStory] = useState({});

	useEffect(() => {
		async function fetchStory() {
			const getStory = await axios.get(`/api/v1/stories/${storyId}`, {
				headers: {
					Authorization: `Bearer ${details.token}`,
				},
			});

			setStory(getStory.data);
		}

		fetchStory();
	}, []);

	const updateStatus = async (status) => {
		await axios.put(
			`/api/v1/stories/${storyId}/${status}`,
			{},
			{
				headers: {
					Authorization: `Bearer ${details.token}`,
				},
			}
		);

		props.history.push('/story-review');
	};

	return (
		<div>
			<Navigation />
			<div>
				<p>{story.id}</p>
				<p>{story.summary}</p>
				<p>{story.description}</p>
				<p>{story.type}</p>
				<p>{story.complexity}</p>
				<p>{story.estimatedHrs}</p>
				<p>{story.cost}</p>
				<hr />

				<button
					type="button"
					onClick={() => {
						updateStatus('accepted');
					}}
				>
					Accept
				</button>
				<button
					type="button"
					onClick={() => {
						updateStatus('rejected');
					}}
				>
					Reject
				</button>
			</div>
		</div>
	);
};

export default withRouter(EachStory);
