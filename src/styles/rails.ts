import { createStylesheet } from './createStylesheet';

export const rowRails = createStylesheet({
	0: { paddingTop: '0em', paddingBottom: '0em' },
	1: { paddingTop: '0.5em', paddingBottom: '0.5em' },
	2: { paddingTop: '1em', paddingBottom: '1em' }
});

export const colRails = createStylesheet({
	0: { paddingLeft: '0em', paddingRight: '0em' },
	1: { paddingLeft: '0.5em', paddingRight: '0.5em' },
	2: { paddingLeft: '1em', paddingRight: '1em' }
});
