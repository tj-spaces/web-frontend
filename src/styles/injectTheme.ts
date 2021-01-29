/** A dictionary of variables and their values */
export type Theme = { [variable: string]: string };

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
	for (let [name, value] of Object.entries(theme)) {
		css += `--${name}:${value};`;
	}
	css += '}';
	tag.innerHTML = css;
}
