import {lazy, Suspense} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import './App.css';

import AuthenticationWrapper from './components/AuthenticationWrapper';
import CenteredLoadingText from './components/CenteredLoadingText';
import ErrorBoundary from './components/ErrorBoundary';
import StreamerModeContext from './components/StreamerModeContext';
import TestNbla from './components/testNbla/NblaEditor';
import ThemeProvider from './ThemeProvider';

const AuthorizationCallback = lazy(
	() => import('./pages/AuthenticationCallback')
);
const AccountPage = lazy(() => import('./pages/AccountPage'));
const AFrameTest = lazy(() => import('./components/Space_new'));
const ClusterPage = lazy(() => import('./pages/ClusterPage'));
const DefaultPage = lazy(() => import('./pages/DefaultPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const Logout = lazy(() => import('./pages/LogoutPage'));
const SpacePage = lazy(() => import('./pages/SpacePage'));
const TermsPage = lazy(() => import('./pages/TermsPage'));
const ThirdPersonTest = lazy(() => import('./pages/ThirdPersonTest'));

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
									<Route path="/aframe" component={AFrameTest} />
									<Route path="/tp" component={ThirdPersonTest} />
									<Route path="/spaces/:spaceId" component={SpacePage} />
									<Route path="/clusters/:clusterId" component={ClusterPage} />
									<Route path="/login" exact component={LoginPage} />
									<Route path="/logout" exact component={Logout} />
									<Route path="/terms" exact component={TermsPage} />
									<Route path="/testnbla" exact component={TestNbla} />
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
