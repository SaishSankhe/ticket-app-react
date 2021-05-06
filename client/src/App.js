import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import CreateStory from './components/CreateStory';
import StoryList from './components/StoryList';
import StoryReview from './components/StoryReview';
import Logout from './components/Logout';
import { AuthProvider } from './AuthContext';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

function App() {
	return (
		<Router>
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
			<Link className="showlink" to="/story-review/:id">
				Each story
			</Link>
			<Link className="showlink" to="/logout">
				Logout
			</Link>

			<AuthProvider>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route exact path="/login" component={Login} />
					<Route exact path="/create-story" component={CreateStory} />
					<Route exact path="/story-list" component={StoryList} />
					<Route exact path="/story-review" component={StoryReview} />
					<Route exact path="/story-review/:id" component={StoryReview} />
					<Route exact path="/logout" component={Logout} />
				</Switch>
			</AuthProvider>
		</Router>
	);
}

export default App;
