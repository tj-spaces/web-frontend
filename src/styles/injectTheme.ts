import hyphenate from '../lib/hyphenate';

/** A dictionary of variables and their values */
export type Theme = {
	colors: {
		textPrimary: string;
		textSecondary: string;
		textDisabled: string;
		textError: string;
		textWarn: string;
		bgPrimary: string;
		bgSecondary: string;
		bgElevated: string;
		white: string;
	};
};

function createStyleTag() {
	const tag = document.createElement('style');
	tag.setAttribute('type', 'text/css');
	tag.setAttribute('data-styled', 'true');
	const head = document.getElementsByTagName('head')[0];
	head.appendChild(tag);
	return tag;
}

export default function injectTheme(theme: Theme) {
	const tag = createStyleTag();
	let css = 'html{';
	for (let [name, value] of Object.entries(theme.colors)) {
		css += `--${hyphenate(name)}:${value};`;
	}
	css += '}';
	tag.innerHTML = css;
}
