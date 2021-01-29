import { createStylesheet } from './createStylesheet';

export default createStylesheet({
	columnItem: {
		pseudoSelectors: {
			':not(:first-child)': {
				marginTop: '0.5em'
			},
			':not(:last-child)': {
				marginBottom: '0.5em'
			}
		}
	},
	rowItem: {
		pseudoSelectors: {
			':not(:first-child)': {
				marginLeft: '0.5em'
			},
			':not(:last-child)': {
				marginRight: '0.5em'
			}
		}
	}
});
