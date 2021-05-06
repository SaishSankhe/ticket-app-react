import { withRouter } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../AuthContext';
import { Link } from 'react-router-dom';

const Navigation = (props) => {
	const [details, setDetails] = useContext(AuthContext);

	const logout = () => {
		setDetails({});
	};

	return (
		<div>
			<Link className="showlink" to="/login">
				Login
			</Link>
			<Link className="showlink" to="/create-story">
				Create story
			</Link>
			<Link className="showlink" to="/story-list">
				Story list
			</Link>
			<Link className="showlink" to="/story-review">
				Review
			</Link>
			<a href="/login" className="showlink" onClick={logout}>
				Logout
			</a>
		</div>
	);
};

export default withRouter(Navigation);
