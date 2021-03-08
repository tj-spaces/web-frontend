import {useContext, useEffect, useRef} from 'react';
// import {defaultPannerNodeSettings} from '../lib/defaultPannerNodeSettings';
import SpaceAudioContext from '../components/space/SpaceAudioContext';
import {defaultPannerNodeSettings} from '../lib/defaultPannerNodeSettings';
import {Position} from '../typings/Space';

export default function SpatialAudioTrack({
	position,
	rotation,
	track,
}: {
	position: Position;
	rotation: number;
	track: MediaStreamTrack;
}) {
	const audioContext = useContext(SpaceAudioContext);
	const pannerNode = useRef<PannerNode>();

	// [audioContext, audioTrack]
	useEffect(() => {
		if (!audioContext) {
			console.warn('AudioContext is NULL');
			return;
		}

		let audio = new Audio();
		audio.srcObject = new MediaStream([track]);
		audio.muted = true;

		let audioSource = audioContext.createMediaStreamSource(audio.srcObject);
		pannerNode.current = new PannerNode(
			audioContext,
			defaultPannerNodeSettings
		);
		audioSource.connect(pannerNode.current);
		pannerNode.current.connect(audioContext.destination);

		return () => {
			// audio.pause();
			audioSource.disconnect();
			pannerNode.current = undefined;
		};
	}, [audioContext, track]);

	// [location, rotation]
	useEffect(() => {
		if (pannerNode.current) {
			pannerNode.current.positionX.value = position.x;
			pannerNode.current.positionY.value = position.y;

			pannerNode.current.orientationX.value = Math.sin(rotation);
			pannerNode.current.orientationZ.value = Math.cos(rotation);
		}
	}, [position, rotation]);

	return null;
}
