import {useLayoutEffect, useRef, useContext, useMemo, useEffect} from 'react';
import {createStylesheet} from '../../styles/createStylesheet';
import Mic from '@material-ui/icons/Mic';
import MicOff from '@material-ui/icons/MicOff';
import Videocam from '@material-ui/icons/Videocam';
import VideocamOff from '@material-ui/icons/VideocamOff';
import BaseRow from '../base/BaseRow';
import {useCurrentUser} from '../AuthHooks';
import UserSettingsContext from './userSettings/UserSettingsContext';
import {useLocalUserTracks} from './airwave/VoiceHooks';

const styles = createStylesheet({
	container: {
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
		left: '0.5rem',
		bottom: '0.5rem',
	},
	localUserProfilePhoto: {
		position: 'absolute',
		left: '50%',
		top: '50%',
		transform: 'translate(-50%, -50%)',
	},
});

export default function LocalUserPreview({
	width,
	height,
}: {
	width: string;
	height: string;
}) {
	const currentUser = useCurrentUser();
	const stream = useMemo(() => new MediaStream(), []);
	const userTracks = useLocalUserTracks();
	const {userSettings, userSettingsSDK} = useContext(UserSettingsContext);
	const videoRef = useRef<HTMLVideoElement>(null);

	useEffect(() => {
		const existingTracks = new Set(stream.getTracks());
		userTracks.forEach((track) => {
			if (track.webrtcTrack) {
				if (!existingTracks.has(track.webrtcTrack)) {
					stream.addTrack(track.webrtcTrack);
				}
			}
		});
		existingTracks.forEach((existingTrack) => {
			if (!userTracks.find((track) => track.webrtcTrack === existingTrack)) {
				stream.removeTrack(existingTrack);
			}
		});
	}, [stream, userTracks]);

	useLayoutEffect(() => {
		if (videoRef.current) {
			videoRef.current.srcObject = stream;
			videoRef.current.play();
		}
	}, [stream, userTracks]);

	const hasLocalVideo = useMemo(() => {
		return userTracks.some((track) => track.kind === 'video');
	}, [userTracks]);

	return (
		<div className={styles('container')} style={{width, height}}>
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
				<BaseRow direction="row" spacing={1}>
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
