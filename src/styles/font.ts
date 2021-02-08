import {createStylesheet} from './createStylesheet';

export const fontSizeStyles = createStylesheet({
	small: {fontSize: '0.75rem'},
	medium: {fontSize: '1rem'},
	large: {fontSize: '1.5rem'},
	'section-title': {fontSize: '2rem'},
	title: {fontSize: '4rem'},
});
export type FontSize = keyof typeof fontSizeStyles;

export const fontWeightStyles = createStylesheet({
	bold: {
		fontWeight: 'bold',
	},
	medium: {
		fontWeight: 500,
	},
	normal: {
		fontWeight: 'normal',
	},
	semibold: {
		fontWeight: 600,
	},
});
export type FontWeight = keyof typeof fontWeightStyles;
