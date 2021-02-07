import { createStylesheet } from './createStylesheet';

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
	light0: 'var(--spaces-color-light-0)',
	light1: 'var(--spaces-color-light-1)',
	light2: 'var(--spaces-color-light-2)',
	dark0: 'var(--spaces-color-dark-0)',
	dark1: 'var(--spaces-color-dark-1)',
	dark2: 'var(--spaces-color-dark-2)'
};

export const backgroundColors = createStylesheet({
	default: {},
	light0: { backgroundColor: colors.light0 },
	light1: { backgroundColor: colors.light1 },
	light2: { backgroundColor: colors.light2 },
	dark0: { backgroundColor: colors.dark0 },
	dark1: { backgroundColor: colors.dark1 },
	dark2: { backgroundColor: colors.dark2 },
	red: { backgroundColor: colors.red },
	white: { backgroundColor: colors.white }
});

export default colors;
