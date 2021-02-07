import { createStylesheet } from '../../styles/createStylesheet';

export const spaceViewStyles = createStylesheet({
	// The white container with rounded borders
	frame: {
		position: 'absolute',
		minWidth: '100%',
		backgroundColor: 'white',
		bottom: '0px',
		left: '0px',
		right: '0px',
		zIndex: 1,
		transition: 'all 500ms ease'
	},
	frameExpanded: {
		minHeight: '100vh'
	},
	frameCondensed: {
		maxHeight: '40vh'
	},
	view: {
		position: 'absolute',
		bottom: '5rem',
		top: '5rem',
		left: '0px',
		right: '0px',
		zIndex: -1
	},
	/**
	 * The mute/unmute, disable/enable camera, and Leave Space buttons container
	 */
	bottomButtons: {
		width: '100%',
		height: '5em',
		position: 'absolute',
		bottom: '0px',
		left: '0px',
		right: '0px'
	},
	/**
	 * The local user's video
	 */
	bottomLocalVideo: {
		position: 'absolute',
		left: '0px',
		bottom: '0px',
		padding: '1em'
	},
	mainContent: {
		paddingTop: '5em',
		paddingBottom: '5em',
		height: '100%',
		maxWidth: '100%'
	},
	topHeading: {
		position: 'absolute',
		top: '0px',
		height: '5em',
		width: '100%',
		paddingTop: '1em',
		paddingBottom: '1em',
		textAlign: 'center',
		color: 'black',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		subSelectors: {
			i: {
				cursor: 'pointer',
				fontSize: '3rem',
				marginRight: '1.5rem'
			}
		}
	}
});
