/*
  Copyright (C) Michael Fatemi - All Rights Reserved.
  Unauthorized copying of this file via any medium is strictly prohibited.
  Proprietary and confidential.
  Written by Michael Fatemi <myfatemi04@gmail.com>, February 2021.
*/
import {createStylesheet} from './createStylesheet';

export const fontWeights = {
	thin: 100,
	extralight: 200,
	light: 300,
	regular: 400,
	medium: 500,
	semibold: 600,
	bold: 700,
	extrabold: 800,
	ultrabold: 900,
};

export const textStyles = createStylesheet({
	'primary-title': {
		fontWeight: fontWeights.bold,
		fontSize: '2.5rem',
		marginBlockStart: '0.5rem',
		marginBlockEnd: '0.5rem',
		display: 'block',
	},
	'secondary-title': {
		fontWeight: fontWeights.bold,
		fontSize: '1.5rem',
		marginBlockStart: '0.25rem',
		marginBlockEnd: '0.25rem',
		display: 'block',
	},
	'list-item-title': {
		fontWeight: fontWeights.semibold,
		fontSize: '1.25rem',
		display: 'block',
	},
	body: {
		fontWeight: fontWeights.regular,
	},
	'body-semibold': {
		fontWeight: fontWeights.semibold,
	},
	'body-bold': {
		fontWeight: fontWeights.bold,
	},
	caption: {
		textTransform: 'uppercase',
		fontSize: '0.75rem',
	},
});
