/*
  Copyright (C) Michael Fatemi - All Rights Reserved.
  Unauthorized copying of this file via any medium is strictly prohibited.
  Proprietary and confidential.
  Written by Michael Fatemi <myfatemi04@gmail.com>, February 2021.
*/
import {Redirect} from 'react-router-dom';

export default function Logout() {
	localStorage.removeItem('session_id');
	return <Redirect to="/" />;
}
