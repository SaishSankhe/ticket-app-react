import { withRouter } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../AuthContext';
import axios from 'axios';
import Navigation from './Navigation';

/**
 * This component is for logged in user to add a new user story/ticket
 * Only logged in user can access this route
 */
const CreateStory = (props) => {
	const [details] = useContext(AuthContext);

	const handleSubmit = async (e) => {
		/** After submitting the user story form
		 *	new story object is created using the details from form
		 *	object is sent to backend to add to the stories database
		 *	After successful post request, the user is redirected to /story-list
		 */

		e.preventDefault();
		const data = e.target;

		const storyObj = {
			summary: data.summary.value,
			description: data.description.value,
			type: data.type.value,
			complexity: data.complexity.value,
			estimatedHrs: data.estimated.value,
			cost: data.cost.value,
		};

		await axios.post('/api/v1/stories', storyObj, {
			headers: {
				Authorization: `Bearer ${details.token}`,
			},
		});

		props.history.push('/story-list');
	};

	const addStoryForm = () => {
		/**
		 * Creates a form to be rendered on page
		 * This form takes in all the details needed to create a new story
		 */
		return (
			<form className="myForm" onSubmit={handleSubmit}>
				<label>
					Summary:
					<input type="text" id="summary" required />
				</label>
				<label>
					Description:
					<textarea id="description" rows="3" required />
				</label>
				<label>
					Type:
					<select name="type" id="type" required defaultValue="value">
						<option disabled value="value">
							Select story type
						</option>
						<option value="enhancement">Enhancement</option>
						<option value="bugfix">Bugfix</option>
						<option value="development">Development</option>
						<option value="qa">QA</option>
					</select>
				</label>
				<label>
					Complexity:
					<select
						name="complexity"
						id="complexity"
						required
						defaultValue="value"
					>
						<option disabled value="value">
							Select complexity
						</option>
						<option value="low">Low</option>
						<option value="mid">Medium</option>
						<option value="high">High</option>
					</select>
				</label>
				<label>
					Estimated time:
					<input type="number" id="estimated" required />
				</label>
				<label>
					Cost:
					<span className="currencyinput">
						$<input type="number" name="currency" id="cost" required />
					</span>
				</label>
				<button type="submit">Add story</button>
			</form>
		);
	};

	return (
		<div>
			<Navigation />
			{addStoryForm()}
		</div>
	);
};

export default withRouter(CreateStory);
