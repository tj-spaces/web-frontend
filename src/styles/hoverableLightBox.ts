import { createStylesheet } from './createStylesheet';

export default createStylesheet({
	hoverableLightBox: {
		backgroundColor: 'var(--spaces-color-dark-3)',
		borderRadius: '0.5em',
		padding: '0.5em',
		extends: ['hello']
	}
});
