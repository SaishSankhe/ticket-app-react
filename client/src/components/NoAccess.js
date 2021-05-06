import { withRouter } from 'react-router-dom';
import { Button } from 'antd';

const NoAccess = (props) => {
	return (
		<div>
			<h1>Error 401</h1>
			<h2>Sorry, you do not have access to requested page.</h2>

			<Button
				type="button"
				onClick={() => {
					props.history.push('/login');
				}}
			>
				Login
			</Button>
		</div>
	);
};

export default withRouter(NoAccess);
