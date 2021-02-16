import {createStylesheet} from './createStylesheet';

const positionStyles = createStylesheet({
	static: {position: 'static'},
	fixed: {position: 'fixed'},
	absolute: {position: 'absolute'},
	relative: {position: 'relative'},
});

export default positionStyles;
