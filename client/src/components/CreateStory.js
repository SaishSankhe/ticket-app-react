import { withRouter } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../AuthContext';
import axios from 'axios';
import Navigation from './Navigation';
import { Form, Input, Button, Select, InputNumber } from 'antd';
import TextArea from 'antd/lib/input/TextArea';

/**
 * This component is for logged in user to add a new user story/ticket
 * Only logged in user can access this route
 */
const CreateStory = (props) => {
	const [details] = useContext(AuthContext);

	const { Option } = Select;

	const layout = {
		labelCol: { span: 5 },
		wrapperCol: { span: 10 },
	};

	const tailLayout = {
		wrapperCol: { offset: 5, span: 10 },
	};

	const handleSubmit = async (values) => {
		/** After submitting the user story form
		 *	new story object is created using the details from form
		 *	object is sent to backend to add to the stories database
		 *	After successful post request, the user is redirected to /story-list
		 */

		const storyObj = {
			summary: values.summary,
			description: values.description,
			type: values.type,
			complexity: values.complexity,
			estimatedHrs: values.estimated,
			cost: values.cost,
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
			<Form
				{...layout}
				layout="vertical"
				name="basic"
				initialValues={{ remember: true }}
				onFinish={handleSubmit}
			>
				<Form.Item
					label="Summary"
					name="summary"
					rules={[{ required: true, message: 'Please input story summary' }]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					label="Description"
					name="description"
					rules={[
						{ required: true, message: 'Please input story description' },
					]}
				>
					<TextArea />
				</Form.Item>

				<Form.Item
					label="Type"
					name="type"
					rules={[{ required: true, message: 'Please select story type' }]}
				>
					<Select placeholder="Please select story type">
						<Option value="enhancement">Enhancement</Option>
						<Option value="bugfix">Bugfix</Option>
						<Option value="development">Development</Option>
						<Option value="qa">QA</Option>
					</Select>
				</Form.Item>

				<Form.Item
					label="Complexitiy"
					name="complexity"
					rules={[
						{ required: true, message: 'Please select story complexity' },
					]}
				>
					<Select placeholder="Please select story complexity">
						<Option value="low">Low</Option>
						<Option value="mid">Medium</Option>
						<Option value="high">High</Option>
					</Select>
				</Form.Item>

				<Form.Item
					label="Estimated time"
					name="estimated"
					rules={[
						{ required: true, message: 'Please input estimated time (hrs)' },
					]}
				>
					<InputNumber min={1} max={100} />
				</Form.Item>

				<Form.Item
					label="Cost"
					name="cost"
					rules={[{ required: true, message: 'Please input cost' }]}
				>
					<InputNumber
						defaultValue={0}
						formatter={(value) =>
							`$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
						}
						parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
					/>
				</Form.Item>

				<Form.Item {...tailLayout}>
					<Button type="primary" htmlType="submit">
						Create story
					</Button>
				</Form.Item>
			</Form>
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
