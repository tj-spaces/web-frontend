import { lazy } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.sass';

import AuthContextManager from './components/AuthenticationWrapper';

import injectTheme from './styles/injectTheme';
import { DarkTheme } from './styles/theme';

const AuthorizationCallback = lazy(() => import('./pages/AuthenticationCallback/AuthenticationCallback'));
const ClusterExplorerPage = lazy(() => import('./pages/ClusterExplorerPage/ClusterExplorerPage'));
const DefaultPage = lazy(() => import('./pages/DefaultPage/DefaultPage'));
const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const LoginPage = lazy(() => import('./pages/LoginPage/LoginPage'));
const Logout = lazy(() => import('./pages/LogoutPage/LogoutPage'));
const TermsPage = lazy(() => import('./pages/TermsPage/TermsPage'));

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
