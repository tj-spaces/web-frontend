import hyphenate from '../lib/hyphenate';

export type Theme = {
	// The classname for the theme to go under
	name: string;
	/** A dictionary of variables and their values */
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

const injectedThemes = new Set<string>();

export default function injectTheme(theme: Theme) {
	if (!injectedThemes.has(theme.name)) {
		const tag = createStyleTag();
		let css = `.theme-${theme.name}{`;
		for (let [name, value] of Object.entries(theme.colors)) {
			css += `--${hyphenate(name)}:${value};`;
		}
		css += '}';
		tag.innerHTML = css;
		injectedThemes.add(theme.name);
	}
}
