import {lazy, Suspense} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import './App.css';

import AuthenticationWrapper from './components/AuthenticationWrapper';
import CenteredLoadingText from './components/CenteredLoadingText';
import ErrorBoundary from './components/ErrorBoundary';
import StreamerModeContext from './components/StreamerModeContext';
import ThemeProvider from './ThemeProvider';

const AuthorizationCallback = lazy(
	() => import('./pages/AuthenticationCallback/AuthenticationCallback')
);
const AccountPage = lazy(() => import('./pages/AccountPage/AccountPage'));
const ClusterPage = lazy(() => import('./pages/ClusterPage/ClusterPage'));
const ClusterExplorerPage = lazy(
	() => import('./pages/ClusterExplorerPage/ClusterExplorerPage')
);
const DefaultPage = lazy(() => import('./pages/DefaultPage/DefaultPage'));
const LoginPage = lazy(() => import('./pages/LoginPage/LoginPage'));
const Logout = lazy(() => import('./pages/LogoutPage/LogoutPage'));
const SpacePage = lazy(() => import('./pages/SpacePage/SpacePage'));
const TermsPage = lazy(() => import('./pages/TermsPage/TermsPage'));

function App() {
	return (
		<ErrorBoundary>
			<AuthenticationWrapper>
				<StreamerModeContext.Provider value={false}>
					<ThemeProvider>
						<BrowserRouter>
							<Suspense fallback={<CenteredLoadingText />}>
								<Switch>
									<Route path="/account" component={AccountPage} />
									<Route
										path="/auth/:provider/callback"
										component={AuthorizationCallback}
									/>
									<Route path="/spaces/:spaceId" component={SpacePage} />
									<Route path="/clusters/:clusterId" component={ClusterPage} />
									<Route path="/login" exact component={LoginPage} />
									<Route path="/logout" exact component={Logout} />
									<Route
										path="/explore"
										exact
										component={ClusterExplorerPage}
									/>
									<Route path="/terms" exact component={TermsPage} />
									<Route path="/" exact component={DefaultPage} />
								</Switch>
							</Suspense>
						</BrowserRouter>
					</ThemeProvider>
				</StreamerModeContext.Provider>
			</AuthenticationWrapper>
		</ErrorBoundary>
	);
}

export default App;
