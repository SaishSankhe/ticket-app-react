import { withRouter } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../AuthContext';
import axios from 'axios';
import Logout from './Logout';
import { Card, Button, Select, Form, Row, Col } from 'antd';

/**
 * This  component displays the story list by the logged in user
 * User can sort the stories by id and complexity
 * Stories can be filtered based on type
 */
const StoryList = () => {
	const [details] = useContext(AuthContext);
	const [stories, setStories] = useState([]);
	const [filter, setFilter] = useState('none');

	const { Option } = Select;

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

	const sortById = () => {
		const sortedStories = [].concat(stories).sort((a, b) => {
			return a.id - b.id;
		});

		setStories(sortedStories);
	};

	const sortByComplexity = () => {
		/**
		 * sort the stories by complexity, high > mid > low
		 */
		const type = ['high', 'mid', 'low'];
		const sortedStories = [].concat(stories).sort((a, b) => {
			return type.indexOf(a.complexity) - type.indexOf(b.complexity);
		});

		setStories(sortedStories);
	};

	const filterByType = (value) => {
		/**
		 * set the filter value, to be used to filter the results
		 */
		setFilter(value);
	};

	const filteredStories = () => {
		/**
		 * filter the stories by selected filter
		 */
		const filteredStories = stories.filter((item) => item.type === filter);

		return (
			/**
			 * returns new filtered list
			 */
			<>
				{filteredStories.map((item, index) => (
					<Col className="gutter-row" sm={24} md={12} key={index}>
						<div className="site-card-border-less-wrapper">
							<Card title={item.id + ' ' + item.summary} bordered={false}>
								<p>{item.description}</p>
								<p>Type: {item.type}</p>
								<p>Complexity: {item.complexity}</p>
								<p>Estimated hours: {item.estimatedHrs}</p>
								<p>Cost: {item.cost}</p>
							</Card>
						</div>
					</Col>
				))}
			</>
		);
	};

	return (
		<div>
			<Logout />
			<div className="list-actions">
				<Button
					type="button"
					onClick={() => {
						sortById();
					}}
				>
					Sort by ID
				</Button>
				<Button
					type="button"
					onClick={() => {
						sortByComplexity();
					}}
				>
					Sort by Type
				</Button>
			</div>
			<Form.Item label="Filter" name="type">
				<Select
					placeholder="Filter by"
					onChange={filterByType}
					defaultValue="none"
					className="filter"
				>
					<Option value="none">None</Option>
					<Option value="enhancement">Enhancement</Option>
					<Option value="bugfix">Bugfix</Option>
					<Option value="development">Development</Option>
					<Option value="qa">QA</Option>
				</Select>
			</Form.Item>

			<Row gutter={[40, 30]}>
				{
					/**
					 * checks if any filter is selected
					 * If yes, displays the stories according to filter,
					 * If not, displays all the stories
					 *  */

					filter === 'none'
						? stories.map((item, index) => (
								<Col className="gutter-row" sm={24} md={12} key={index}>
									<div className="site-card-border-less-wrapper">
										<Card title={item.id + ' ' + item.summary} bordered={false}>
											<p>{item.description}</p>
											<p>Type: {item.type}</p>
											<p>Complexity: {item.complexity}</p>
											<p>Estimated hours: {item.estimatedHrs}</p>
											<p>Cost: {item.cost}</p>
										</Card>
									</div>
								</Col>
						  ))
						: filteredStories()
				}
			</Row>
		</div>
	);
};

export default withRouter(StoryList);
