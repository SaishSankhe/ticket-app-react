import { withRouter } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../AuthContext';
import Navigation from './Navigation';
import axios from 'axios';

/**
 * This component is to display information regarding single story when admin clicks on it
 * Admin can Accept or Reject the story on this page
 */
const EachStory = (props) => {
	const [details] = useContext(AuthContext);
	const storyId = props.match.params.id;
	const [story, setStory] = useState({});

	useEffect(() => {
		async function fetchStory() {
			/**
			 * get story details from the backend based on the story id passed
			 */
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
		/**
		 * Update the status of the story by passing the status to backend
		 */
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
