/*
  Copyright (C) Michael Fatemi - All Rights Reserved.
  Unauthorized copying of this file via any medium is strictly prohibited.
  Proprietary and confidential.
  Written by Michael Fatemi <myfatemi04@gmail.com>, February 2021.
*/
import {createStylesheet} from '../styles/createStylesheet';

const styles = createStylesheet({
	centeredLoadingText: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
		height: '100%',
	},
});

export default function CenteredLoadingText() {
	return (
		<div className={styles('centeredLoadingText')}>
			<h1>Loading...</h1>
		</div>
	);
}
