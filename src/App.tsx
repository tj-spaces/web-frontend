import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.sass';

import AuthContextManager from './components/AuthenticationWrapper';
import AuthorizationCallback from './pages/AuthenticationCallback/AuthenticationCallback';
import ClusterExplorerPage from './pages/ClusterExplorerPage/ClusterExplorerPage';
import DefaultPage from './pages/DefaultPage/DefaultPage';
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import Logout from './pages/LogoutPage/LogoutPage';
import TermsPage from './pages/TermsPage/TermsPage';
import injectTheme from './styles/injectTheme';
import { DarkTheme } from './styles/theme';

function App() {
	injectTheme(DarkTheme);
	return (
		<div className="App">
			<AuthContextManager>
				<BrowserRouter>
					<Switch>
						<Route path="/auth/:provider/callback" component={AuthorizationCallback} />
						<Route path="/clusters/:clusterId/spaces/:spaceId" component={HomePage} />
						<Route path="/clusters/:clusterId" component={HomePage} />
						<Route path="/login" exact component={LoginPage} />
						<Route path="/logout" exact component={Logout} />
						<Route path="/home" exact component={HomePage} />
						<Route path="/explore" exact component={ClusterExplorerPage} />
						<Route path="/terms" exact component={TermsPage} />
						<Route path="/" exact component={DefaultPage} />
					</Switch>
				</BrowserRouter>
			</AuthContextManager>
		</div>
	);
}

export default App;
