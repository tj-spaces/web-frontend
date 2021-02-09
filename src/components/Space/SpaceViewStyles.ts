import {createStylesheet} from '../../styles/createStylesheet';

export const spaceViewStyles = createStylesheet({
	// The background
	container: {
		position: 'absolute',
		minWidth: '100%',
		height: '100vh',
		backgroundColor: 'white',
		bottom: '0px',
		left: '0px',
		right: '0px',
		zIndex: 1,
		transition: 'all 500ms ease',
	},
	mainContent: {
		paddingTop: '5em',
		paddingBottom: '5em',
		height: '100%',
		maxWidth: '100%',
	},
	/**
	 * The top heading. Currently only stores the space topic.
	 */
	topHeading: {
		position: 'absolute',
		top: '0px',
		left: '0px',
		right: '0px',
		height: '5em',
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
				marginRight: '1.5rem',
			},
		},
	},
	/**
	 * The actual Space itself: tiles, 3D view, etc
	 */
	environment: {
		position: 'absolute',
		bottom: '5rem',
		top: '5rem',
		left: '0px',
		right: '0px',
		zIndex: -1,
		subSelectors: {
			':focus': {
				outline: 'none',
			},
		},
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
		right: '0px',
	},
	/**
	 * The local user's video
	 */
	bottomLocalVideo: {
		position: 'absolute',
		left: '0px',
		bottom: '0px',
		padding: '1em',
	},
});
