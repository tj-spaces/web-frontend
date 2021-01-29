import { createStylesheet } from './createStylesheet';

export type FontSize = 'small' | 'medium' | 'large' | 'xl' | 'xxl';
export const fontSizeStyles = createStylesheet({
	small: {
		fontSize: '0.75rem'
	},
	medium: {
		fontSize: '1rem'
	},
	large: {
		fontSize: '1.5rem'
	},
	xl: {
		fontSize: '2rem'
	},
	xxl: {
		fontSize: '4rem'
	}
});

export type FontWeight = 'bold' | 'medium' | 'normal' | 'semibold';
export const fontWeightStyles = createStylesheet({
	bold: {
		fontWeight: 'bold'
	},
	medium: {
		fontWeight: 500
	},
	normal: {
		fontWeight: 'normal'
	},
	semibold: {
		fontWeight: 600
	}
});
