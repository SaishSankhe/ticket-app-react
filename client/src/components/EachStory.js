import { withRouter } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../AuthContext';
import Logout from './Logout';
import axios from 'axios';
import { Card } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

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
	}, [details, storyId]);

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
			<Logout />
			<div>
				<div className="site-card-border-less-wrapper">
					<Card
						title={story.id + ' ' + story.summary}
						bordered={false}
						actions={[
							<span
								onClick={() => {
									updateStatus('accepted');
								}}
							>
								{`Accept `}
								<CheckOutlined key="edit" />
							</span>,
							<span
								onClick={() => {
									updateStatus('rejected');
								}}
							>
								{`Reject `}
								<CloseOutlined key="edit" />
							</span>,
						]}
					>
						<p>{story.description}</p>
						<p>Type: {story.type}</p>
						<p>Complexity: {story.complexity}</p>
						<p>Estimated hours: {story.estimatedHrs}</p>
						<p>Cost: {story.cost}</p>
						<p>Status: {story.status}</p>
					</Card>
				</div>
			</div>
		</div>
	);
};

export default withRouter(EachStory);
