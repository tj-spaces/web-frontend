import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.sass';
import './styles/alignment.sass';
import './styles/border-radius.sass';
import './styles/display.sass';
import './styles/spacing.sass';
import './styles/typography.sass';

import Logout from './components/Logout/Logout';
import AuthorizationCallback from './pages/AuthorizationCallback/AuthorizationCallback';
import ClusterPage from './pages/ClusterPage/ClusterPage';
import DefaultPage from './pages/DefaultPage/DefaultPage';
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import SpacePage from './pages/SpacePage/SpacePage';

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Switch>
					<Route path="/auth/:provider/callback" component={AuthorizationCallback} />
					<Route path="/clusters/:clusterId/spaces/:spaceId" component={SpacePage} />
					<Route path="/clusters/:clusterId" component={ClusterPage} />
					<Route path="/login" exact component={LoginPage} />
					<Route path="/logout" exact component={Logout} />
					<Route path="/home" exact component={HomePage} />
					<Route path="/" exact component={DefaultPage} />
				</Switch>
			</BrowserRouter>
		</div>
	);
}

export default App;
