/*
  Copyright (C) Michael Fatemi - All Rights Reserved.
  Unauthorized copying of this file via any medium is strictly prohibited.
  Proprietary and confidential.
  Written by Michael Fatemi <myfatemi04@gmail.com>, February 2021.
*/
import {Theme} from './injectTheme';

export const DarkTheme: Theme = {
	name: 'dark',
	colors: {
		textPrimary: '#ffffff',
		textSecondary: '#eeeeee',
		textDisabled: '#bbbbbb',
		textWarn: '#ff6060',
		textError: '#ff6060',
		bgPrimary: '#222222',
		bgSecondary: '#2d2d2d',
		bgElevated: '#343434',
		white: '#ffffff',
	},
};

export const LightTheme: Theme = {
	name: 'light',
	colors: {
		textPrimary: '#222222',
		textSecondary: '#282828',
		textDisabled: '#505050',
		textWarn: '#ff6060',
		textError: '#ff6060',
		bgPrimary: '#eeeeee',
		bgSecondary: '#dddddd',
		bgElevated: '#cccccc',
		white: '#ffffff',
	},
};
