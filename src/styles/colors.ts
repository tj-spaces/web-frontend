/*
  Copyright (C) Michael Fatemi - All Rights Reserved.
  Unauthorized copying of this file via any medium is strictly prohibited.
  Proprietary and confidential.
  Written by Michael Fatemi <myfatemi04@gmail.com>, February 2021.
*/
import {createStylesheet} from './createStylesheet';

// CSS variable colors are defined in ./theme.ts
const colors = {
	red: '#ff7361',
	orange: '#ffb361',
	yellow: '#ffff38',
	green: '#81ff38',
	cyan: '#63ffdd',
	blue: '#52a0ff',
	violet: '#a769ff',
	pink: '#ff80ec',
	white: '#ffffff',
	lightgray: '#dddddd',
	gray: '#cccccc',
	textPrimary: 'var(--text-primary)',
	textSecondary: 'var(--text-secondary)',
	bgPrimary: 'var(--bg-primary)',
	bgSecondary: 'var(--bg-secondary)',
	bgElevated: 'var(--bg-elevated)',
};

export const backgroundColors = createStylesheet({
	default: {},
	textPrimary: {backgroundColor: colors.textPrimary},
	textSecondary: {backgroundColor: colors.textSecondary},
	bgPrimary: {backgroundColor: colors.bgPrimary},
	bgSecondary: {backgroundColor: colors.bgSecondary},
	bgElevated: {backgroundColor: colors.bgElevated},
	red: {backgroundColor: colors.red},
	white: {backgroundColor: colors.white},
});

export default colors;
