import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.sass';

import AuthenticationWrapper from './components/AuthenticationWrapper';
import CenteredLoadingText from './components/CenteredLoadingText';
import injectTheme from './styles/injectTheme';
import { DarkTheme } from './styles/theme';

const AuthorizationCallback = lazy(() => import('./pages/AuthenticationCallback/AuthenticationCallback'));
const ClusterPage = lazy(() => import('./pages/ClusterPage/ClusterPage'));
const ClusterExplorerPage = lazy(() => import('./pages/ClusterExplorerPage/ClusterExplorerPage'));
const DefaultPage = lazy(() => import('./pages/DefaultPage/DefaultPage'));
const LoginPage = lazy(() => import('./pages/LoginPage/LoginPage'));
const Logout = lazy(() => import('./pages/LogoutPage/LogoutPage'));
const TermsPage = lazy(() => import('./pages/TermsPage/TermsPage'));

function App() {
	injectTheme(DarkTheme);
	return (
		<div className="App">
			<AuthenticationWrapper>
				<BrowserRouter>
					<Suspense fallback={<CenteredLoadingText />}>
						<Switch>
							<Route path="/auth/:provider/callback" component={AuthorizationCallback} />
							<Route path="/clusters/:clusterId/spaces/:spaceId" component={ClusterPage} />
							<Route path="/clusters/:clusterId" component={ClusterPage} />
							<Route path="/login" exact component={LoginPage} />
							<Route path="/logout" exact component={Logout} />
							<Route path="/explore" exact component={ClusterExplorerPage} />
							<Route path="/terms" exact component={TermsPage} />
							<Route path="/" exact component={DefaultPage} />
						</Switch>
					</Suspense>
				</BrowserRouter>
			</AuthenticationWrapper>
		</div>
	);
}

export default App;
