import { withRouter } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../AuthContext';
import Logout from './Logout';
import axios from 'axios';
import { Card, Row, Col } from 'antd';
import { EditOutlined } from '@ant-design/icons';

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
		<>
			<Logout />
			<div>
				<Row gutter={[40, 30]}>
					{stories.map((item, index) => (
						<Col className="gutter-row" sm={24} md={12} key={index}>
							<div className="site-card-border-less-wrapper">
								<Card
									title={item.id + ' ' + item.summary}
									bordered={false}
									actions={[
										<span
											onClick={() => {
												viewStory(item.id);
											}}
										>
											{`Edit status `}
											<EditOutlined key="edit" />
										</span>,
									]}
									className={item.status}
								>
									<p>{item.description}</p>
									<p>Type: {item.type}</p>
									<p>Complexity: {item.complexity}</p>
									<p>Estimated hours: {item.estimatedHrs}</p>
									<p>Cost: {item.cost}</p>
								</Card>
							</div>
						</Col>
					))}
				</Row>
			</div>
		</>
	);
};

export default withRouter(StoryList);
