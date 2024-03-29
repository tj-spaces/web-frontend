/*
  Copyright (C) Michael Fatemi - All Rights Reserved.
  Unauthorized copying of this file via any medium is strictly prohibited.
  Proprietary and confidential.
  Written by Michael Fatemi <myfatemi04@gmail.com>, February 2021.
*/
import {createStylesheet, StylesheetDefinition} from './createStylesheet';

export const rowSpacing = (amt: string): StylesheetDefinition[''] => ({
	subSelectors: {
		'>*': {
			subSelectors: {
				':not(:first-child)': {
					marginLeft: amt,
				},
				':not(:last-child)': {
					marginRight: amt,
				},
			},
		},
	},
});

export const colSpacing = (amt: string): StylesheetDefinition[''] => ({
	subSelectors: {
		'>*': {
			subSelectors: {
				':not(:first-child)': {
					marginTop: amt,
				},
				':not(:last-child)': {
					marginBottom: amt,
				},
			},
		},
	},
});

export const spaceBetweenFlexRowItems = createStylesheet({
	0: {},
	0.5: rowSpacing('0.25rem'),
	1: rowSpacing('0.5rem'),
	2: rowSpacing('1rem'),
});

export const spaceBetweenFlexColumnItems = createStylesheet({
	0: {},
	0.5: rowSpacing('0.25rem'),
	1: colSpacing('0.5rem'),
	2: colSpacing('1rem'),
});
