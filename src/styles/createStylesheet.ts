import { CSSProperties } from 'react';
import { getLogger } from '../lib/ClusterLogger';

function createStyleTag() {
	const tag = document.createElement('style');
	tag.setAttribute('type', 'text/css');
	tag.setAttribute('data-styled', 'true');
	const head = document.getElementsByTagName('head')[0];
	head.appendChild(tag);
	return tag;
}

const classCache: { [key: string]: string } = {};
const generatedClassNames = new Set<string>();

const hyphenate = (str: string) => {
	return str
		.split('')
		.map((letter, idx) => {
			if (letter.toUpperCase() === letter) {
				letter = letter.toLowerCase();
				if (idx > 0) {
					return '-' + letter;
				} else {
					return letter;
				}
			} else {
				return letter;
			}
		})
		.join('');
};

function generateClassName(length: number = 8) {
	const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
	let result: string;
	do {
		result = '';
		for (let i = 0; i < length; i++) {
			result += chars[Math.floor(Math.random() * 52)];
		}
	} while (generatedClassNames.has(result));

	generatedClassNames.add(result);

	return result;
}

export type StylesheetDefinition = { [className: string]: StylesheetProperties };
export interface StylesheetProperties extends CSSProperties {
	extends?: ClassProvider[];
	subSelectors?: {
		[pseudoSelector: string]: StylesheetProperties;
	};
}

export function createClasses(properties: StylesheetProperties, subSelectors: string = '') {
	let innerHTML = '';
	// map of property name to property class
	let classes: Record<string, string | Record<string, string>> = {};
	for (let [name, value] of Object.entries(properties)) {
		if (name === 'subSelectors') {
			for (let [nestedSubSelector, props] of Object.entries(value)) {
				// This is a nested StylesheetProperties
				let result = createClasses(props as StylesheetProperties, subSelectors + nestedSubSelector);
				innerHTML += result.innerHTML;
				classes[nestedSubSelector] = result.classes as Record<string, string>;
			}
		} else if (name === 'extends') {
			let reversed = (value as ClassProvider[]).reverse();
			for (let provider of reversed) {
				Object.assign(classes, provider);
			}
		} else if (typeof value === 'string' || typeof value === 'number') {
			const key = name + subSelectors + '|' + value;
			let className;
			if (key in classCache) {
				className = classCache[key];
			} else {
				className = generateClassName(2);
				const styleText = hyphenate(name) + ':' + value;

				let selector = `.${className}`;

				if (subSelectors.startsWith(':')) {
					selector += subSelectors;
				} else {
					selector += ' ' + subSelectors;
				}
				innerHTML += `${selector}{${styleText};}`;
				classCache[key] = className;
			}
			classes[name] = className;
		}
	}
	return { innerHTML, classes };
}

let buildTimeoutHandle: NodeJS.Timeout | null = null;
let queuedHTML = '';
let queuedClassesCount = 0;

const logger = getLogger('stylesheet');

export type FunctionalStylesheet<T> = { [key in keyof T]: ClassProvider } &
	((...classnames: (keyof T | null | undefined | false | { [key in keyof T]: boolean })[]) => string);

export function createStylesheet<T extends StylesheetDefinition>(styles: T): FunctionalStylesheet<T> {
	let innerHTML = '';
	// @ts-ignore
	const newStyles: { [key in keyof T]: ClassProvider } = {};
	for (let [cls, props] of Object.entries(styles)) {
		let { classes, innerHTML: newInnerHTML } = createClasses(props);
		innerHTML += newInnerHTML;
		// @ts-ignore
		newStyles[cls] = classes;
		queuedClassesCount += Object.keys(classes).length;
	}
	queuedHTML += innerHTML;
	if (buildTimeoutHandle == null) {
		buildTimeoutHandle = setTimeout(() => {
			if (queuedHTML.trim()) {
				logger(`Injecting ${queuedClassesCount} classes`);
				const tag = createStyleTag();
				tag.innerHTML = queuedHTML;
				queuedHTML = '';
				queuedClassesCount = 0;
			}
			buildTimeoutHandle = null;
		}, 50);
	}

	return (() => {
		let cached: Record<string, string> = {};

		// @ts-ignore
		const styler: FunctionalStylesheet<T> = (...elements) => {
			let values: ClassProvider[] = [];
			let classlist = [];
			for (let element of elements) {
				if (element == null || element === false) {
					continue;
				} else if (typeof element === 'object') {
					for (let property in element) {
						if (element[property]) {
							// @ts-ignore
							values.push(newStyles[element]);
							classlist.push(element);
						}
					}
				} else if ((element as string) in newStyles) {
					values.push(newStyles[element]);
					classlist.push(element);
				}
			}

			let key = classlist.join('|');

			if (!(key in cached)) {
				cached[key] = stylex.apply(null, values);
			}
			return cached[key];
		};

		Object.assign(styler, newStyles);

		return styler;
	})();
}

export interface ClassProvider {
	[key: string]: string | Record<string, string>;
}

export function dedupe(providers: (ClassProvider | ClassProvider[] | false | null | undefined)[]) {
	providers = providers.reverse();
	const styles: ClassProvider = {};

	while (providers.length) {
		let provider = providers.pop();

		if (Array.isArray(provider)) {
			for (let i = provider.length - 1; i >= 0; i--) {
				providers.push(provider[i]);
			}
		} else {
			if (provider != null && typeof provider === 'object') {
				for (let propertyName in provider) {
					let propertyValue = provider[propertyName];
					if (typeof propertyValue === 'string') {
						styles[propertyName] = propertyValue;
					} else if (typeof propertyValue === 'object') {
						styles[propertyName] = styles[propertyName] ?? {};
						Object.assign(styles[propertyName], propertyValue);
					}
				}
			}
		}
	}

	return styles;
}

export function stylex(...providers: (ClassProvider | false | null | undefined)[]) {
	var deduped = dedupe(providers);
	var classes = '';

	for (let propertyName in deduped) {
		if (Boolean(deduped[propertyName])) {
			if (typeof deduped[propertyName] === 'string') {
				classes += classes ? ' ' + deduped[propertyName] : deduped[propertyName];
			} else if (typeof deduped[propertyName] === 'object') {
				let nestedClasses = deduped[propertyName];

				// @ts-ignore
				for (let propertyName in nestedClasses) {
					// @ts-ignore
					let propertyValue = nestedClasses[propertyName];
					if (typeof propertyValue === 'object') {
						propertyValue = stylex(propertyValue);
					}
					classes += classes ? ' ' + propertyValue : propertyValue;
				}
			}
		}
	}

	return classes;
}
