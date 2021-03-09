/*
  Copyright (C) Michael Fatemi - All Rights Reserved.
  Unauthorized copying of this file via any medium is strictly prohibited.
  Proprietary and confidential.
  Written by Michael Fatemi <myfatemi04@gmail.com>, February 2021.
*/
import {createStylesheet} from '../../styles/createStylesheet';

export const styles = createStylesheet({
	fullscreen: {
		minWidth: '100vw',
		minHeight: '100vh',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export default function Fullscreen({children}: {children?: React.ReactNode}) {
	return <div className={styles('fullscreen')}>{children}</div>;
}
