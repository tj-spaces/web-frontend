import { CSSProperties } from 'react';
import spacesLog from '../lib/spacesLog';

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

const kebabize = (str: string) => {
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

export type Stylesheet = { [className: string]: StylesheetProperties };
export interface StylesheetProperties extends CSSProperties {
	extends?: string[];
	pseudoSelectors?: {
		[pseudoSelector: string]: StylesheetProperties;
	};
}

export function createClasses(properties: StylesheetProperties, pseudoSelector: string = '') {
	let innerHTML = '';
	let classes: string[] = [];
	for (let [propName, propValue] of Object.entries(properties)) {
		if (propName === 'extends') {
			let otherClasses = (propValue as unknown) as string[];
			classes.push(otherClasses.join(' '));
		} else if (propName === 'pseudoSelectors') {
			for (let [pseudoSelectorNested, props] of Object.entries(propValue)) {
				// This is a nested StylesheetProperties
				let result = createClasses(props as StylesheetProperties, pseudoSelector + pseudoSelectorNested);
				innerHTML += result.innerHTML;
				classes = classes.concat(result.classes);
			}
		}
		if (typeof propValue === 'string' || typeof propValue === 'number') {
			const key = propName + pseudoSelector + '|' + propValue;
			let className;
			if (key in classCache) {
				className = classCache[key];
			} else {
				className = generateClassName(2);
				const styleText = kebabize(propName) + ':' + propValue;
				innerHTML += `.${className}${pseudoSelector}{${styleText};}`;
				classCache[key] = className;
			}
			classes.push(className);
		}
	}
	return { innerHTML, classes };
}

let buildTimeoutHandle: NodeJS.Timeout | null = null;
let queuedHTML = '';
let queuedClassesCount = 0;

export function createStylesheet<T extends Stylesheet>(styles: T) {
	let innerHTML = '';
	// @ts-ignore
	const newStyles: { [key in keyof T]: string } = {};
	for (let [cls, props] of Object.entries(styles)) {
		let { classes, innerHTML: newInnerHTML } = createClasses(props);
		innerHTML += newInnerHTML;
		// @ts-ignore
		newStyles[cls] = classes.join(' ');
		queuedClassesCount += classes.length;
	}
	queuedHTML += innerHTML;
	if (buildTimeoutHandle == null) {
		buildTimeoutHandle = setTimeout(() => {
			if (queuedHTML.trim()) {
				spacesLog('stylesheet', `Injecting ${queuedClassesCount} classes`);
				const tag = createStyleTag();
				tag.innerHTML = queuedHTML;
				queuedHTML = '';
				queuedClassesCount = 0;
			}
			buildTimeoutHandle = null;
		}, 50);
	}
	return newStyles;
}

type ClassProvider = { [prop: string]: string | undefined } | string | boolean | undefined;

export function classes(...props: ClassProvider[]) {
	return props
		.map((props) => {
			if (typeof props === 'string') {
				return props;
			} else if (props == null || props === false) {
				return '';
			} else {
				return Object.values(props)
					.filter((a) => Boolean(a))
					.join(' ');
			}
		})
		.filter((a) => Boolean(a))
		.join(' ');
}
