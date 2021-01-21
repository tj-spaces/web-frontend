import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.sass';
import './styles/alignment.sass';
import './styles/box-shadow.sass';
import './styles/border-radius.sass';
import './styles/display.sass';
import './styles/spacing.sass';
import './styles/typography.sass';
import './styles/cursor.sass';

import Logout from './components/Logout/Logout';
import AuthorizationCallback from './pages/AuthorizationCallback/AuthorizationCallback';
import DefaultPage from './pages/DefaultPage/DefaultPage';
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Switch>
					<Route path="/auth/:provider/callback" component={AuthorizationCallback} />
					<Route path="/clusters/:clusterId/spaces/:spaceId" component={HomePage} />
					<Route path="/clusters/:clusterId" component={HomePage} />
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
