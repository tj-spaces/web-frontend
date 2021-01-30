import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import spacesLog from './lib/spacesLog';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(spacesLog.bind(null, 'web-vitals'));
