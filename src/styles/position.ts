/*
  Copyright (C) Michael Fatemi - All Rights Reserved.
  Unauthorized copying of this file via any medium is strictly prohibited.
  Proprietary and confidential.
  Written by Michael Fatemi <myfatemi04@gmail.com>, February 2021.
*/
import {createStylesheet} from './createStylesheet';

const positionStyles = createStylesheet({
	static: {position: 'static'},
	fixed: {position: 'fixed'},
	absolute: {position: 'absolute'},
	relative: {position: 'relative'},
});

export default positionStyles;
