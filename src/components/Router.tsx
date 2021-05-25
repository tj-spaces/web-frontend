import {lazy, Suspense} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import CenteredLoadingText from './CenteredLoadingText';

const AuthorizationCallback = lazy(
	() => import('../pages/AuthenticationCallback')
);
const AccountPage = lazy(() => import('../pages/AccountPage'));
const ClusterPage = lazy(() => import('../pages/ClusterPage'));
const DefaultPage = lazy(() => import('../pages/DefaultPage'));
const EventExperiencePage = lazy(() => import('../pages/EventExperiencePage'));
const LoginPage = lazy(() => import('../pages/LoginPage'));
const Logout = lazy(() => import('../pages/LogoutPage'));
const SpacePage = lazy(() => import('../pages/SpacePage'));
const TermsPage = lazy(() => import('../pages/TermsPage'));

export default function Router() {
	return (
		<BrowserRouter>
			<Suspense fallback={<CenteredLoadingText />}>
				<Switch>
					<Route path="/account" component={AccountPage} />
					<Route
						path="/auth/:provider/callback"
						component={AuthorizationCallback}
					/>
					<Route path="/events/:eventID" component={EventExperiencePage} />
					<Route path="/spaces/:spaceId" component={SpacePage} />
					<Route path="/clusters/:clusterId" component={ClusterPage} />
					<Route path="/login" exact component={LoginPage} />
					<Route path="/logout" exact component={Logout} />
					<Route path="/terms" exact component={TermsPage} />
					{/* <Route path="/testnbla" exact component={TestNbla} /> */}
					{/* <Route path="/voice" exact component={VoiceChannel} /> */}
					<Route path="/" exact component={DefaultPage} />
				</Switch>
			</Suspense>
		</BrowserRouter>
	);
}
