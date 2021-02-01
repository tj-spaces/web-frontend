import { createStylesheet } from '../../styles/createStylesheet';
import * as BaseRow from '../Base/BaseRow';

export const spaceViewStyles = createStylesheet({
	frame: {
		// Position is relative so that children can be made "absolute"
		position: 'relative',
		minHeight: '100vh',
		minWidth: '100%',
		overflow: 'hidden'
	},
	spaceView: {
		width: '100%',
		height: '100%',
		position: 'absolute',
		zIndex: -1
	},
	/**
	 * The mute/unmute, disable/enable camera, and Leave Space buttons container
	 */
	bottomButtons: {
		extends: [BaseRow.rowSpacings[1]],
		justifyContent: 'center',
		width: '100%',
		// go along the bottom of the container
		position: 'absolute',
		bottom: '0px',
		padding: '1em 0em',
		display: 'flex',
		flexDirection: 'row'
	},
	/**
	 * The local user's video
	 */
	bottomLocalVideo: {
		position: 'absolute',
		left: '0px',
		bottom: '0px',
		padding: '1em'
	}
});
