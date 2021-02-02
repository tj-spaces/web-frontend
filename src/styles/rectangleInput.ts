import { createStylesheet } from './createStylesheet';

export default createStylesheet({
	rectangleInput: {
		borderRadius: '0px',
		backgroundColor: 'var(--spaces-color-dark-1)',
		subSelectors: {
			':focus': {
				outline: '0px',
				borderBottom: '1px solid white'
			}
		}
	}
});
