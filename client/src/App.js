import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import CreateStory from './components/CreateStory';
import StoryList from './components/StoryList';
import StoryReview from './components/StoryReview';
import EachStory from './components/EachStory';
import AdminRoute from './components/AdminRoute';
import AuthRoute from './components/AuthRoute';
import { AuthProvider } from './AuthContext';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { Layout } from 'antd';

const { Content } = Layout;

function App() {
	return (
		<Router>
			<AuthProvider>
				<Switch>
					<Layout>
						<Content>
							<Route exact path="/" component={Home} />
							<Route exact path="/login" component={Login} />
							<AuthRoute exact path="/create-story" component={CreateStory} />
							<AuthRoute exact path="/story-list" component={StoryList} />
							<AdminRoute exact path="/story-review" component={StoryReview} />
							<AdminRoute
								exact
								path="/story-review/:id"
								component={EachStory}
							/>
						</Content>
					</Layout>
				</Switch>
			</AuthProvider>
		</Router>
	);
}

export default App;
