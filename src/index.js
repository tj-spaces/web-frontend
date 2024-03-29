/*
  Copyright (C) Michael Fatemi - All Rights Reserved.
  Unauthorized copying of this file via any medium is strictly prohibited.
  Proprietary and confidential.
  Written by Michael Fatemi <myfatemi04@gmail.com>, February 2021.
*/
import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import {getLogger} from './lib/ClusterLogger';
import reportWebVitals from './reportWebVitals';

console.log(`
If you don't know what you're doing, be careful!

If you DO know what you're doing, then please reach out to me!

We need more React/React Native developers and backend engineers.

Or, if you just want to provide feedback, that's welcome too!

Best,
  Michael
  myfatemi04@gmail.com
`);

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(getLogger('performance'));
