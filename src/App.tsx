/*
  Copyright (C) Michael Fatemi - All Rights Reserved.
  Unauthorized copying of this file via any medium is strictly prohibited.
  Proprietary and confidential.
  Written by Michael Fatemi <myfatemi04@gmail.com>, February 2021.
*/

import './App.css';

import AuthProvider from './components/AuthProvider';
import ErrorBoundary from './components/ErrorBoundary';
import Router from './components/Router';
import StreamerModeContext from './components/StreamerModeContext';
// import VoiceChannel from './components/voiceChannel/VoiceChannel';
import ThemeProvider from './ThemeProvider';

function App() {
	return (
		<ErrorBoundary>
			<AuthProvider>
				<StreamerModeContext.Provider value={false}>
					<ThemeProvider>
						<Router />
					</ThemeProvider>
				</StreamerModeContext.Provider>
			</AuthProvider>
		</ErrorBoundary>
	);
}

export default App;
