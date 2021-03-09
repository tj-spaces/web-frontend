/*
  Copyright (C) Michael Fatemi - All Rights Reserved.
  Unauthorized copying of this file via any medium is strictly prohibited.
  Proprietary and confidential.
  Written by Michael Fatemi <myfatemi04@gmail.com>, February 2021.
*/
import camelize from '../lib/camelize';
import hyphenate from '../lib/hyphenate';

function toString(value: string | null) {
	return value == null ? '' : String(value);
}

export default function getStyleProperty(
	element: HTMLElement,
	property: string
) {
	if (window.getComputedStyle) {
		let computedStyle = window.getComputedStyle(element, null);
		if (computedStyle) {
			return toString(computedStyle.getPropertyValue(hyphenate(property)));
		}
	}

	if (document.defaultView?.getComputedStyle) {
		let computedStyle = document.defaultView.getComputedStyle(element, null);
		if (computedStyle) {
			return toString(computedStyle.getPropertyValue(hyphenate(property)));
		}
		if (property === 'display') {
			return 'none';
		}
	}

	if (property === 'float') {
		return element.style.cssFloat;
	} else {
		// @ts-ignore
		return element.style[camelize(property)];
	}
}
