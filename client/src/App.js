import './App.css';
import Login from './components/Login';
import CreateStory from './components/CreateStory';
import StoryList from './components/StoryList';
import StoryReview from './components/StoryReview';
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

			<Switch>
				<Route exact path="/login" component={Login} />
				<Route exact path="/create-story" component={CreateStory} />
				<Route exact path="/story-list" component={StoryList} />
				<Route exact path="/story-review" component={StoryReview} />
				<Route exact path="/story-review/:id" component={StoryReview} />
			</Switch>
		</Router>
	);
}

export default App;
