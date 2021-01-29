import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.sass';
import './styles/alignment.sass';
import './styles/box-shadow.sass';
import './styles/border-radius.sass';
import './styles/cursor.sass';
import './styles/display.sass';
import './styles/position.sass';
import './styles/overflow.sass';
import './styles/spacing.sass';
import './styles/typography.sass';

import Logout from './components/Logout/Logout';
import AuthorizationCallback from './pages/AuthorizationCallback/AuthorizationCallback';
import DefaultPage from './pages/DefaultPage/DefaultPage';
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import ClusterExplorerPage from './pages/ClusterExplorerPage/ClusterExplorerPage';
import AuthContextManager from './components/AuthContextManager/AuthContextManager';
import TermsPage from './pages/TermsPage/TermsPage';
import { DarkTheme } from './styles/theme';
import injectTheme from './styles/injectTheme';

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
