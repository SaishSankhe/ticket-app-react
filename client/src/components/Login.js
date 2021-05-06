import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../AuthContext';
import { Form, Input, Button, Radio } from 'antd';

/**
 * This component is for logging in the user or admin
 * While signing in, details are sent to backend and a token is received
 * This token is saved to details using context API and used all over the application
 */
const Login = (props) => {
	const [details, setDetails] = useContext(AuthContext);

	const layout = {
		labelCol: { span: 5 },
		wrapperCol: { span: 10 },
	};

	const tailLayout = {
		wrapperCol: { offset: 5, span: 10 },
	};

	const handleSubmit = async (values) => {
		const loginObj = {
			email: values.email,
			password: values.pass,
			isAdmin: values.role === 'admin' ? true : false,
		};

		const response = await axios.post('/api/v1/signin', loginObj);

		/**
		 * set the details object to set the token and role
		 */
		setDetails({
			token: response.data.token,
			role: response.data.role.toLowerCase(),
		});

		redirectToPage(values.role);
	};

	const redirectToPage = (role) => {
		/**
		 * function to check if the logged in person is user or admin
		 * to redirect to respective routes
		 */
		if (role === 'user') {
			props.history.push('/create-story');
		} else {
			props.history.push('/story-review');
		}
	};

	return (
		<div>
			<Form
				{...layout}
				layout="vertical"
				name="basic"
				initialValues={{ remember: true }}
				onFinish={handleSubmit}
			>
				<Form.Item
					label="Email"
					name="email"
					rules={[
						{
							required: true,
							type: 'email',
							message: 'Please input your email',
						},
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					label="Password"
					name="password"
					rules={[{ required: true, message: 'Please input your password' }]}
				>
					<Input.Password />
				</Form.Item>
				<Form.Item
					name="role"
					label="Role"
					rules={[{ required: true, message: 'Please choose a role' }]}
				>
					<Radio.Group>
						<Radio value="user">User</Radio>
						<Radio value="admin">Admin</Radio>
					</Radio.Group>
				</Form.Item>
				<Form.Item {...tailLayout}>
					<Button type="primary" htmlType="submit">
						Login
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
};

export default withRouter(Login);
