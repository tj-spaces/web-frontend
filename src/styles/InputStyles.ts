/*
  Copyright (C) Michael Fatemi - All Rights Reserved.
  Unauthorized copying of this file via any medium is strictly prohibited.
  Proprietary and confidential.
  Written by Michael Fatemi <myfatemi04@gmail.com>, February 2021.
*/
import {createStylesheet} from './createStylesheet';

export default createStylesheet({
	rectangleInput: {
		borderRadius: '0px',
		backgroundColor: 'var(--bg-primary)',
		subSelectors: {
			':focus': {
				outline: '0px',
				borderBottom: '1px solid white',
			},
		},
	},
});
