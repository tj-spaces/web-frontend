import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import AuthorizationCallback from './pages/AuthorizationCallback/AuthorizationCallback';
import LoginPage from './pages/LoginPage/LoginPage';

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Switch>
					<Route path="/auth/:provider/callback" component={AuthorizationCallback}></Route>
					<Route path="/login" exact component={LoginPage} />
					<Route path="/" exact component={LoginPage} />
				</Switch>
			</BrowserRouter>
		</div>
	);
}

export default App;
