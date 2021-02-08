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
