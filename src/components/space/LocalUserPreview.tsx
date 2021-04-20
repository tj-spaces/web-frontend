import {useLayoutEffect, useRef, useContext} from 'react';
import {createStylesheet} from '../../styles/createStylesheet';
import {useHasLocalVideo, useUserMediaStream} from './LocalDevicesHooks';
import Mic from '@material-ui/icons/Mic';
import MicOff from '@material-ui/icons/MicOff';
import Videocam from '@material-ui/icons/Videocam';
import VideocamOff from '@material-ui/icons/VideocamOff';
import BaseRow from '../base/BaseRow';
import {useCurrentUser} from '../AuthHooks';
import UserSettingsContext from './UserSettingsContext';

const styles = createStylesheet({
	container: {
		width: '30rem',
		height: '20rem',
		overflow: 'hidden',
		position: 'relative',
		borderRadius: '1em',
		backgroundColor: 'var(--bg-elevated)',
		padding: '2em',
	},
	video: {
		position: 'absolute',
		transform: 'scaleX(-1)',
		objectFit: 'cover',
		width: '100%',
		height: '100%',
		inset: '0px',
	},
	localUserIcons: {
		position: 'absolute',
		left: '2em',
		bottom: '2em',
	},
	localUserProfilePhoto: {
		position: 'absolute',
		left: '50%',
		top: '50%',
		transform: 'translate(-50%, -50%)',
	},
});

export default function LocalUserPreview() {
	const currentUser = useCurrentUser();
	const userMedia = useUserMediaStream();
	const hasLocalVideo = useHasLocalVideo();
	const {userSettings, userSettingsSDK} = useContext(UserSettingsContext);
	const videoRef = useRef<HTMLVideoElement>(null);

	useLayoutEffect(() => {
		if (videoRef.current) {
			videoRef.current.srcObject = userMedia;
			videoRef.current.play();
		}
	}, [userMedia]);

	return (
		<div className={styles('container')}>
			{hasLocalVideo ? (
				<video className={styles('video')} muted ref={videoRef}></video>
			) : (
				currentUser?.picture && (
					<img
						src={currentUser?.picture}
						alt={currentUser.name}
						className={styles('localUserProfilePhoto')}
					/>
				)
			)}
			<div className={styles('localUserIcons')}>
				<BaseRow direction="row" spacing={1} rails={1}>
					{userSettings.micEnabled ? (
						<Mic
							fontSize="large"
							style={{cursor: 'pointer'}}
							onClick={() => userSettingsSDK.setMicEnabled(false)}
						/>
					) : (
						<MicOff
							fontSize="large"
							style={{cursor: 'pointer'}}
							onClick={() => userSettingsSDK.setMicEnabled(true)}
						/>
					)}
					{userSettings.cameraEnabled ? (
						<Videocam
							fontSize="large"
							style={{cursor: 'pointer'}}
							onClick={() => userSettingsSDK.setCameraEnabled(false)}
						/>
					) : (
						<VideocamOff
							fontSize="large"
							style={{cursor: 'pointer'}}
							onClick={() => userSettingsSDK.setCameraEnabled(true)}
						/>
					)}
				</BaseRow>
			</div>
		</div>
	);
}