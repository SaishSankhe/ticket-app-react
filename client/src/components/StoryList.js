import { withRouter } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../AuthContext';
import axios from 'axios';
import Navigation from './Navigation';

/**
 * This  component displays the story list by the logged in user
 * User can sort the stories by id and complexity
 * Stories can be filtered based on type
 */
const StoryList = () => {
	const [details] = useContext(AuthContext);
	const [stories, setStories] = useState([]);
	const [filter, setFilter] = useState('none');

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

	const filterByType = (e) => {
		/**
		 * set the filter value, to be used to filter the results
		 */
		setFilter(e.target.value);
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
			<div>
				{filteredStories.map((item, index) => (
					<div key={index}>
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

	return (
		<div>
			<Navigation />
			<button
				type="button"
				onClick={() => {
					sortById();
				}}
			>
				Sort by ID
			</button>
			<button
				type="button"
				onClick={() => {
					sortByComplexity();
				}}
			>
				Sort by Type
			</button>
			<form>
				<label>
					Filter by type
					<select
						name="type"
						id="filterValue"
						defaultValue="none"
						onChange={filterByType}
					>
						<option value="none">None</option>
						<option value="enhancement">Enhancement</option>
						<option value="bugfix">Bugfix</option>
						<option value="development">Development</option>
						<option value="qa">QA</option>
					</select>
				</label>
			</form>
			{
				/**
				 * checks if any filter is selected
				 * If yes, displays the stories according to filter,
				 * If not, displays all the stories
				 *  */

				filter === 'none'
					? stories.map((item, index) => (
							<div key={index}>
								<p>{item.id}</p>
								<p>{item.summary}</p>
								<p>{item.description}</p>
								<p>{item.type}</p>
								<p>{item.complexity}</p>
								<p>{item.estimatedHrs}</p>
								<p>{item.cost}</p>
								<hr />
							</div>
					  ))
					: filteredStories()
			}
		</div>
	);
};

export default withRouter(StoryList);
