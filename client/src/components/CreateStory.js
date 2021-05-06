import { withRouter } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../AuthContext';
import axios from 'axios';

const CreateStory = (props) => {
	const [details] = useContext(AuthContext);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const data = e.target;

		const storyObj = {
			summary: data.summary.value,
			description: data.description.value,
			type: data.type.value,
			complexity: data.complexity.value,
		};
		console.log(details.token);
		await axios.post('/api/v1/stories', storyObj, {
			headers: {
				Authorization: `Bearer ${details.token}`,
			},
		});

		props.history.push('/story-list');
	};

	const addStoryForm = () => {
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
					<select name="type" id="type" required>
						<option disabled value="none" selected="selected">
							Select story type
						</option>
						<option value="enhanced">Enhanced</option>
						<option value="bugfix">Bugfix</option>
						<option value="development">Development</option>
						<option value="qa">QA</option>
					</select>
				</label>
				<label>
					Complexity:
					<select name="complexity" id="complexity" required>
						<option disabled selected="selected" value="none">
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

	return <div>{addStoryForm()}</div>;
};

export default withRouter(CreateStory);
