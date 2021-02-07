import { createStylesheet } from './createStylesheet';

export const rowEdgeStyles = createStylesheet({
	0: {},
	1: { paddingLeft: '0.5em', paddingRight: '0.5em' },
	2: { paddingLeft: '1em', paddingRight: '1em' }
});

export const columnEdgeStyles = createStylesheet({
	0: {},
	1: { paddingTop: '0.5em', paddingBottom: '0.5em' },
	2: { paddingTop: '1em', paddingBottom: '1em' }
});
