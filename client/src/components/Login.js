import axios from 'axios';

const Login = () => {
	const handleSubmit = async (e) => {
		e.preventDefault();
		const data = e.target;
		const loginObj = {
			email: data.email.value,
			password: data.pass.value,
			isAdmin: data.role.value === 'admin' ? true : false,
		};

		const response = await axios.post('/api/v1/signin', loginObj);

		const token = response.data.token;

		console.log(token);
	};

	return (
		<div>
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

export default Login;
