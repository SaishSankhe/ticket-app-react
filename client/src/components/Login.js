import axios from 'axios';
import Navigation from './Navigation';
import { withRouter } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../AuthContext';

/**
 * This component is for logging in the user or admin
 * While signing in, details are sent to backend and a token is received
 * This token is saved to details using context API and used all over the application
 */
const Login = (props) => {
	const [details, setDetails] = useContext(AuthContext);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const data = e.target;

		const loginObj = {
			email: data.email.value,
			password: data.pass.value,
			isAdmin: data.role.value === 'admin' ? true : false,
		};

		const response = await axios.post('/api/v1/signin', loginObj);

		/**
		 * set the details object to set the token and role
		 */
		setDetails({
			token: response.data.token,
			role: response.data.role.toLowerCase(),
		});

		redirectToPage(data.role.value);
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
			<Navigation />
			<form className="myForm" method="POST" onSubmit={handleSubmit}>
				<label>
					Email
					<input type="email" id="email" required></input>
				</label>
				<label>
					Password
					<input type="password" id="pass" required></input>
				</label>
				<label>
					Role
					<label>
						<input type="radio" id="user" name="role" value="user" required />
						User
					</label>
					<label>
						<input type="radio" id="admin" name="role" value="admin" required />
						Admin
					</label>
				</label>
				<button type="submit">Login</button>
			</form>
		</div>
	);
};

export default withRouter(Login);
